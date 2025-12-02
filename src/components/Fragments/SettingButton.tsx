type PropsType = {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const SettingButton = ({ onClick }: PropsType) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-3 left-3 border-2 border-lime-300 bg-lime-200 rounded-full group cursor-pointer"
    >
      <img
        src="./icons/setting.svg"
        alt="Settings"
        className="w-11 h-11 group-hover:rotate-180 transition duration-600"
      />
      <div className="absolute border-t-2 border-r-2 border-b-2 border-lime-300 -z-1 rounded-r-full top-0.5 bottom-0.5 pl-7 pr-4 bg-lime-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-6 transition duration-600 flex items-center font-semibold">
        Settings
      </div>
    </button>
  );
};

export default SettingButton;
