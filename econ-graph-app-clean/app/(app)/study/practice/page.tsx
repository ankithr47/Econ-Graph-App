'use client';

import { useState } from 'react';
import Flashcard from '@/components/practice/Flashcard';
import graphsData from '@/data/graphs.json';

// Updated interfaces to match your JSON structure
interface KeyElement {
  element: string;
  description: string;
}

interface PracticeData {
  question: string;
  answerImage: string;
  explanation: string;
  keyElements?: KeyElement[];
}

interface StudyStep {
  step: number;
  action: 'draw' | 'highlight' | 'overlay';
  type: 'line' | 'curve' | 'point' | 'area';
  path?: string;
  image?: string;
  strokeColor?: string;
  strokeWidth?: number;
  x?: number;
  y?: number;
  label: string;
  explanation: string;
}

interface StudyData {
  baseImage: string;
  steps: StudyStep[];
}

interface GraphData {
  id: number;
  title: string;
  practice: PracticeData;
  study: StudyData;
}

type CardStatus = 'mastered' | 'needs-review' | null;

export default function StudyPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Use lazy initializer to load from localStorage
  const [cardStatuses, setCardStatuses] = useState<Record<number, CardStatus>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('graphCardStatuses');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return {};
        }
      }
    }
    return {};
  });
  
  const graphs = graphsData as GraphData[];
  const currentGraph = graphs[currentIndex];

  // Save statuses to localStorage whenever they change
  const handleStatusChange = (graphId: number, status: CardStatus) => {
    const newStatuses = { ...cardStatuses, [graphId]: status };
    setCardStatuses(newStatuses);
    localStorage.setItem('graphCardStatuses', JSON.stringify(newStatuses));
  };

  const handleNext = () => {
    if (currentIndex < graphs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Economics Graph Revision</h1>
          <div className="text-sm text-gray-600">
            Card {currentIndex + 1} of {graphs.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / graphs.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Flashcard - transform the nested structure to flat structure */}
        {currentGraph && (
          <Flashcard
            graph={{
              id: currentGraph.id,
              title: currentGraph.title,
              question: currentGraph.practice.question,
              answerImage: currentGraph.practice.answerImage,
              explanation: currentGraph.practice.explanation,
              keyElements: currentGraph.practice.keyElements,
            }}
            onStatusChange={handleStatusChange}
            currentStatus={cardStatuses[currentGraph.id] || null}
          />
        )}

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`px-6 py-3 font-medium rounded-lg transition-colors ${
              currentIndex === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-600 hover:bg-gray-700 text-white'
            }`}
          >
            ← Previous
          </button>

          <div className="flex gap-2">
            {graphs.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-blue-600'
                    : cardStatuses[graphs[index].id] === 'mastered'
                    ? 'bg-green-500'
                    : cardStatuses[graphs[index].id] === 'needs-review'
                    ? 'bg-yellow-500'
                    : 'bg-gray-300'
                }`}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === graphs.length - 1}
            className={`px-6 py-3 font-medium rounded-lg transition-colors ${
              currentIndex === graphs.length - 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-600 hover:bg-gray-700 text-white'
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}