import React from 'react'
import PhoneInput from "react-phone-number-input"
import "./phoneInput.css"
const PhoneComp = ({value,setValue,className}) => {

  return (
   <div className='mt-4'>
    <label>
        Phone Number 
    </label>
     <PhoneInput
      international={false}
      defaultCountry='IN'
      value={value}
      onChange={setValue}  className={`phone-input ${className}`} />
   </div>
  )
}

export default PhoneComp