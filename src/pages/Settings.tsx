// import React from 'react';
// import { useThemeStore, getThemeColors, ThemeColor } from '../store/themeStore';
// import { Palette, Type, Moon, Sun, Check } from 'lucide-react';

// export default function Settings() {
//   const { color, fontSize, darkMode, setColor, setFontSize, toggleDarkMode } = useThemeStore();
//   const themeColors = getThemeColors(color);

//   const colorOptions: { name: string; value: ThemeColor }[] = [
//     { name: 'Blue', value: 'blue' },
//     { name: 'Purple', value: 'purple' },
//     { name: 'Green', value: 'green' },
//     { name: 'Orange', value: 'orange' },
//     { name: 'Pink', value: 'pink' },
//   ];

//   const fontSizeOptions = [
//     { name: 'Small', value: 'small' },
//     { name: 'Medium', value: 'medium' },
//     { name: 'Large', value: 'large' },
//   ];

//   return (
//     <div className="max-w-4xl mx-auto py-6">
//       <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
//       <div className="bg-white rounded-xl shadow-md overflow-hidden">
//         <div className="p-6 border-b border-gray-100">
//           <h2 className="text-xl font-semibold">Appearance</h2>
//           <p className="text-gray-600 mt-1">Customize how Family Creatives looks for you</p>
//         </div>
        
//         {/* Theme Color */}
//         <div className="p-6 border-b border-gray-100">
//           <div className="flex items-center gap-3 mb-4">
//             <Palette className="w-5 h-5 text-gray-500" />
//             <h3 className="font-medium">Theme Color</h3>
//           </div>
          
//           <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
//             {colorOptions.map((option) => {
//               const optionColors = getThemeColors(option.value);
//               return (
//                 <button
//                   key={option.value}
//                   onClick={() => setColor(option.value)}
//                   className={`relative p-4 rounded-lg border transition-all ${
//                     color === option.value 
//                       ? 'border-2 shadow-sm' 
//                       : 'border-gray-200 hover:border-gray-300'
//                   }`}
//                   style={{ borderColor: color === option.value ? optionColors.primary : '' }}
//                 >
//                   <div 
//                     className="w-full h-8 rounded mb-2"
//                     style={{ backgroundColor: optionColors.primary }}
//                   />
//                   <span className="block text-sm text-center">{option.name}</span>
                  
//                   {color === option.value && (
//                     <div 
//                       className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
//                       style={{ backgroundColor: 'white' }}
//                     >
//                       <Check className="w-3 h-3" style={{ color: optionColors.primary }} />
//                     </div>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
        
//         {/* Font Size */}
//         <div className="p-6 border-b border-gray-100">
//           <div className="flex items-center gap-3 mb-4">
//             <Type className="w-5 h-5 text-gray-500" />
//             <h3 className="font-medium">Font Size</h3>
//           </div>
          
//           <div className="flex flex-wrap gap-3">
//             {fontSizeOptions.map((option) => (
//               <button
//                 key={option.value}
//                 onClick={() => setFontSize(option.value as 'small' | 'medium' | 'large')}
//                 className={`px-4 py-2 rounded-lg transition-colors ${
//                   fontSize === option.value 
//                     ? 'text-white' 
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//                 style={{ 
//                   backgroundColor: fontSize === option.value ? themeColors.primary : '',
//                 }}
//               >
//                 {option.name}
//               </button>
//             ))}
//           </div>
//         </div>
        
//         {/* Dark Mode */}
//         <div className="p-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               {darkMode ? (
//                 <Moon className="w-5 h-5 text-gray-500" />
//               ) : (
//                 <Sun className="w-5 h-5 text-gray-500" />
//               )}
//               <h3 className="font-medium">Dark Mode</h3>
//             </div>
            
//             <button
//               onClick={toggleDarkMode}
//               className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
//               style={{ backgroundColor: darkMode ? themeColors.primary : 'rgb(209 213 219)' }}
//             >
//               <span
//                 className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
//                   darkMode ? 'translate-x-6' : 'translate-x-1'
//                 }`}
//               />
//             </button>
//           </div>
//           <p className="text-gray-500 text-sm mt-2 ml-8">
//             {darkMode 
//               ? 'Switch to light mode for a brighter appearance' 
//               : 'Switch to dark mode to reduce eye strain in low light'}
//           </p>
//         </div>
//       </div>
      
//       {/* <div className="mt-6 bg-white rounded-xl shadow-md p-6">
//         <h2 className="text-xl font-semibold mb-4">Preview</h2>
//         <div 
//           className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 text-white' : ''}`}
//           style={{ backgroundColor: !darkMode ? themeColors.light : '', borderColor: darkMode ? 'rgb(55 65 81)' : '' }}
//         >
//           <h3 
//             className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : ''}`}
//             style={{ color: !darkMode ? themeColors.primary : '' }}
//           >
//             This is how content will look
//           </h3>
//           <p className={`mb-3 ${fontSize === 'small' ? 'text-sm' : fontSize === 'large' ? 'text-lg' : ''}`}>
//             This text shows the current font size and theme color accent.
//           </p>
//           <button
//             className="px-4 py-2 text-white rounded-lg"
//             style={{ backgroundColor: themeColors.primary }}
//           >
//             Sample Button
//           </button>
//         </div>
//       </div> */}
//     </div>
//   );
// }


// ************correct above**********

// import React from 'react';
// import { useThemeStore, getThemeColors, ThemeColor } from '../store/themeStore';
// import { Palette, Type, Moon, Sun, Check } from 'lucide-react';

// export default function Settings() {
//   const { color, fontSize, darkMode, setColor, setFontSize, toggleDarkMode } = useThemeStore();
//   const themeColors = getThemeColors(color);

//   const colorOptions: { name: string; value: ThemeColor }[] = [
//     { name: 'Blue', value: 'blue' },
//     { name: 'Purple', value: 'purple' },
//     { name: 'Green', value: 'green' },
//     { name: 'Orange', value: 'orange' },
//     { name: 'Pink', value: 'pink' },
//   ];

//   const fontSizeOptions = [
//     { name: 'Small', value: 'small' },
//     { name: 'Medium', value: 'medium' },
//     { name: 'Large', value: 'large' },
//   ];

//   return (
//     <div className="max-w-4xl mx-auto py-6">
//       <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
//       <div className="bg-white rounded-xl shadow-md overflow-hidden">
//         <div className="p-6 border-b border-gray-100">
//           <h2 className="text-xl font-semibold">Appearance</h2>
//           <p className="text-gray-600 mt-1">Customize how Family Creatives looks for you</p>
//         </div>
        
//         {/* Theme Color */}
//         <div className="p-6 border-b border-gray-100">
//           <div className="flex items-center gap-3 mb-4">
//             <Palette className="w-5 h-5 text-gray-500" />
//             <h3 className="font-medium">Theme Color</h3>
//           </div>
          
//           <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
//             {colorOptions.map((option) => {
//               const optionColors = getThemeColors(option.value);
//               return (
//                 <button
//                   key={option.value}
//                   onClick={() => setColor(option.value)}
//                   className={`relative p-4 rounded-lg border transition-all ${
//                     color === option.value 
//                       ? 'border-2 shadow-sm' 
//                       : 'border-gray-200 hover:border-gray-300'
//                   }`}
//                   style={{ borderColor: color === option.value ? optionColors.primary : '' }}
//                 >
//                   <div 
//                     className="w-full h-8 rounded mb-2"
//                     style={{ backgroundColor: optionColors.primary }}
//                   />
//                   <span className="block text-sm text-center">{option.name}</span>
                  
//                   {color === option.value && (
//                     <div 
//                       className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
//                       style={{ backgroundColor: 'white' }}
//                     >
//                       <Check className="w-3 h-3" style={{ color: optionColors.primary }} />
//                     </div>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
        
//         {/* Font Size */}
//         <div className="p-6 border-b border-gray-100">
//           <div className="flex items-center gap-3 mb-4">
//             <Type className="w-5 h-5 text-gray-500" />
//             <h3 className="font-medium">Font Size</h3>
//           </div>
          
//           <div className="flex flex-wrap gap-3">
//             {fontSizeOptions.map((option) => (
//               <button
//                 key={option.value}
//                 onClick={() => setFontSize(option.value as 'small' | 'medium' | 'large')}
//                 className={`px-4 py-2 rounded-lg transition-colors ${
//                   fontSize === option.value 
//                     ? 'text-white' 
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//                 style={{ 
//                   backgroundColor: fontSize === option.value ? themeColors.primary : '',
//                 }}
//               >
//                 {option.name}
//               </button>
//             ))}
//           </div>
//         </div>
        
//         {/* Dark Mode */}
//         <div className="p-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               {darkMode ? (
//                 <Moon className="w-5 h-5 text-gray-500" />
//               ) : (
//                 <Sun className="w-5 h-5 text-gray-500" />
//               )}
//               <h3 className="font-medium">Dark Mode</h3>
//             </div>
            
//             <button
//               onClick={toggleDarkMode}
//               className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
//               style={{ backgroundColor: darkMode ? themeColors.primary : 'rgb(209 213 219)' }}
//             >
//               <span
//                 className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
//                   darkMode ? 'translate-x-6' : 'translate-x-1'
//                 }`}
//               />
//             </button>
//           </div>
//           <p className="text-gray-500 text-sm mt-2 ml-8">
//             {darkMode 
//               ? 'Switch to light mode for a brighter appearance' 
//               : 'Switch to dark mode to reduce eye strain in low light'}
//           </p>
//         </div>
//       </div>
      
      
//     </div>
//   );
// }




import React from 'react';
import { useThemeStore, getThemeColors, ThemeColor } from '../store/themeStore';
import { Palette, Type, Moon, Sun, Check } from 'lucide-react';

export default function Settings() {
  const { color, fontSize, darkMode, setColor, setFontSize, toggleDarkMode } = useThemeStore();
  const themeColors = getThemeColors(color);

  const colorOptions: { name: string; value: ThemeColor }[] = [
    { name: 'Blue', value: 'blue' },
    { name: 'Purple', value: 'purple' },
    { name: 'Green', value: 'green' },
    { name: 'Orange', value: 'orange' },
    { name: 'Pink', value: 'pink' },
  ];

  const fontSizeOptions = [
    { name: 'Small', value: 'small' },
    { name: 'Medium', value: 'medium' },
    { name: 'Large', value: 'large' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Settings</h1>
      
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold dark:text-white">Appearance</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Customize how Family Creatives looks for you</p>
        </div>
        
        {/* Theme Color */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <h3 className="font-medium dark:text-white">Theme Color</h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {colorOptions.map((option) => {
              const optionColors = getThemeColors(option.value);
              return (
                <button
                  key={option.value}
                  onClick={() => setColor(option.value)}
                  className={`relative p-4 rounded-lg border transition-all dark:bg-gray-800 ${
                    color === option.value 
                      ? 'border-2 shadow-sm' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  style={{ borderColor: color === option.value ? optionColors.primary : '' }}
                >
                  <div 
                    className="w-full h-8 rounded mb-2"
                    style={{ backgroundColor: optionColors.primary }}
                  />
                  <span className="block text-sm text-center dark:text-white">{option.name}</span>
                  
                  {color === option.value && (
                    <div 
                      className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center bg-white dark:bg-gray-700"
                    >
                      <Check className="w-3 h-3" style={{ color: optionColors.primary }} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Font Size */}
        {/* <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Type className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <h3 className="font-medium dark:text-white">Font Size</h3>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {fontSizeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFontSize(option.value as 'small' | 'medium' | 'large')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  fontSize === option.value 
                    ? 'text-white' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                style={{ 
                  backgroundColor: fontSize === option.value ? themeColors.primary : '',
                }}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div> */}
        
        {/* Dark Mode */}
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? (
                <Moon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <Sun className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              )}
              <h3 className="font-medium dark:text-white">Dark Mode</h3>
            </div>
            
            <button
              onClick={toggleDarkMode}
              className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
              style={{ backgroundColor: darkMode ? themeColors.primary : 'rgb(209 213 219)' }}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 ml-8">
            {darkMode 
              ? 'Switch to light mode for a brighter appearance' 
              : 'Switch to dark mode to reduce eye strain in low light'}
          </p>
        </div>
      </div>
    </div>
  );
}

export { Settings }
















// import React, { useEffect } from 'react'; 
// import { useThemeStore, getThemeColors, ThemeColor } from '../store/themeStore';
// import { Palette, Type, Moon, Sun, Check } from 'lucide-react';
// import { SettingsService } from '../services/settings.service';

// export default function Settings() {
//   const { color, fontSize, darkMode, setColor, setFontSize, toggleDarkMode } = useThemeStore();
//   const themeColors = getThemeColors(color);

//   useEffect(() => {
//     const fetchSettings = async () => {
//       try {
//         const userId = 1; // Replace with actual user ID
//         const settings = await SettingsService.getSettings(userId);
//         setColor(settings.theme_color);
//         setFontSize(settings.font_size);
//         toggleDarkMode(settings.mode === 'dark');
//       } catch (error) {
//         console.error('Failed to fetch settings:', error);
//       }
//     };

//     fetchSettings();
//   }, []);

//   const colorOptions: { name: string; value: ThemeColor }[] = [
//     { name: 'Blue', value: 'blue' },
//     { name: 'Purple', value: 'purple' },
//     { name: 'Green', value: 'green' },
//     { name: 'Orange', value: 'orange' },
//     { name: 'Pink', value: 'pink' },
//   ];

//   const fontSizeOptions = [
//     { name: 'Small', value: 'small' },
//     { name: 'Medium', value: 'medium' },
//     { name: 'Large', value: 'large' },
//   ];

//   return (
//     <div className="max-w-4xl mx-auto py-6">
//       <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
//       <div className="bg-white rounded-xl shadow-md overflow-hidden">
//         <div className="p-6 border-b border-gray-100">
//           <h2 className="text-xl font-semibold">Appearance</h2>
//           <p className="text-gray-600 mt-1">Customize how Family Creatives looks for you</p>
//         </div>
        
//         {/* Theme Color */}
//         <div className="p-6 border-b border-gray-100">
//           <div className="flex items-center gap-3 mb-4">
//             <Palette className="w-5 h-5 text-gray-500" />
//             <h3 className="font-medium">Theme Color</h3>
//           </div>
          
//           <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
//             {colorOptions.map((option) => {
//               const optionColors = getThemeColors(option.value);
//               return (
//                 <button
//                   key={option.value}
//                   onClick={() => setColor(option.value)}
//                   className={`relative p-4 rounded-lg border transition-all ${
//                     color === option.value 
//                       ? 'border-2 shadow-sm' 
//                       : 'border-gray-200 hover:border-gray-300'
//                   }`}
//                   style={{ borderColor: color === option.value ? optionColors.primary : '' }}
//                 >
//                   <div 
//                     className="w-full h-8 rounded mb-2"
//                     style={{ backgroundColor: optionColors.primary }}
//                   />
//                   <span className="block text-sm text-center">{option.name}</span>
                  
//                   {color === option.value && (
//                     <div 
//                       className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
//                       style={{ backgroundColor: 'white' }}
//                     >
//                       <Check className="w-3 h-3" style={{ color: optionColors.primary }} />
//                     </div>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
        
//         {/* Font Size */}
//         <div className="p-6 border-b border-gray-100">
//           <div className="flex items-center gap-3 mb-4">
//             <Type className="w-5 h-5 text-gray-500" />
//             <h3 className="font-medium">Font Size</h3>
//           </div>
          
//           <div className="flex flex-wrap gap-3">
//             {fontSizeOptions.map((option) => (
//               <button
//                 key={option.value}
//                 onClick={() => setFontSize(option.value as 'small' | 'medium' | 'large')}
//                 className={`px-4 py-2 rounded-lg transition-colors ${
//                   fontSize === option.value 
//                     ? 'text-white' 
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//                 style={{ 
//                   backgroundColor: fontSize === option.value ? themeColors.primary : '',
//                 }}
//               >
//                 {option.name}
//               </button>
//             ))}
//           </div>
//         </div>
        
//         {/* Dark Mode */}
//         <div className="p-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               {darkMode ? (
//                 <Moon className="w-5 h-5 text-gray-500" />
//               ) : (
//                 <Sun className="w-5 h-5 text-gray-500" />
//               )}
//               <h3 className="font-medium">Dark Mode</h3>
//             </div>
            
//             <button
//               onClick={toggleDarkMode}
//               className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
//               style={{ backgroundColor: darkMode ? themeColors.primary : 'rgb(209 213 219)' }}
//             >
//               <span
//                 className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
//                   darkMode ? 'translate-x-6' : 'translate-x-1'
//                 }`}
//               />
//             </button>
//           </div>
//           <p className="text-gray-500 text-sm mt-2 ml-8">
//             {darkMode 
//               ? 'Switch to light mode for a brighter appearance' 
//               : 'Switch to dark mode to reduce eye strain in low light'}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useEffect } from 'react'; 
// import { Palette, Type, Moon, Sun, Check } from 'lucide-react';
// import { SettingsService } from '../services/settings.service';

// export default function Settings() {
//   const [color, setColor] = React.useState('blue');
//   const [fontSize, setFontSize] = React.useState('medium');
//   const [darkMode, setDarkMode] = React.useState(false);

//   useEffect(() => {
//     const fetchSettings = async () => {
//       try {
//         const userId = 1; // Replace with actual user ID
//         const settings = await SettingsService.getSettings(userId);
//         setColor(settings.theme_color);
//         setFontSize(settings.font_size);
//         setDarkMode(settings.mode === 'dark');
//       } catch (error) {
//         console.error('Failed to fetch settings:', error);
//       }
//     };

//     fetchSettings();
//   }, []);

//   const colorOptions = [
//     { name: 'Blue', value: '#1877f2' },
//     { name: 'Purple', value: '#8e44ad' },
//     { name: 'Green', value: '#27ae60' },
//     { name: 'Orange', value: '#e67e22' },
//     { name: 'Pink', value: '#e84393' },
//   ];
//   // blue: {
//   //   primary: '#1877f2',
//   //   hover: '#166fe5',
//   //   light: '#e7f3ff',
//   // },
//   // purple: {
//   //   primary: '#8e44ad',
//   //   hover: '#7d3c98',
//   //   light: '#f5eeff',
//   // },
//   // green: {
//   //   primary: '#27ae60',
//   //   hover: '#219955',
//   //   light: '#e6f7ef',
//   // },
//   // orange: {
//   //   primary: '#e67e22',
//   //   hover: '#d35400',
//   //   light: '#fff5eb',
//   // },
//   // pink: {
//   //   primary: '#e84393',
//   //   hover: '#d63384',
//   //   light: '#ffeef8',
//   // },
//   // light: {
//   //   primary: '#ffffff',
//   //   hover: '#f8f9fa',
//   //   light: '#ffffff',
//   //   outline: '#1877f2'
//   // }

//   const fontSizeOptions = [
//     { name: 'Small', value: 'small' },
//     { name: 'Medium', value: 'medium' },
//     { name: 'Large', value: 'large' },
//   ];

//   return (
//     <div className="max-w-4xl mx-auto py-6">
//       <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
//       <div className="bg-white rounded-xl shadow-md overflow-hidden">
//         <div className="p-6 border-b border-gray-100">
//           <h2 className="text-xl font-semibold">Appearance</h2>
//           <p className="text-gray-600 mt-1">Customize how Family Creatives looks for you</p>
//         </div>
        
//         {/* Theme Color */}
//         <div className="p-6 border-b border-gray-100">
//           <div className="flex items-center gap-3 mb-4">
//             <Palette className="w-5 h-5 text-gray-500" />
//             <h3 className="font-medium">Theme Color</h3>
//           </div>
          
//           <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
//             {colorOptions.map((option) => (
//               <button
//                 key={option.value}
//                 onClick={() => setColor(option.value)}
//                 className={`relative p-4 rounded-lg border transition-all ${
//                   color === option.value 
//                     ? 'border-2 shadow-sm' 
//                     : 'border-gray-200 hover:border-gray-300'
//                 }`}
//               >
//                 <div 
//                   className="w-full h-8 rounded mb-2"
//                   style={{ backgroundColor: option.value }}
//                 />
//                 <span className="block text-sm text-center">{option.name}</span>
                
//                 {color === option.value && (
//                   <div 
//                     className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
//                     style={{ backgroundColor: 'white' }}
//                   >
//                     <Check className="w-3 h-3" style={{ color: option.value }} />
//                   </div>
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>
        
//         {/* Font Size */}
//         <div className="p-6 border-b border-gray-100">
//           <div className="flex items-center gap-3 mb-4">
//             <Type className="w-5 h-5 text-gray-500" />
//             <h3 className="font-medium">Font Size</h3>
//           </div>
          
//           <div className="flex flex-wrap gap-3">
//             {fontSizeOptions.map((option) => (
//               <button
//                 key={option.value}
//                 onClick={() => setFontSize(option.value)}
//                 className={`px-4 py-2 rounded-lg transition-colors ${
//                   fontSize === option.value 
//                     ? 'text-white' 
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//                 style={{ backgroundColor: fontSize === option.value ? color : '' }}
//               >
//                 {option.name}
//               </button>
//             ))}
//           </div>
//         </div>
        
//         {/* Dark Mode */}
//         <div className="p-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               {darkMode ? <Moon className="w-5 h-5 text-gray-500" /> : <Sun className="w-5 h-5 text-gray-500" />}
//               <h3 className="font-medium">Dark Mode</h3>
//             </div>
            
//             <button
//               onClick={() => setDarkMode(!darkMode)}
//               className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
//               style={{ backgroundColor: darkMode ? color : 'rgb(209 213 219)' }}
//             >
//               <span
//                 className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
//                   darkMode ? 'translate-x-6' : 'translate-x-1'
//                 }`}
//               />
//             </button>
//           </div>
//           <p className="text-gray-500 text-sm mt-2 ml-8">
//             {darkMode 
//               ? 'Switch to light mode for a brighter appearance' 
//               : 'Switch to dark mode to reduce eye strain in low light'}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


