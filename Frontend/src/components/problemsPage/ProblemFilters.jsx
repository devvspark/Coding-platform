import React from 'react';
import SearchBar from '../shared/SearchBar';
import Dropdown from '../shared/Dropdown';
import TopicSelector from './TopicSelector';
import { RefreshCcw, List, LayoutGrid } from 'lucide-react';

const ViewToggleButton = ({
  mode,
  currentMode,
  label,
  icon,
  onViewModeChange
}) => (
  <button
    onClick={() => onViewModeChange(mode)}
    className={`p-2 rounded-lg transition-all duration-200 ${
      currentMode === mode
        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 text-white shadow-md shadow-blue-500/30 dark:shadow-blue-600/30'
        : 'bg-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-600 hover:text-slate-700 dark:hover:text-slate-200'
    }`}
    aria-label={`Switch to ${label} view`}
  >
    {icon}
  </button>
);


const ProblemFilters = ({
  viewMode,
  setViewMode,
  noProblems,
  topics,
  difficulties,
  statuses,
  searchTerm,
  selectedTopic,
  selectedDifficulty,
  selectedStatus,
  onSearchChange,
  onTopicChange,
  onDifficultyChange,
  onStatusChange,
  onResetFilters,
}) => {
  return (
    <div className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 hover:shadow-2xl">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-lg shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent">
            Filter & Sort{' '}
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 ml-1">
              {`(${noProblems})`}
            </span>
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onResetFilters}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 transform hover:scale-105"
            aria-label="Reset all filters"
          >
            <RefreshCcw size={16} />
            Reset
          </button>
          <div className="flex items-center p-1.5 gap-1 bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-600 shadow-sm">
            <ViewToggleButton
              mode="list"
              currentMode={viewMode}
              label="List"
              icon={<List size={20} />}
              onViewModeChange={setViewMode}
            />
            <ViewToggleButton
              mode="grid"
              currentMode={viewMode}
              label="Grid"
              icon={<LayoutGrid size={20} />}
              onViewModeChange={setViewMode}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-end">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            className="md:col-span-2"
            placeholder="Search by title..."
          />
          <Dropdown
            label="Difficulty"
            options={difficulties}
            selectedValue={selectedDifficulty}
            onSelect={(value) => onDifficultyChange(value)}
            className="w-full"
          />
          <Dropdown
            label="Status"
            options={statuses}
            selectedValue={selectedStatus}
            onSelect={(value) => onStatusChange(value)}
            className="w-full"
          />
          <TopicSelector
            label="Topic"
            topics={topics}
            selectedTopic={selectedTopic}
            onTopicChange={onTopicChange}
            className="md:col-span-4"
          />
        </div>
      </div>
    </div>
  );
};

export default ProblemFilters;
