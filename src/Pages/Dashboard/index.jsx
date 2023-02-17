import React, { useState } from 'react'

function Dashboard() {
  const [acessos, setAcessos] = useState();
  const [loading, setLoading] = useState(true);

  return (
    <div className="h-screen p-5 flex flex-col gap-4">
      <div className="flex justify-between">
        <div className='h-full grid content-center'>
          <span className='text-2xl font-normal'>Dashboard</span>
        </div>
      </div>
    </div>
  )
}

export default Dashboard