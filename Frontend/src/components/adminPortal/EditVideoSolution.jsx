// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate, useParams, useLocation } from "react-router";
// import {
//   UploadCloud,
//   ArrowLeft,
//   Video,
//   Loader2,
//   Tag,
//   Calendar,
//   BarChart2,
//   Puzzle,
//   AlertCircle,
//   FileVideo,
//   Info,
//   X,
//   Edit3
// } from "lucide-react";
// import axios from "axios";
// import axiosClient from "../../config/axios";

// const ErrorMessage = ({ message }) => {
//   if (!message) return null;
//   return <p className="text-sm text-red-500 mt-1">{message}</p>;
// };

// const DifficultyBadge = ({ difficulty }) => {
//   const styles = {
//     Easy: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
//     Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
//     Hard: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
//   };
//   return (
//     <span
//       className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold ${styles[difficulty]}`}
//     >
//       {difficulty}
//     </span>
//   );
// };

// const EditVideoSolution = () => {
//   const { solutionId } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const { solution, problem, editMode } = location.state || {};

//   const [isLoading, setIsLoading] = useState(!solution);
//   const [fetchError, setFetchError] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [dragOver, setDragOver] = useState(false);
//   const [uploadedVideo, setUploadedVideo] = useState(null);
//   const [showPreview, setShowPreview] = useState(false);
//   const [currentSolution, setCurrentSolution] = useState(solution);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors, isSubmitting },
//     reset,
//     clearErrors,
//     setError,
//     setValue,
//   } = useForm({
//     defaultValues: { videoFile: null },
//   });

//   useEffect(() => {
//     if (!solution && solutionId) {
//       // Fetch solution data if not passed via state
//       const fetchSolution = async () => {
//         try {
//           setIsLoading(true);
//           const response = await axiosClient.get(`/solution-video/${solutionId}`);
//           setCurrentSolution(response.data);
//         } catch (error) {
//           console.error('Error fetching solution:', error);
//           setFetchError("Failed to load video solution details.");
//         } finally {
//           setIsLoading(false);
//         }
//       };
//       fetchSolution();
//     }
//   }, [solutionId, solution]);

//   const videoFile = watch("videoFile");

//   const onSubmit = async (formData) => {
//     const file = formData.videoFile?.[0];
    
//     if (!file) {
//       setError("videoFile", { message: "Please select a video file to update." });
//       return;
//     }

//     setUploading(true);
//     setUploadProgress(0);
//     clearErrors();
//     setUploadedVideo(null);

//     try {
//       const signatureResponse = await axiosClient.get(
//         `/solution-video/upload/${currentSolution.problem._id}`
//       );
//       const { signature, timestamp, public_id, api_key, upload_url } =
//         signatureResponse.data;

//       const fd = new FormData();
//       fd.append("file", file);
//       fd.append("signature", signature);
//       fd.append("timestamp", timestamp);
//       fd.append("public_id", public_id);
//       fd.append("api_key", api_key);

//       const uploadResponse = await axios.post(upload_url, fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//         onUploadProgress: (e) => {
//           const progress = Math.round((e.loaded * 100) / e.total);
//           setUploadProgress(progress);
//         },
//       });

//       const cloudinaryResult = uploadResponse.data;

//       // Update the existing solution
//       const updateResponse = await axiosClient.put(`/solution-video/${solutionId}`, {
//         cloudinaryPublicId: cloudinaryResult.public_id,
//         secureUrl: cloudinaryResult.secure_url,
//         duration: cloudinaryResult.duration,
//       });

//       setUploadedVideo(updateResponse.data.videoSolution);
//       setCurrentSolution(updateResponse.data.videoSolution);
//       reset();
//       setUploadProgress(0);
//       setShowPreview(false);
      
//       alert('Video solution updated successfully!');
      
//     } catch (err) {
//       console.error("Update error:", err);
//       setError("root", {
//         type: "manual",
//         message: err.response?.data?.message || "Update failed. Try again.",
//       });
//     } finally {
//       setUploading(false);
//     }
//   };

//   const renderContent = () => {
//     if (isLoading) {
//       return (
//         <div className="flex flex-col items-center justify-center h-64">
//           <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
//           <p className="mt-4 text-gray-600 dark:text-gray-400">
//             Loading Video Solution Details...
//           </p>
//         </div>
//       );
//     }

//     if (fetchError) {
//       return (
//         <div className="flex flex-col items-center justify-center h-64 text-center p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
//           <AlertCircle className="h-12 w-12 text-red-500" />
//           <p className="mt-4 text-lg font-semibold text-red-700 dark:text-red-400">
//             An Error Occurred
//           </p>
//           <p className="text-gray-600 dark:text-gray-400">{fetchError}</p>
//         </div>
//       );
//     }

//     if (currentSolution) {
//       return (
//         <>
//           {/* Problem Info */}
//           <div className="mb-8 p-5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
//             <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
//               <Puzzle className="mr-3 h-6 w-6 text-blue-500" />
//               {currentSolution.problem.problemNo}. {currentSolution.problem.title}
//             </h2>
//             <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
//               <div className="flex flex-wrap gap-6">
//                 <div className="flex items-center">
//                   <BarChart2 className="mr-2 h-4 w-4 text-gray-500" />
//                   <span className="font-medium">Difficulty:</span>
//                   <span className="ml-2">
//                     <DifficultyBadge difficulty={currentSolution.problem.difficulty} />
//                   </span>
//                 </div>
//                 <div className="flex items-center">
//                   <Calendar className="mr-2 h-4 w-4 text-gray-500" />
//                   <span className="font-medium">Current Video:</span>
//                   <span className="ml-2">
//                     {currentSolution.duration ? `${Math.round(currentSolution.duration)}s` : 'N/A'}
//                   </span>
//                 </div>
//               </div>
//               <div className="flex items-start">
//                 <Tag className="mr-2 h-4 w-4 mt-0.5 text-gray-500" />
//                 <span className="font-medium flex-shrink-0 mr-2">Tags:</span>
//                 <div className="flex flex-wrap gap-2">
//                   {currentSolution.problem.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       className="px-3 py-1 text-xs font-medium bg-slate-200 dark:bg-slate-700 text-gray-800 dark:text-slate-300 rounded-full"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//               {currentSolution.secureUrl && (
//                 <div className="flex items-center">
//                   <Video className="mr-2 h-4 w-4 text-gray-500" />
//                   <span className="font-medium">Current Video:</span>
//                   <a
//                     href={currentSolution.secureUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="ml-2 text-blue-600 dark:text-blue-400 underline text-sm"
//                   >
//                     View Current Video
//                   </a>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Upload Form */}
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <label className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
//               Update Video Solution
//             </label>

//             <div
//               onDragEnter={() => setDragOver(true)}
//               onDragLeave={() => setDragOver(false)}
//               onDrop={() => setDragOver(false)}
//               className={`mt-1 flex justify-center px-6 py-8 border-2 rounded-lg border-dashed transition-colors ${
//                 dragOver
//                   ? "border-blue-400 bg-blue-50 dark:bg-blue-500/10"
//                   : "border-gray-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500"
//               }`}
//             >
//               <div className="space-y-1 text-center">
//                 <UploadCloud className="mx-auto h-12 w-12 text-gray-400 dark:text-slate-500" />
//                 <div className="flex text-sm text-gray-600 dark:text-gray-400">
//                   <label
//                     htmlFor="videoFile"
//                     className="relative cursor-pointer rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 dark:focus-within:ring-offset-slate-800"
//                   >
//                     <span>Choose a new video file</span>
//                     <input
//                       id="videoFile"
//                       type="file"
//                       className="sr-only"
//                       accept="video/mp4,video/webm"
//                       {...register("videoFile", {
//                         validate: {
//                           acceptedFormats: (files) =>
//                             !files?.[0] || ["video/mp4", "video/webm"].includes(files[0]?.type) || 
//                             "Only MP4 or WebM formats are accepted.",
//                           maxSize: (files) =>
//                             !files?.[0] || files[0]?.size < 100000000 ||
//                             "File size must be less than 100MB.",
//                         },
//                       })}
//                     />
//                   </label>
//                   <p className="pl-1">or drag and drop</p>
//                 </div>
//                 <p className="text-xs text-gray-500 dark:text-slate-500">
//                   MP4, WebM up to 100MB
//                 </p>
//               </div>
//             </div>

//             {videoFile?.[0] && (
//               <div className="mt-4 flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-700 rounded-lg relative">
//                 <div className="flex items-center">
//                   <FileVideo className="mr-3 h-6 w-6 text-gray-500 dark:text-slate-400" />
//                   <span className="font-medium text-sm text-gray-800 dark:text-gray-200 truncate max-w-[180px]">
//                     {videoFile[0].name}
//                   </span>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => setShowPreview((prev) => !prev)}
//                   className="ml-3 px-3 py-1 text-sm font-medium rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
//                 >
//                   {showPreview ? "Hide Preview" : "Preview"}
//                 </button>

//                 {showPreview && videoFile?.[0] && (
//                   <div className="fixed top-4 right-4 z-50 bg-black/90 rounded-lg shadow-2xl p-3 w-80 max-h-[90vh] flex flex-col">
//                     <button
//                       onClick={() => setShowPreview(false)}
//                       className="self-end mb-2 text-white hover:text-red-400 transition-colors"
//                       title="Close Preview"
//                     >
//                       <X className="h-5 w-5" />
//                     </button>
//                     <video
//                       src={URL.createObjectURL(videoFile[0])}
//                       controls
//                       className="w-full h-auto rounded-md"
//                       style={{ maxHeight: "75vh" }}
//                     />
//                   </div>
//                 )}
//               </div>
//             )}

//             <ErrorMessage message={errors.videoFile?.message} />

//             {/* Progress UI */}
//             {uploading && (
//               <div className="mt-4">
//                 <div className="flex justify-between items-center mb-1">
//                   <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                     Uploading...
//                   </span>
//                   <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
//                     {uploadProgress}%
//                   </span>
//                 </div>
//                 <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
//                   <div
//                     className="bg-blue-500 h-2 rounded-full transition-all duration-300"
//                     style={{ width: `${uploadProgress}%` }}
//                   ></div>
//                 </div>
//               </div>
//             )}

//             <div className="pt-6 space-y-4">
//               <button
//                 type="submit"
//                 disabled={isSubmitting || uploading}
//                 style={{ minHeight: "48px" }}
//                 className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed transition duration-150"
//               >
//                 {isSubmitting || uploading ? (
//                   <>
//                     <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
//                     Updating...
//                   </>
//                 ) : (
//                   <>
//                     <Edit3 className="mr-2 h-5 w-5" />
//                     Update Solution
//                   </>
//                 )}
//               </button>

//               {errors.root && (
//                 <div className="flex items-start p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg">
//                   <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 mr-2" />
//                   <p className="text-sm text-red-700 dark:text-red-300">
//                     {errors.root.message}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </form>

//           {uploadedVideo && (
//             <div className="mt-8 p-5 bg-green-50 dark:bg-green-900/30 rounded-xl border border-green-300 dark:border-green-700">
//               <h3 className="text-lg font-bold flex items-center text-green-700 dark:text-green-300 mb-3">
//                 <Info className="mr-2 h-5 w-5" />
//                 Video Updated Successfully!
//               </h3>
//               <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
//                 <li>
//                   <span className="font-medium">Public ID:</span>{" "}
//                   {uploadedVideo.cloudinaryPublicId}
//                 </li>
//                 <li>
//                   <span className="font-medium">Secure URL:</span>{" "}
//                   <a
//                     href={uploadedVideo.secureUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 dark:text-blue-400 underline"
//                   >
//                     {uploadedVideo.secureUrl}
//                   </a>
//                 </li>
//                 <li>
//                   <span className="font-medium">Duration:</span>{" "}
//                   {uploadedVideo.duration} seconds
//                 </li>
//               </ul>
//             </div>
//           )}
//         </>
//       );
//     }
//   };

//   return (
//     <div className="bg-white dark:bg-[#1E293B] p-6 sm:p-8 rounded-xl border border-[#E2E8F0] dark:border-[#334155] shadow-lg max-w-3xl mx-auto">
//       <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#E2E8F0] dark:border-[#334155]">
//         <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
//           Edit Video Solution
//         </h1>
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-[#334155] rounded-lg hover:bg-gray-200 dark:hover:bg-[#475569] transition-colors"
//         >
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Go Back
//         </button>
//       </div>
//       {renderContent()}
//     </div>
//   );
// };

// export default EditVideoSolution;












import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useLocation } from "react-router";
import {
  UploadCloud,
  ArrowLeft,
  Video,
  Loader2,
  Tag,
  Calendar,
  BarChart2,
  Puzzle,
  AlertCircle,
  FileVideo,
  Info,
  X,
  Edit3,
  CheckCircle
} from "lucide-react";
import axios from "axios";
import axiosClient from "../../config/axios";

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return <p className="text-sm text-red-500 mt-1">{message}</p>;
};

const DifficultyBadge = ({ difficulty }) => {
  const styles = {
    Easy: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
    Hard: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
  };
  
  if (!difficulty) return null;
  
  return (
    <span
      className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold ${styles[difficulty] || styles.Medium}`}
    >
      {difficulty}
    </span>
  );
};

const EditVideoSolution = () => {
  const { solutionId } = useParams(); // This should be the _id from solutionVideos collection
  const navigate = useNavigate();
  const location = useLocation();
  
  const { solution } = location.state || {};

  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [currentSolution, setCurrentSolution] = useState(null);
  const [problemData, setProblemData] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
    clearErrors,
    setError,
    setValue,
  } = useForm({
    defaultValues: { videoFile: null },
  });

  useEffect(() => {
    const fetchSolutionData = async () => {
      try {
        setIsLoading(true);
        setFetchError(null);

        let solutionData = solution;

        // If solution is not passed via state, fetch it using solutionId from URL
        if (!solutionData && solutionId) {
          console.log('Fetching solution with ID:', solutionId);
          const solutionResponse = await axiosClient.get(`/solution-video/solution/${solutionId}`);
          solutionData = solutionResponse.data;
        }

        if (!solutionData) {
          throw new Error("No solution data available");
        }

        setCurrentSolution(solutionData);

        // Fetch problem details if not already populated
        if (solutionData.problem && typeof solutionData.problem === 'string') {
          // If problem is just an ID string, fetch the full problem data
          const problemResponse = await axiosClient.get(`/problems/${solutionData.problem}`);
          setProblemData(problemResponse.data);
        } else if (solutionData.problem && typeof solutionData.problem === 'object') {
          // If problem is already populated as an object
          setProblemData(solutionData.problem);
        } else {
          throw new Error("Problem data not found in solution");
        }

      } catch (error) {
        console.error('Error fetching solution data:', error);
        setFetchError(error.message || "Failed to load video solution details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSolutionData();
  }, [solutionId, solution]);

  const videoFile = watch("videoFile");

  const onSubmit = async (formData) => {
    const file = formData.videoFile?.[0];
    
    if (!file) {
      setError("videoFile", { message: "Please select a video file to update." });
      return;
    }

    // Use the solution _id for the update
    const updateSolutionId = solutionId || currentSolution?._id;
    
    if (!updateSolutionId) {
      setError("root", { message: "Solution ID is missing. Cannot update video." });
      return;
    }

    if (!currentSolution?.problem) {
      setError("root", { message: "Problem data is missing. Cannot update video." });
      return;
    }

    // Get the problem ID (could be string or object)
    const problemId = typeof currentSolution.problem === 'string' 
      ? currentSolution.problem 
      : currentSolution.problem._id;

    if (!problemId) {
      setError("root", { message: "Problem ID is missing. Cannot update video." });
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    clearErrors();
    setUploadedVideo(null);

    try {
      console.log('Starting video update process...');
      console.log('Solution ID:', updateSolutionId);
      console.log('Problem ID:', problemId);

      // Step 1: Get upload signature from backend using problemId
      const signatureResponse = await axiosClient.get(
        `/solution-video/upload/${problemId}`
      );
      
      if (!signatureResponse.data) {
        throw new Error("No upload signature received from server");
      }
      
      const { signature, timestamp, public_id, api_key, upload_url } = signatureResponse.data;

      // Step 2: Upload to Cloudinary
      const fd = new FormData();
      fd.append("file", file);
      fd.append("signature", signature);
      fd.append("timestamp", timestamp);
      fd.append("public_id", public_id);
      fd.append("api_key", api_key);

      const uploadResponse = await axios.post(upload_url, fd, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          const progress = Math.round((e.loaded * 100) / e.total);
          setUploadProgress(progress);
        },
      });

      const cloudinaryResult = uploadResponse.data;

      // Step 3: Update the existing solution using the solution _id
      console.log('Updating solution with ID:', updateSolutionId);
      const updateResponse = await axiosClient.put(`/solution-video/update/${updateSolutionId}`, {
        cloudinaryPublicId: cloudinaryResult.public_id,
        secureUrl: cloudinaryResult.secure_url,
        duration: cloudinaryResult.duration,
      });

      const updatedSolution = updateResponse.data.videoSolution || updateResponse.data;
      setUploadedVideo(updatedSolution);
      setCurrentSolution(updatedSolution);
      
      reset();
      setUploadProgress(0);
      setShowPreview(false);
      
      alert('Video solution updated successfully!');
      
    } catch (err) {
      console.error("Update error:", err);
      
      let errorMessage = "Update failed. Please try again.";
      
      if (err.response) {
        console.error('Server error details:', err.response.data);
        
        if (err.response.status === 409) {
          errorMessage = "A video solution already exists for this problem.";
        } else if (err.response.status === 404) {
          errorMessage = "Video solution not found.";
        } else if (err.response.status === 400) {
          errorMessage = err.response.data?.error || "Invalid request data.";
        } else {
          errorMessage = err.response.data?.error || err.response.data?.message || `Server error: ${err.response.status}`;
        }
      } else if (err.request) {
        errorMessage = "No response from server. Please check your internet connection.";
      } else {
        errorMessage = err.message;
      }
      
      setError("root", {
        type: "manual",
        message: errorMessage,
      });
    } finally {
      setUploading(false);
    }
  };

  // Helper function to get display data
  const getDisplayData = () => {
    if (!currentSolution) return null;
    
    // If problemData is available (from separate fetch), use it
    if (problemData) {
      return {
        problemNo: problemData.problemNo,
        title: problemData.title,
        difficulty: problemData.difficulty,
        tags: problemData.tags || []
      };
    }
    
    // Otherwise try to get from currentSolution.problem if it's an object
    if (currentSolution.problem && typeof currentSolution.problem === 'object') {
      return {
        problemNo: currentSolution.problem.problemNo,
        title: currentSolution.problem.title,
        difficulty: currentSolution.problem.difficulty,
        tags: currentSolution.problem.tags || []
      };
    }
    
    // Fallback
    return {
      problemNo: 'N/A',
      title: 'Unknown Problem',
      difficulty: 'Medium',
      tags: []
    };
  };

  const displayData = getDisplayData();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading Video Solution Details...
          </p>
        </div>
      );
    }

    if (fetchError) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
          <AlertCircle className="h-12 w-12 text-red-500" />
          <p className="mt-4 text-lg font-semibold text-red-700 dark:text-red-400">
            An Error Occurred
          </p>
          <p className="text-gray-600 dark:text-gray-400">{fetchError}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      );
    }

    if (!currentSolution || !displayData) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center p-4">
          <AlertCircle className="h-12 w-12 text-yellow-500" />
          <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
            No Solution Data Available
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Unable to load video solution details.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      );
    }

    return (
      <>
        {/* Problem Info */}
        <div className="mb-8 p-5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <Puzzle className="mr-3 h-6 w-6 text-blue-500" />
            {displayData.problemNo}. {displayData.title}
          </h2>
          <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center">
                <BarChart2 className="mr-2 h-4 w-4 text-gray-500" />
                <span className="font-medium">Difficulty:</span>
                <span className="ml-2">
                  <DifficultyBadge difficulty={displayData.difficulty} />
                </span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                <span className="font-medium">Current Video:</span>
                <span className="ml-2">
                  {currentSolution.duration ? `${Math.round(currentSolution.duration)}s` : 'N/A'}
                </span>
              </div>
            </div>
            {displayData.tags && displayData.tags.length > 0 && (
              <div className="flex items-start">
                <Tag className="mr-2 h-4 w-4 mt-0.5 text-gray-500" />
                <span className="font-medium flex-shrink-0 mr-2">Tags:</span>
                <div className="flex flex-wrap gap-2">
                  {displayData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-slate-200 dark:bg-slate-700 text-gray-800 dark:text-slate-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {currentSolution.secureUrl && (
              <div className="flex items-center">
                <Video className="mr-2 h-4 w-4 text-gray-500" />
                <span className="font-medium">Current Video:</span>
                <a
                  href={currentSolution.secureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-600 dark:text-blue-400 underline text-sm"
                >
                  View Current Video
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Upload Form - Same as before */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Update Video Solution
          </label>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragEnter={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              const files = e.dataTransfer.files;
              if (files.length > 0) {
                setValue("videoFile", files);
              }
            }}
            className={`mt-1 flex justify-center px-6 py-8 border-2 rounded-lg border-dashed transition-colors ${
              dragOver
                ? "border-blue-400 bg-blue-50 dark:bg-blue-500/10"
                : "border-gray-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500"
            }`}
          >
            <div className="space-y-1 text-center">
              <UploadCloud className="mx-auto h-12 w-12 text-gray-400 dark:text-slate-500" />
              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                <label
                  htmlFor="videoFile"
                  className="relative cursor-pointer rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 dark:focus-within:ring-offset-slate-800"
                >
                  <span>Choose a new video file</span>
                  <input
                    id="videoFile"
                    type="file"
                    className="sr-only"
                    accept="video/mp4,video/webm"
                    {...register("videoFile", {
                      validate: {
                        acceptedFormats: (files) =>
                          !files?.[0] || ["video/mp4", "video/webm"].includes(files[0]?.type) || 
                          "Only MP4 or WebM formats are accepted.",
                        maxSize: (files) =>
                          !files?.[0] || files[0]?.size < 100000000 ||
                          "File size must be less than 100MB.",
                      },
                    })}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-slate-500">
                MP4, WebM up to 100MB
              </p>
            </div>
          </div>

          {videoFile?.[0] && (
            <div className="mt-4 flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-700 rounded-lg relative">
              <div className="flex items-center">
                <FileVideo className="mr-3 h-6 w-6 text-gray-500 dark:text-slate-400" />
                <span className="font-medium text-sm text-gray-800 dark:text-gray-200 truncate max-w-[180px]">
                  {videoFile[0].name}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowPreview((prev) => !prev)}
                className="ml-3 px-3 py-1 text-sm font-medium rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                {showPreview ? "Hide Preview" : "Preview"}
              </button>

              {showPreview && videoFile?.[0] && (
                <div className="fixed top-4 right-4 z-50 bg-black/90 rounded-lg shadow-2xl p-3 w-80 max-h-[90vh] flex flex-col">
                  <button
                    onClick={() => setShowPreview(false)}
                    className="self-end mb-2 text-white hover:text-red-400 transition-colors"
                    title="Close Preview"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <video
                    src={URL.createObjectURL(videoFile[0])}
                    controls
                    className="w-full h-auto rounded-md"
                    style={{ maxHeight: "75vh" }}
                  />
                </div>
              )}
            </div>
          )}

          <ErrorMessage message={errors.videoFile?.message} />

          {/* Progress UI */}
          {uploading && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Uploading...
                </span>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {uploadProgress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="pt-6 space-y-4">
            <button
              type="submit"
              disabled={isSubmitting || uploading}
              style={{ minHeight: "48px" }}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed transition duration-150"
            >
              {isSubmitting || uploading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Updating...
                </>
              ) : (
                <>
                  <Edit3 className="mr-2 h-5 w-5" />
                  Update Solution
                </>
              )}
            </button>

            {errors.root && (
              <div className="flex items-start p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 mr-2" />
                <p className="text-sm text-red-700 dark:text-red-300">
                  {errors.root.message}
                </p>
              </div>
            )}
          </div>
        </form>

        {uploadedVideo && (
          <div className="mt-8 p-5 bg-green-50 dark:bg-green-900/30 rounded-xl border border-green-300 dark:border-green-700">
            <h3 className="text-lg font-bold flex items-center text-green-700 dark:text-green-300 mb-3">
              <CheckCircle className="mr-2 h-5 w-5" />
              Video Updated Successfully!
            </h3>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>
                <span className="font-medium">Public ID:</span>{" "}
                {uploadedVideo.cloudinaryPublicId}
              </li>
              <li>
                <span className="font-medium">Secure URL:</span>{" "}
                <a
                  href={uploadedVideo.secureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 underline"
                >
                  {uploadedVideo.secureUrl}
                </a>
              </li>
              <li>
                <span className="font-medium">Duration:</span>{" "}
                {uploadedVideo.duration} seconds
              </li>
            </ul>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="bg-white dark:bg-[#1E293B] p-6 sm:p-8 rounded-xl border border-[#E2E8F0] dark:border-[#334155] shadow-lg max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#E2E8F0] dark:border-[#334155]">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Edit Video Solution
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-[#334155] rounded-lg hover:bg-gray-200 dark:hover:bg-[#475569] transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default EditVideoSolution;