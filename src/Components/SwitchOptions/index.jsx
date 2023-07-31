import { Switch } from '@headlessui/react'

function SwitchOptions({ enabled, setEnabled, textoEsquerdo, textoDireito }) {
  return (
    <div className='w-full h-full relative'>
      <div className='flex gap-4 absolute top-1/2 -translate-y-1/2'>
        <span className={`${!enabled ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}`}>{textoEsquerdo}</span>
        <div>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`bg-gray-300 relative inline-flex h-6 w-14 items-center rounded-full dark:bg-gray-700`}
          >
            <span
              className={`${enabled ? 'translate-x-9' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
        <span className={`${!enabled ? "text-gray-400 dark:text-gray-500" : "text-gray-900 dark:text-white"}`}>{textoDireito}</span>
      </div>
    </div>
  )
}

export default SwitchOptions;