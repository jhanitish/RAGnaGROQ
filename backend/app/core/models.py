from pydantic import BaseModel
from typing import List, Optional
from enum import Enum

class ApiKeyValidation(BaseModel):
    api_key: str

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatResponse(BaseModel):
    role: str
    content: str

class SearchResult(BaseModel):
    source: str
    content: str
    relevance: float


#Leetcode Assistant

class Difficulty(str, Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"

class Topic(str, Enum):
    ARRAYS = "arrays"
    STRINGS = "strings"
    LINKED_LIST = "linked_list"
    TREES = "trees"
    DYNAMIC_PROGRAMMING = "dynamic_programming"
    GRAPHS = "graphs"
    SORTING = "sorting"
    SEARCHING = "searching"
    MATH = "math"
    GREEDY = "greedy"

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    api_key: str
    settings: Optional[dict] = None

class ProblemRequest(BaseModel):
    problem: str
    api_key: str

class TopicRequest(BaseModel):
    topic: Topic
    difficulty: Optional[Difficulty] = None
    api_key: str

class CodeReviewRequest(BaseModel):
    code: str
    language: str
    problem_id: Optional[int] = None
    api_key: str

class StudyPlanRequest(BaseModel):
    topics: List[Topic]
    difficulty: Optional[Difficulty] = None
    duration_weeks: int
    api_key: str
