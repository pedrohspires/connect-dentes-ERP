import { RxReload } from 'react-icons/rx';

function InputLoading() {
  return (
    <div className='h-16 grid place-items-center'>
      <div className='grid content-end h-full'>
        <RxReload className='animate-spin' size={48}/>
      </div>
    </div>
  )
}

export default InputLoading