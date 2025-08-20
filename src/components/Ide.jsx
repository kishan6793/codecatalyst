import React, { useEffect, useState, useRef, useCallback, memo } from 'react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { lineNumbers } from '@codemirror/view';
import { EditorView } from '@codemirror/view';
import { autocompletion } from '@codemirror/autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { useLanguageData } from '../hooks/useLanguageData';
import { LANGUAGE_DATA } from '../utils/LANGUAGE_DATA';
import { THEMES, getTheme } from '../utils/themesUtils';
import { handleDownload } from '../utils/downloadUtils';
import { modifyFileCode, fetchFiles } from '../store/fileSlice';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import Terminal from './Terminal';
import AiChat from './AiChat';
import Filebar from './Filebar';
import Toolbar from './ToolbarComponent';
import Header from './Header';
import { useTheme } from '../hooks/useTheme';

const Ide = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('editor-theme') || 'vscodeDark');
  const [isWrappingEnabled, setIsWrappingEnabled] = useState(false);
  const [isTerminalVisible, setIsTerminalVisible] = useState(false);
  const [isFileBarVisible, setIsFileBarVisible] = useState(true);
  const [fileBarWidth, setFileBarWidth] = useState(330);
  const [fontSize, setFontSize] = useState(() => {
    const savedFontSize = localStorage.getItem('editorFontSize');
    return savedFontSize ? parseInt(savedFontSize, 10) : 14;
  });
  const [shouldExecuteCode, setShouldExecuteCode] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [toolbarHeight, setToolbarHeight] = useState(0);

  const headerRef = useRef(null);
  const toolbarRef = useRef(null);

  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.AuthStatus);
  const selectedFileId = useSelector((state) => state.file.selectedFileId);
  const files = useSelector((state) => state.file.files);
  const selectedFile = files.find((file) => file.id === selectedFileId);
  const userId = useSelector((state) => state.auth.userId);
  const { GlobalTheme } = useTheme();

  
  useEffect(() => {
    localStorage.setItem('editor-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    if (toolbarRef.current) {
      setToolbarHeight(toolbarRef.current.clientHeight);
    }
  }, []);

  

  const { language, code, setCode, selectedLanguageData, handleLanguageChange } = useLanguageData();

  const onResize = useCallback((event, { size }) => {
    setFileBarWidth(size.width);
  }, []);

  const getLanguageExtension = () => {
    switch (language) {
      case 'javascript':
        return javascript();
      case 'python':
        return python();
      default:
        return javascript();
    }
  };


  const handleEditorChange = useCallback(
    (value) => {
      setCode(value);
    },
    [setCode],
  );

  const handleDownloadClick = useCallback(() => {
    if (authStatus && selectedFile) {
      handleDownload(code, language, selectedFile.name);
    } else {
      handleDownload(code, language);
    }
  }, [authStatus, selectedFile, code, language]);

  const updateFontSize = useCallback((newSize) => {
    setFontSize(newSize);
    localStorage.setItem('editorFontSize', newSize.toString());
  }, []);

  const handleRunCode = useCallback(async () => {
    if (!isTerminalVisible) {
      setIsTerminalVisible(true);
    }
    setShouldExecuteCode(true);
  }, [isTerminalVisible]);

  return (
    <div className="flex flex-col h-screen">
      <div ref={headerRef} className="fixed top-0 left-0 w-full">
        <Header />
      </div>

      <div
        ref={toolbarRef}
        className="fixed left-0 w-full"
        style={{ top: `${headerHeight}px` }}
      >
        <Toolbar
          authStatus={authStatus}
          theme={theme}
          setTheme={setTheme}
          isWrappingEnabled={isWrappingEnabled}
          setIsWrappingEnabled={setIsWrappingEnabled}
          isTerminalVisible={isTerminalVisible}
          setIsTerminalVisible={setIsTerminalVisible}
          isFileBarVisible={isFileBarVisible}
          setIsFileBarVisible={setIsFileBarVisible}
          fontSize={fontSize}
          updateFontSize={updateFontSize}
          handleRunCode={handleRunCode}
          handleDownloadClick={handleDownloadClick}
          selectedLanguageData={selectedLanguageData}
          language={language}
          handleLanguageChange={handleLanguageChange}
          THEMES={THEMES}
        />
      </div>

      <div
        className="flex-1 flex flex-col h-full"
        style={{
          marginTop: `${headerHeight + toolbarHeight}px`,
          height: `calc(100vh - ${headerHeight + toolbarHeight}px)`,
        }}
      >
        <div className="flex h-full">
          {authStatus && isFileBarVisible && (
            <Resizable
              width={fileBarWidth}
              height={Infinity}
              onResize={onResize}
              minConstraints={[200, Infinity]}
              maxConstraints={[400, Infinity]}
              axis="x"
              resizeHandles={['e']}
            >
              <div
                style={{ width: fileBarWidth }}
                className="bg-gray-900 text-white p-3 overflow-y-auto overflow-x-hidden"
              >
                <Filebar onClose={() => setIsFileBarVisible(false)} />
              </div>
            </Resizable>
          )}

          <div
            style={{
              width: `calc(100% - ${authStatus && isFileBarVisible ? fileBarWidth : 0}px)`,
              height: '100%',
            }}
            className="h-full flex flex-col"
          >
            <div
              className={`flex-1 overflow-auto ${
                GlobalTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
              }`}
            >
              {authStatus && selectedFile == null && (
                <div
                  className={`flex items-center justify-center w-full h-full ${
                    GlobalTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
                  }`}
                >
                  <Card
                    sx={{
                      maxWidth: 400,
                      width: '100%',
                      padding: 2,
                      backgroundColor:
                        GlobalTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                      borderRadius: 2,
                      boxShadow: 3,
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h5"
                        align="center"
                        sx={{
                          marginBottom: 2,
                          fontWeight: 'bold',
                          color: GlobalTheme === 'dark' ? '#fff' : '#000',
                        }}
                      >
                        Create a New File to Start Working
                      </Typography>
                      <Typography
                        variant="body1"
                        align="center"
                        sx={{
                          color:
                            GlobalTheme === 'dark'
                              ? 'rgba(255, 255, 255, 0.7)'
                              : 'rgba(0, 0, 0, 0.7)',
                          marginBottom: 3,
                        }}
                      >
                        Start by creating your first file. Once you create a file, you can start
                        editing and running code.
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              )}

              {(!authStatus || (authStatus && files.length > 0 && selectedFileId)) && (
                <CodeMirror
                  value={code}
                  extensions={[
                    getLanguageExtension(),
                    lineNumbers(),
                    autocompletion(),
                    isWrappingEnabled ? EditorView.lineWrapping : [],
                  ]}
                  theme={getTheme(theme)}
                  height="100%"
                  width="100%"
                  onChange={handleEditorChange}
                  basicSetup={{
                    lineWrapping: isWrappingEnabled,
                  }}
                  style={{ fontSize: `${fontSize}px`, height: '100%' }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isTerminalVisible && (
        <Terminal
          onClose={() => setIsTerminalVisible((prev) => !prev)}
          code={code}
          language={language}
          version={selectedLanguageData.version}
          shouldExecuteCode={shouldExecuteCode}
          setShouldExecuteCode={setShouldExecuteCode}
        />
      )}

      <AiChat />
    </div>
  );
};

export default memo(Ide);
