import React from "react";
import { Outlet } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { Navbar, BigSideBar, SmallSideBar } from "../../components/index";
import { useAppContext } from "../../context/appContext";

const Dashboard = () => {
 
  return (
    <>
      <Wrapper>
        <main className="dashboard">

        
            
            <SmallSideBar />
            <BigSideBar />
            
          
          
          <div>
            <Navbar />

            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </>
  );
};

export default Dashboard;
