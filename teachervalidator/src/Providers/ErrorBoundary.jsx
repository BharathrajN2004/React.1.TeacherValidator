import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, errorInfo) {
        // Handle the error, log it, and update state
        console.error(error, errorInfo);
        this.setState({ hasError: true });

        // Trigger a reload of the application
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    }

    render() {
        if (this.state.hasError) {
            // Render an error message or fallback UI
            return <div>Something went wrong. Reloading...</div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
