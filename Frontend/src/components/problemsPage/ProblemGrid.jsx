import React from 'react';
import ProblemsPageCard from './ProblemsPageCard';

const ProblemGrid = ({ problems, isLoading }) => {
  if (isLoading) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 hover:text-[#3b82f6] dark:hover:text-[#3b82f6] mx-auto"></div>
        <p className="mt-4 text-[#475569] dark:text-[#9ca3af]">Loading problems...</p>
      </div>
    );
  }

  if (problems.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50">
        <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 dark:from-blue-500/10 dark:to-indigo-600/10 rounded-2xl">
          <svg
            className="h-12 w-12 text-blue-500 dark:text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
          No Problems Found
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {problems.map((problem, index) => (
        <div 
          key={problem._id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <ProblemsPageCard
            problem={problem}
          />
        </div>
      ))}
    </div>
  );
};

export default ProblemGrid;
