import React from 'react';
import { Icon } from "..";
import { useNavigate } from "react-router";

const ProblemItem = ({ problem }) => {
  const navigate = useNavigate();

  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600 dark:text-green-400'; // green-600 / green-400
      case 'Medium':
        return 'text-yellow-600 dark:text-yellow-400'; // yellow-600 / yellow-400
      case 'Hard':
        return 'text-red-600 dark:text-red-400'; // red-600 / red-400
      default:
        return 'text-slate-500 dark:text-slate-400'; // gray-400
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Solved':
        return (
          <Icon
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            pathProps={{ fillRule: "evenodd", clipRule: "evenodd" }}
            className="w-5 h-5 text-[#16a34a] dark:text-[#22c55e]" // green-600 / green-500
            viewBox="0 0 20 20"
            isOutline={false}
            svgProps={{ "aria-label": "Solved" }}
          />
        );
      case 'Attempted':
        return (
          <Icon
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z"
            pathProps={{ fillRule: "evenodd", clipRule: "evenodd" }}
            className="w-5 h-5 text-yellow-600 dark:text-yellow-500" // yellow-600 / yellow-500
            viewBox="0 0 20 20"
            isOutline={false}
            svgProps={{ "aria-label": "Attempted" }}
          />
        );
      case 'Todo':
      default:
        return (
          <Icon
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm-4-8a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z"
            pathProps={{ fillRule: "evenodd", clipRule: "evenodd" }}
            className="w-5 h-5 text-[#94a3b8] dark:text-[#6b7280]" // slate-400 / gray-500
            viewBox="0 0 20 20"
            isOutline={false}
            svgProps={{ "aria-label": "To Do" }}
          />
        );
    }
  };

  return (
    <tr className="bg-white/50 dark:bg-slate-800/30 hover:bg-blue-50/50 dark:hover:bg-slate-700/30 border-b border-slate-200/50 dark:border-slate-700/30 last:border-b-0 transition-all duration-200 group">
      <td
        className="px-5 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400 w-1/12"
        title={problem.status || 'To Do'}
      >
        <div className="flex justify-center">
          {getStatusIcon(problem.status)}
        </div>
      </td>
      <td className="px-5 py-4 text-base font-semibold text-slate-600 dark:text-slate-300 tabular-nums">
        {problem.problemNo}.
      </td>
      <td className="px-5 py-4 whitespace-nowrap">
        <div
          className="text-base font-semibold text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer truncate max-w-[300px] transition-colors duration-200"
          onClick={() => navigate(problem._id)}
        >
          {problem.title}
        </div>
      </td>
      <td
        className={`px-5 py-4 whitespace-nowrap`}
      >
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyClass(
          problem.difficulty
        )} ${problem.difficulty === 'Easy' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : problem.difficulty === 'Medium' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}`}>
          {problem.difficulty}
        </span>
      </td>
      <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
        <div className="flex flex-wrap gap-2">
          {problem.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 shadow-sm"
            >
              {tag}
            </span>
          ))}
          {problem.tags.length > 2 && (
            <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-500 shadow-sm">
              +{problem.tags.length - 2}
            </span>
          )}
        </div>
      </td>
      {/* <td className="px-5 py-4 whitespace-nowrap text-left text-sm font-medium w-1/6">
        <button
          type="button"
          className="font-semibold py-1 px-3 rounded-md border transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50
                     text-[#3B82F6] hover:text-[#2563EB] border-[#3B82F6] hover:border-[#2563EB] hover:bg-[#fff7ed] dark:text-[#3B82F6] dark:hover:text-[#60A5FA] dark:border-[#3B82F6] dark:hover:border-[#60A5FA] dark:hover:bg-[#3B82F6]/10
                     focus:ring-[#3B82F6] dark:focus:ring-[#60A5FA]"
          aria-label={`View problem: ${problem.title}`}
          onClick={() => navigate(`/problems/${problem.id}`)}
        >
          View Problem
        </button>
      </td> */}
    </tr>
  );
};

export default ProblemItem;
