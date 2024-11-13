const Btn = ({ word, className }) => {
  return (
    <button
      className={`bg-[#EF161F] text-white font-[400]  ${className}`}
    >
      {word}
    </button>
  );
};

export default Btn;
