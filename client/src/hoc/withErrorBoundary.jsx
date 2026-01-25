import React from 'react';

// eslint-disable-next-line no-unused-vars
const withErrorBoundary = (WrappedComponent) => {
    return class ErrorBoundaryWrapper extends React.Component {
        constructor(props) {
            super(props);
            this.state = { hasError: false, error: null };
        }

        static getDerivedStateFromError(error) {
            return { hasError: true, error };
        }

        componentDidCatch(error, errorInfo) {
            console.error("TypeSprint Error:", error, errorInfo);
        }

        render() {
            if (this.state.hasError) {
                return (
                    <div className="error-container">
                        <h1 className="error-title">😕 Oops!</h1>
                        <p className="error-message">
                            Something went wrong. It's not you, it's us.<br/>
                            {this.state.error && this.state.error.toString()}
                        </p>
                        <button 
                            className="retry-btn"
                            onClick={() => window.location.reload()}
                        >
                            Refresh Page
                        </button>
                    </div>
                );
            }

            return <WrappedComponent {...this.props} />;
        }
    };
};

export default withErrorBoundary;
