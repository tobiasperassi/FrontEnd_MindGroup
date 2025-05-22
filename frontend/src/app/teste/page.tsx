'use client'

import {  toast } from 'sonner'

export default function teste() {
  return (
    <div>
        
      <button className='bg-green-400' onClick={() => toast.success('My first toast')}>
        Give me a sucess toast 
      </button>
      <button className='bg-red-400' onClick={() => toast.error('My first toast')}>
        Give me a error toast
      </button>
    </div>
  )
}