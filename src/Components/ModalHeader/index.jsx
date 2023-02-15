import { AiFillCloseCircle } from 'react-icons/ai';

function ModalHeader({ title, tag, onRequestClose }) {
  return (
    <div className='w-full h-full flex justify-between p-4 bg-paleta-500 relative rounded-t-xl'>
      <div className='text-paleta-100 font-bold text-xl'>
        {title} <span className='font-normal text-base'>#{tag}</span>
      </div>
      {onRequestClose && <AiFillCloseCircle className='cursor-pointer text-paleta-100 absolute top-1/2 right-4 -translate-y-1/2' onClick={onRequestClose} />}
    </div>
  )
}

export default ModalHeader