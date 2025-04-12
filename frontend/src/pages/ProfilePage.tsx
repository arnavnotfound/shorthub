import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShortcutCard from "../components/ShortcutCard";
import { API_URL } from "../App";

const ProfilePage = () => {
    const { username } = useParams<{ username:string }>();

    const [userShortcuts, setUserShortcuts] = useState<any[]>([]);
    useEffect(() => {
        const fetchUserShortcuts = async () => {
        try {
            const response = await axios.get(
            `${API_URL}/api/${username}/shortcuts`,
            {
                headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            }
            );
            setUserShortcuts(response.data); 
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching shortcuts:", error);
        }
        };

        fetchUserShortcuts();
    }, []);
    

    return (

        <>
        <div className="p-10">
        <h2 className="font-bold text-2xl font-sans text-black pb-10">
          {username}'s Shortcuts
        </h2>
        <div className="flex flex-row gap-2 overflow-x-auto pb-10">
          {userShortcuts.map((shortcut, index) => (
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
    )
}

export default ProfilePage;