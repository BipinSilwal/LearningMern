import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error from "./pages/Error";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import {
  AddJob,
  AllJob,
  Dashboard,
  Profile,
  Stats,
} from "./pages/dashboard/index";

const App = () => {
  return (
    <>
      <Router>
        <Routes>

          <Route path="/" element={<Dashboard/>}>
            <Route path="add-job" element={<AddJob />} />
            <Route path="all-job" element={<AllJob />} />
            <Route path="profile" element={<Profile />} />
            <Route path="stats" element={<Stats />} />
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
