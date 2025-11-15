// import React, { useState } from 'react';
// import { useNavigate, useOutletContext } from 'react-router';
// import { Edit, Trash2, PlusCircle } from 'lucide-react';
// import ConfirmationModal from './ConfirmationModal';
// import { useEffect } from 'react';

// const DifficultyBadge = ({ difficulty }) => {
//   const colorClasses = {
//     Basic: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
//     Easy: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
//     Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
//     Hard: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
//   };

//   return (
//     <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${colorClasses[difficulty]}`}>
//       {difficulty}
//     </span>
//   );
// };

// const VideoSolutionManager = () => {
//   const navigate = useNavigate();
//   const { data } = useOutletContext();
//   const [problems, setProblems] = useState([]);
//   const [problemsWithVideoSolutions, setproblemsWithVideoSolutions] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [problemToDelete, setProblemToDelete] = useState(null);
//   const [selectedOption, setSelectedOption] = useState("add");

//   useEffect(() => {
//     const problemHasSoln = {}
//     for(const soln of data.videoSolutions) {
//       problemHasSoln[soln.problem._id] = true;
//     }

//     const filteredProblems = data.problems.filter((p) => !problemHasSoln[p._id]);

//     setProblems(filteredProblems);
//     setproblemsWithVideoSolutions(data.videoSolutions);
//   },[])

//   const openDeleteModal = (problemId) => {
//     setProblemToDelete(problemId);
//     setIsModalOpen(true);
//   };

//   const closeDeleteModal = () => {
//     setProblemToDelete(null);
//     setIsModalOpen(false);
//   };

//   const handleDeleteProblem = () => {
//     if (!problemToDelete) return;
//     setProblems(problems.filter((p) => p.id !== problemToDelete));
//     closeDeleteModal();
//   };

//   return (
//     <>
//       <div className="bg-[#FFFFFF] dark:bg-[#1E293B] p-6 rounded-xl border border-[#E2E8F0] dark:border-[#334155] shadow-md">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">Video Solutions</h2>
//           <div
//             className="
//               relative flex w-full max-w-sm rounded-lg p-1
//               bg-gray-100 border border-gray-300
//               dark:bg-gray-800 dark:border-gray-700
//             "
//           >
//             {/* Sliding indicator */}
//             <div
//               className={`
//                 absolute top-1 bottom-1 w-[48%] rounded-lg transition-all duration-300  bg-blue-500
//                 ${selectedOption === "add"
//                   ? "left-1"
//                   : "left-[51%]"}
//               `}
//             ></div>

//             {/* Add button */}
//             <button
//               onClick={() => setSelectedOption("add")}
//               className={`
//                 z-10 flex-1 py-2 text-sm font-semibold rounded-lg transition-colors duration-300
//                 ${selectedOption === "add"
//                   ? "text-white"
//                   : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"}
//               `}
//             >
//               Add Solution
//             </button>

//             {/* Delete button */}
//             <button
//               onClick={() => setSelectedOption("delete")}
//               className={`
//                 z-10 flex-1 py-2 text-sm font-semibold rounded-lg transition-colors duration-300
//                 ${selectedOption === "delete"
//                   ? "text-white"
//                   : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"}
//               `}
//             >
//               Delete Solution
//             </button>
//           </div>
//         </div> 
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm text-left">
//             <thead className="text-xs uppercase bg-[#F1F5F9] dark:bg-[#0F172A] text-[#64748B] dark:text-[#94A3B8] tracking-wider">
//               <tr>
//                 <th className="px-6 py-4 font-semibold">Title</th>
//                 <th className="px-6 py-4 font-semibold">Difficulty</th>
//                 <th className="px-6 py-4 font-semibold">Tags</th>
//                 <th className="px-6 py-4 font-semibold">Created At</th>
//                 <th className="px-6 py-4 font-semibold text-right">Actions</th>
//               </tr>
//             </thead>
//             {selectedOption === "add" &&
//               <tbody>
//                 {problems.map((problem) => (
//                   <tr
//                     key={problem._id}
//                     className="border-b border-[#E2E8F0] dark:border-[#334155] hover:bg-[#F1F5F9] dark:hover:bg-[#0F172A]/50 transition-colors duration-200"
//                   >
//                     <td className="px-6 py-4 font-medium whitespace-nowrap text-[#0F172A] dark:text-[#F8FAFC]">{problem.title}</td>
//                     <td className="px-6 py-4">
//                       <DifficultyBadge difficulty={problem.difficulty} />
//                     </td>
//                     <td className="px-6 py-4 flex flex-wrap gap-2 max-w-xs">
//                       {problem.tags.map((tag) => (
//                         <span key={tag} className="bg-gray-200 dark:bg-gray-700 text-xs font-normal px-2 py-1 rounded-md">{tag}</span>
//                       ))}
//                     </td>
//                     <td className="px-6 py-4 text-[#0F172A] dark:text-[#F8FAFC]">{problem.createdAt.split('T')[0]}</td>
//                     <td className="px-6 py-4 text-right">
//                       <button
//                         onClick={() => navigate(`upload/${problem._id}`)}
//                         className="p-2 rounded-md text-[#64748B] dark:text-[#94A3B8] hover:text-red-500 hover:bg-red-500/10 transition-colors"
//                       >
//                         <PlusCircle size={16} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             }
//             {selectedOption === "delete" &&
//               <tbody>
//                 {problemsWithVideoSolutions.map((soln) => (
//                   <tr
//                     key={soln._id}
//                     className="border-b border-[#E2E8F0] dark:border-[#334155] hover:bg-[#F1F5F9] dark:hover:bg-[#0F172A]/50 transition-colors duration-200"
//                   >
//                     <td className="px-6 py-4 font-medium whitespace-nowrap text-[#0F172A] dark:text-[#F8FAFC]">{soln.problem.title}</td>
//                     <td className="px-6 py-4">
//                       <DifficultyBadge difficulty={soln.problem.difficulty} />
//                     </td>
//                     <td className="px-6 py-4 flex flex-wrap gap-2 max-w-xs">
//                       {soln.problem.tags.map((tag) => (
//                         <span key={tag} className="bg-gray-200 dark:bg-gray-700 text-xs font-normal px-2 py-1 rounded-md">{tag}</span>
//                       ))}
//                     </td>
//                     <td className="px-6 py-4 text-[#0F172A] dark:text-[#F8FAFC]">{soln.createdAt.split('T')[0]}</td>
//                     <td className="px-6 py-4 text-right">
//                       <button
//                         onClick={() => navigate(`/problems/edit/${soln.problem._id}`)}
//                         className="p-2 rounded-md text-[#64748B] dark:text-[#94A3B8] hover:text-blue-500 hover:bg-blue-500/10 transition-colors"
//                       >
//                         <Edit size={16} />
//                       </button>
//                       <button
//                         onClick={() => openDeleteModal(soln.problem._id)}
//                         className="p-2 rounded-md text-[#64748B] dark:text-[#94A3B8] hover:text-red-500 hover:bg-red-500/10 transition-colors"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             }
//           </table>
//         </div>
//       </div>

//       <ConfirmationModal
//         isOpen={isModalOpen}
//         onClose={closeDeleteModal}
//         onConfirm={handleDeleteProblem}
//         title="Delete Problem"
//         message="Are you sure you want to delete this problem? This action is permanent and cannot be undone."
//       />
//     </>
//   );
// };

// export default VideoSolutionManager;

















import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import { Edit, Trash2, PlusCircle } from 'lucide-react';
import ConfirmationModal from './ConfirmationModal';
import { useEffect } from 'react';
import axiosClient from '../../config/axios';

const DifficultyBadge = ({ difficulty }) => {
  const colorClasses = {
    Basic: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    Easy: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    Hard: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
  };

  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${colorClasses[difficulty] || colorClasses.Basic}`}>
      {difficulty || 'Unknown'}
    </span>
  );
};

const VideoSolutionManager = () => {
  const navigate = useNavigate();
  const outletContext = useOutletContext();
  
  // Safely extract data from outlet context
  const data = outletContext?.data || {};
  const videoSolutions = data.videoSolutions || [];
  const problems = data.problems || [];
  
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [problemsWithVideoSolutions, setProblemsWithVideoSolutions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [solutionToDelete, setSolutionToDelete] = useState(null);
  const [selectedOption, setSelectedOption] = useState("add");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    try {
      // Create a map of problems that already have video solutions
      const problemHasSoln = {};
      for (const soln of videoSolutions) {
        if (soln.problem && soln.problem._id) {
          problemHasSoln[soln.problem._id] = true;
        }
      }

      // Filter problems that don't have video solutions
      const filtered = problems.filter((p) => p && p._id && !problemHasSoln[p._id]);
      setFilteredProblems(filtered);
      setProblemsWithVideoSolutions(videoSolutions);
      
    } catch (error) {
      console.error('Error processing video solutions:', error);
      setFilteredProblems([]);
      setProblemsWithVideoSolutions([]);
    } finally {
      setLoading(false);
    }
  }, [videoSolutions, problems]);

  const openDeleteModal = (solutionId) => {
    setSolutionToDelete(solutionId);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSolutionToDelete(null);
    setIsModalOpen(false);
  };

  const handleDeleteSolution = async () => {
    if (!solutionToDelete) return;
    
    setDeleting(true);
    try {
      // Call your backend API to delete the video solution using solutionId
      await axiosClient.delete(`/solution-video/delete/${solutionToDelete}`);
      
      // Remove from local state
      setProblemsWithVideoSolutions(prev => 
        prev.filter(soln => soln._id !== solutionToDelete)
      );
      
      // Refresh the filtered problems list
      const updatedVideoSolutions = videoSolutions.filter(soln => soln._id !== solutionToDelete);
      const problemHasSoln = {};
      for (const soln of updatedVideoSolutions) {
        if (soln.problem && soln.problem._id) {
          problemHasSoln[soln.problem._id] = true;
        }
      }
      const filtered = problems.filter((p) => p && p._id && !problemHasSoln[p._id]);
      setFilteredProblems(filtered);
      
      alert('Video solution deleted successfully!');
      
    } catch (error) {
      console.error('Error deleting video solution:', error);
      alert('Failed to delete video solution. Please try again.');
    } finally {
      setDeleting(false);
      closeDeleteModal();
    }
  };

  const handleEditSolution = (solution) => {
    // Navigate to edit page with the solution data
    // You can either navigate to a separate edit page or use the same upload page with edit mode
    navigate(`edit/${solution._id}`, { 
      state: { 
        solution, 
        problem: solution.problem,
        editMode: true 
      } 
    });
  };

  const handleAddSolution = (problemId) => {
    // Navigate to upload page for adding new solution
    navigate(`upload/${problemId}`);
  };

  if (loading) {
    return (
      <div className="bg-[#FFFFFF] dark:bg-[#1E293B] p-6 rounded-xl border border-[#E2E8F0] dark:border-[#334155] shadow-md">
        <div className="text-center text-gray-500 dark:text-gray-400">
          Loading video solutions...
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#FFFFFF] dark:bg-[#1E293B] p-6 rounded-xl border border-[#E2E8F0] dark:border-[#334155] shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">Video Solutions</h2>
          <div
            className="
              relative flex w-full max-w-sm rounded-lg p-1
              bg-gray-100 border border-gray-300
              dark:bg-gray-800 dark:border-gray-700
            "
          >
            {/* Sliding indicator */}
            <div
              className={`
                absolute top-1 bottom-1 w-[48%] rounded-lg transition-all duration-300  bg-blue-500
                ${selectedOption === "add"
                  ? "left-1"
                  : "left-[51%]"}
              `}
            ></div>

            {/* Add button */}
            <button
              onClick={() => setSelectedOption("add")}
              className={`
                z-10 flex-1 py-2 text-sm font-semibold rounded-lg transition-colors duration-300
                ${selectedOption === "add"
                  ? "text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"}
              `}
            >
              Add Solution
            </button>

            {/* Manage button */}
            <button
              onClick={() => setSelectedOption("manage")}
              className={`
                z-10 flex-1 py-2 text-sm font-semibold rounded-lg transition-colors duration-300
                ${selectedOption === "manage"
                  ? "text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"}
              `}
            >
              Manage Solutions
            </button>
          </div>
        </div> 
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-[#F1F5F9] dark:bg-[#0F172A] text-[#64748B] dark:text-[#94A3B8] tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Title</th>
                <th className="px-6 py-4 font-semibold">Difficulty</th>
                <th className="px-6 py-4 font-semibold">Tags</th>
                <th className="px-6 py-4 font-semibold">Video Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            
            {selectedOption === "add" && (
              <tbody>
                {filteredProblems.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      No problems available for adding video solutions. All problems already have solutions or no problems found.
                    </td>
                  </tr>
                ) : (
                  filteredProblems.map((problem) => (
                    <tr
                      key={problem._id}
                      className="border-b border-[#E2E8F0] dark:border-[#334155] hover:bg-[#F1F5F9] dark:hover:bg-[#0F172A]/50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 font-medium whitespace-nowrap text-[#0F172A] dark:text-[#F8FAFC]">
                        {problem.title || 'Untitled Problem'}
                      </td>
                      <td className="px-6 py-4">
                        <DifficultyBadge difficulty={problem.difficulty} />
                      </td>
                      <td className="px-6 py-4 flex flex-wrap gap-2 max-w-xs">
                        {problem.tags && Array.isArray(problem.tags) ? (
                          problem.tags.map((tag) => (
                            <span key={tag} className="bg-gray-200 dark:bg-gray-700 text-xs font-normal px-2 py-1 rounded-md">
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 text-xs">No tags</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300">
                          No Video
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleAddSolution(problem._id)}
                          className="p-2 rounded-md text-[#64748B] dark:text-[#94A3B8] hover:text-green-500 hover:bg-green-500/10 transition-colors"
                          title="Add Video Solution"
                        >
                          <PlusCircle size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            )}
            
            {selectedOption === "manage" && (
              <tbody>
                {problemsWithVideoSolutions.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      No video solutions found.
                    </td>
                  </tr>
                ) : (
                  problemsWithVideoSolutions.map((soln) => (
                    <tr
                      key={soln._id}
                      className="border-b border-[#E2E8F0] dark:border-[#334155] hover:bg-[#F1F5F9] dark:hover:bg-[#0F172A]/50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 font-medium whitespace-nowrap text-[#0F172A] dark:text-[#F8FAFC]">
                        {soln.problem?.title || 'Unknown Problem'}
                      </td>
                      <td className="px-6 py-4">
                        <DifficultyBadge difficulty={soln.problem?.difficulty} />
                      </td>
                      <td className="px-6 py-4 flex flex-wrap gap-2 max-w-xs">
                        {soln.problem?.tags && Array.isArray(soln.problem.tags) ? (
                          soln.problem.tags.map((tag) => (
                            <span key={tag} className="bg-gray-200 dark:bg-gray-700 text-xs font-normal px-2 py-1 rounded-md">
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 text-xs">No tags</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                          Video Added
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleEditSolution(soln)}
                          className="p-2 rounded-md text-[#64748B] dark:text-[#94A3B8] hover:text-blue-500 hover:bg-blue-500/10 transition-colors mx-1"
                          title="Edit Video Solution"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(soln._id)}
                          disabled={deleting}
                          className="p-2 rounded-md text-[#64748B] dark:text-[#94A3B8] hover:text-red-500 hover:bg-red-500/10 transition-colors mx-1 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete Video Solution"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            )}
          </table>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteSolution}
        title="Delete Video Solution"
        message="Are you sure you want to delete this video solution? This action is permanent and cannot be undone."
        confirmText={deleting ? "Deleting..." : "Delete"}
        isConfirming={deleting}
      />
    </>
  );
};

export default VideoSolutionManager;