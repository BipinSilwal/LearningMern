import React from 'react'

const FormRow = ({type, name, value,handleChange, labelText, placeholder }) => {
  return (
    
        <>
        
                <div className='form-row'>

                <label htmlFor={name} className='form-label'>{labelText || name}</label>
                <input type={type} placeholder={placeholder} name={name} className='form-input' value={value} onChange={handleChange}/>



                </div>
        
        
        </>


  )
}

export default FormRow