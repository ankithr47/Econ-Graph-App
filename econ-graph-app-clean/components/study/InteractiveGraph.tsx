'use client';

import { useState } from 'react';
import Image from 'next/image';

interface StudyStep {
  step: number;
  action: 'draw' | 'highlight' | 'overlay';
  type: 'line' | 'curve' | 'point' | 'area';
  path?: string;  // SVG path
  image?: string; // Overlay image
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

interface InteractiveGraphProps {
  graphId: number;
  title: string;
  studyData: StudyData;
}

export default function InteractiveGraph({ 
  graphId, 
  title, 
  studyData 
}: InteractiveGraphProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleNext = () => {
    if (currentStep < studyData.steps.length) {
      setCurrentStep(currentStep + 1);
      setCompletedSteps([...completedSteps, currentStep]);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
  };

  const currentStepData = studyData.steps[currentStep - 1];
  const visibleSteps = studyData.steps.slice(0, currentStep);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      
      {/* Graph Container with SVG overlay */}
      <div className="relative border-2 border-gray-300 rounded-lg bg-white">
        <Image
          src={studyData.baseImage}
          alt="Graph base"
          width={800}
          height={600}
          className="w-full h-auto"
        />
        
        {/* SVG overlay for drawing progressive lines */}
        <svg 
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid meet"
        >
          {visibleSteps.map((step, index) => {
            if (step.action === 'draw' && step.path) {
              return (
                <path
                  key={index}
                  d={step.path}
                  stroke={step.strokeColor || '#2563eb'}
                  strokeWidth={step.strokeWidth || 2}
                  fill="none"
                  className="animate-draw"
                />
              );
            }
            // Add other rendering logic for points, areas, etc.
            return null;
          })}
        </svg>
      </div>

      {/* Commentary/Explanation Area */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        {currentStepData ? (
          <>
            <h3 className="font-semibold text-lg mb-2 text-blue-900">
              {currentStepData.label}
            </h3>
            <p className="text-gray-700">{currentStepData.explanation}</p>
          </>
        ) : (
          <p className="text-gray-600">Click Next Step to begin building the graph</p>
        )}
      </div>

      {/* Controls */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={handleNext}
          disabled={currentStep >= studyData.steps.length}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {currentStep === 0 ? 'Start' : 'Next Step'}
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
}