import * as React from 'react'
import './Button.css'

const Button = ({ children, disabled, onClick, primary }) => (
  <button className='Button' onClick={() => onClick()} disabled={disabled}>
    {children}
  </button>
)

export { Button }