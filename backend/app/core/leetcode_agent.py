from fastapi import FastAPI, HTTPException
from datetime import datetime
from typing import List
import groq
import asyncio

SYSTEM_PROMPTS = {
    "code_review": """You are a code review expert. Analyze the provided code for:
        1. Correctness and edge cases
        2. Time and space complexity
        3. Code style and best practices
        4. Potential optimizations
        5. Common pitfalls
        Provide specific suggestions for improvement.""",

    "study_plan": """Create a structured study plan focusing on the specified topics and difficulty level.
        Include:
        1. Weekly goals and objectives
        2. Recommended problems to solve
        3. Key concepts to master
        4. Learning resources and references
        4. Practice exercises and assignments""",

    "problem_hint": """Provide progressive hints for the LeetCode problem without revealing the complete solution.
        Include:
        1. Problem understanding
        2. Key observations
        3. Related patterns or algorithms
        4. Step-by-step guidance
        5. Edge cases to consider"""
}

class LeetcodeAgent:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.client = groq.Groq(api_key=self.api_key)
        self.model = "mixtral-8x7b-32768"
        self.temperature=0.7
        self.max_tokens=4096

    async def leet_chat(self, messages: List[dict]):
        conversation = [{"role": "system", "content": SYSTEM_PROMPTS["problem_hint"]}]
        conversation.extend(messages)

        try:
            response = await asyncio.to_thread(
                self.client.chat.completions.create,
                messages=conversation,
                model=self.model,
                temperature=self.temperature,
                max_tokens=self.max_tokens,
            )
            return {"content": response.choices[0].message.content}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    async def get_problem_hint(self, problem_id: int):
        problem_prompt = f"Provide hints for LeetCode problem #{problem_id}. Start with understanding the problem, then provide progressive hints without revealing the complete solution."
        messages = [{"role": "user", "content": problem_prompt}]
        try:
            print(f"Systemsssss prompt", SYSTEM_PROMPTS["problem_hint"])
            conversation=[{"role": "system", "content": SYSTEM_PROMPTS["problem_hint"]}]
            conversation.extend(messages)
            response = await asyncio.to_thread(
                self.client.chat.completions.create,
                messages=conversation,
                model=self.model,
                temperature=self.temperature,
            )
        
            return {"hints": response.choices[0].message.content}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    async def get_topic_problems(self, topic: str, difficulty: str = None):
        difficulty_str = f" of {difficulty} difficulty" if difficulty else ""
        prompt = f"Recommend 5 LeetCode problems{difficulty_str} related to {topic}. For each problem, include:\n1. Problem name and number\n2. Brief description\n3. Key concepts tested\n4. Learning objectives"

        try:
            response = await asyncio.to_thread(
                self.client.chat.completions.create,
                messages=[
                    {"role": "user", "content": prompt}
                ],
                model=self.model,
                temperature=self.temperature,
            )
            return {"recommendations": response.choices[0].message.content}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    async def review_code(self, language: str, code: str, problem_id: int = None):
        problem_context = f" for LeetCode problem #{problem_id}" if problem_id else ""
        problem_prompt = f"Review this {language} code{problem_context}:\n\n{code}"
        messages = [{"role": "user", "content": problem_prompt}]

        try:
            conversation = [{"role": "system", "content": SYSTEM_PROMPTS["code_review"]}]
            conversation.extend(messages)
            response = await asyncio.to_thread(
                self.client.chat.completions.create,
                messages=conversation,
                model=self.model,
                temperature=self.temperature,
            )
            return {"review": response.choices[0].message.content}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    async def create_study_plan(self, topics: List[str], duration_weeks: int, difficulty: str = None):
        topics_str = ", ".join(topics)
        difficulty_str = f" at {difficulty} difficulty" if difficulty else ""
        problem_prompt = f"Create a {duration_weeks}-week study plan for mastering {topics_str}{difficulty_str} in LeetCode."
        messages = [{"role": "user", "content": problem_prompt}]
        try:
            conversation = [{"role": "system", "content": SYSTEM_PROMPTS["study_plan"]}]
            conversation.extend(messages)
            response = await asyncio.to_thread(
                self.client.chat.completions.create,
                messages=conversation,
                model=self.model,
                temperature=self.temperature,
            )
            return {"study_plan": response.choices[0].message.content}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    async def identify_pattern(self, code: str):
        problem_prompt = f"""Analyze this code and identify the algorithmic patterns used:\n{code}\n\nExplain:\n1. Main algorithmic patterns\n2. Similar LeetCode problems\n3. When to use this pattern\n4. Common variations"""
        messages = [{"role": "user", "content": problem_prompt}]
        try:
            response = await asyncio.to_thread(
                self.client.chat.completions.create,
                messages=messages,
                model=self.model,
                temperature=self.temperature,
            )
            return {"pattern_analysis": response.choices[0].message.content}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    async def get_daily_challenge(self):
        today = datetime.now().strftime("%Y-%m-%d")
        problem_prompt = f"Create a coding challenge for {today} that tests fundamental programming concepts. Include problem description, examples, constraints, and learning objectives."
        messages = [{"role": "user", "content": problem_prompt}]
        try:
            response = await asyncio.to_thread(
                self.client.chat.completions.create,
                messages=messages,
                model=self.model,
                temperature=self.temperature,
            )
            return {"daily_challenge": response.choices[0].message.content}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))