const Label = ({ children }: { children: React.ReactNode }) => {
  return (
    <label className="block mb-2 text-sm font-semibold text-gray-900">
      {children}
    </label>
  );
};

export default Label;
