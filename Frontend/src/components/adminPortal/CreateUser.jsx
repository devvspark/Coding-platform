// import React, { useState } from 'react';
// import { useNavigate, useOutletContext } from 'react-router';
// import { useForm } from 'react-hook-form';
// import { Eye, EyeOff, UserPlus, ArrowRight } from 'lucide-react';
// import axiosClient from '../../config/axios';

// const CreateUser = () => {
//   const navigate = useNavigate();
//   const { data, setData } = useOutletContext();
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     defaultValues: {
//       username: '',
//       email: '',
//       password: '',
//       role: 'user',
//     }
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const onSubmit = async (data) => {
//     setIsSubmitting(true);
//     try {
//       const response = await axiosClient.post('/auth/admin/create-user', {
//         username: data.username,
//         emailId: data.email,
//         password: data.password,
//         role: data.role
//       });

//       // Refresh the users list by refetching platform data
//       const { data: platformData } = await axiosClient.get('/admin/platform-data');
//       setData(platformData);

//       alert('User created successfully!');
//       navigate('/users');
//     } catch (error) {
//       console.error('Error creating user:', error);
//       const errorMessage = error.response?.data?.error || error.message || 'Failed to create user';
//       alert(`Error: ${errorMessage}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const inputBaseClasses =
//     "w-full bg-[#F1F5F9] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155] rounded-lg p-3 focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6]/50 outline-none transition duration-200 placeholder:text-[#64748B]/60 dark:placeholder:text-[#94A3B8]/60";
//   const labelClasses =
//     "block text-sm font-medium mb-1.5 text-[#64748B] dark:text-[#94A3B8]";
//   const errorClasses = "text-red-500 text-sm mt-1";

//   return (
//     <div className="max-w-2xl mx-auto">
//       <div className="bg-[#FFFFFF] dark:bg-[#1E293B] p-8 rounded-xl border border-[#E2E8F0] dark:border-[#334155] shadow-md">
//         <div className="text-center mb-8">
//           <div className="inline-block p-4 bg-gradient-to-br from-[#3B82F6]/20 to-[#2563EB]/20 rounded-full mb-4">
//             <UserPlus size={32} className="text-[#3B82F6]" />
//           </div>
//           <h2 className="text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">Create a New User</h2>
//           <p className="text-[#64748B] dark:text-[#94A3B8] mt-1">
//             Fill in the details to add a new user to the platform.
//           </p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {/* Username */}
//           <div>
//             <label htmlFor="username" className={labelClasses}>Username</label>
//             <input
//               type="text"
//               id="username"
//               {...register('username', {
//                 required: 'Username is required',
//                 minLength: {
//                   value: 3,
//                   message: 'Username must be at least 3 characters'
//                 },
//                 maxLength: {
//                   value: 20,
//                   message: 'Username must be less than 20 characters'
//                 }
//               })}
//               className={inputBaseClasses}
//               placeholder="johndoe"
//             />
//             {errors.username && <p className={errorClasses}>{errors.username.message}</p>}
//           </div>

//           {/* Email */}
//           <div>
//             <label htmlFor="email" className={labelClasses}>Email Address</label>
//             <input
//               type="email"
//               id="email"
//               {...register('email', {
//                 required: 'Email is required',
//                 pattern: {
//                   value: /^\S+@\S+$/i,
//                   message: 'Invalid email address'
//                 }
//               })}
//               className={inputBaseClasses}
//               placeholder="you@example.com"
//             />
//             {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
//           </div>

//           {/* Password */}
//           <div>
//             <label htmlFor="password" className={labelClasses}>Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 id="password"
//                 {...register('password', {
//                   required: 'Password is required',
//                   minLength: {
//                     value: 8,
//                     message: 'Password must be at least 8 characters'
//                   },
//                   validate: (value) => {
//                     const hasUpperCase = /[A-Z]/.test(value);
//                     const hasLowerCase = /[a-z]/.test(value);
//                     const hasNumber = /[0-9]/.test(value);
                    
//                     if (!hasUpperCase || !hasLowerCase || !hasNumber) {
//                       return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
//                     }
//                     return true;
//                   }
//                 })}
//                 className={inputBaseClasses}
//                 placeholder="Enter a strong password (min 8 chars, 1 uppercase, 1 lowercase, 1 number)"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-0 flex items-center px-4 text-[#64748B] dark:text-[#94A3B8] hover:text-[#3B82F6] transition-colors duration-200"
//                 aria-label="Toggle password visibility"
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>
//             {errors.password && <p className={errorClasses}>{errors.password.message}</p>}
//           </div>

//           {/* Role */}
//           <div>
//             <label htmlFor="role" className={labelClasses}>Role</label>
//             <select id="role" {...register('role')} className={inputBaseClasses}>
//               <option value="user">User</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex justify-end items-center space-x-4 pt-4">
//             <button
//               type="button"
//               onClick={() => navigate('/users')}
//               className="py-2.5 px-5 rounded-lg font-semibold text-sm border border-[#E2E8F0] dark:border-[#334155] text-[#64748B] dark:text-[#94A3B8] hover:bg-[#E2E8F0]/50 dark:hover:bg-[#334155]/50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full group flex justify-center items-center space-x-2 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#60A5FA] hover:to-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//             >
//               <span>{isSubmitting ? 'Creating...' : 'Create User Account'}</span>
//               {!isSubmitting && <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateUser;




































import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, UserPlus, ArrowRight } from 'lucide-react';
import axiosClient from '../../config/axios';

const CreateUser = () => {
  const navigate = useNavigate();
  const { data, setData } = useOutletContext();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      fullName: '', // Added this
      email: '',
      password: '',
      role: 'user',
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // In your CreateUser.jsx onSubmit function
const onSubmit = async (formData) => {
  setIsSubmitting(true);
  try {
    const response = await axiosClient.post('/admin/create-user', {
      username: formData.username,
      fullName: formData.fullName,
      emailId: formData.email,
      password: formData.password,
      role: formData.role
    });

    // Refresh the users list by refetching platform data
    const { data: platformData } = await axiosClient.get('/admin/platform-data');
    setData(platformData);

    alert('User created successfully!');
    
    // CHANGE THIS LINE - navigate to admin users page instead of /users
    navigate('/admin-portal/users');
    
  } catch (error) {
    console.error('Error creating user:', error);
    const errorMessage = error.response?.data?.error || error.message || 'Failed to create user';
    alert(`Error: ${errorMessage}`);
  } finally {
    setIsSubmitting(false);
  }
};

  const inputBaseClasses =
    "w-full bg-[#F1F5F9] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155] rounded-lg p-3 focus:ring-2 focus:ring-[#3B82F6] focus:border-[#3B82F6]/50 outline-none transition duration-200 placeholder:text-[#64748B]/60 dark:placeholder:text-[#94A3B8]/60";
  const labelClasses =
    "block text-sm font-medium mb-1.5 text-[#64748B] dark:text-[#94A3B8]";
  const errorClasses = "text-red-500 text-sm mt-1";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-[#FFFFFF] dark:bg-[#1E293B] p-8 rounded-xl border border-[#E2E8F0] dark:border-[#334155] shadow-md">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-[#3B82F6]/20 to-[#2563EB]/20 rounded-full mb-4">
            <UserPlus size={32} className="text-[#3B82F6]" />
          </div>
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">Create a New User</h2>
          <p className="text-[#64748B] dark:text-[#94A3B8] mt-1">
            Fill in the details to add a new user to the platform.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className={labelClasses}>Username</label>
            <input
              type="text"
              id="username"
              {...register('username', {
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters'
                },
                maxLength: {
                  value: 20,
                  message: 'Username must be less than 20 characters'
                }
              })}
              className={inputBaseClasses}
              placeholder="johndoe"
            />
            {errors.username && <p className={errorClasses}>{errors.username.message}</p>}
          </div>

          {/* Full Name - ADDED THIS FIELD */}
          <div>
            <label htmlFor="fullName" className={labelClasses}>Full Name</label>
            <input
              type="text"
              id="fullName"
              {...register('fullName', {
                required: 'Full name is required',
                minLength: {
                  value: 2,
                  message: 'Full name must be at least 2 characters'
                }
              })}
              className={inputBaseClasses}
              placeholder="John Doe"
            />
            {errors.fullName && <p className={errorClasses}>{errors.fullName.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClasses}>Email Address</label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address'
                }
              })}
              className={inputBaseClasses}
              placeholder="you@example.com"
            />
            {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className={labelClasses}>Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  },
                  validate: (value) => {
                    const hasUpperCase = /[A-Z]/.test(value);
                    const hasLowerCase = /[a-z]/.test(value);
                    const hasNumber = /[0-9]/.test(value);
                    
                    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
                      return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
                    }
                    return true;
                  }
                })}
                className={inputBaseClasses}
                placeholder="Enter a strong password (min 8 chars, 1 uppercase, 1 lowercase, 1 number)"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-4 text-[#64748B] dark:text-[#94A3B8] hover:text-[#3B82F6] transition-colors duration-200"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className={errorClasses}>{errors.password.message}</p>}
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className={labelClasses}>Role</label>
            <select id="role" {...register('role')} className={inputBaseClasses}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end items-center space-x-4 pt-4">
          <button
  type="button"
  onClick={() => navigate('/admin-portal/users')} // Update this too
  className="py-2.5 px-5 rounded-lg font-semibold text-sm border border-[#E2E8F0] dark:border-[#334155] text-[#64748B] dark:text-[#94A3B8] hover:bg-[#E2E8F0]/50 dark:hover:bg-[#334155]/50 transition-colors"
>
  Cancel
</button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full group flex justify-center items-center space-x-2 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#60A5FA] hover:to-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span>{isSubmitting ? 'Creating...' : 'Create User Account'}</span>
              {!isSubmitting && <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;