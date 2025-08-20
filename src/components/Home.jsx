import React from 'react';
import Card from './Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import UpcomingContestsPopup from './UpcomingContestsPopup';
import { useTheme } from '../hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';

function Home() {
  const navigate = useNavigate();
  const { GlobalTheme } = useTheme();

  const features = [
    {
      title: 'Multiple Themes',
      description: 'Switch between differenet themes for a personalized experience.',
      icon: '🎨',
    },
    {
      title: 'Download File',
      description: 'Download your code files directly to your device for offline access.',
      icon: '📥',
    },
    {
      title: 'AI Chatbot Support',
      description: 'Get real-time coding help using our AI-powered assistant.',
      icon: '🤖',
    },
    {
      title: 'Integrated Terminal',
      description: 'debug your code with a built-in terminal.',
      icon: '💻',
    },
    {
      title: 'Code Anywhere',
      description: 'Access your projects and collaborate in real-time from any device.',
      icon: '🌐',
    },
    {
      title: 'Rich Editor',
      description: 'Enjoy syntax highlighting, word-wrap, themes, and more.',
      icon: '✍️',
    },
    {
      title: 'File Saving with Login',
      description: 'Save your files securely and access them anytime when logged in.',
      icon: '🔒',
    },
    {
      title: 'Multiple Languages Supported',
      description:
        'Write and run code in various programming languages, including Python, Java, and C++.',
      icon: '🌍',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const bounceVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 120 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`w-full min-h-screen flex flex-col items-center ${
        GlobalTheme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 to-black text-gray-200'
          : 'bg-gradient-to-br from-blue-100 to-white text-gray-900'
      }`}
    >
      {/* Main Content */}
      <motion.div
        className={`w-full max-w-4xl text-center p-10 rounded-2xl shadow-xl mx-4 mt-10 ${
          GlobalTheme === 'dark'
            ? 'bg-opacity-80 bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100 border border-gray-700'
            : 'bg-opacity-90 bg-gradient-to-br from-blue-200 to-blue-100 text-gray-900 border border-blue-300'
        }`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Heading */}
        <motion.div variants={itemVariants}>
          <Typography
            variant="h3"
            className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-gradient-text"
            style={{
              fontSize: '3.5rem',
              lineHeight: '1.2',
              fontFamily: "'Poppins', sans-serif",
              animation: 'gradientText 5s ease infinite',
            }}
          >
            Welcome to CodeCatalyst
          </Typography>
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={itemVariants}>
          <Typography
            variant="subtitle1"
            className="mt-8 italic opacity-85 text-lg font-medium"
            style={{
              fontFamily: "'Merriweather', serif",
              color: GlobalTheme === 'dark' ? '#d1d5db' : '#374151',
            }}
          >
            "Programming isn't about what you know; it's about what you can figure out."
          </Typography>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          variants={containerVariants}
        >
          <motion.div variants={bounceVariants}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/guest')}
              className="px-6 py-3 text-lg rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 font-semibold"
              style={{
                background: 'linear-gradient(45deg, #3b82f6, #9333ea)',
                color: '#fff',
              }}
            >
              Explore as Guest
            </Button>
          </motion.div>

          <motion.div variants={bounceVariants}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<span className="material-icons">lock_open</span>}
              onClick={() => navigate('/signup')}
              className="px-6 py-3 text-lg rounded-full border-2 hover:scale-105 hover:border-blue-500 hover:text-blue-500 transition-all duration-300 font-semibold"
              style={{
                borderColor: '#3b82f6',
                color: '#3b82f6',
              }}
            >
              Sign up for free
            </Button>
          </motion.div>
        </motion.div>

        {/* Footer Text */}
        <motion.div variants={itemVariants}>
          <Typography
            variant="body2"
            className="mt-8 text-sm opacity-70 pt-5"
            style={{
              fontFamily: "'Open Sans', sans-serif",
              color: GlobalTheme === 'dark' ? '#9ca3af' : '#6b7280',
            }}
          >
            Log in to access advanced features like file saving and personalized settings.
          </Typography>
        </motion.div>
      </motion.div>

      {/* Demo Section */}

      {/* Demo Section */}
      <motion.div
        className={`w-full max-w-5xl px-4 py-12 mt-16 rounded-2xl shadow-2xl ${
          GlobalTheme === 'dark'
            ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-gray-200'
            : 'bg-gradient-to-br from-blue-100 to-white text-gray-900'
        }`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Subtitle Text */}
        <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
          <Typography
            variant="body1"
            className="text-center text-lg opacity-80"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Experience the intuitive interface and powerful tools built to accelerate your coding
            journey — all in one browser-based environment.
          </Typography>
        </motion.div>

        {/* Demo Image */}
        <motion.div
          className="flex justify-center mt-8"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.99 }}
          transition={{ type: 'spring', stiffness: 120 }}
        >
          <img
            src="/image.png"
            alt="CodeCatalyst Demo"
            className="rounded-2xl border shadow-lg w-full max-w-4xl transition-transform duration-300 hover:shadow-2xl hover:brightness-105"
          />
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="mt-10 p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Features Heading */}
        <motion.div variants={itemVariants}>
          <Typography
            variant="h4"
            className="text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-400 animate-gradient-text"
            style={{
              fontSize: '2.5rem',
              fontFamily: "'Poppins', sans-serif",
              animation: 'gradientText 5s ease infinite',
            }}
          >
            Why CodeCatalyst?
          </Typography>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card title={feature.title} description={feature.description} icon={feature.icon} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Upcoming Contests Popup */}
      <UpcomingContestsPopup />
    </motion.div>
  );
}

export default Home;
