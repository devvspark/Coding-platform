import React from 'react';
import { Link } from 'react-router';
import { APP_ROUTES } from '../../utils/constants';
import { StarIcon, ClockIcon, AcademicCapIcon, LevelEasyIcon, LevelIntermediateIcon, LevelAdvancedIcon } from '../Icons/CoursesPageIcons';


const DifficultyIcon = ({ difficulty }) => {
  switch (difficulty) {
    case "Beginner":
      return <LevelEasyIcon className="w-5 h-5 text-green-500 dark:text-green-400" />;
    case "Intermediate":
      return <LevelIntermediateIcon className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />;
    case "Advanced":
    case "Expert":
      return <LevelAdvancedIcon className="w-5 h-5 text-red-500 dark:text-red-400" />;
    default:
      return null;
  }
};


const CourseCard = ({ course }) => {
  const courseUrl = APP_ROUTES.courseOverview.replace(':courseId', course.id);

  return (
    <Link
      to={courseUrl}
      className="block group relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-xl hover:shadow-2xl dark:hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200/50 dark:border-slate-700/50 hover:border-blue-400/50 dark:hover:border-blue-500/50 transform hover:-translate-y-2"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:via-indigo-500/5 group-hover:to-purple-500/5 dark:group-hover:from-blue-500/10 dark:group-hover:via-indigo-500/10 dark:group-hover:to-purple-500/10 transition-all duration-500 pointer-events-none z-0"></div>
      
      {/* Image Container */}
      <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent dark:from-black/40 z-10"></div>
        <img 
          src={course.url} 
          alt={course.title} 
          className="w-full h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-700 ease-out relative z-0" 
        />
        
        {/* Badge */}
        {course.isFree ? (
          <span className="absolute top-4 right-4 z-20 bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-green-500/30 dark:shadow-green-600/30 backdrop-blur-sm border border-white/20">
            FREE
          </span>
        ) : (
          <span className="absolute top-4 right-4 z-20 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-blue-500/30 dark:shadow-blue-600/30 backdrop-blur-sm border border-white/20">
            ${course.price?.toFixed(2) || '0.00'}
          </span>
        )}

        {/* Category Badge */}
        {course.category && course.category.slice(0, 1).map(cat => (
          <span 
            key={cat} 
            className="absolute top-4 left-4 z-20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border border-blue-200/50 dark:border-blue-700/50 shadow-md"
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 relative z-10">
        {/* Rating */}
        {course.rating && (
          <div className="flex items-center justify-end mb-3">
            <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2.5 py-1 rounded-full">
              <StarIcon className="w-4 h-4 text-yellow-500 dark:text-yellow-400 fill-current" />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{course.rating.toFixed(1)}</span>
            </div>
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2 leading-tight">
          {course.title}
        </h3>

        {/* Tagline */}
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed min-h-[2.5rem]">
          {course.tagline || course.description || 'Explore this comprehensive course to enhance your skills.'}
        </p>

        {/* Footer Info */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200/80 dark:border-slate-700/80">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
            <div className="p-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <AcademicCapIcon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            </div>
            <span className="text-slate-700 dark:text-slate-300">{course.difficulty || 'All Levels'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400">
            <ClockIcon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span className="text-slate-700 dark:text-slate-300">{course.itemCount || 0} lectures</span>
          </div>
        </div>

        {/* Hover Effect Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </div>
    </Link>
  );
};

export default CourseCard;
