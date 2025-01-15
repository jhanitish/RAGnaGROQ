import React, { useState, useEffect, useRef } from 'react';
import { CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Alert, AlertDescription } from '../components/ui/Alert';
import { Textarea } from '../components/ui/Textarea';
import {
  Code2,
  Settings,
  Loader2,
  Key,
} from 'lucide-react';
import TabContent from '../components/ui/TabContent';

const API_URL = 'http://localhost:8000/api';

const LeetCodeAssistant = () => {
  const [activeTab, setActiveTab] = useState('hints');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your LeetCode teaching assistant. I can help you understand problems, provide hints, explain solutions, and teach problem-solving patterns. Please submit your Groq API key to start learning!"
    }
  ]);
  
  const [input, setInput] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isKeyValidated, setIsKeyValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [problemId, setProblemId] = useState('');
  const [problemHints, setProblemHints] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [programmingLanguage, setProgrammingLanguage] = useState('python');
  const [reviewResult, setReviewResult] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [durationWeeks, setDurationWeeks] = useState(4);
  const [studyPlan, setStudyPlan] = useState('');
  const [dailyChallenge, setDailyChallenge] = useState('');
  
  const messagesEndRef = useRef(null);

  const topics = [
    { value: 'arrays', label: 'Arrays' },
    { value: 'strings', label: 'Strings' },
    { value: 'linked_list', label: 'Linked Lists' },
    { value: 'trees', label: 'Trees' },
    { value: 'dynamic_programming', label: 'Dynamic Programming' },
    { value: 'graphs', label: 'Graphs' },
    { value: 'greedy', label: 'Greedy Algorithms' }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleApiValidation = async () => {
    if (!apiKey.trim()) {
      setError('Please enter an API key');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/validate-key`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: apiKey }),
      });

      if (!response.ok) throw new Error('Invalid API key');

      setIsKeyValidated(true);
      setError('');
    } catch (err) {
      setError('Failed to validate API key');
      setIsKeyValidated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetHints = async () => {
    if (!problemId) {
      setError('Please enter a problem ID');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/problem-hint/${problemId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: apiKey, problem_id: parseInt(problemId) }),
      });
      const data = await response.json();
      setProblemHints(data.hints);
    } catch (err) {
      setError('Failed to get problem hints');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeReview = async () => {
    if (!codeInput) {
      setError('Please enter code to review');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/code-review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: apiKey,
          code: codeInput,
          language: programmingLanguage,
          problem_id: problemId ? parseInt(problemId) : null
        }),
      });
      const data = await response.json();
      setReviewResult(data.review);
    } catch (err) {
      setError('Failed to get code review');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetStudyPlan = async () => {
    if (selectedTopics.length === 0) {
      setError('Please select at least one topic');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/study-plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: apiKey,
          topics: selectedTopics,
          duration_weeks: durationWeeks
        }),
      });
      const data = await response.json();
      setStudyPlan(data.study_plan);
    } catch (err) {
      setError('Failed to generate study plan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white p-4 border-r">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings size={20} />
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Enter Groq API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              disabled={isKeyValidated}
              className="mb-2"
            />
            <Button 
              onClick={handleApiValidation} 
              disabled={isKeyValidated || isLoading}
              className="w-full"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Key className="w-4 h-4 mr-2" />
              )}
              {isKeyValidated ? 'API Key Validated' : 'Submit API Key'}
            </Button>
          </div>
        </CardContent>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b bg-white">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Code2 className="w-6 h-6" />
            LeetCode Gen AI Assistant
          </h1>
        </div>

        <TabContent 
          activeTab={activeTab}
          messages={messages}
          messagesEndRef={messagesEndRef}
          problemId={problemId}
          setProblemId={setProblemId}
          handleGetHints={handleGetHints}
          problemHints={problemHints}
          codeInput={codeInput}
          programmingLanguage={programmingLanguage}
          setCodeInput={setCodeInput}
          setProgrammingLanguage={setProgrammingLanguage}
          handleCodeReview={handleCodeReview}
          reviewResult={reviewResult}
          topics={topics}
          selectedTopics={selectedTopics}
          setSelectedTopics={setSelectedTopics}
          durationWeeks={durationWeeks}
          setDurationWeeks={setDurationWeeks}
          handleGetStudyPlan={handleGetStudyPlan}
          studyPlan={studyPlan}
          isKeyValidated={isKeyValidated}
          isLoading={isLoading}
          onTabChange={setActiveTab}
        />

        {error && (
          <Alert variant="destructive" className="m-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}

export default LeetCodeAssistant;