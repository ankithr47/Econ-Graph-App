'use client';

import { useState } from 'react';
import Flashcard from '@/components/practice/Flashcard';
import graphsData from '@/data/graphs.json';

interface GraphData {
  id: number;
  title: string;
  question: string;
  answerImage: string;
  explanation: string;
  keyElements?: Array<{
    element: string;
    description: string;
  }>;
}

type CardStatus = 'mastered' | 'needs-review' | null;

export default function StudyPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Use lazy initializer to load from localStorage - this only runs once
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

  // Save statuses to localStorage whenever they change
  const handleStatusChange = (graphId: number, status: CardStatus) => {
    const newStatuses = { ...cardStatuses, [graphId]: status };
    setCardStatuses(newStatuses);
    localStorage.setItem('graphCardStatuses', JSON.stringify(newStatuses));
  };

  // ... rest of your code remains the same
} 
