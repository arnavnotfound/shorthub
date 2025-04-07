import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
// import { IconButton } from 'shadcn';

interface ShortcutCardProps {
  _id: string;
  title: string; // Title of the shortcut
  description: string; // Description of the shortcut
  link: string;
}

const ShortcutCard: React.FC<ShortcutCardProps> = ({ _id, title, link }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    // Use 'navigate' to programmatically redirect to the link associated with the shortcut
    window.location.href = link; // Redirect to the shortcut's link directly (optional, based on your use case)
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
    </div>
  );
};

export default ShortcutCard;
