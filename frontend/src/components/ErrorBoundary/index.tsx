import React from 'react';
interface ErrorState {
    hasError:boolean;
}
class ErrorBoundary extends React.Component<any, ErrorState> {
    constructor(props: any) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return {hasError: true};
    }
    render(){
        if(this.state.hasError){
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;