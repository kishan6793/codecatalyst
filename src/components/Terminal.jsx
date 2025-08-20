import React, { useState, useEffect, useCallback, memo } from 'react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import useCodeExecution from '../hooks/useCodeExecution';
import { useTheme } from '../hooks/useTheme';

const Terminal = ({
  onClose,
  code,
  language,
  version,
  shouldExecuteCode,
  setShouldExecuteCode,
}) => {
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const [inputWidth, setInputWidth] = useState(400);
  const [size, setSize] = useState({ width: window.innerWidth, height: 250 });
  const { GlobalTheme } = useTheme();

  const { output, isLoading, error, executeCode } = useCodeExecution();

  const handleInputChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const handleFileChange = useCallback((e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setInput(e.target.result);
      };
      reader.readAsText(selectedFile);
    }
  }, []);

  const onResize = useCallback((event, { size }) => {
    setInputWidth(size.width);
  }, []);

  const onResizeMain = useCallback((event, { size }) => {
    setSize(size);
  }, []);

  useEffect(() => {
    if (shouldExecuteCode) {
      executeCode(language, version, code, input);
      setShouldExecuteCode(false);
    }
  }, [shouldExecuteCode]);

  // Clean theme colors
  const themeColors = {
    dark: {
      background: '#1e1e1e',
      headerBg: '#252527',
      text: '#e8e8e8',
      border: '#454545',
      inputBg: '#2d2d2d',
      buttonHover: '#3a3a3a',
      accent: '#569cd6',
      error: '#f48771',
      success: '#608b4e',
    },
    light: {
      background: '#ffffff',
      headerBg: '#f7f7f7',
      text: '#262626',
      border: '#e1e1e1',
      inputBg: '#f5f5f5',
      buttonHover: '#eaeaea',
      accent: '#0078d4',
      error: '#a1260d',
      success: '#428542',
    },
  };

  const currentTheme = themeColors[GlobalTheme];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 font-mono text-sm shadow-lg border-t"
      style={{
        backgroundColor: currentTheme.background,
        color: currentTheme.text,
        borderColor: currentTheme.border,
      }}
    >
      {/* Resizable Terminal */}
      <Resizable
        width={size.width}
        height={size.height}
        onResize={onResizeMain}
        minConstraints={[300, 150]}
        maxConstraints={[Infinity, 400]}
        resizeHandles={['n']}
      >
        <div className="flex h-full" style={{ width: size.width, height: size.height }}>
          {/* Input Section */}
          <Resizable
            width={inputWidth}
            height={Infinity}
            onResize={onResize}
            minConstraints={[200, Infinity]}
            maxConstraints={[600, Infinity]}
            axis="x"
            resizeHandles={['e']}
          >
            <div
              className="p-3 border-r flex flex-col h-full"
              style={{
                width: inputWidth,
                backgroundColor: currentTheme.background,
                borderColor: currentTheme.border,
              }}
            >
              <div
                className="mb-2 text-xs uppercase font-medium"
                style={{ color: currentTheme.accent }}
              >
                Custom Input
              </div>
              <textarea
                value={input}
                onChange={handleInputChange}
                className="flex-1 w-full p-2 rounded font-mono text-sm resize-none outline-none"
                style={{
                  backgroundColor: currentTheme.inputBg,
                  color: currentTheme.text,
                  borderColor: currentTheme.border,
                }}
                placeholder="// Enter input here..."
              />
              <div className="mt-2">
                <label className="text-xs block mb-1" style={{ color: currentTheme.accent }}>
                  Or upload input file:
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="block w-full text-xs"
                  style={{
                    color: currentTheme.text,
                  }}
                />
              </div>
            </div>
          </Resizable>

          {/* Output Section */}
          <div
            className="flex flex-col h-full p-3 overflow-auto relative"
            style={{
              width: `calc(100% - ${inputWidth}px)`,
              backgroundColor: currentTheme.background,
            }}
          >
            {/* Close button*/}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 p-1 rounded hover:bg-opacity-50 transition-all z-10"
              style={{
                backgroundColor: currentTheme.buttonHover,
                color: currentTheme.text,
              }}
            >
              ×
            </button>

            <div
              className="mb-2 text-xs uppercase font-medium"
              style={{ color: currentTheme.accent }}
            >
              Output
            </div>
            <div
              className="flex-1 p-2 rounded font-mono text-sm whitespace-pre-wrap overflow-auto"
              style={{
                backgroundColor: currentTheme.inputBg,
                color: error ? currentTheme.error : currentTheme.text,
              }}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                  <span>Running code...</span>
                </div>
              ) : error ? (
                output ? (
                  <>
                    <span style={{ color: currentTheme.error }}>Error: </span>
                    {error}
                    <div
                      className="mt-4 border-t pt-2"
                      style={{ borderColor: currentTheme.border }}
                    >
                      <div className="font-medium">Output before error:</div>
                      <div>{output}</div>
                    </div>
                  </>
                ) : (
                  error
                )
              ) : output ? (
                output
              ) : (
                <span className="text-gray-400">No output yet. Run your code to see results.</span>
              )}
            </div>
          </div>
          
        </div>
      </Resizable>
    </div>
  );
};

export default memo(Terminal);
