import React, { useState } from 'react'
import  Wrapper  from '../assets/wrappers/Navbar'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Logo from './Logo';
import { useAppContext } from '../context/appContext';

const Navbar = () => {

  const {sideBar, user, logout} = useAppContext();

  const [showLogOut, setShowLogout] = useState(false);

  

  return (
    <Wrapper>
          <div className='nav-center'>
            
              <button className='toggle-btn' onClick={sideBar}>

                  <FaAlignLeft/>
              </button>

              <div>
                  <Logo/>
                  <h3 className='logo-text'>dashboard</h3>
              </div>
            
              <div className="btn-container">
                
                  <button className='btn' onClick={()=>setShowLogout(!showLogOut)}> <FaUserCircle/> {user?.userName} <FaCaretDown/> </button>


              <div className={showLogOut ? 'dropdown show-dropdown':'dropdown'}>
                
                    <button type="button" className='dropdown-btn' onClick={logout} > logout  </button>
                </div>

                </div>
            
            </div>


    </Wrapper>
  )
}

export default Navbar