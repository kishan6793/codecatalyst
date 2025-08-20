import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../hooks/useTheme';

const UpcomingContestsPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ongoingContest, setOngoingContest] = useState(null);
  const { GlobalTheme } = useTheme();

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const fetchContests = async () => {
    try {
      const response = await axios.get('https://codeforces.com/api/contest.list');
      const data = response.data;

      if (data.status === 'OK') {
        const allContests = data.result;

        const todayContests = allContests.filter((contest) => {
          const contestDate = new Date(contest.startTimeSeconds * 1000);
          return isToday(contestDate);
        });

        if (todayContests.length > 0) {
          setOngoingContest(todayContests[0]);
        }

        let upcomingContests = allContests.filter((contest) => contest.phase === 'BEFORE');

        upcomingContests.sort((a, b) => a.startTimeSeconds - b.startTimeSeconds);

        setContests(upcomingContests);
      } else {
        setError('Failed to fetch contests. Please try again later.');
      }
    } catch (err) {
      setError('An error occurred while fetching contests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContests();
  }, []);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  // Theme-based colors
  const themeColors = {
    dark: {
      background: '#1E1E1E', // VS Code dark background
      text: '#D4D4D4', // Light gray text
      border: '#333333', // Dark border
      buttonBackground: ongoingContest ? '#10B981' : '#4EC9B0', // VS Code cyan/green for buttons
      buttonHover: ongoingContest ? '#059669' : '#6BD8C2', // VS Code cyan/green hover
      popupBackground: '#252526', // VS Code dark card background
      popupText: '#D4D4D4', // Light gray text
      popupBorder: '#333333', // Dark border
      ongoingContestBackground: '#10B981', // Green for ongoing contest
      ongoingContestText: '#FFFFFF', // White text
      errorText: '#FF5555', // Red for errors
    },
    light: {
      background: '#FFFFFF', // Light background
      text: '#1F2937', // Dark text
      border: '#E5E7EB', // Light border
      buttonBackground: ongoingContest ? '#34D399' : '#3B82F6', // Light mode cyan/green for buttons
      buttonHover: ongoingContest ? '#2E8B57' : '#2563EB', // Light mode cyan/green hover
      popupBackground: '#F9FAFB', // Light card background
      popupText: '#1F2937', // Dark text
      popupBorder: '#E5E7EB', // Light border
      ongoingContestBackground: '#34D399', // Green for ongoing contest
      ongoingContestText: '#FFFFFF', // White text
      errorText: '#FF0000', // Red for errors
    },
  };

  const currentTheme = themeColors[GlobalTheme]; // Use GlobalTheme from Redux

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={togglePopup}
        className={`${
          ongoingContest
            ? 'bg-green-600 hover:bg-green-700 animate-pulse'
            : 'bg-cyan-600 hover:bg-cyan-700'
        } text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all`}
        style={{
          backgroundColor: currentTheme.buttonBackground,
          color: currentTheme.text,
        }}
      >
        {ongoingContest ? `🏆Today ${ongoingContest.name}` : '🏆 Upcoming Contests'}
      </button>

      {/* Popup */}
      {isOpen && (
        <div
          className="absolute bottom-14 right-0 w-80 rounded-lg shadow-lg p-4"
          style={{
            backgroundColor: currentTheme.popupBackground,
            border: `1px solid ${currentTheme.popupBorder}`,
          }}
        >
          <h3 className="text-lg font-bold mb-4" style={{ color: currentTheme.cyanText }}>
            {ongoingContest ? 'Ongoing Contest' : 'Upcoming Contests'}
          </h3>

          {/* Loading State */}
          {loading && <p style={{ color: currentTheme.popupText }}>Loading...</p>}

          {/* Error State */}
          {error && <p style={{ color: currentTheme.errorText }}>{error}</p>}

          {/* Ongoing Contest */}
          {ongoingContest && (
            <div
              className="mb-4 p-3 rounded-lg"
              style={{
                backgroundColor: currentTheme.ongoingContestBackground,
              }}
            >
              <p style={{ color: currentTheme.ongoingContestText }} className="font-semibold">
                {ongoingContest.name}
              </p>
              <p style={{ color: currentTheme.ongoingContestText }} className="text-sm">
                Started at: {new Date(ongoingContest.startTimeSeconds * 1000).toLocaleString()}
              </p>
            </div>
          )}

          {/* Upcoming Contests */}
          {!loading && !error && (
            <div className="max-h-64 overflow-y-auto">
              {contests.length === 0 ? (
                <p style={{ color: currentTheme.popupText }}>No upcoming contests found.</p>
              ) : (
                contests.map((contest) => (
                  <div key={contest.id} className="mb-3">
                    <p style={{ color: currentTheme.popupText }} className="font-semibold">
                      {contest.name}
                    </p>
                    <p style={{ color: currentTheme.popupText }} className="text-sm">
                      Starts at: {new Date(contest.startTimeSeconds * 1000).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UpcomingContestsPopup;
