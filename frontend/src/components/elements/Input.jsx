import React from 'react'

const Input = ({name = "name",onChange,className,placeholder ="placeholder",type = "text",value=""}) => {
  return (
    <div className='inline-flex flex-col w-full'>
        <label htmlFor={name}>
            {name}
        </label>
        <input placeholder={placeholder} type="text" className={`px-4 py-2 w-full border border-[var(--foreground)]/20 focus:border-[var(--foreground)] outline-none rounded-lg ${className} `}onChange={onChange} value={value} />
    </div>
  )
}

export default Input