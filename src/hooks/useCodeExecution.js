import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { startExecution, endExecution } from '../store/codeExecutionSlice';


const useCodeExecution = () => {  
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const executeCode = async (language, version, code, input) => {
    setIsLoading(true);
    setError(null);
    dispatch(startExecution());

    try {
      const response = await axios.post(
        'https://winter-of-code-react-js.vercel.app/code/execute-code',
        {
          language,
          version,
          sourceCode: code,
          codeInput: input,
        },
      );
      const { stdout, stderr } = response.data;
      if (stdout) setOutput(stdout);
      else if (stderr) setOutput(stderr);
      else setOutput('No output received.');
    } catch (e) {
      setError('An error occurred while executing the code.');
      console.error('Error executing code:', e);
    } finally {
      setIsLoading(false);
      dispatch(endExecution());
    }
  };

  return { output, isLoading, error, executeCode };
};

export default useCodeExecution;
