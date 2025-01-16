from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import StreamingResponse
from app.core.models import ChatMessage, ChatResponse, ProblemRequest, TopicRequest, CodeReviewRequest, StudyPlanRequest
from app.core.search_agent import SearchAgent
from app.core.leetcode_agent import LeetcodeAgent 
from typing import List
import json
from pydantic import BaseModel

router = APIRouter()

class ApiKeyValidation(BaseModel):
    api_key: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    api_key: str

@router.post("/validate-key")
async def validate_key(data: ApiKeyValidation):
    """Endpoint to validate Groq API key"""
    try:
        search_agent = SearchAgent(data.api_key)
        await search_agent.validate_api_key()

        return {"status": "valid", "message": "API key is valid"}
    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail="Invalid API key"
        )

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        messages = request.messages
        search_agent = SearchAgent(request.api_key)
        response = await search_agent.process_messages(messages)
        
        return {"role": "assistant", "content": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Leetcode Chat Assistant

@router.post("/leetchat")
async def chat_endpoint(request: ChatRequest):
    try:
        handler = LeetcodeAgent(request.api_key)
        messages = [{"role": msg.role, "content": msg.content} for msg in request.messages]
        
        return await handler.leet_chat(messages)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/problem-hint")
async def problem_hint_endpoint(request: ProblemRequest):
    try:
        handler = LeetcodeAgent(request.api_key)
        
        return await handler.get_problem_hint(request.problem)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/topic-problems")
async def topic_problems_endpoint(request: TopicRequest):
    try:
        handler = LeetcodeAgent(request.api_key)
        
        return await handler.get_topic_problems(
            request.topic.value,
            request.difficulty.value if request.difficulty else None
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/code-review")
async def code_review_endpoint(request: CodeReviewRequest):
    try:
        handler = LeetcodeAgent(request.api_key)
        
        return await handler.review_code(request.language, request.code, request.problem_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/study-plan")
async def study_plan_endpoint(request: StudyPlanRequest):
    try:
        handler = LeetcodeAgent(request.api_key)
        topics = [topic.value for topic in request.topics]
        
        return await handler.create_study_plan(
            topics, request.duration_weeks,
            request.difficulty.value if request.difficulty else None
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/pattern-recognition")
async def pattern_recognition_endpoint(request: CodeReviewRequest):
    try:
        handler = LeetcodeAgent(request.api_key)
        
        return await handler.identify_pattern(request.code)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/daily-challenge")
async def daily_challenge_endpoint(api_key: str):
    try:
        handler = LeetcodeAgent(api_key)
        
        return await handler.get_daily_challenge()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

