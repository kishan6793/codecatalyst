import { useEffect, useState, memo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AuthLayout = ({ children, authRequired = true }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.AuthStatus);

  useEffect(() => {
    if (!authStatus && authRequired) {
      navigate('/');
    }
    setLoader(false);
  }, [authStatus, navigate, authRequired]);

  return loader ? <p className="text-lg font-semibold">Loading...</p> : <>{children}</>;
};

export default memo(AuthLayout);
