const Input = ({ value, handleChange, text }) => {
  return (
    <div>
      {text}: <input value={value} onChange={handleChange} />
    </div>
  );
};

export default Input;
