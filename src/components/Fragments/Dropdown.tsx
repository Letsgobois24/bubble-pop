type PropsType = {
  className?: string;
  isDropdown: boolean;
  onClick: () => void;
};

const Dropdown = ({ className, isDropdown, onClick }: PropsType) => {
  return (
    <div className={className}>
      <img
        src="./icons/dropdown.svg"
        className={`opacity-80 cursor-pointer transition duration-400 p-2 ${
          isDropdown ? "-rotate-180" : ""
        }`}
        alt="Dropdown"
        onClick={onClick}
      />
    </div>
  );
};

export default Dropdown;
