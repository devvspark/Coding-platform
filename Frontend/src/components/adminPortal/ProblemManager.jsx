// import React, { useState } from 'react';
// import { useNavigate, useOutletContext } from 'react-router';
// import { Edit, Trash2, PlusCircle } from 'lucide-react';
// import ConfirmationModal from './ConfirmationModal';

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

// const ProblemManager = () => {
//   const navigate = useNavigate();
//   const { data } = useOutletContext();
//   const [problems, setProblems] = useState(data.problems);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [problemToDelete, setProblemToDelete] = useState(null);


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
//           <h2 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">Problem Library</h2>
//           <button
//             onClick={() => navigate('create-new')}
//             className="flex items-center space-x-2 bg-[#3B82F6] hover:bg-[#60A5FA] text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//           >
//             <PlusCircle size={20} />
//             <span>Add New Problem</span>
//           </button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm text-left">
//             <thead className="text-xs uppercase bg-[#F1F5F9] dark:bg-[#0F172A] text-[#64748B] dark:text-[#94A3B8] tracking-wider">
//               <tr>
//                 <th className="px-6 py-4 font-semibold">Prob No.</th>
//                 <th className="px-6 py-4 font-semibold">Title</th>
//                 <th className="px-6 py-4 font-semibold">Difficulty</th>
//                 <th className="px-6 py-4 font-semibold">Tags</th>
//                 <th className="px-6 py-4 font-semibold">Created At</th>
//                 <th className="px-6 py-4 font-semibold text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {problems.map((problem) => (
//                 <tr
//                   key={problem._id}
//                   className="border-b border-[#E2E8F0] dark:border-[#334155] hover:bg-[#F1F5F9] dark:hover:bg-[#0F172A]/50 transition-colors duration-200"
//                 >
//                   <td className="px-5 py-4 text-base font-medium text-slate-600 dark:text-gray-100 cursor-pointer transition-colors">
//                     {problem.problemNo}
//                   </td>
//                   <td className="px-6 py-4 font-medium whitespace-nowrap text-[#0F172A] dark:text-[#F8FAFC]">{problem.title}</td>
//                   <td className="px-6 py-4">
//                     <DifficultyBadge difficulty={problem.difficulty} />
//                   </td>
//                   <td className="px-6 py-4 flex flex-wrap gap-2 max-w-xs">
//                     {problem.tags.map((tag) => (
//                       <span key={tag} className="bg-gray-200 dark:bg-gray-700 text-xs font-normal px-2 py-1 rounded-md">{tag}</span>
//                     ))}
//                   </td>
//                   <td className="px-6 py-4 text-[#0F172A] dark:text-[#F8FAFC]">{problem.createdAt.split("T")[0]}</td>
//                   <td className="px-6 py-4 text-right">
//                     <button
//                       onClick={() => navigate(`edit/${problem._id}`)}
//                       className="p-2 rounded-md text-[#64748B] dark:text-[#94A3B8] hover:text-blue-500 hover:bg-blue-500/10 transition-colors"
//                     >
//                       <Edit size={16} />
//                     </button>
//                     <button
//                       onClick={() => openDeleteModal(problem._id)}
//                       className="p-2 rounded-md text-[#64748B] dark:text-[#94A3B8] hover:text-red-500 hover:bg-red-500/10 transition-colors"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
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

// export default ProblemManager;













import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import { Edit, Trash2, PlusCircle, ExternalLink } from 'lucide-react';
import ConfirmationModal from './ConfirmationModal';

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

const ProblemManager = () => {
  const navigate = useNavigate();
  const outletContext = useOutletContext();
  
  // Safely extract data from outlet context with fallbacks
  const data = outletContext?.data || {};
  const problemsData = data.problems || [];
  
  const [problems, setProblems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [problemToDelete, setProblemToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize problems when data is available
  useEffect(() => {
    if (problemsData && problemsData.length > 0) {
      setProblems(problemsData);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [problemsData]);

  const openDeleteModal = (problemId) => {
    setProblemToDelete(problemId);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setProblemToDelete(null);
    setIsModalOpen(false);
  };

  const handleDeleteProblem = () => {
    if (!problemToDelete) return;
    setProblems(problems.filter((p) => p._id !== problemToDelete));
    closeDeleteModal();
  };

  // Handle clicking on problem to view it
  const handleProblemClick = (problemId) => {
    // Navigate to the problem solving page
    navigate(`/problems/${problemId}`);
  };

  // Handle clicking on problem number to view it
  const handleProblemNumberClick = (problemId, e) => {
    e.stopPropagation(); // Prevent row click from triggering
    navigate(`/problems/${problemId}`);
  };

  // Debug log to see the actual data structure
  console.log('Problems data:', problemsData);
  console.log('First problem details:', problemsData[0]);

  if (loading) {
    return (
      <div className="bg-[#FFFFFF] dark:bg-[#1E293B] p-6 rounded-xl border border-[#E2E8F0] dark:border-[#334155] shadow-md">
        <div className="text-center text-gray-500 dark:text-gray-400">
          Loading problems...
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#FFFFFF] dark:bg-[#1E293B] p-6 rounded-xl border border-[#E2E8F0] dark:border-[#334155] shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">Problem Library</h2>
          <button
            onClick={() => navigate('create-new')}
            className="flex items-center space-x-2 bg-[#3B82F6] hover:bg-[#60A5FA] text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <PlusCircle size={20} />
            <span>Add New Problem</span>
          </button>
        </div>
        
        {problems.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No problems found. Create your first problem to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-[#F1F5F9] dark:bg-[#0F172A] text-[#64748B] dark:text-[#94A3B8] tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">Prob No.</th>
                  <th className="px-6 py-4 font-semibold">Title</th>
                  <th className="px-6 py-4 font-semibold">Difficulty</th>
                  <th className="px-6 py-4 font-semibold">Tags</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {problems.map((problem) => (
                  <tr
                    key={problem._id || problem.id}
                    className="border-b border-[#E2E8F0] dark:border-[#334155] hover:bg-[#F1F5F9] dark:hover:bg-[#0F172A]/50 transition-colors duration-200 cursor-pointer"
                    onClick={() => handleProblemClick(problem._id || problem.id)}
                  >
                    <td 
                      className="px-5 py-4 text-base font-medium text-slate-600 dark:text-gray-100 transition-colors flex items-center space-x-2"
                      onClick={(e) => handleProblemNumberClick(problem._id || problem.id, e)}
                    >
                      <span>{problem.problemNo || 'N/A'}</span>
                      <ExternalLink size={14} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap text-[#0F172A] dark:text-[#F8FAFC]">
                      <div className="flex items-center space-x-2">
                        <span>{problem.title || 'Untitled Problem'}</span>
                        <ExternalLink size={14} className="text-blue-500 opacity-70" />
                      </div>
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
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => navigate(`edit/${problem._id || problem.id}`)}
                        className="p-2 rounded-md text-[#64748B] dark:text-[#94A3B8] hover:text-blue-500 hover:bg-blue-500/10 transition-colors mx-1"
                        title="Edit Problem"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(problem._id || problem.id)}
                        className="p-2 rounded-md text-[#64748B] dark:text-[#94A3B8] hover:text-red-500 hover:bg-red-500/10 transition-colors mx-1"
                        title="Delete Problem"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteProblem}
        title="Delete Problem"
        message="Are you sure you want to delete this problem? This action is permanent and cannot be undone."
      />
    </>
  );
};

export default ProblemManager;