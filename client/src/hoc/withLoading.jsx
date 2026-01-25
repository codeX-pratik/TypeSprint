import React from 'react';

// eslint-disable-next-line no-unused-vars
const withLoading = (WrappedComponent) => {
    return function WithLoadingComponent({ isLoading, loadingMessage, ...props }) {
        if (isLoading) {
            return (
                <div className="loader-wrapper">
                    <div className="spinner" />
                    <p className="loading-text">{loadingMessage || 'Loading...'}</p>
                </div>
            );
        }
        return <WrappedComponent {...props} />;
    };
};

export default withLoading;
