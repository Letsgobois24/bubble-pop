export type DifficultyType = "Hard" | "Normal" | "Easy" | "Custom";

const difficultyStyle = {
  Hard: {
    style: "text-white hover:bg-red-600 shadow-md bg-gray-400",
    normal: "bg-red-700",
    active: "bg-red-600 ring-2 ring-red-300",
  },
  Normal: {
    style: "text-gray-800 hover:bg-gray-200 shadow",
    normal: "bg-gray-300",
    active: "bg-gray-400 ring-2 ring-gray-300",
  },
  Easy: {
    style: "text-green-900 hover:bg-green-200 shadow",
    normal: "bg-green-300",
    active: "bg-green-400 ring-2 ring-green-300",
  },
  Custom: {
    style:
      "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white shadow",
    normal: "text-blue-500",
    active: "bg-blue-500 text-white ring-2 ring-blue-300",
  },
};

export default difficultyStyle;
