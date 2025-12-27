'use client';

import { useState } from 'react';
import DrawingCanvas from './DrawingCanvas';
import GraphAnswer from './GraphAnswer';

interface KeyElement {
  element: string;
  description: string;
}

interface GraphData {
  id: number;
  title: string;
  question: string;
  answerImage: string;
  explanation: string;
  keyElements?: KeyElement[];
}

interface FlashcardProps {
  graph: GraphData;
  onStatusChange?: (graphId: number, status: 'mastered' | 'needs-review') => void;
  currentStatus?: 'mastered' | 'needs-review' | null;
}

export default function Flashcard({ 
  graph, 
  onStatusChange,
  currentStatus 
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasDrawing, setHasDrawing] = useState(false);

  const handleFlip = () => {
    if (!isFlipped) {
      // Only allow flip if user has attempted to draw
      // For MVP, we'll allow flip regardless, but you can add validation
      setIsFlipped(true);
    } else {
      setIsFlipped(false);
    }
  };

  const handleStatusChange = (status: 'mastered' | 'needs-review') => {
    onStatusChange?.(graph.id, status);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Card Title */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900">{graph.title}</h2>
        {currentStatus && (
          <span className={`ml-3 px-3 py-1 rounded-full text-sm font-medium ${
            currentStatus === 'mastered' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {currentStatus === 'mastered' ? '✓ Mastered' : '⚠ Needs Review'}
          </span>
        )}
      </div>

      {/* Flashcard Container */}
      <div className="perspective-1000">
        <div 
          className={`relative w-full transition-transform duration-500 transform-style-preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Front Side - Drawing Canvas */}
          <div 
            className="w-full backface-hidden"
            style={{ 
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 shadow-lg">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Question</h3>
                <p className="text-lg text-gray-700">{graph.question}</p>
              </div>
              
              <div className="flex justify-center mb-4">
                <DrawingCanvas 
                  onDrawingChange={setHasDrawing}
                />
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={handleFlip}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Show Answer
                </button>
              </div>
            </div>
          </div>

          {/* Back Side - Answer */}
          <div 
            className="w-full absolute top-0 left-0 rotate-y-180 backface-hidden"
            style={{ 
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 shadow-lg">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Answer</h3>
                <GraphAnswer
                  imagePath={graph.answerImage}
                  explanation={graph.explanation}
                  keyElements={graph.keyElements}
                />
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={handleFlip}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
                >
                  Back to Drawing
                </button>
                
                <button
                  onClick={() => handleStatusChange('mastered')}
                  className={`px-6 py-3 font-medium rounded-lg transition-colors ${
                    currentStatus === 'mastered'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-green-500 hover:bg-green-600'
                  } text-white`}
                >
                  ✓ Mark as Mastered
                </button>
                
                <button
                  onClick={() => handleStatusChange('needs-review')}
                  className={`px-6 py-3 font-medium rounded-lg transition-colors ${
                    currentStatus === 'needs-review'
                      ? 'bg-yellow-600 hover:bg-yellow-700'
                      : 'bg-yellow-500 hover:bg-yellow-600'
                  } text-white`}
                >
                  ⚠ Needs Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}