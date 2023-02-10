import React, { useEffect, useState } from 'react'
import { RxReload } from 'react-icons/rx';

function LoadingPage() {
  const [dots, setDots] = useState([]);

  const timer = () => {
    setTimeout(() => setDots(dots.length < 3 ? [...dots, ' . '] : []), 1000);
  }

  useEffect(timer, [dots]);

  return (
    <div className='h-screen grid place-items-center'>
      <div className='grid content-end h-full'>
        <RxReload className='animate-spin' size={48}/>
      </div>
      <div className='grid content-start h-full'>
        <span className='font-bold'>Carregando{dots.map(dot => dot)}</span>
      </div>
    </div>
  )
}

export default LoadingPage;