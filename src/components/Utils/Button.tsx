import { CollectionReference } from 'firebase/firestore'
import { type ReactNode } from 'react'

interface ButtonProps {
  title: string
  variant: 'primary' | 'secondary'
  icon?: ReactNode
  action: () => void
  type?: 'submit' | 'button'
  disabled?: boolean
}

function Button({ title, variant, icon, action, type = 'button', disabled }: ButtonProps) {
  return (
    <button
      className={`button ${variant}`}
      type={type}
      disabled={disabled}
      onClick={action}
    >
      {!disabled ? (
        <>
          {icon && <span className="icon">{icon}</span>}
          <span>{title}</span>
        </>
      ) : (
        <div className="loading">
          <span style={variant === 'primary' ? {background: '#fefefe'} : {background: '#7544EE'}}></span>
          <span style={variant === 'primary' ? {background: '#fefefe'} : {background: '#7544EE'}}></span>
          <span style={variant === 'primary' ? {background: '#fefefe'} : {background: '#7544EE'}}></span>
          <span style={variant === 'primary' ? {background: '#fefefe'} : {background: '#7544EE'}}></span>
          <span style={variant === 'primary' ? {background: '#fefefe'} : {background: '#7544EE'}}></span>
        </div>
      )}
    </button>
  )
}

export default Button
