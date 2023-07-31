import Select from 'react-select';

const MySelect = (props) => {
  const { nome, opcoes, isRequired, placeholder, className, opcaoDefault, value } = props;
  const { isDisabled, isLoading, isClearable, isSearchable, onChange } = props;

  return (
    <div className='pb-2'>
      <label className='font-bold dark:text-white dark:font-normal'>{nome} <b hidden={!isRequired} className='text-red-500'>*</b></label>
      <Select
        unstyled
        classNames={{
          control: () => "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white",
          placeholder: () => "text-gray-600 dark:text-gray-400",
          menu: () => "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600",
          option: () => "p-2 hover:bg-gray-300 text-gray-900 dark:text-white dark:hover:bg-gray-900"
        }}
        defaultValue={opcaoDefault}
        value={value}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isSearchable={isSearchable}
        name={nome}
        options={opcoes}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default MySelect;