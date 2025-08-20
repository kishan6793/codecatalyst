import React, { useState, useCallback, memo } from 'react';
import 'react-resizable/css/styles.css';
import { Rnd } from 'react-rnd';
import { model } from '../conf/conf';
import { IconButton, CircularProgress } from '@mui/material';
import { Send, Close, Chat } from '@mui/icons-material';

const AiChat = memo(() => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [size, setSize] = useState({ width: 320, height: 384 });
  const [state, setState] = useState({
    width: 400,
    height: 400,
    x: -400,
    y: -400,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = useCallback(
    async (e) => {
      e.preventDefault();
      if (input.trim()) {
        setMessages((prevMessages) => [...prevMessages, { text: input, sender: 'user' }]);
        setInput('');
        setIsLoading(true);

        try {
          const result = await model.generateContent(input);
          const response = await result.response;
          const text = response.text();

          setMessages((prevMessages) => [...prevMessages, { text: text, sender: 'ai' }]);
        } catch (error) {
          console.error('Error calling Gemini API:', error);
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: 'Sorry, something went wrong. Please try again.', sender: 'ai' },
          ]);
        } finally {
          setIsLoading(false);
        }
      }
    },
    [input],
  );

  const onResize = useCallback((event, { size }) => {
    setSize(size);
  }, []);

  const formatTextWithNewLines = (text) => {
    return { __html: text.replace(/\n/g, '<br />') };
  };

  return (
    <div className="fixed bottom-4 right-4">
      {!isExpanded && (
        <IconButton
          onClick={() => setIsExpanded((prev) => !prev)}
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': { backgroundColor: 'primary.dark' },
          }}
        >
          <Chat />
        </IconButton>
      )}

      {isExpanded && (
        <Rnd
          size={{ width: state.width, height: state.height }}
          position={{ x: state.x, y: state.y }}
          onDragStop={(e, d) => {
            setState((prevState) => ({
              ...prevState,
              x: d.x,
              y: d.y,
            }));
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            setState((prevState) => ({
              ...prevState,
              width: ref.style.width,
              height: ref.style.height,
              x: position.x,
              y: position.y,
            }));
          }}
          enableResizing={{
            bottom: true,
            bottomRight: true,
            bottomLeft: true,
            left: true,
            right: true,
            top: true,
            topLeft: true,
            topRight: true,
          }}
          dragHandleClassName="drag-handle"
          enableUserSelectHack={true}
        >
          <div
            style={{ width: state.width, height: state.height }}
            className="bg-gray-900 rounded-lg shadow-lg flex flex-col border border-cyan-500/20"
          >
            {/* Chat Header */}
            <div className="drag-handle flex items-center justify-between p-4 bg-gradient-to-r from-cyan-800 to-blue-900 text-white rounded-t-lg cursor-move">
              <h2 className="text-lg font-semibold">AI Assistant</h2>
              <IconButton onClick={() => setIsExpanded((prev) => !prev)} sx={{ color: 'white' }}>
                <Close />
              </IconButton>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-800">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg max-w-[80%] ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-700 text-white'
                        : 'bg-gray-700 text-gray-200'
                    }`}
                  >
                    <div dangerouslySetInnerHTML={formatTextWithNewLines(message.text)} />
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="text-left mb-4">
                  <div className="inline-block p-3 rounded-lg max-w-[80%] bg-gray-700 text-gray-200">
                    <div className="flex items-center">
                      <CircularProgress size={16} thickness={5} sx={{ color: 'white' }} />
                      <span className="ml-2">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-cyan-500/20">
              <div className="flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 p-2 bg-gray-700 text-white rounded-lg outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
                  placeholder="Type a message..."
                />
                <IconButton
                  type="submit"
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    marginLeft: '8px',
                    '&:hover': { backgroundColor: 'primary.dark' },
                  }}
                >
                  <Send />
                </IconButton>
              </div>
            </form>
          </div>
        </Rnd>
      )}
    </div>
  );
});

export default AiChat;
