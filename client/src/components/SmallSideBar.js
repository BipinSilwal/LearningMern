import React from 'react'
import { FaTimes } from 'react-icons/fa'
import  Wrapper from '../assets/wrappers/SmallSidebar'
import Logo from './Logo';
import { useAppContext } from '../context/appContext';
import NavLinks from './NavLinks';
const SmallSideBar = () => {

  const { showSideBar , sideBar} = useAppContext();

  return (

       <Wrapper>
    
          <div className={showSideBar ?   'sidebar-container': 'show-sidebar'}>

              <div className='content'>
                
                  <button className='close-btn' onClick={sideBar}>
                        <FaTimes/>
                  </button>
                  <header>
                    <Logo/>
                  </header>
                  <div className='nav-links'>

                    <NavLinks  sideBar={sideBar}/>

             
                  </div>

                </div>  
            
            
            
          </div>

      </Wrapper>
  )
}

export default SmallSideBar