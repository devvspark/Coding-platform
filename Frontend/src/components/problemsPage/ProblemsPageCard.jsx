import React from 'react';
import { Icon } from '../../components';
import { useNavigate } from 'react-router';

const ProblemsPageCard = ({ problem }) => {
  const navigate = useNavigate();

  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'Medium':
        return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
      case 'Hard':
        return 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Solved':
        return (
          <Icon
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            pathProps={{ fillRule: 'evenodd', clipRule: 'evenodd' }}
            className="w-5 h-5 text-green-500"
            viewBox="0 0 20 20"
            isOutline={false}
            svgProps={{ 'aria-label': 'Solved' }}
          />
        );
      case 'Attempted':
        return (
          <Icon
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z"
            pathProps={{ fillRule: 'evenodd', clipRule: 'evenodd' }}
            className="w-5 h-5 text-blue-500"
            viewBox="0 0 20 20"
            isOutline={false}
            svgProps={{ 'aria-label': 'Attempted' }}
          />
        );
      case 'Todo':
      default:
        return (
          <Icon
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm-4-8a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z"
            pathProps={{ fillRule: 'evenodd', clipRule: 'evenodd' }}
            className="w-5 h-5 text-slate-400 dark:text-gray-500"
            viewBox="0 0 20 20"
            isOutline={false}
            svgProps={{ 'aria-label': 'To Do' }}
          />
        );
    }
  };

  return (
    <div onClick={() => navigate(problem._id)} className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg dark:shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6 flex flex-col h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer overflow-hidden">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:via-indigo-500/5 group-hover:to-purple-500/5 dark:group-hover:from-blue-500/10 dark:group-hover:via-indigo-500/10 dark:group-hover:to-purple-500/10 transition-all duration-300 pointer-events-none z-0"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <span className="font-bold text-slate-500 dark:text-slate-400 text-sm tabular-nums">{`#${problem.problemNo}`}</span>
          <div className="flex items-center space-x-2">
            <div title={problem.status || 'To Do'} className="p-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg">
              {getStatusIcon(problem.status)}
            </div>
          </div>
        </div>
        <div className="flex-grow mb-4">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 mb-3 line-clamp-2">
            {problem.title}
          </h3>
        </div>
        <div className="flex-shrink-0 space-y-3">
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
          <div className={`text-sm font-bold px-4 py-2 rounded-xl text-center border-2 ${getDifficultyClass(
            problem.difficulty
          )} shadow-sm`}>
            {problem.difficulty}
          </div>
        </div>
      </div>

      {/* Hover effect indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );
};

export default ProblemsPageCard;
