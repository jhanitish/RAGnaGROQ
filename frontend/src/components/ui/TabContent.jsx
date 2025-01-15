import React from 'react';
import { Eye, Brain, BookOpen, User, Bot } from 'lucide-react';

const TabContent = ({ 
  activeTab,
  messages = [],
  messagesEndRef,
  problemId,
  setProblemId,
  handleGetHints,
  problemHints,
  codeInput,
  programmingLanguage,
  setCodeInput,
  setProgrammingLanguage,
  handleCodeReview,
  reviewResult,
  topics = [],
  selectedTopics,
  setSelectedTopics,
  durationWeeks,
  setDurationWeeks,
  handleGetStudyPlan,
  studyPlan,
  isKeyValidated,
  isLoading,
  onTabChange
}) => {
  const MessageBubble = ({ message }) => (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
        {message.role === 'user' ? (
          <User className="w-6 h-6 text-blue-500" />
        ) : (
          <Bot className="w-6 h-6 text-purple-500" />
        )}
        <div className={`p-4 rounded-lg border whitespace-pre-wrap ${
          message.role === 'user' 
            ? 'bg-blue-50 border-blue-200 text-blue-900' 
            : 'bg-purple-50 border-purple-200 text-purple-900'
        }`}>
          {message.content}
        </div>
      </div>
    </div>
  );

  const CodeInput = ({ code, language, onCodeChange, onLanguageChange }) => (
    <div className="space-y-4">
      <select
        className="w-full p-2 border rounded-md bg-white"
        value={language}
        onChange={onLanguageChange}
      >
        <option value="python">Python</option>
        <option value="javascript">JavaScript</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
      </select>
      <textarea
        placeholder="Paste your code here..."
        value={code}
        onChange={onCodeChange}
        className="w-full min-h-[200px] p-2 border rounded-md"
      />
    </div>
  );

  const TopicSelector = ({ topics, selectedTopics, onTopicChange }) => (
    <select
      multiple
      className="w-full p-2 border rounded-md bg-white"
      value={selectedTopics || []}
      onChange={onTopicChange}
    >
      {topics.map(topic => (
        <option key={topic.value} value={topic.value}>
          {topic.label}
        </option>
      ))}
    </select>
  );

  const tabItems = [
    // { value: 'chat', icon: MessageCircle, label: 'Chat' },
    { value: 'hints', icon: Eye, label: 'Problem Hints' },
    { value: 'review', icon: Brain, label: 'Code Review' },
    { value: 'study', icon: BookOpen, label: 'Study Plan' }
  ];

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-2 bg-white border-b flex gap-2">
        {tabItems.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => onTabChange(value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors
              ${activeTab === value 
                ? 'bg-blue-100 text-blue-700' 
                : 'hover:bg-gray-100'
              }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'chat' && (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <MessageBubble key={index} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}

        {activeTab === 'hints' && isKeyValidated ? (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Enter LeetCode Problem ID"
                value={problemId}
                onChange={(e) => setProblemId(e.target.value)}
                className="flex-1 p-2 border rounded-md"
              />
              <button
                onClick={handleGetHints}
                disabled={!isKeyValidated || isLoading}
                className={`px-4 py-2 rounded-md ${
                  !isKeyValidated || isLoading
                    ? 'bg-gray-200 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                Get Hints
              </button>
            </div>
            {problemHints && (
              <div className="p-4 bg-white rounded-lg border">
                <pre className="whitespace-pre-wrap">{problemHints}</pre>
              </div>
            )}
          </div>
        ) : activeTab === 'review' && isKeyValidated ? (
          <div className="space-y-4">
            <CodeInput
              code={codeInput}
              language={programmingLanguage}
              onCodeChange={(e) => setCodeInput(e.target.value)}
              onLanguageChange={(e) => setProgrammingLanguage(e.target.value)}
            />
            <button
              onClick={handleCodeReview}
              disabled={!isKeyValidated || isLoading}
              className={`px-4 py-2 rounded-md ${
                !isKeyValidated || isLoading
                  ? 'bg-gray-200 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Review Code
            </button>
            {reviewResult && (
              <div className="p-4 bg-white rounded-lg border">
                <pre className="whitespace-pre-wrap">{reviewResult}</pre>
              </div>
            )}
          </div>
        ) : activeTab === 'study' && isKeyValidated ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Select Topics</label>
                <TopicSelector
                  topics={topics}
                  selectedTopics={selectedTopics}
                  onTopicChange={(e) => setSelectedTopics(
                    Array.from(e.target.selectedOptions, option => option.value)
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Duration (weeks)</label>
                <input
                  type="number"
                  value={durationWeeks}
                  onChange={(e) => setDurationWeeks(parseInt(e.target.value))}
                  min="1"
                  max="12"
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
            <button
              onClick={handleGetStudyPlan}
              disabled={!isKeyValidated || isLoading}
              className={`px-4 py-2 rounded-md ${
                !isKeyValidated || isLoading
                  ? 'bg-gray-200 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Generate Study Plan
            </button>
            {studyPlan && (
              <div className="p-4 bg-white rounded-lg border">
                <pre className="whitespace-pre-wrap">{studyPlan}</pre>
              </div>
            )}
          </div>
        ) : (
          <MessageBubble message={messages[0]} />
        )}
      </div>
    </div>
  );
};

export default TabContent;