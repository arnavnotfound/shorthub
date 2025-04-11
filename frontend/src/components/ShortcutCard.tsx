import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";

interface ShortcutCardProps {
  _id: string;
  title: string;
  description: string;
  link: string;
  created_by: string;
}

const ShortcutCard: React.FC<ShortcutCardProps> = ({
  _id,
  title,
  link,
  created_by,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    window.location.href = link;
  };
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      className={`relative w-52 h-34 ${randomColor} text-white p-4 rounded-lg shadow-lg`}
      onClick={() => navigate(`/shortcuts/${_id}`)}
      style={{ transition: "all 0.3s" }}
    >
      <div className="flex items-center">
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <AddCircleIcon
        onClick={handleClick}
        fontSize="large"
        className="text-white absolute bottom-5 right-5"
      />
      <div className="absolute bottom-5 left-5">{created_by}</div>
    </div>
  );
};

export default ShortcutCard;
