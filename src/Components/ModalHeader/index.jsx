import { AiFillCloseCircle } from 'react-icons/ai';

function ModalHeader({ title, tag, onRequestClose }) {
  return (
    <div className='w-full h-full flex justify-between p-4 bg-gray-100 relative rounded-t-xl dark:bg-gray-900'>
      <div className='text-gray-900 font-light text-xl dark:text-gray-100'>
        {title} <span className='font-bold text-base'>#{tag}</span>
      </div>
      {onRequestClose && <AiFillCloseCircle className='cursor-pointer text-gray-900 absolute top-1/2 right-4 -translate-y-1/2' size={25} onClick={onRequestClose} />}
    </div>
  )
}

export default ModalHeader