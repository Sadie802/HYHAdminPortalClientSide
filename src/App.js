import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import LogIn from './components/LogIn'
import RequestsForm from "./components/RequestsForm";
import Dashboard from "./components/Dashboard";
import PendingRequests from "./components/Pending";
import FundedRequets from "./components/Funded";
import "./stylesheets/main.css";
import "./stylesheets/pending.css";
import "./stylesheets/login.css";
import "./stylesheets/nav.css";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<LogIn />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/form' element={ <RequestsForm /> } />
          <Route path='/dashboard' element={ <Dashboard />} />
          <Route path='/pending' element={<PendingRequests />}/>
          <Route path='/funded' element={<FundedRequets />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
