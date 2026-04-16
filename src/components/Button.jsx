import React from 'react'

export default function Button({children, onClick, className=''}){
  return (
    <button onClick={onClick} className={className} style={{padding:'8px 12px',borderRadius:6,border:'none',background:'#0366d6',color:'#fff'}}>
      {children}
    </button>
  )
}
