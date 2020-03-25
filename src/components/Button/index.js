import * as React from 'react'
import './Button.css'

const Button = ({ children, disabled, onClick }) => (
  <button className='Button' onClick={() => onClick()} disabled={disabled}>
    {children}
  </button>
)

export { Button }
