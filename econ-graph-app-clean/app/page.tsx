import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Economics Graph Revision
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Practice drawing and understanding economics graphs
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/study/practice"
            className="block p-8 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Practice Mode
            </h2>
            <p className="text-gray-600">
              Draw graphs on flashcards and check your answers
            </p>
          </Link>
          
          <Link
            href="/study/learn"
            className="block p-8 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Study Mode
            </h2>
            <p className="text-gray-600">
              Interactive step-by-step graph explanations
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
