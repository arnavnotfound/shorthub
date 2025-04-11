import React, { useEffect, useState } from "react";
import ShortcutCard from "./ShortcutCard";
import axios from "axios";

const PopularShortcutsList: React.FC = () => {
  const [shortcuts, setShortcuts] = useState<any[]>([]);
  useEffect(() => {
    const fetchShortcuts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/shortcuts",
          {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setShortcuts(response.data); 
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching shortcuts:", error);
      }
    };

    fetchShortcuts();
  }, []);

  return (
    <>
      <div className="p-10">
        <h2 className="font-bold text-2xl font-sans text-black pb-10">
          Popular Shortcuts
        </h2>
        <div className="flex flex-row gap-2 overflow-x-auto pb-10">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex-shrink-0">
              <ShortcutCard
                _id={shortcut._id}
                title={shortcut.title}
                description={shortcut.description}
                link={shortcut.link}
                created_by={shortcut.created_by}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PopularShortcutsList;
