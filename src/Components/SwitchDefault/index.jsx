import React from 'react';
import * as Switch from '@radix-ui/react-switch';

const SwitchDefault = ({ id, text, onChange, checked }) => (
  <form>
    <div className='flex items-center'>
      <label className="text-gray-900 text-[15px] leading-none pr-[15px] dark:text-white" htmlFor={id}>
        {text}
      </label>
      <Switch.Root 
        className="w-[42px] h-[25px] bg-gray-600 rounded-full relative data-[state=checked]:bg-gray-900 outline-none cursor-default" 
        id={id}
        style={{ 'WebkitTapHighlightColor': 'rgba(0, 0, 0, 0)' }}
        onCheckedChange={onChange}
        checked={checked}
      >
        <Switch.Thumb className="block w-[21px] h-[21px] rounded-full shadow-[0_2px_2px] transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px] bg-gray-100 shadow-sm" />
      </Switch.Root>
    </div>
  </form>
);

export default SwitchDefault;