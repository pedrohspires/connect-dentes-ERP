import React from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { BsCheckLg } from 'react-icons/bs';

const InputCheckbox = ({ id, label, checked, onChange, customClassName }) => (
  <div className={customClassName || 'flex items-center'}>
    <Checkbox.Root 
      className='bg-paleta-500 w-6 h-6 m-0.5 rounded-md flex items-center justify-center shadow-lg
                  hover:bg-paleta-700 focus:shadow-none' 
      id={id || label}
      checked={checked}
      onCheckedChange={() => onChange(!checked, label)}
    >
      <Checkbox.Indicator className='text-white'>
        <BsCheckLg size={12}/>
      </Checkbox.Indicator>
    </Checkbox.Root>
    
    <label className='color-paleta-900 text-base pl-1' htmlFor={id || label}>
      {label}
    </label>
  </div>
);

export default InputCheckbox;