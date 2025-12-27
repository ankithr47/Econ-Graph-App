'use client';

import Image from 'next/image';

interface KeyElement {
  element: string;
  description: string;
}

interface GraphAnswerProps {
  imagePath: string;
  explanation: string;
  keyElements?: KeyElement[];
}

export default function GraphAnswer({ 
  imagePath, 
  explanation, 
  keyElements 
}: GraphAnswerProps) {
  return (
    <div className="space-y-4">
      <div className="relative w-full h-auto border-2 border-gray-300 rounded-lg overflow-hidden bg-white">
        <Image
          src={imagePath}
          alt="Graph answer"
          width={800}
          height={600}
          className="w-full h-auto"
        />
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-lg mb-2 text-blue-900">Explanation</h3>
        <p className="text-gray-700">{explanation}</p>
      </div>

      {keyElements && keyElements.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-3 text-gray-900">Key Elements</h3>
          <ul className="space-y-2">
            {keyElements.map((item, index) => (
              <li key={index} className="border-l-4 border-blue-500 pl-3">
                <span className="font-medium text-gray-900">{item.element}:</span>
                <span className="text-gray-700 ml-2">{item.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}