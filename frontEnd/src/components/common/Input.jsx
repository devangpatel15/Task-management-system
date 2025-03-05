const Input = (props) => {
  const { value, handleChange, name, type } = props;

  return (
    <input
      type={type}
      name={name}
      placeholder={`Enter the ${name}`}
      value={value}
      onChange={(e) => handleChange(e)}
    />
  );
};

export default Input;
