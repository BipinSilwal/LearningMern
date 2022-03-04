import React from 'react'
import NotFound from '../assets/images/not-found.svg';
import {Link} from 'react-router-dom';
import Wrapper  from '../assets/wrappers/ErrorPage';







const Error = () => {
  return (<>
  
            <Wrapper className='full-page'>
                <img src={NotFound} alt="errorPage"/>
                <h3>Ohh! page Not Found</h3>
                <p>We can't seem tot find the page you're looking for</p>
                <Link to="/">back home</Link>
            </Wrapper>
    
  
  </>
    
  )
}

export default Error