import React, { memo, useCallback, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Select,
  Button,
  Box,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Terminal as TerminalIcon,
  Download as DownloadIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { LANGUAGE_DATA } from '../utils/LANGUAGE_DATA';
import { useTheme } from '../hooks/useTheme';
import SettingsPopup from './SettingsPopup';
import { useSelector } from 'react-redux';

const ToolbarComponent = ({
  authStatus,
  theme,
  setTheme,
  isWrappingEnabled,
  setIsWrappingEnabled,
  setIsTerminalVisible,
  setIsFileBarVisible,
  fontSize,
  updateFontSize,
  handleRunCode,
  handleDownloadClick,
  selectedLanguageData,
  language,
  handleLanguageChange,
  THEMES = {},
}) => {
  const { GlobalTheme } = useTheme();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const isExecuting = useSelector((state) => state.execution.isExecuting);

  // Simplified theme colors without borders
  const currentTheme = {
    appBar: GlobalTheme === 'dark' ? '#1E1E1E' : '#FFFFFF',
    text: GlobalTheme === 'dark' ? '#FFFFFF' : '#000000',
    selectBackground: GlobalTheme === 'dark' ? '#252526' : '#F3F3F3',
    buttonHover: GlobalTheme === 'dark' ? '#333333' : '#E5E5E5',
  };

  const handleFileBarToggle = useCallback(() => {
    setIsFileBarVisible((prev) => !prev);
  }, [setIsFileBarVisible]);

  const handleTerminalToggle = useCallback(() => {
    setIsTerminalVisible((prev) => !prev);
  }, [setIsTerminalVisible]);

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
  };

  const handleSettingsClose = () => {
    setSettingsOpen(false);
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: currentTheme.appBar,
          color: currentTheme.text,
        }}
      >
        <Toolbar sx={{ padding: '0 16px' }}>
          {/* Left Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {authStatus && (
              <Tooltip title="Toggle File Bar">
                <IconButton
                  onClick={handleFileBarToggle}
                  color="inherit"
                  edge="start"
                  sx={{
                    '&:hover': {
                      backgroundColor: currentTheme.buttonHover,
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            )}
            {!authStatus && (
              <>
                {selectedLanguageData && (
                  <img
                    src={selectedLanguageData.icon}
                    alt={`${selectedLanguageData.language} logo`}
                    className="w-6 h-6"
                  />
                )}
                <Tooltip title="Select Language">
                  <Select
                    value={language}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    sx={{
                      bgcolor: currentTheme.selectBackground,
                      color: currentTheme.text,
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                      },
                      '& .MuiSelect-select': {
                        padding: '8px 32px 8px 12px',
                      },
                      minWidth: 150,
                      borderRadius: '4px',
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          bgcolor: currentTheme.appBar,
                          color: currentTheme.text,
                        },
                      },
                    }}
                  >
                    {LANGUAGE_DATA.map((lang) => (
                      <MenuItem
                        key={lang.language}
                        value={lang.language}
                        sx={{
                          '&:hover': {
                            bgcolor: currentTheme.buttonHover,
                          },
                        }}
                      >
                        {lang.language} ({lang.version})
                      </MenuItem>
                    ))}
                  </Select>
                </Tooltip>
              </>
            )}
            {THEMES && Object.keys(THEMES).length > 0 && (
              <Tooltip title="Select Theme">
                <Select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  sx={{
                    bgcolor: currentTheme.selectBackground,
                    color: currentTheme.text,
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '& .MuiSelect-select': {
                      padding: '8px 32px 8px 12px',
                    },
                    minWidth: 120,
                    borderRadius: '4px',
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: currentTheme.appBar,
                        color: currentTheme.text,
                      },
                    },
                  }}
                >
                  {Object.keys(THEMES).map((themeName) => (
                    <MenuItem
                      key={themeName}
                      value={themeName}
                      sx={{
                        '&:hover': {
                          bgcolor: currentTheme.buttonHover,
                        },
                      }}
                    >
                      {themeName}
                    </MenuItem>
                  ))}
                </Select>
              </Tooltip>
            )}
          </Box>

          {/* Center Section */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 1 }}>
            <Tooltip title="Run Code">
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#4CAF50',
                  '&:hover': { bgcolor: '#45a049' },
                  minWidth: 120,
                  height: 36,
                  position: 'relative',
                  '&:disabled': {
                    bgcolor: '#4CAF50',
                    opacity: 0.8,
                  },
                }}
                onClick={handleRunCode}
                disabled={isExecuting}
              >
                {isExecuting ? (
                  <CircularProgress size={24} thickness={4} sx={{ color: 'white' }} />
                ) : (
                  'Run Code'
                )}
              </Button>
            </Tooltip>
            <Tooltip title="Toggle Terminal">
              <IconButton
                onClick={handleTerminalToggle}
                sx={{
                  color: '#FFD700',
                  '&:hover': {
                    backgroundColor: currentTheme.buttonHover,
                  },
                }}
              >
                <TerminalIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Right Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Settings">
              <IconButton
                onClick={handleSettingsOpen}
                sx={{
                  color: currentTheme.text,
                  '&:hover': {
                    backgroundColor: currentTheme.buttonHover,
                  },
                }}
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download Code">
              <IconButton
                onClick={handleDownloadClick}
                sx={{
                  color: '#2196F3',
                  '&:hover': {
                    backgroundColor: currentTheme.buttonHover,
                  },
                }}
              >
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <SettingsPopup
        open={settingsOpen}
        onClose={handleSettingsClose}
        isWrappingEnabled={isWrappingEnabled}
        setIsWrappingEnabled={setIsWrappingEnabled}
        fontSize={fontSize}
        updateFontSize={updateFontSize}
        currentTheme={currentTheme}
      />
    </>
  );
};

export default memo(ToolbarComponent);
