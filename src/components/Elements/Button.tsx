type PropsType = {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  variant?: keyof typeof ButtonVariant;
};

const ButtonVariant = {
  amber: "bg-amber-500 text-white hover:bg-amber-400",
  green: "bg-green-500 text-white font-semibold hover:bg-green-400",
};

const Button = ({ children, variant, onClick, className = "" }: PropsType) => {
  return (
    <button
      onClick={onClick}
      className={`${
        variant ? ButtonVariant[variant] : ""
      } ${className} cursor-pointer px-6 py-2 rounded-xl font-semibold active:scale-95 transition shadow-md`}
    >
      {children}
    </button>
  );
};

export default Button;
