import React from 'react'

interface inputProps {
    title: string,
    type: 'number' | 'text' | 'password' | 'email',
    placeholder: string,
    value: string,
    setValue: (value: string) => void,
    error?: string,
}

function LabelInput({ title, type, placeholder, value, setValue, error }: inputProps) {
  return (
    <label className='label'>
        <span className='label-span'>{title}</span>
        <input type={type} placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} className='label-input' style={error ? {borderColor: '#e63946'}: {}} />
        <p className='error'>{error}</p>
    </label>
  )
}

export default LabelInput