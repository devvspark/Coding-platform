import React from 'react';
import ProblemItem from './ProblemItem'; // you can keep .jsx or omit extension

const ProblemList = ({ problems, isLoading }) => {
  if (isLoading) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 dark:border-blue-400 mx-auto"></div>
        <p className="mt-4 text-slate-600 dark:text-gray-400">Loading problems...</p>
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
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-xl rounded-2xl overflow-x-auto border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
      <table className="min-w-full divide-y divide-slate-200/50 dark:divide-slate-700/30">
        <thead className="bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-700/50 backdrop-blur-sm sticky top-0 z-10 border-b-2 border-slate-200 dark:border-slate-700">
          <tr>
            <th
              scope="col"
              className="px-5 py-4 text-center text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider w-1/12"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-5 py-4 text-left text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider w-[5%]"
            >
              No.
            </th>
            <th
              scope="col"
              className="px-5 py-4 text-left text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider w-2/5"
            >
              Title
            </th>
            <th
              scope="col"
              className="px-5 py-4 text-left text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider"
            >
              Difficulty
            </th>
            <th
              scope="col"
              className="px-5 py-4 text-left text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider w-2/5"
            >
              Topics
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200/50 dark:divide-slate-700/30 bg-white/50 dark:bg-slate-800/30">
          {problems.map((problem) => (
            <ProblemItem key={problem._id} problem={problem} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemList;

