import React from "react";
import { Link, Redirect } from "@reach/router";

class DetailsErrorBoundary extends React.Component {
  state = { hasError: false, redirect: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caugh an error", error, info);
  }

  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => {
        this.setState({ redirect: true });
      }, 5000);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" noThrow />;
    }

    if (this.state.hasError) {
      return (
        <div className="details">
          <h1>
            There was an error with this listing. <Link to="/">Click here</Link>{" "}
            to go back to home page or wait for 5 secs.
          </h1>
        </div>
      );
    }
    return this.props.children;
  }
}

export default DetailsErrorBoundary;
