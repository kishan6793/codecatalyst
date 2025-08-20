import React from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slider,
  Typography,
  Switch,
  styled,
} from '@mui/material';
import {
  TextIncrease as TextIncreaseIcon,
  TextDecrease as TextDecreaseIcon,
} from '@mui/icons-material';
import { useTheme } from '../hooks/useTheme';

// Custom styled switch component
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme, currenttheme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: currenttheme.switchTrack,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: currenttheme.primary,
      border: '6px solid #fff',
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
    backgroundColor: currenttheme.switchThumb,
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const SettingsPopup = ({
  open,
  onClose,
  isWrappingEnabled,
  setIsWrappingEnabled,
  fontSize,
  updateFontSize,
}) => {
  const { GlobalTheme } = useTheme();

  const themeColors = {
    dark: {
      background: '#1E1E1E',
      textPrimary: '#FFFFFF',
      textSecondary: '#AAAAAA',
      divider: '#3A3A3A',
      primary: '#4A80F0',
      hover: 'rgba(255, 255, 255, 0.08)',
      switchTrack: isWrappingEnabled ? '#4CAF50' : '#F44336',
      switchThumb: '#FFFFFF',
    },
    light: {
      background: '#FFFFFF',
      textPrimary: '#333333',
      textSecondary: '#666666',
      divider: '#E0E0E0',
      primary: '#2962FF',
      hover: 'rgba(0, 0, 0, 0.04)',
      switchTrack: isWrappingEnabled ? '#4CAF50' : '#F44336',
      switchThumb: '#FFFFFF',
    },
  };

  const currenttheme = themeColors[GlobalTheme];

  const handleFontSizeChange = (e, newValue) => {
    updateFontSize(newValue);
  };

  const handleWrappingToggle = () => {
    setIsWrappingEnabled((prev) => !prev);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: currenttheme.background,
          border: `1px solid ${currenttheme.divider}`,
          borderRadius: '12px',
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.16)',
          overflow: 'hidden',
        },
      }}
    >
      <DialogTitle
        sx={{
          color: currenttheme.textPrimary,
          borderBottom: `1px solid ${currenttheme.divider}`,
          padding: '16px 24px',
          fontWeight: 600,
          fontSize: '1.125rem',
          backgroundColor: currenttheme.background,
        }}
      >
        Editor Settings
      </DialogTitle>

      <DialogContent
        sx={{
          padding: '20px 24px',
          backgroundColor: currenttheme.background,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          {/* Font Size Control */}
          <Box>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{
                fontWeight: 500,
                color: currenttheme.textPrimary,
                marginBottom: '8px',
              }}
            >
              Font Size
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                padding: '0 8px',
              }}
            >
              <TextDecreaseIcon
                sx={{
                  color: currenttheme.textSecondary,
                  fontSize: '1.25rem',
                }}
              />
              <Slider
                value={fontSize}
                min={10}
                max={30}
                step={1}
                onChange={handleFontSizeChange}
                sx={{
                  flexGrow: 1,
                  color: currenttheme.primary,
                  height: 6,
                  '& .MuiSlider-thumb': {
                    width: 16,
                    height: 16,
                    backgroundColor: currenttheme.primary,
                    '&:hover, &.Mui-focusVisible': {
                      boxShadow: `0 0 0 6px ${currenttheme.hover}`,
                    },
                    '&.Mui-active': {
                      width: 20,
                      height: 20,
                    },
                  },
                  '& .MuiSlider-rail': {
                    opacity: 0.3,
                    backgroundColor: currenttheme.textSecondary,
                  },
                  '& .MuiSlider-track': {
                    border: 'none',
                  },
                }}
              />
              <TextIncreaseIcon
                sx={{
                  color: currenttheme.textSecondary,
                  fontSize: '1.25rem',
                }}
              />
            </Box>
          </Box>

          {/* Word Wrap Toggle */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderRadius: '8px',
              backgroundColor: currenttheme.hover,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 500,
                color: currenttheme.textPrimary,
              }}
            >
              Word Wrap
            </Typography>
            <IOSSwitch
              checked={isWrappingEnabled}
              onChange={handleWrappingToggle}
              currenttheme={currenttheme}
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          borderTop: `1px solid ${currenttheme.divider}`,
          padding: '16px 24px',
          backgroundColor: currenttheme.background,
        }}
      >
        <Button
          onClick={onClose}
          variant="text"
          sx={{
            color: currenttheme.textSecondary,
            fontWeight: 500,
            borderRadius: '8px',
            padding: '6px 16px',
            '&:hover': {
              backgroundColor: currenttheme.hover,
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsPopup;
