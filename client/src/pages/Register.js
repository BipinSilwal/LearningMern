import React, { useState } from 'react'
import  Logo  from '../components/Logo';
import Wrappers from '../assets/wrappers/RegisterPage';
import FormRow from '../components/FormRow';
import Alert from '../components/Alert';
import { useAppContext } from '../context/appContext';



const initalState = {

        userName:"",
        email:"",
        password:"",
        isMember:true,
        

}


const Register = () => {

        const [values, setValues ] = useState(initalState);
      

        const {isLoading, showAlert, displayAlert, clearAlert } = useAppContext();
        


        const onSubmit = (e)=>{

                        e.preventDefault();
                        const {name,email, password, isMember} = values;

                if(!email || !password || (!isMember && !name)){

                                displayAlert()
                                clearAlert()
                                return 

                }
                console.log(values);

        }

        const handleChange = (e)=>{

                        setValues({...values, [e.target.name]:e.target.value});

        }
 
        const toggleMember = ()=>{
                        setValues({...values, isMember: !values.isMember});

        };

        


  return (
   <>
   
        <Wrappers className='full-page'>

            <form className='form' onSubmit={onSubmit}>
               <Logo/>
                {showAlert && <Alert/>}
                <h3>{values.isMember ? 'Login': 'Register'}</h3>
                {!values.isMember && (<FormRow type="text" name="userName" value={values.userName} handleChange={handleChange}/>)}
                
                <FormRow type="email" name="email" value={values.email} handleChange={handleChange}/>
                <FormRow type="password" name="password" value={values.password} handleChange={handleChange}/>

                <button type="submit"  className='btn btn-block'>Submit</button>
                <p>
                {values.isMember ? 'Not a member yet': 'Already a member?'}
                <button type="submit" onClick={toggleMember} className='member-btn'>{values.isMember ? 'Register': 'Login'}</button>
                </p>
               

                </form>
        </Wrappers>
   
   
   </>
  )
}

export default Register