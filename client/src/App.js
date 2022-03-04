import React from "react";
import { BrowserRouter as Router, Route, Routes }  from 'react-router-dom';
import Error from "./pages/Error";
import Landing from "./pages/Landing";
import Register from "./pages/Register";


const App = () => {
  return (
    <>
        <Router>
            <Routes>

              <Route path='/' element={<div>Hello this is dashboard</div>}/>
              <Route path='/register' element={<Register/> }/>
              <Route path='/landing' element={<Landing/>}/>
              <Route path='*' element={ <Error/> } />
           


            </Routes>


        </Router>

      
    </>
  );
};

export default App;
