import { useState, useMemo, useEffect } from 'react';
import {
  // ChevronUp,
  // ChevronDown,
  Star,
  ChevronLeft,
  ChevronRight,
  Crown,
  Trophy
} from 'lucide-react';
import  { PODIUM_COLORS, DIFFICULTY_COLORS } from '../utils/constants';
import { LoadingPage } from '../pages';
import axiosClient from '../config/axios';
import { mapUserProfile as mapUserInfo, generateMappedLeaderboard } from '../utils/heplerFunctions';


const ProblemDifficulty = {
  Basic: 'Basic',
  Easy: 'Easy',
  Medium: 'Medium',
  Hard: 'Hard',
};

const USERS_PER_PAGE = 10;

let myProfile = {};
let totalPages;

const LeaderboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState('rank');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLeaderboardUser, setSelectedLeaderboardUser] = useState(null);
  const [previewDifficultyFilter, setPreviewDifficultyFilter] = useState('All');
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {

    const fetchLeaderboardData = async () => {
      try {

        const [leaderboardData, usersCountData]  = await Promise.all([axiosClient.get("/profile/leaderboard"), axiosClient.get("/profile/users-count")]);
        totalPages = Math.ceil(usersCountData.data.totalUsers / USERS_PER_PAGE);
        myProfile = leaderboardData.data.user;
        myProfile.profileImageUrl = myProfile.profileImageUrl || "https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg";
        const leaderboard = generateMappedLeaderboard(leaderboardData.data.leaderboard, currentPage);
        setSelectedLeaderboardUser(mapUserInfo(myProfile));
        setLeaderboard(leaderboard);
        setLoading(false);

      } catch (error) {

        console.log(error);

      }
    }
    fetchLeaderboardData();
    
  }, []);

  const filteredPreviewProblems = useMemo(() => {
    if(!selectedLeaderboardUser) return null;
    
    const filteredProblems = [];
    const difficulty = previewDifficultyFilter;

    for(const problem of selectedLeaderboardUser.checkedProblems) {
      if(problem.isSolved && problem.pid) {
        if(difficulty === 'All')
          filteredProblems.push(problem); 
        else if(difficulty === problem.pid.difficulty)
          filteredProblems.push(problem);
      }
    }

    return filteredProblems;

  }, [previewDifficultyFilter, selectedLeaderboardUser])

  const handleNextPageButton = async () => {
    if(currentPage+1>totalPages)
      return;

    try {

        const { data } = await axiosClient.get(`/profile/leaderboard?page=${currentPage + 1}`);
        const leaderboard = generateMappedLeaderboard(data.leaderboard, currentPage+1);
        setCurrentPage(currentPage+1);
        setLeaderboard(leaderboard);

      } catch (error) {

        console.log(error);

      }
  }

  const handlePreviousPageButton = async () => {
    if(currentPage-1<1)
      return;
    
    try {

        const { data } = await axiosClient.get(`/profile/leaderboard?page=${currentPage - 1}`);
        const leaderboard = generateMappedLeaderboard(data.leaderboard, currentPage-1);
        setCurrentPage(currentPage-1);
        setLeaderboard(leaderboard);

      } catch (error) {

        console.log(error);

      }
  }

  const handleUserRowClick = async (user) => {
    if(user.id === selectedLeaderboardUser.id) return;

    if(user.id === myProfile._id) {
      const mappedUserProfile = mapUserInfo(myProfile);
      setSelectedLeaderboardUser(mappedUserProfile);
      return;
    }

    try {

      const {data: userProfile} = await axiosClient.get(`/profile/leaderboard/${user.id}`);
      userProfile.rank = user.rank;
      const mappedUserProfile = mapUserInfo(userProfile);  
      console.log(userProfile)
      setSelectedLeaderboardUser(mappedUserProfile);
      setPreviewDifficultyFilter('All');
    } catch (error) {

      console.log(error);

    }
  };



  const SortableHeader = ({ columnKey, title, className = "", textAlign = 'text-left' }) => (
    <th
      scope="col"
      className={`px-4 py-3 sm:px-6 ${textAlign} text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider transition-colors ${className}`}
      // onClick={() => handleSort(columnKey)}
      aria-sort={sortKey === columnKey ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
    >
      <div className={`flex items-center ${textAlign === 'text-center' ? 'justify-center' : textAlign === 'text-right' ? 'justify-end' : ''}`}>
        {title}
        {/* {sortKey === columnKey && (
          sortDirection === 'asc' ? <ChevronUp className="w-4 h-4 ml-1.5 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 ml-1.5 flex-shrink-0" />
        )} */}
      </div>
    </th>
  );
  
  const renderPagination = () => {
    if (totalPages <= 1) return null;
    return (
      <div className="px-6 py-5 sm:px-8 flex items-center justify-between border-t border-slate-200/80 dark:border-slate-700/60 bg-gradient-to-r from-slate-50/50 to-transparent dark:from-slate-800/30 dark:to-transparent">
        <button
          onClick={handlePreviousPageButton}
          disabled={currentPage === 1}
          className="px-4 py-2.5 text-sm font-semibold rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-slate-200 dark:border-slate-600 flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-600 shadow-sm">
          <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Page
          </span>
          <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 text-white rounded-lg font-bold text-sm">
            {currentPage}
          </span>
          <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            of {totalPages}
          </span>
        </div>
        <button
          onClick={handleNextPageButton}
          disabled={currentPage === totalPages}
          className="px-4 py-2.5 text-sm font-semibold rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-slate-200 dark:border-slate-600 flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
          aria-label="Next page"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  };

  const getPodiumIconAndColor = (rank) => {
    if (rank === 1) return { icon: <Crown className={`w-5 h-5 mr-1.5 ${PODIUM_COLORS.gold}`} />, colorClass: PODIUM_COLORS.gold };
    if (rank === 2) return { icon: <Trophy className={`w-4 h-4 mr-1.5 ${PODIUM_COLORS.silver}`} />, colorClass: PODIUM_COLORS.silver };
    if (rank === 3) return { icon: <Trophy className={`w-4 h-4 mr-1.5 ${PODIUM_COLORS.bronze}`} />, colorClass: PODIUM_COLORS.bronze };
    return { icon: null, colorClass: 'text-slate-700 dark:text-slate-200' };
  };

  const difficultyButtonClasses = (isActive) => 
    `px-2.5 py-1 text-xs font-medium rounded-md transition-colors focus:outline-none focus:ring-1 focus:ring-[#FF7F00] ${
      isActive 
        ? 'bg-[#FF7F00] text-white' 
        : 'bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-700 dark:text-slate-200'
    }`;

  if(loading) return <LoadingPage />

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-8 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column: Leaderboard Card */}
          <div className="flex-grow lg:w-2/3">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-2xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 flex flex-col overflow-hidden">
            
            <header className="px-6 py-6 sm:px-8 border-b border-slate-200/80 dark:border-slate-700/60 flex-shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-purple-500/10"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 bg-gradient-to-br from-yellow-400 to-yellow-600 dark:from-yellow-500 dark:to-yellow-700 rounded-xl shadow-lg shadow-yellow-500/25 dark:shadow-yellow-600/20">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent">Leaderboard</h1>
                </div>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 ml-14">See where you stand among the best coders on CodeMaster</p>
              </div>
            </header>

            {myProfile && (
              <div className="p-5 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 border-b border-slate-200/80 dark:border-slate-700/60 flex-shrink-0 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 bg-blue-500 dark:bg-blue-600 rounded-lg">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="text-base font-bold text-blue-600 dark:text-blue-400">Your Current Standing</h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
                    <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-3 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                      <div className="text-xs text-slate-600 dark:text-slate-400 mb-1 font-medium">Rank</div>
                      <div className={`text-xl font-bold ${getPodiumIconAndColor(myProfile.rank).colorClass} flex items-center gap-1`}>
                        {getPodiumIconAndColor(myProfile.rank).icon}
                        #{myProfile.rank}
                      </div>
                    </div>
                    <div className="flex items-center col-span-2 sm:col-span-1 min-w-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-3 border border-slate-200/50 dark:border-slate-700/50 shadow-sm gap-3">
                      <img className="h-10 w-10 rounded-full border-2 border-blue-500 dark:border-blue-400 object-cover flex-shrink-0 shadow-md" src={myProfile.profileImageUrl} alt={myProfile.username} />
                      <span className="font-semibold text-slate-800 dark:text-white truncate">{myProfile.username}</span>
                    </div>
                    <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-3 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                      <div className="text-xs text-slate-600 dark:text-slate-400 mb-1 font-medium">Points</div>
                      <div className="flex items-center text-slate-700 dark:text-slate-200">
                        <Star className="w-4 h-4 mr-1.5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                        <span className="text-lg font-bold">{myProfile.points?.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-3 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
                      <div className="text-xs text-slate-600 dark:text-slate-400 mb-1 font-medium">Solved</div>
                      <div className="text-lg font-bold text-slate-700 dark:text-slate-200">{myProfile.noSolvedProblems}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="overflow-y-auto flex-grow relative">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200/80 dark:divide-slate-700/50">
                  <thead className="bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-700/50 sticky top-0 z-20 backdrop-blur-md border-b-2 border-slate-200 dark:border-slate-700">
                    <tr>
                      <SortableHeader columnKey="rank" title="Rank" className="w-20 sm:w-24" textAlign="text-center" />
                      <th scope="col" className="px-4 py-4 sm:px-6 text-left text-xs font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider">User</th>
                      <SortableHeader columnKey="codingPoints" title="Coding Points" className="w-32 sm:w-36" textAlign="text-right"/>
                      <SortableHeader columnKey="problemsSolved" title="Problems Solved" className="w-32 sm:w-36" textAlign="text-right"/>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/50 dark:divide-slate-700/30 bg-white/50 dark:bg-slate-800/30">
                    {leaderboard.map((user, index) => {
                      const { icon: podiumIcon, colorClass: rankColorClass } = getPodiumIconAndColor(user.rank);
                      const isTopThree = user.rank <= 3;
                      const isCurrentUser = user.id === myProfile._id;
                      return (
                        <tr 
                          key={user.id} 
                          onClick={() => handleUserRowClick(user)}
                          className={`transition-all duration-200 cursor-pointer group ${
                            isCurrentUser 
                              ? 'bg-gradient-to-r from-orange-500/10 via-orange-500/5 to-transparent dark:from-orange-500/20 dark:via-orange-500/10 hover:from-orange-500/15 hover:via-orange-500/10 dark:hover:from-orange-500/25 dark:hover:via-orange-500/15 border-l-4 border-orange-500 dark:border-orange-400' 
                              : isTopThree
                              ? 'bg-gradient-to-r from-blue-50/50 to-transparent dark:from-blue-900/10 dark:to-transparent hover:from-blue-50 dark:hover:from-blue-900/20'
                              : 'hover:bg-slate-50/80 dark:hover:bg-slate-700/30'
                          } border-b border-slate-200/50 dark:border-slate-700/30 last:border-b-0`}
                          aria-current={isCurrentUser ? "page" : undefined}
                          tabIndex={0}
                          onKeyPress={(e) => e.key === 'Enter' && handleUserRowClick(user)}
                        >
                          <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-center">
                            <div className={`flex items-center justify-center ${isTopThree ? 'scale-110' : ''} transition-transform duration-200`}>
                              {podiumIcon}
                              <span className={`text-base font-bold ${rankColorClass} ${isTopThree ? 'text-lg' : ''}`}>
                                #{user.rank}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className={`relative ${isTopThree ? 'ring-2 ring-offset-2' : ''} ${user.rank === 1 ? 'ring-yellow-400 dark:ring-yellow-500' : user.rank === 2 ? 'ring-slate-400 dark:ring-slate-500' : user.rank === 3 ? 'ring-orange-400 dark:ring-orange-500' : 'ring-slate-200 dark:ring-slate-600'} rounded-full`}>
                                <img className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 ${isCurrentUser ? 'border-orange-500 dark:border-orange-400' : 'border-slate-200 dark:border-slate-600'} flex-shrink-0 object-cover shadow-md`} src={user.avatarUrl} alt={user.username} />
                                {isTopThree && (
                                  <div className={`absolute -bottom-1 -right-1 rounded-full ${user.rank === 1 ? 'bg-yellow-500' : user.rank === 2 ? 'bg-slate-400' : 'bg-orange-500'} p-1 border-2 border-white dark:border-slate-800`}>
                                    {podiumIcon && <div className="w-3 h-3"></div>}
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className={`cursor-pointer text-sm sm:text-base font-semibold truncate max-w-[120px] sm:max-w-[160px] ${
                                  selectedLeaderboardUser?.id === user.id && !isCurrentUser 
                                    ? 'text-blue-600 dark:text-blue-400' 
                                    : isCurrentUser
                                    ? 'text-orange-600 dark:text-orange-400'
                                    : 'text-slate-900 dark:text-white'
                                } group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors`}>
                                  {user.username}
                                </div>
                                {isCurrentUser && 
                                  <span className="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 text-white px-2 py-0.5 rounded-full text-xs font-bold mt-1 inline-block shadow-sm">You</span>
                                }
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm sm:text-base text-slate-700 dark:text-slate-200 text-right">
                            <div className="flex items-center justify-end gap-1.5 font-semibold">
                              <Star className="w-4 h-4 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                              <span className="tabular-nums">{user.codingPoints.toLocaleString()}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 sm:px-6 whitespace-nowrap text-sm sm:text-base text-slate-700 dark:text-slate-200 text-right font-semibold tabular-nums">
                            {user.problemsSolved.toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                 {leaderboard.length === 0 && (
                    <div className="text-center py-16">
                      <Trophy className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                      <p className="text-lg font-medium text-slate-500 dark:text-slate-400">The leaderboard is currently empty.</p>
                      <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">Be the first to solve problems and claim the top spot!</p>
                    </div>
                )}
                {/* {paginatedUsersToDisplay.length === 0 && leaderboard && (
                    <p className="text-center py-12 text-slate-500 dark:text-slate-400">No other users match the current criteria or page.</p>
                )} */}
              </div>
            </div>
            
            <div className="flex-shrink-0">
                {renderPagination()}
            </div>
          </div>
        </div>

        {/* Right Column: User Profile Preview Panel (Sticky) */}
        {selectedLeaderboardUser && (
          <div className="lg:w-1/3">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-2xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 sticky top-24 overflow-y-auto max-h-[calc(100vh-6rem)]">
              {(() => {
                const details = selectedLeaderboardUser;
                const { colorClass: userRankColor, icon: userPodiumIcon } = getPodiumIconAndColor(details.rank);
                const isTopThree = details.rank <= 3;
                const isCurrentUser = selectedLeaderboardUser.id === myProfile._id;
                return (
                  <div className="space-y-6">
                    <div className="flex flex-col items-center pt-2 relative">
                      <div className={`absolute -top-2 -right-2 ${isTopThree ? 'block' : 'hidden'}`}>
                        {userPodiumIcon && <div className="scale-150">{userPodiumIcon}</div>}
                      </div>
                      <div className={`relative ${isTopThree ? 'ring-4 ring-offset-4 ring-offset-white dark:ring-offset-slate-800' : 'ring-2 ring-offset-2'} ${details.rank === 1 ? 'ring-yellow-400 dark:ring-yellow-500' : details.rank === 2 ? 'ring-slate-400 dark:ring-slate-500' : details.rank === 3 ? 'ring-orange-400 dark:ring-orange-500' : 'ring-blue-400 dark:ring-blue-500'} rounded-full mb-4`}>
                        <img src={details.avatarUrl} alt={details.username} className={`w-24 h-24 rounded-full border-4 ${isCurrentUser ? 'border-orange-500 dark:border-orange-400' : 'border-blue-500 dark:border-blue-400'} shadow-xl object-cover`} />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-white text-center mb-2">{details.username}</h3>
                      {isCurrentUser && 
                        <span className="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 text-white px-3 py-1 rounded-full text-xs font-bold mt-1 shadow-md">
                          This is you
                        </span>
                      }
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700/60 dark:to-slate-800/60 p-4 rounded-xl text-center border border-slate-200/50 dark:border-slate-700/50 shadow-md hover:shadow-lg transition-shadow duration-200">
                            <div className="flex items-center justify-center mb-2">
                                <Trophy className={`w-5 h-5 mr-1.5 ${userRankColor}`} />
                                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Rank</span>
                            </div>
                            <p className={`font-bold text-2xl ${userRankColor}`}>#{details.rank}</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl text-center border border-blue-200/50 dark:border-blue-700/50 shadow-md hover:shadow-lg transition-shadow duration-200">
                            <div className="flex items-center justify-center mb-2">
                                <Star className="w-5 h-5 mr-1.5 text-blue-500 dark:text-blue-400 fill-current" />
                                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Points</span>
                            </div>
                            <p className="font-bold text-2xl text-blue-600 dark:text-blue-400">{details.codingPoints.toLocaleString()}</p>
                        </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold mb-3 text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                        Solved Statistics
                      </h4>
                      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700/60 dark:to-slate-800/60 rounded-xl p-4 border border-slate-200/50 dark:border-slate-700/50 shadow-md space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-600">
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Total Solved</span>
                          <span className="text-sm font-bold text-slate-900 dark:text-white">{details.solvedStats.total.toLocaleString()} <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">/ {details.solvedStats.totalOverall.toLocaleString()}</span></span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">Easy</span>
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{details.solvedStats.easy.toLocaleString()} <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">({details.solvedStats.totalEasy.toLocaleString()})</span></span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Medium</span>
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{details.solvedStats.medium.toLocaleString()} <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">({details.solvedStats.totalMedium.toLocaleString()})</span></span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-red-600 dark:text-red-400">Hard</span>
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{details.solvedStats.hard.toLocaleString()} <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">({details.solvedStats.totalHard.toLocaleString()})</span></span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
                        <Star className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                        Recent Solved Problems
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {['All', ...Object.values(ProblemDifficulty)].map(diff => (
                          <button
                            key={diff}
                            onClick={() => setPreviewDifficultyFilter(diff)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 ${
                              previewDifficultyFilter === diff
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white shadow-md'
                                : 'bg-slate-100 dark:bg-slate-500 text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600'
                            }`}
                            aria-pressed={previewDifficultyFilter === diff}
                          >
                            {diff}
                          </button>
                        ))}
                      </div>
                      <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar dark-scrollbar"> 
                        {filteredPreviewProblems && filteredPreviewProblems.length > 0 ? (
                          <ul className="space-y-3">
                            {filteredPreviewProblems.map(p => (
                              p.pid && (
                                <li key={p.pid._id} className="text-sm p-3 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-800/50 rounded-lg border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-shadow duration-200">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold text-slate-800 dark:text-slate-100 truncate pr-2 flex-1">{p.pid.title}</span>
                                    <span className={`px-2.5 py-1 inline-flex text-xs font-bold rounded-full flex-shrink-0 ${DIFFICULTY_COLORS[p.pid.difficulty]}`}>
                                      {p.pid.difficulty}
                                    </span>
                                  </div>
                                   <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                     <span>✓</span>
                                     <span>Solved: {new Date(p.submitDate).toLocaleDateString()}</span>
                                   </div>
                                </li>
                              )
                            ))}
                          </ul>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                              No {previewDifficultyFilter !== 'All' ? previewDifficultyFilter.toLowerCase() : ''} problems solved recently.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default LeaderboardPage;
