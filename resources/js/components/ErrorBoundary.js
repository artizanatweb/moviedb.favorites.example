import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        console.log(error);
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error);
        console.log(errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="errorScreen">
                    <h1>Network error page</h1>
                    <p>Add a nice SVG here</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
