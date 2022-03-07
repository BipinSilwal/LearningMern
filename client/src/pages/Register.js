import React, { useEffect, useState } from 'react'
import  Logo  from '../components/Logo';
import Wrappers from '../assets/wrappers/RegisterPage';
import FormRow from '../components/FormRow';
import Alert from '../components/Alert';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';



const initialState = {

        userName:"",
        email:"",
        password:"",
        isMember:true,
        

}


const Register = () => {

        const [values, setValues ] = useState(initialState);
      

        const {isLoading, showAlert, displayAlert, clearAlert, user, setUpUser } = useAppContext();

        const navigate = useNavigate();
        


        const onSubmit = (e)=>{

                        e.preventDefault();

                const {userName,email, password, isMember} = values;

                if(!email || !password || (!isMember && !userName)){

                                displayAlert()
                                clearAlert()
                                return 

                }

                const currentUser = {userName , email, password};

                if(isMember){

                       
                        setUpUser({currentUser, endPoints:'login', alertText:"Login Successful!!"});


                }
                else{
                        setUpUser({currentUser, endPoints:'register', alertText:'User created Successfully!!'});
                }
        
                
               

        }

        const handleChange = (e)=>{

                        setValues({...values, [e.target.name]:e.target.value});

        }
 
        const toggleMember = ()=>{
                        setValues({...values, isMember: !values.isMember});

        };


        useEffect(()=>{

                setTimeout(()=>{

                        if(user){
                
                                navigate('/');
                
                        }
                }, 3000)

        }, [user, navigate])
        


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

                <button type="submit"  className='btn btn-block' disabled = {isLoading}>Submit</button>
                <p>
                {values.isMember ? 'Not a member yet': 'Already a member?'}
                <button onClick={toggleMember} className='member-btn'>{values.isMember ? 'Register': 'Login'}</button>
                </p>
               

                </form>
        </Wrappers>
   
   
   </>
  )
}

export default Register





