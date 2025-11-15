import React, { useState } from 'react';
import { courses } from '../utils/constants';
import CourseCard from '../components/coursePage/CourseCard';
import { BookOpenIcon, InformationCircleIcon } from '../components/Icons/CoursesPageIcons';

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' ||
                          (filterType === 'free' && course.isFree) ||
                          (filterType === 'paid' && !course.isFree);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-8 md:py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header Section */}
        <header className="mb-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-2xl shadow-lg shadow-blue-500/25 dark:shadow-blue-600/20 transform hover:scale-105 transition-transform duration-300">
              <BookOpenIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent mb-4">
              Explore Our Courses
            </h1>
            <p className="mt-3 text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Expand your knowledge and skills with our curated collection of coding courses
            </p>
            <div className="mt-6 flex items-center justify-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <span className="px-3 py-1 bg-white/50 dark:bg-slate-800/50 rounded-full backdrop-blur-sm">
                {courses.length} Courses Available
              </span>
            </div>
          </div>
        </header>

        {/* Enhanced Filters and Search */}
        <div className="mb-10 p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 flex flex-col md:flex-row items-center gap-4 transition-all duration-300 hover:shadow-2xl hover:border-blue-300/50 dark:hover:border-blue-600/50">
          <div className="relative flex-grow w-full md:w-auto">
            <input
              type="text"
              placeholder="Search courses by title or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 border-2 border-slate-200 dark:border-slate-600 rounded-xl py-3 px-5 pr-12 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-500 transition-all duration-200 shadow-sm dark:shadow-slate-900/50"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="flex space-x-2 flex-shrink-0">
            {(['all', 'free', 'paid']).map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                  filterType === type
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 text-white shadow-lg shadow-blue-500/30 dark:shadow-blue-600/30'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)} Courses
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid with enhanced styling */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredCourses.map((course, index) => (
              <div 
                key={course.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 dark:from-blue-500/10 dark:to-indigo-600/10 rounded-2xl">
              <InformationCircleIcon className="w-12 h-12 text-blue-500 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-3">No Courses Found</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-2 max-w-md mx-auto">
              We couldn't find any courses matching your current search "{searchTerm}" and filter "{filterType}".
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mt-4">
              Try adjusting your search terms or broadening your filters.
            </p>
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default CoursesPage;
