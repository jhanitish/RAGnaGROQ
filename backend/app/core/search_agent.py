from langchain_groq import ChatGroq
from langchain_community.utilities import ArxivAPIWrapper, WikipediaAPIWrapper
from langchain_community.tools import ArxivQueryRun, WikipediaQueryRun, DuckDuckGoSearchRun
from langchain.agents import initialize_agent, AgentType
from langchain.prompts import PromptTemplate
from typing import List, AsyncGenerator
from app.core.models import ChatMessage
import asyncio

class SearchAgent:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.llm = None
        self.tools = None
        self.agent = None
        self.prompt_template = None

    async def initialize_llm(self):
        """Initialize LLM and tools if not already initialized"""
        if self.llm is None:
            self.llm = ChatGroq(
                groq_api_key=self.api_key,
                model_name="llama3-8b-8192",
                streaming=True
            )
            
            # Initialize search tools
            self.arxiv_wrapper = ArxivAPIWrapper(top_k_results=1, doc_content_chars_max=200)
            self.arxiv = ArxivQueryRun(api_wrapper=self.arxiv_wrapper)
            
            self.wiki_wrapper = WikipediaAPIWrapper(top_k_results=1, doc_content_chars_max=200)
            self.wiki = WikipediaQueryRun(api_wrapper=self.wiki_wrapper)
            
            self.search = DuckDuckGoSearchRun(name="Search")

            # Define prompt template
            self.prompt_template = PromptTemplate(
                input_variables=["query"],
                template=(
                    "You are an AI assistant designed to search Arxiv, Wikipedia and search from web for "
                    "papers and educational content. If the query is: '{query}', please "
                    "attempt to find the most relevant information from these sources. "
                    "If no relevant information is found, inform the user that it is "
                    "outside your capabilities."
                )
            )
            
            # Initialize agent
            self.tools = [self.arxiv, self.wiki]
            # self.agent = create_react_agent(
            #     tools=[],
            #     llm=self.llm,
            #     verbose=True
            # )
            self.agent = initialize_agent(
                self.tools,
                self.llm,
                agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
                handling_parsing_errors=True
            )

    async def validate_api_key(self) -> bool:
        """Validate the API key by attempting to initialize the LLM"""
        try:
            await self.initialize_llm()
            # Try a simple completion to verify the key works
            test_response = await asyncio.to_thread(
                self.llm.predict,
                "test"
            )
            return True
        except Exception as e:
            raise Exception(f"Invalid API key: {str(e)}")

    async def process_messages(self, messages: List[ChatMessage]) -> str:
        """Process a list of messages and return a response"""
        try:

            await self.initialize_llm()
            
            # Extract the latest query from the user message
            query = messages[-1].content.strip()
            
            # Generate the prompt using the template
            custom_prompt = self.prompt_template.format(query=query)
            
            # Format messages for the agent
            formatted_messages = [{"role": "system", "content": custom_prompt}]
            
            
            # # Run agent and get response
            # response = await asyncio.to_thread(
            #     self.agent.run,
            #     formatted_messages
            # )

            response = await asyncio.to_thread(
                self.agent.run,  # Updated from .run to .invoke
                formatted_messages
            )
            return response
        except Exception as e:
            raise Exception(f"Error processing messages: {str(e)}")

    async def stream_response(self, messages: List[ChatMessage]) -> AsyncGenerator[str, None]:
        """Stream the response for a list of messages"""
        try:
            await self.initialize_llm()

            formatted_messages = [
                {"role": msg.role, "content": msg.content}
                for msg in messages
            ]

            # Get streaming response from agent
            async for chunk in self.agent.astream(formatted_messages):
                try:
                    # Handle final output field
                    if "output" in chunk:
                        yield chunk["output"]
                    # Handle intermediate steps and messages
                    elif "messages" in chunk:
                        for message in chunk["messages"]:
                            if "content" in message:
                                yield message["content"]
                    else:
                        print(f"Unhandled chunk structure: {chunk}")
                except Exception as e:
                    print(f"Error processing chunk: {e}")
                    break
        except Exception as e:
            raise Exception(f"Error streaming response: {str(e)}")
