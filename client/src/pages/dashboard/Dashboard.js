import React  from 'react'
import { Link, Outlet } from 'react-router-dom'


const Dashboard = () => {



  return (
    <div>
      
            <h1>this is dashboard</h1>
              <Link to="add-job">add job</Link> 
              <Link to="all-job">all job</Link> 
              <Link to="profile">all job</Link> 
              <Link to="stats">all job</Link> 
            <Outlet/> 
      
      </div>
  )
}

export default Dashboard