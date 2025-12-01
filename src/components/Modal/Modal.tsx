import { useRef } from "react";
// import useClickOutside from "../../utils/hooks/useClickOutside";

const Modal = ({
  children,
  onClose,
  title,
}: {
  children: React.ReactNode;
  onClose?: () => void;
  title: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  // useClickOutside(onClose, ref);

  return (
    <div className="flex justify-center items-center fixed top-0 right-0 left-0 bottom-0 z-50 bg-black/50">
      <div className="relative py-4 w-full max-w-xl max-h-full">
        <div
          ref={ref}
          className="relative bg-white rounded-lg shadow-sm max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              type="button"
              className="text-2xl cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 ms-auto inline-flex justify-center items-center"
            >
              <svg
                width="12"
                height="12"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
