import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useRouter } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "./component/Navbar";
import { Loader } from "./component/Loader";
import "materialize-css";

function App() {
  const { token, login, logout, userId, ready } = useAuth();

  const isAuthenticated = !!token;

  const routes = useRouter(isAuthenticated);

  if (!ready) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuthenticated,
      }}
    >
      <Router>
        {isAuthenticated && <Navbar />}
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
