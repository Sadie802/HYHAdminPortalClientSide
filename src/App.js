import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation} from "react-router-dom";
import Userfront from "@userfront/react";
import LogIn from './components/LogIn'
import RequestsForm from "./components/RequestsForm";
import Dashboard from "./components/Dashboard";
import PendingRequests from "./components/Pending";
import FundedRequets from "./components/Funded";
import Loading from "./components/Loading";
import "./stylesheets/main.css";
import "./stylesheets/pending.css";
import "./stylesheets/login.css";
import "./stylesheets/nav.css";

function App() {
  function RequireAuth() {
    let location = useLocation();
    if (!Userfront.tokens.accessToken) {
      // Redirect to the /login page
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<LogIn />} />
          <Route path='/loading' element={<Loading />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/form' element={<RequireAuth> <RequestsForm /> </RequireAuth>} />
          <Route path='/dashboard' element={<RequireAuth> <Dashboard /></RequireAuth>} />
          <Route path='/pending' element={<RequireAuth><PendingRequests /></RequireAuth>}/>
          <Route path='/funded' element={<RequireAuth><FundedRequets /></RequireAuth>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
