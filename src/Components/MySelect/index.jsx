import Select from 'react-select';

const MySelect = (props) => {
  const { nome, opcoes, isRequired, placeholder, className, opcaoDefault } = props;
  const { isDisabled, isLoading, isClearable, isSearchable, onChange } = props;

  const customStyles = {
    control: (base) => ({
      ...base,
      background: "#566981",
      borderColor: '#566981',
      textColor: "#ffffff",
      "&:hover": {
        borderColor: '#566981'
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: "#89a7b1"
    }),
    menu: (base) => ({
      ...base,
      background: "#566981",
      boxShadow: "0 0 6px #000000"
    }),
    option: (base) => ({
      ...base,
      background: "#566981",
      "&:hover": {
        background: '#3a415a'
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: "#ffffff"
    })
  };

  return (
    <>
      <label className='font-bold'>{nome} <b hidden={!isRequired} className='text-red-500'>*</b></label>
      <Select
        className={className || "w-full bg-paleta-500 text-white rounded-md"}
        defaultValue={opcaoDefault}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isSearchable={isSearchable}
        styles={customStyles}
        name={nome}
        options={opcoes}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
};

export default MySelect;