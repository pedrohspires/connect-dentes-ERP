import React from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { BsCheckLg } from 'react-icons/bs';

const InputCheckbox = ({ id, label, checked, onChange, customClassName }) => (
  <div className={customClassName || 'flex items-center'}>
    <Checkbox.Root 
      className='bg-white w-6 h-6 m-0.5 rounded-md flex items-center justify-center shadow-lg
                  hover:bg-gray-100 focus:shadow-none dark:bg-gray-300' 
      id={id || label}
      checked={checked}
      onCheckedChange={() => onChange(!checked, label)}
    >
      <Checkbox.Indicator className='text-gray-900'>
        <BsCheckLg size={12}/>
      </Checkbox.Indicator>
    </Checkbox.Root>
    
    <label className='color-paleta-900 text-base pl-1 dark:text-white' htmlFor={id || label}>
      {label}
    </label>
  </div>
);

export default InputCheckbox;