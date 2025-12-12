import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResult } from '../context/ResultContext';

const withConfigCheck = (WrappedComponent) => {
  return (props) => {
    const { testConfig } = useResult();
    const navigate = useNavigate();

    useEffect(() => {
        // Technically testConfig is always set with defaults, 
        // but this protects against unforeseen state issues or context failures.
      if (!testConfig) {
        navigate('/'); 
      }
    }, [testConfig, navigate]);

    if (!testConfig) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withConfigCheck;
