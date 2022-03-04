import React from 'react'

const FormRow = ({type, name, value,handleChange, labeText, placeholder }) => {
  return (
    
        <>
        
                <div className='form-row'>

                <label htmlFor={name} className='form-label'>{labeText || name}</label>
                <input type={type} placeholder={placeholder} name={name} className='form-input' value={value} onChange={handleChange}/>



                </div>
        
        
        </>


  )
}

export default FormRow