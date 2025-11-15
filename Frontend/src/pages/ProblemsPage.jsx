import { useState, useEffect, useMemo, useRef } from 'react';
import { topicsData, statuses, difficulties } from '../utils/constants';
import { ProblemFilters, ProblemList, Navbar, Footer, UserStats, SprintsQuickAccess, ProblemGrid, UserProblemsQuickAccess } from '../components';
import axiosClient from "../config/axios";
import { useParams, Outlet } from 'react-router';
import { mapAllProblems, generateDifficultyOptionsWithCounts, generateStatusOptionsWithCounts, generateTopicOptionsWithCounts } from "../utils/heplerFunctions";
import LoadingPage from './LoadingPage';

const ProblemsPage = ({ darkTheme, handleThemeChange }) => {
  const [allProblems, setAllProblems] = useState([]);
  const [userSprints, setUserSprints] = useState([]);
  const [userProblems, setUserProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { problemId } = useParams();
  const [viewMode, setViewMode] = useState('list'); // list or grid
  const [topicDropdownOptions, setTopicDropdownOptions] = useState([]);
  const [difficultyDropdownOptions, setDifficultyDropdownOptions] = useState([]);
  const [statusDropdownOptions, setStatusDropdownOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All Tags');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Difficulties');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');

  // lazy loading states
  const [visibleCount, setVisibleCount] = useState(10);
  const [isLazyLoading, setIsLazyLoading] = useState(false);
  const loaderRef = useRef(null);

  const userStats = useMemo(() => {
    const total = allProblems.length;
    const solved = allProblems.filter((p) => p.status === 'Solved').length;
    const attempted = allProblems.filter((p) => p.status === 'Attempted').length;

    const solvedByDifficulty = {
      Easy: allProblems.filter((p) => p.status === 'Solved' && p.difficulty === 'Easy').length,
      Medium: allProblems.filter((p) => p.status === 'Solved' && p.difficulty === 'Medium').length,
      Hard: allProblems.filter((p) => p.status === 'Solved' && p.difficulty === 'Hard').length,
    };

    const totalByDifficulty = {
      Easy: allProblems.filter((p) => p.difficulty === 'Easy').length,
      Medium: allProblems.filter((p) => p.difficulty === 'Medium').length,
      Hard: allProblems.filter((p) => p.difficulty === 'Hard').length,
    };

    return { total, solved, attempted, solvedByDifficulty, totalByDifficulty };
  }, [allProblems]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [{data: problems}, userData] = await Promise.all([
          axiosClient.get("/problems"),
          axiosClient.get("profile/checked-problems")
        ]);
        const userCheckedProblems = userData.data.checkedProblems;   
        const allMappedProblems = mapAllProblems(problems, userCheckedProblems);
        setAllProblems(allMappedProblems);
        setUserSprints(userData.data.bookmarks);
        setUserProblems(userData.data.userProblems);
        setTopicDropdownOptions(generateTopicOptionsWithCounts(allMappedProblems, topicsData));
        setDifficultyDropdownOptions(generateDifficultyOptionsWithCounts(allMappedProblems, difficulties));
        setStatusDropdownOptions(generateStatusOptionsWithCounts(allMappedProblems, statuses));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    loadInitialData();
  }, []);

  const filteredProblems = useMemo(() => {
    let problems = allProblems;

    if (searchTerm) {
      problems = problems.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTopic !== 'All Tags') {
      problems = problems.filter((p) => p.tags.includes(selectedTopic));
    }

    if (selectedDifficulty !== 'All Difficulties') {
      problems = problems.filter((p) => p.difficulty === selectedDifficulty);
    }

    if (selectedStatus !== "All Statuses") {
      problems = problems.filter((p) => p.status === selectedStatus);
    }

    return problems;
  }, [isLoading, searchTerm, selectedTopic, selectedDifficulty, selectedStatus, allProblems]);

  const handleResetFilters = () => {
    if(searchTerm !== '') setSearchTerm('');
    if(selectedDifficulty !== 'All Difficulties') setSelectedDifficulty('All Difficulties');
    if(selectedStatus !== 'All Statuses') setSelectedStatus('All Statuses');
    if(selectedTopic !== 'All Tags') setSelectedTopic('All Tags');
  };

  // load more function
  const loadMoreProblems = () => {
    if (isLazyLoading) return;
    if (visibleCount >= filteredProblems.length) return;

    setIsLazyLoading(true);
    // Simulate async delay
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 5, filteredProblems.length));
      setIsLazyLoading(false);
    }, 800);
  };

  // intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          loadMoreProblems();
        }
      },
      { root: null, rootMargin: '0px', threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loaderRef, filteredProblems]);

  if(isLoading) return <LoadingPage />

  if(!problemId)
    return (
      <>
        <Navbar darkTheme={darkTheme} handleThemeChange={handleThemeChange} />

        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            {/* HEADER */}
            <header className="mb-12 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-96 h-96 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-xl shadow-lg shadow-blue-500/25 dark:shadow-blue-600/20">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent">
                    Your Coding Journey
                  </h1>
                </div>
                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl ml-14 leading-relaxed">
                  You've conquered <span className="font-bold text-blue-600 dark:text-blue-400">{userStats.solved}</span> challenges. Keep the momentum! 🚀
                </p>
              </div>
            </header>

            {/* MAIN CONTENT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
              {/* LEFT CONTENT */}
              <div className="lg:col-span-8 xl:col-span-9 space-y-6 md:space-y-8">
              <ProblemFilters
                viewMode={viewMode}
                setViewMode={setViewMode}
                noProblems={filteredProblems.length}
                topics={topicDropdownOptions}
                difficulties={difficultyDropdownOptions}
                statuses={statusDropdownOptions}
                searchTerm={searchTerm}
                selectedTopic={selectedTopic}
                selectedDifficulty={selectedDifficulty}
                selectedStatus={selectedStatus}
                onSearchChange={setSearchTerm}
                onTopicChange={setSelectedTopic}
                onDifficultyChange={setSelectedDifficulty}
                onStatusChange={setSelectedStatus}
                onResetFilters={handleResetFilters}
              />
              
              {viewMode === 'list'
                ? <ProblemList problems={filteredProblems.slice(0, visibleCount)} isLoading={isLoading && filteredProblems.length === 0} />
                : <ProblemGrid problems={filteredProblems.slice(0, visibleCount)} isLoading={isLoading && filteredProblems.length === 0} />
              }

              {visibleCount < filteredProblems.length && (
                <div ref={loaderRef} className="h-24 flex justify-center items-center">
                  {isLazyLoading && (
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 dark:border-blue-400"></div>
                  )}
                </div>
              )}
            </div>

              {/* RIGHT SIDEBAR */}
              <aside className="lg:col-span-4 xl:col-span-3 space-y-6 md:space-y-8">
              {!isLoading && (
                <>
                  <UserStats 
                    stats={userStats} 
                    onDifficultyChange={setSelectedDifficulty}
                    onStatusChange={setSelectedStatus}
                  />
                  <SprintsQuickAccess sprints={userSprints} />
                  <UserProblemsQuickAccess userProblems={userProblems} />
                </>
              )}
              </aside>
            </div>
          </div>
        </main>

        <Footer />
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
      </>
    );

  return (
    <Outlet context={{ problems: allProblems, setProblems: setAllProblems }}/>
  );
};

export default ProblemsPage;





