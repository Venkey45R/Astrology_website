import React from 'react'

const Button = ({className,onClick,children}) => {
  return (
    <button className={`${className} text-sm text-[var(--background)] rounded-lg bg-[var(--primary)] px-4 py-1 active:scale-95 lg:hover:cursor-pointer`} onClick={onClick}>
        {children}
    </button>
  )
}

export default Button