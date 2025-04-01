


import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useProfileStore } from '../store/profileStore';
import { usePostStore } from '../store/postStore';
import { useThemeStore, getThemeColors } from '../store/themeStore';
import { Image, Send, Video, Home as HomeIcon, Bell, Settings ,Music} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../store/postStore';
import { Avatar } from '../components/Avatar';
import { PostCard } from '../components/PostCard';
import { MediaUploader } from '../components/MediaUploader';
import { USER_TIERS, DEFAULT_GAMIFICATION_SETTINGS } from '../config/constants';
import { ProfileService } from '../services';
import { HomeService } from '../services/home.service';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom"; 
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});

interface Category {
  id: number;
  name: string;
}

interface Post {
  id: number;
  user_id: number;
  username: string;
  title: string;
  category: string;
  content: string;
  media_path?: string;
  isVideo: boolean;
  isImage: boolean;
  isAudio: boolean;
  isNoMedia: boolean;
  category_id: number;
  isVideoApproved: boolean;
  isVideoRejected: boolean;
  is_public: boolean;
  created_at: string;
  updated_at:string;
 
}


const gradients = [
  { name: "Ocean", value: "from-blue-500 to-cyan-500" },
  { name: "Sunset", value: "from-orange-500 to-pink-500" },
  { name: "Forest", value: "from-green-500 to-emerald-500" },
  { name: "Royal", value: "from-purple-500 to-indigo-500" },
  { name: "Spring", value: "from-green-400 to-yellow-400" },
  { name: "Aurora", value: "from-teal-400 to-purple-500" },
  { name: "Desert", value: "from-yellow-400 to-orange-500" },
  // { name: "Rose", value: "from-pink-400 to-rose-500" },
  { name: "Default", value: "from-purple-500 via-blue-500 to-orange-500" },
];


export default function Home() {
  const { user } = useAuthStore();
  const { displayName, bio, avatarUrl, points, tier } = useProfileStore();
  const { color } = useThemeStore();
  const themeColors = getThemeColors(color);
  
  const [newPost, setNewPost] = useState('');
  const [postCategory, setPostCategory] = useState('Community and Leadership');
  const [showMediaUploader, setShowMediaUploader] = useState<'image' | 'video' | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [postIds, setPostIds] = useState<number[]>([]);
  const [likes, setLikes] = useState([]);
  const [profile, setProfile] = useState<any>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [postTitle, setPostTitle] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [postCategoryId, setPostCategoryId] = useState<number | null>(null);
  const [postCategoryName, setPostCategoryName] = useState(""); 
  const [bannerColor, setBannerColor] = useState(gradients.find(g => g.name === "Default")?.value);

  const navigate = useNavigate(); 


 

  const [profileData, setProfileData] = useState<{ 
    username: string; 
    bio: string; 
    total_likes: number;
    level: number; 
    tier: string;
  } | null>(null);




  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
  
      if (!token || !userId) {
        setError("Authentication required");
        setIsLoading(false);
        navigate("/signin");
        return;
      }
  
      try {
        console.log("Fetching all posts...");
        const response = await api.get("/auth/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        
        if (response.data) {
          let allPosts = response.data.filter((post: Post) =>
            post.isNoMedia || post.isImage || post.isAudio || 
            (post.isVideo && post.isVideoApproved && !post.isVideoRejected)
          );
  
          setPosts(allPosts);
          setFilteredPosts(allPosts); // Initially show all posts
  
          // Fetch categories
          const categoriesResponse = await api.get("/auth/categories", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
  
          if (categoriesResponse.data) {
            setCategories(categoriesResponse.data);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);

        if (error.response?.status === 401) {
          console.log("Token expired! Logging out...");
          localStorage.removeItem("authToken");

          setTimeout(() => {
              navigate("/signin");
          }, 0);
      }
        setError("Error fetching data");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);

 
  const getLevel = (likes: number): number => {
    if (likes >= 76) return 4;
    if (likes >= 51) return 3;
    if (likes >= 26) return 2;
    return 1;
  };
  
  
  const getTierColor = (likes: number): string => {
    if (likes >= 76) return 'from-cyan-400 to-cyan-500'; // Platinum
    if (likes >= 51) return 'from-yellow-400 to-yellow-500'; // Gold
    if (likes >= 26) return 'from-gray-300 to-gray-400'; // Silver
    return 'from-amber-600 to-amber-700'; // Bronze
  };
  
  const getTier = (likes: number): string => {
    if (likes >= 76) return "Platinum";
    if (likes >= 51) return "Gold";
    if (likes >= 26) return "Silver";
    return "Bronze";
  };
  const getPointsNeeded = (likes: number): number => {
    if (likes < 26) return 26 - likes; // Bronze to Silver
    if (likes < 51) return 51 - likes; // Silver to Gold
    if (likes < 76) return 76 - likes; // Gold to Platinum
    return 0; // Maximum level reached
  };
  
  
  

  
//   const getTierColor = (level: number): string => {
//     switch (level) {
//       case 1: return 'from-amber-600 to-amber-700'; // Bronze
//       case 2: return 'from-gray-300 to-gray-400'; // Silver
//       case 3: return 'from-yellow-400 to-yellow-500'; // Gold
//       case 4: return 'from-cyan-400 to-cyan-500'; // Platinum
//       default: return 'from-amber-600 to-amber-700'; // Default Bronze
//     }
//   };
  
//   const getLevel = (progress: number): number => {
//     if (progress >= 0 && progress <= 25) return 1;  // Bronze
//     if (progress >= 26 && progress <= 50) return 2; // Silver
//     if (progress >= 51 && progress <= 75) return 3; // Gold
//     if (progress > 75) return 4;  // Platinum
//     return 1;
//   };
  
  
//   const getTier = (level: number): string => {
//     switch (level) {
//       case 1: return "Bronze";
//       case 2: return "Silver";
//       case 3: return "Gold";
//       case 4: return "Platinum";
//       default: return "Unranked";
//     }
//   };
  
//   const calculateProgress = (likes: number): number => {
//     if (likes >= 76) return 100;
//     if (likes >= 51) return ((likes - 51) / 25) * 100;
//     if (likes >= 26) return ((likes - 26) / 25) * 100;
//     if (likes >= 1) return (likes / 25) * 100;
//     return 0;
//   };
  
//   const getPointsNeeded = (likes: number): number => {
//     if (likes >= 76) return 0;
//     if (likes >= 51) return 76 - likes;
//     if (likes >= 26) return 51 - likes;
//     if (likes >= 1) return 26 - likes;
//     return 25;
//   };

//   const progress = calculateProgress(parseInt(profileData?.total_likes || "0"));
// const level = getLevel(progress);
// const tier = getTier(level);
// const color = getTierColor(level);
// useEffect(() => {
//   const fetchProfile = async () => {
//     const userId = localStorage.getItem('userId');
//     if (!userId) {
//       window.location.href = '/signin';
//       return;
//     }

//     try {
//       const profileData = await ProfileService.getProfile(userId);
      
//       if (profileData) {
//         const totalLikes = parseInt(profileData.total_likes) || 0;
//         const tier = getTier(totalLikes);

//         setProfileData({
//           username: profileData.username,
//           bio: profileData.bio,
//           total_likes: totalLikes,
//           tier,
//         });
//         localStorage.setItem('seed', profileData.username);
//         localStorage.setItem('profileName', profileData.username);
//       }

//       const imageUrl = await ProfileService.getProfileImage(userId);
//       setProfileImage(imageUrl);
//     } catch (error: any) { 
//       console.error('Error fetching profile:', error);
//       if (error.response?.status === 401) {
//         localStorage.removeItem('authToken');
//         window.location.href = '/signin';
//       }
//     }
//   };

//   fetchProfile();
// }, []);


useEffect(() => {
  const fetchProfile = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      window.location.href = '/signin';
      return;
    }

    try {
      const profileData = await ProfileService.getProfile(userId);
      
      if (profileData) {
        const totalLikes = parseInt(profileData.total_likes) || 0;
        const level = getLevel(totalLikes);
        const tier = getTier(totalLikes);

        setProfileData({
          username: profileData.username,
          bio: profileData.bio,
          total_likes: totalLikes,
          level,
          tier,
        });

        console.log("Profile Data:", { totalLikes, level, tier }); // ✅ Debugging

        localStorage.setItem('seed', profileData.username);
        localStorage.setItem('profileName', profileData.username);
      }

      const imageUrl = await ProfileService.getProfileImage(userId);
      setProfileImage(imageUrl);
    } catch (error: any) { 
      console.error('Error fetching profile:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('authToken');
        window.location.href = '/signin';
      }
    }
  };

  fetchProfile();
}, []);


  

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     const userId = localStorage.getItem('userId');
  //     if (!userId) {
  //       window.location.href = '/signin';
  //       return;
  //     }

  //     try {
  //       const profileData = await ProfileService.getProfile(userId);
        
  //       if (profileData) {
  //         const totalLikes = parseInt(profileData.total_likes) || 0;
  //         const level = getLevel(totalLikes);
  //         const tier = getTier(level);

  //         setProfileData({
  //           username: profileData.username,
  //           bio: profileData.bio,
  //           total_likes: totalLikes,
  //           level,
  //           tier,
  //         });
  //         localStorage.setItem('seed', profileData.username);
  //           // Store the username in localStorage
  //       localStorage.setItem('profileName', profileData.username);
  //       }

  //       const imageUrl = await ProfileService.getProfileImage(userId);
  //       setProfileImage(imageUrl);
  //     } catch (error: any) { 
  //       console.error('Error fetching profile:', error);
  //       if (error.response?.status === 401) {
  //           localStorage.removeItem('authToken');
  //           window.location.href = '/signin';
  //       }
  //   }
    
  //   };

  //   fetchProfile();
  // }, []);

 

 
  

  const handleCategoryClick = (category: { id: number; name: string }) => {
    console.log("Selected Category:", category);

    try {
        setSelectedCategory(category.name);

        if (category.id === 0) {
            setFilteredPosts(posts);
        } else {
            const filtered = posts.filter((post) => {
                console.log("Post Category ID:", post.category_id, "Selected Category ID:", category.id);
                return post.category_id === category.id;
            });

            console.log("Filtered Posts:", filtered);
            setFilteredPosts(filtered);
        }
    } catch (error: any) {
        console.error("Error filtering posts:", error);

        if (error.response?.status === 401) {
            console.log("Token expired! Logging out...");
            localStorage.removeItem("authToken");

            setTimeout(() => {
                window.location.href = "/signin";
            }, 0);
        }
    }
};



const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video' | 'audio') => {
  const file = e.target.files?.[0];
  if (file) {
    setMediaFile(file);
    setMediaUrl(URL.createObjectURL(file));
    setMediaType(type);
    setShowMediaUploader(null);
  }
};

const removeMedia = () => {
  setMediaUrl(null);
  setMediaType(null);
  setMediaFile(null);
};


useEffect(() => {
  const fetchBanner = async () => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      navigate("/signin");
      return;
    }

    try {
      const response = await api.get(`/auth/banner/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data?.banner_type === "gradient" && response.data?.name) {
        const gradient = gradients.find(g => g.name === response.data.name);
        setBannerColor(gradient?.value || gradients.find(g => g.name === "Default")?.value);
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        navigate("/signin");
      }
      setBannerColor(gradients.find(g => g.name === "Default")?.value);
    }
  };

  fetchBanner();
}, [navigate]);
const handlePostSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("authToken");

  if (!userId || !token) {
    toast.error("User is not logged in!");
    return;
  }

  if (!postCategoryId || !postCategoryName) {
    toast.error("Please select a valid category");
    return;
  }

  const formData = new FormData();
  formData.append("title", postTitle);
  formData.append("category", postCategoryName);
  formData.append("content", newPost);
  formData.append("userId", userId);

  if (mediaFile) {
    formData.append("media", mediaFile);
  }

  try {
    const response = await api.post(
      `/auth/post/${userId}?category_id=${postCategoryId}`,
      formData,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status >= 200 && response.status < 300) {
      // Create new post object
      const newPostData: Post = {
        id: response.data.id,
        user_id: parseInt(userId),
        username: profileData?.username || '',
        title: postTitle,
        category: postCategoryName,
        content: newPost,
        media_path: response.data.media_path,
        isVideo: mediaType === 'video',
        isImage: mediaType === 'image',
        isAudio: mediaType === 'audio',
        isNoMedia: !mediaFile,
        category_id: postCategoryId,
        isVideoApproved: true,
        isVideoRejected: false,
        is_public: true,
        created_at: new Date().toISOString(),
      };

      // Update posts state
      setPosts(prevPosts => [newPostData, ...prevPosts]);
      
      // Update filtered posts if we're in the relevant category
      if (selectedCategory === 'All Categories' || selectedCategory === postCategoryName) {
        setFilteredPosts(prevFiltered => [newPostData, ...prevFiltered]);
      }

      toast.success("Post created successfully!");

      // Create notification
      const notificationData = {
        user_id: userId,
        category_id: postCategoryId,
        title: postTitle || "Untitled Post",
        content: newPost || "No content",
      };

      try {
        await api.post(
          "/auth/notifications/add",
          notificationData,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } catch (notifError) {
        console.error("Error adding notification:", notifError);
      }

      // Clear form
      setPostTitle("");
      setNewPost("");
      setPostCategory("");
      setPostCategoryId(null);
      setPostCategoryName("");
      setMediaUrl(null);
      setMediaType(null);
      setMediaFile(null);
    }
  } catch (error) {
    console.error("Error creating post:", error);

    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      navigate("/signin");
    }

    toast.error("Failed to create post!");
  }
};



  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
      <Toaster />
      {/* Profile Section - Full width on mobile, sidebar on desktop */}
      <div className="w-full lg:w-80 lg:flex-shrink-0 order-1 lg:order-none">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Cover Image */}
          {/* <div className={`h-24 lg:h-32 bg-gradient-to-r ${bannerColor}`}></div> */}
          <div className={`h-24 lg:h-32 bg-gradient-to-r ${bannerColor}`}></div>
    

          
          {/* Profile Info */}
          <div className="relative px-4 pb-4">
            <div className="flex justify-center">
              <img
                src={profileImage || avatarUrl}
                alt="add Profile"
                className="w-20 h-20 lg:w-24 lg:h-24 rounded-full border-4 border-white -mt-10 lg:-mt-12 bg-white"
              />
            </div>
            <div className="text-center mt-2">
              <h2 className="text-xl font-semibold">
                {/* {profileData?.username || "User"} */}
                {profileData?.username}
              </h2>
              <p className="text-gray-600 text-sm">
                Level {profileData?.level} {profileData?.tier}
              </p>
            </div>
            <p className="text-center text-gray-600 mt-3 text-sm">
              {profileData?.bio || "Share your story here! Tell others about yourself, your interests, and what you're passionate about."}
            </p>

            {/* Progress Bar */}
            {/* <div className="mt-4 px-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Level {profileData?.level || 1} {profileData?.tier || "Bronze"}</span>
                <span className="font-medium">{calculateProgress(parseInt(profileData?.total_likes || "0")).toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 p-0.5">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r transition-all duration-300 ${getTierColor(profileData?.level)}`}
                  // className={`h-2 rounded-full bg-gradient-to-r transition-all duration-300 ${getTierColor(profileData?.level || 1)}`}
                  style={{ 
                    width: `${calculateProgress(parseInt(profileData?.total_likes || "0"))}%`,
                  }}
                >
                  <div className="w-full h-full opacity-75 bg-[linear-gradient(110deg,rgba(255,255,255,0.48)_0.8%,rgba(255,255,255,0)_10%,rgba(255,255,255,0.1)_100%)]"></div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1 text-center">
                {getPointsNeeded(parseInt(profileData?.total_likes || "0")) > 0 
                  ? `${getPointsNeeded(parseInt(profileData?.total_likes || "0"))} more likes to next level` 
                  : 'Maximum level reached!'}
              </div>
            </div> */}

            {/* Progress Bar */}
            <div className="mt-4 px-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium">Level {profileData?.level || 1} {profileData?.tier || "Bronze"}
            
            {/* Crown Icon for Silver, Gold, and Platinum */}
            {["Platinum"].includes(profileData?.tier) && (
              <span className="text-yellow-400 text-lg">👑</span>
            )}
          </span>
        </div>
      
        {/* Progress Bar - Directly Uses total_likes */}
        <div className="w-full bg-gray-100 rounded-full h-3 p-0.5">
          <div 
            className={`h-2 rounded-full bg-gradient-to-r transition-all duration-300 ${getTierColor(profileData?.total_likes)}`}
            style={{ width: `${profileData?.total_likes || 0}%` }} 
          >
            <div className="w-full h-full opacity-75 bg-[linear-gradient(110deg,rgba(255,255,255,0.48)_0.8%,rgba(255,255,255,0)_10%,rgba(255,255,255,0.1)_100%)]"></div>
          </div>
        </div>
      
        <div className="text-xs text-gray-500 mt-1 text-center">
          {getPointsNeeded(profileData?.total_likes || 0) > 0 
            ? `${getPointsNeeded(profileData?.total_likes || 0)} more likes to next level` 
            : 'Maximum level reached!'}
        </div>
      </div>

            {/* Quick Links - Only visible on desktop */}
            <div className="hidden lg:block mt-6 space-y-2">
              <Link to="/" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-50">
                <HomeIcon className="w-5 h-5" />
                <span>Feed</span>
              </Link>
              

              <Link to="/settings" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-50">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </Link>
            </div>

            {/* View Profile Link - Only visible on desktop */}
            <div className="hidden lg:block mt-6">
              <Link 
                to="/profile" 
                className="block text-center font-medium"
                style={{ color: themeColors.primary }}
              >
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow max-w-2xl order-2 lg:order-none">
        




<div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="p-4 border-b border-gray-100">
            <h4 className="text-lg font-semibold text-gray-900">Create Post</h4>
          </div>
          <form onSubmit={handlePostSubmit} className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="hidden sm:flex relative h-28 lg:h-32 justify-center items-center">
                <Avatar
                  src={avatarUrl}
                  seed={profileData?.username}
                  size="md"
                  tier={tier}
                  points={points}
                />
              </div>

              <div className="flex-1 space-y-4">
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="Post Title"
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent text-gray-700"
                />

                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What's on your mind?"
                  className="w-full p-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:border-transparent min-h-[120px] text-gray-700"
                />

                {mediaUrl && (
                  <div className="relative">
                    {mediaType === 'image' ? (
                      <div className="relative">
                        <img 
                          src={mediaUrl} 
                          alt="image" 
                          className="w-full max-h-[200px] object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={removeMedia}
                          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
                        >
                          <Image className="w-4 h-4" />
                        </button>
                      </div>
                    ) : mediaType === 'video' ? (
                      <div className="relative">
                        <video 
                          src={mediaUrl} 
                          controls 
                          className="w-full max-h-[200px] rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={removeMedia}
                          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
                        >
                          <Video className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <audio 
                          src={mediaUrl} 
                          controls 
                          className="w-full rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={removeMedia}
                          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
                        >
                          <Music className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Category
                  </label>
                  <select
                    id="category"
                    value={postCategory}
                    onChange={(e) => {
                      const selectedCategory = categories.find((cat) => cat.name === e.target.value);
                      if (selectedCategory) {
                        setPostCategoryId(selectedCategory.id);
                        setPostCategoryName(selectedCategory.name);
                      } else {
                        setPostCategoryId(null);
                        setPostCategoryName("");
                      }
                      setPostCategory(e.target.value);
                    }}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex flex-wrap gap-2">
                    <label className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                      <Image className="w-5 h-5" />
                      <span className="text-sm font-medium">Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleMediaUpload(e, 'image')}
                      />
                    </label>

                    <label className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                      <Video className="w-5 h-5" />
                      <span className="text-sm font-medium">Video</span>
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={(e) => handleMediaUpload(e, 'video')}
                      />
                    </label>

                    <label className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                      <Music className="w-5 h-5" />
                      <span className="text-sm font-medium">Audio</span>
                      <input
                        type="file"
                        accept="audio/*"
                        className="hidden"
                        onChange={(e) => handleMediaUpload(e, 'audio')}
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={(!newPost.trim() && !mediaUrl)}
                    className="ml-auto text-white px-6 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold"
                    style={{ backgroundColor: themeColors.primary }}
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
</div>


      

{isLoading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2 text-gray-600">Loading posts...</p>
        </div>
      ) : error ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      ) : (
        <div className="space-y-6">
          
{filteredPosts.length === 0 ? (
  <div className="bg-white rounded-xl shadow-sm p-8 text-center">
    <p className="text-gray-600">No posts found in this category.</p>
  </div>
) : (
  filteredPosts.map((post) => (
    <PostCard key={post.id} post={post} />
  ))
)}

        </div>
      )}
      </div>

      


<div className="hidden lg:block w-80 flex-shrink-0 order-3 lg:order-none">
  <div className="bg-white rounded-xl shadow-sm p-6">
    <h2 className="text-xl font-semibold mb-4">Categories</h2>
    <div className="space-y-2">
      <button
        onClick={() => handleCategoryClick({ id: 0, name: 'All Categories' })}
        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
          selectedCategory === 'All Categories' ? 'text-white' : 'text-gray-700 hover:bg-gray-50'
        }`}
        style={{ backgroundColor: selectedCategory === 'All Categories' ? themeColors.primary : 'transparent' }}
      >
        All Categories
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category)}
          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
            category.name === selectedCategory ? 'text-white' : 'text-gray-700 hover:bg-gray-50'
          }`}
          style={{ backgroundColor: category.name === selectedCategory ? themeColors.primary : 'transparent' }}
        >
          {category.name}
        </button>
      ))}
    </div>
  </div>
</div>

    </div>
  );
}