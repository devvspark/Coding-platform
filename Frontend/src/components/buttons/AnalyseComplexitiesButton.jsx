import { Sparkles } from 'lucide-react';

const AnalyseComplexityButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group flex items-center p-3 rounded-full bg-gradient-to-r from-blue-300 via-blue-500 to-blue-900 text-white font-medium transition-all duration-300 overflow-hidden shadow-md hover:pr-5"
    >
      <Sparkles />
      <span
        className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 ml-2 transition-all duration-300 ease-out whitespace-nowrap"
      >
        Calculate Complexity
      </span>
    </button>
  );
};

export default AnalyseComplexityButton;


