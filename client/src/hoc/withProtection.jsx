import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResult } from '../context/ResultContext';

// eslint-disable-next-line no-unused-vars
const withProtection = (WrappedComponent) => {
  return function WithProtection(props) {
    const { result } = useResult();
    const navigate = useNavigate();

    useEffect(() => {
      if (!result) {
        navigate('/test'); // Redirect to test if no result data
      }
    }, [result, navigate]);

    if (!result) {
      return null; // Don't render anything while redirecting
    }

    return <WrappedComponent {...props} />;
  };
};

export default withProtection;
