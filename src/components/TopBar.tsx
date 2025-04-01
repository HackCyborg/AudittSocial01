// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuthStore } from '../store/authStore';
// import { useThemeStore, getThemeColors } from '../store/themeStore';
// // import { api } from '../lib/api';
// import { Home, Video, Bell, User as UserIcon, LogOut, Settings, Shield } from 'lucide-react';
// import axios from 'axios';

// export const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000', // Your backend URL
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export const TopBar = () => {
//   const { user, isAdmin } = useAuthStore();
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);
//   const navigate = useNavigate();

//   const handleSignOut = async () => {
//     try {
//       await api.post('/auth/signout');
//       navigate('/signin');
//     } catch (error) {
//       console.error('Sign out failed:', error);
//     }
//   };

//   return (
//     <nav className="text-white p-2 fixed w-full top-0 z-50" style={{ backgroundColor: themeColors.primary }}>
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         <Link to="/" className="text-2xl font-bold">Family Creatives</Link>
        
//         {user ? (
//           <div className="flex items-center space-x-6">
//             <Link to="/" className="hover:bg-opacity-20 hover:bg-black p-2 rounded-lg">
//               <Home className="w-6 h-6" />
//             </Link>
//             <Link to="/videos" className="hover:bg-opacity-20 hover:bg-black p-2 rounded-lg">
//               <Video className="w-6 h-6" />
//             </Link>
//             {isAdmin && (
//               <Link to="/admin" className="hover:bg-opacity-20 hover:bg-black p-2 rounded-lg">
//                 <Shield className="w-6 h-6" />
//               </Link>
//             )}
//             <Link to="/notifications" className="hover:bg-opacity-20 hover:bg-black p-2 rounded-lg">
//               <Bell className="w-6 h-6" />
//             </Link>
//             <Link to="/profile" className="hover:bg-opacity-20 hover:bg-black p-2 rounded-lg">
//               <UserIcon className="w-6 h-6" />
//             </Link>
//             <Link to="/settings" className="hover:bg-opacity-20 hover:bg-black p-2 rounded-lg">
//               <Settings className="w-6 h-6" />
//             </Link>
//             <button
//               onClick={handleSignOut}
//               className="hover:bg-opacity-20 hover:bg-black p-2 rounded-lg"
//             >
//               <LogOut className="w-6 h-6" />
//             </button>
//           </div>
//         ) : (
//           <div className="flex items-center space-x-4">
//             <Link to="/signin" className="hover:underline">Sign In</Link>
//             <Link to="/signup" className="bg-white px-4 py-1 rounded-md font-semibold hover:bg-gray-100" style={{ color: themeColors.primary }}>
//               Sign Up
//             </Link>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuthStore } from '../store/authStore';
// import { useThemeStore, getThemeColors } from '../store/themeStore';
// import axios from 'axios';
// import { Home, Video, Bell, User as UserIcon, LogOut, Settings, Shield, Menu, X } from 'lucide-react';
// import { NotificationSidebar } from './NotificationSidebar';

// export const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000', // Your backend URL
//   headers: {
//     'Cache-Control': 'no-cache',
//     'Pragma': 'no-cache',
//   },
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );


// export const TopBar = () => {
//   const { user, isAdmin } = useAuthStore();
//   const { color } = useThemeStore();
//   const themeColors = getThemeColors(color);
//   const navigate = useNavigate();
  
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

//   const handleSignOut = async () => {
//     try {
//       await api.post('/auth/signout');
//       navigate('/signin');
//     } catch (error) {
//       console.error('Sign out failed:', error);
//     }
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//     if (isNotificationsOpen) setIsNotificationsOpen(false);
//   };

//   const toggleNotifications = () => {
//     setIsNotificationsOpen(!isNotificationsOpen);
//     if (isMobileMenuOpen) setIsMobileMenuOpen(false);
//   };

//   return (
//     <>
//       <nav className="text-white p-2 fixed w-full top-0 z-40" style={{ backgroundColor: themeColors.primary }}>
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             {user && (
//               <button 
//                 onClick={toggleMobileMenu}
//                 className="lg:hidden p-2 hover:bg-opacity-20 hover:bg-black rounded-lg"
//               >
//                 {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//               </button>
//             )}
//             <Link to="/" className="text-2xl font-bold">Family Creatives</Link>
//           </div>
          
//           {user ? (
//             <div className="hidden lg:flex items-center space-x-6">
//               <Link to="/" className="hover:bg-opacity-20 hover:bg-black p-2 rounded-lg">
//                 <Home className="w-6 h-6" />
//               </Link>
//               <Link to="/videos" className="hover:bg-opacity-20 hover:bg-black p-2 rounded-lg">
//                 <Video className="w-6 h-6" />
//               </Link>
//               {isAdmin && (
//                 <Link to="/admin" className="hover:bg-opacity-20 hover:bg-black p-2 rounded-lg">
//                   <Shield className="w-6 h-6" />
//                 </Link>
//               )}
//               <button 
//                 onClick={toggleNotifications}
//                 className="hover:bg-opacity-20 hover:bg-black p-2 rounded-lg relative"
//               >
//                 <Bell className="w-6 h-6" />
//                 <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
//               </button>
//               <Link to="/profile" className="hover:bg-opacity-20 hover:bg-black p-2 rounded-lg">
//                 <UserIcon className="w-6 h-6" />
//               </Link>
//               <Link to="/settings" className="hover:bg-opacity-20 hover:bg-black p-2 rounded-lg">
//                 <Settings className="w-6 h-6" />
//               </Link>
//               <button
//                 onClick={handleSignOut}
//                 className="hover:bg-opacity-20 hover:bg-black p-2 rounded-lg"
//               >
//                 <LogOut className="w-6 h-6" />
//               </button>
//             </div>
//           ) : (
//             <div className="flex items-center space-x-4">
//               <Link to="/signin" className="hover:underline">Sign In</Link>
//               <Link to="/signup" className="bg-white px-4 py-1 rounded-md font-semibold hover:bg-gray-100" style={{ color: themeColors.primary }}>
//                 Sign Up
//               </Link>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       {user && isMobileMenuOpen && (
//         <div 
//           className="fixed inset-0 z-30 lg:hidden"
//           style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
//           onClick={toggleMobileMenu}
//         >
//           <div 
//             className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl"
//             onClick={e => e.stopPropagation()}
//           >
//             <div className="p-4 space-y-4">
//               <Link 
//                 to="/" 
//                 className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 <Home className="w-5 h-5" />
//                 <span>Home</span>
//               </Link>
//               <Link 
//                 to="/videos" 
//                 className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 <Video className="w-5 h-5" />
                
//                 <span>Videos</span>
//               </Link>
//               {isAdmin && (
//                 <Link 
//                   to="/admin" 
//                   className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   <Shield className="w-5 h-5" />
//                   <span>Admin</span>
//                 </Link>
//               )}
//               <button 
//                 onClick={toggleNotifications}
//                 className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//               >
//                 <Bell className="w-5 h-5" />
//                 <span>Notifications</span>
//               </button>
//               <Link 
//                 to="/profile" 
//                 className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 <UserIcon className="w-5 h-5" />
//                 <span>Profile</span>
//               </Link>
//               <Link 
//                 to="/settings" 
//                 className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 <Settings className="w-5 h-5" />
//                 <span>Settings</span>
//               </Link>
//               <button
//                 onClick={handleSignOut}
//                 className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
//               >
//                 <LogOut className="w-5 h-5" />
//                 <span>Sign Out</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Notification Sidebar */}
//       <NotificationSidebar 
//         isOpen={isNotificationsOpen} 
//         onClose={() => setIsNotificationsOpen(false)} 
//       />
//     </>
//   );
// };




import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useThemeStore, getThemeColors } from '../store/themeStore';
// import { api } from '../lib/api';
import { Home, Video, Bell, User, LogOut, Settings, Shield, Menu, X } from 'lucide-react';
import { NotificationSidebar } from './NotificationSidebar';
import axios from 'axios';
export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Your backend URL
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});

export const TopBar = () => {
  const { user, isAdmin } = useAuthStore();
  const { color } = useThemeStore();
  const themeColors = getThemeColors(color);
  const navigate = useNavigate();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);


  if (location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/forgot-password'|| location.pathname === '/reset-password') {
    return null;
  }


 
  const handleSignOut = () => {
    // Clear local and session storage
    localStorage.clear();
    sessionStorage.clear();
  
    // Redirect to the login page
    window.location.href = '/signin';
  };
  
  

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white shadow-sm p-2 fixed w-full top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {user && (
              <button 
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 hover:bg-gray-50 rounded-lg"
                style={{ color: themeColors.primary }}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            )}
          


            <Link 
              to="/" 
              className="text-2xl font-bold"
              style={{ color: themeColors.primary }}
            >
              Family Creatives
            </Link>
          </div>
          
          {user ? (
            <div className="hidden lg:flex items-center space-x-6">
              <Link 
                to="/" 
                className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
                style={{ color: themeColors.primary }}
              >
                <Home className="w-6 h-6" />
              </Link>
              {/* <Link 
                to="/videos" 
                className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
                style={{ color: themeColors.primary }}
              >
                <Video className="w-6 h-6" />
              </Link> */}
              {isAdmin && (
                <Link 
                  to="/admin" 
                  className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  style={{ color: themeColors.primary }}
                >
                  <Shield className="w-6 h-6" />
                </Link>
              )}
              <button 
                onClick={toggleNotifications}
                className="hover:bg-gray-50 p-2 rounded-lg relative transition-colors"
                style={{ color: themeColors.primary }}
              >
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <Link 
                to="/profile" 
                className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
                style={{ color: themeColors.primary }}
              >
                <User className="w-6 h-6" />
              </Link>
              <Link 
                to="/settings" 
                className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
                style={{ color: themeColors.primary }}
              >
                <Settings className="w-6 h-6" />
              </Link>
              <button
                onClick={handleSignOut}
                className="hover:bg-gray-50 p-2 rounded-lg transition-colors"
                style={{ color: themeColors.primary }}
              >
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link 
                to="/signin" 
                className="hover:underline"
                style={{ color: themeColors.primary }}
              >
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="px-4 py-1 rounded-md font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: themeColors.primary }}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {user && isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 lg:hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={toggleMobileMenu}
        >
          <div 
            className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 space-y-4">
              <Link 
                to="/" 
                className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
              {/* <Link 
                to="/videos" 
                className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Video className="w-5 h-5" />
                <span>Videos</span>
              </Link> */}
              {isAdmin && (
                <Link 
                  to="/admin" 
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Shield className="w-5 h-5" />
                  <span>Admin</span>
                </Link>
              )}
              <button 
                onClick={toggleNotifications}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </button>
              <Link 
                to="/profile" 
                className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </Link>
              <Link 
                to="/settings" 
                className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Sidebar */}
      <NotificationSidebar 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />
    </>
  );
};