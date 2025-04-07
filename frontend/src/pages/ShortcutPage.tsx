import { useEffect, useState } from "react";
import ShortcutCard from "../components/ShortcutCard";
import axios from "axios";
import { useParams } from "react-router-dom";

const ShortcutPage:React.FC = () => {
    const { id } = useParams<{ id:string }>();
    const [shortcut, setShortcut] = useState<any>('');
    // const [error, setError] = useState<string>('');


    useEffect(() => {
        const fetchShortcut = async () => {
          try {
            const response = await axios.get(`http://localhost:5001/api/shortcuts/${id}`);
            setShortcut(response.data); // Set the list of all shortcuts
            console.log(response.data);
          } catch (error) {
            console.error('Error fetching shortcut:', error);
          }
        };
    
        fetchShortcut();
      }, []);
    return (
        <>
        <div className="flex flex-col p-10">
        <div className="flex justify-center">
        <ShortcutCard  title = {shortcut.title} link={shortcut.link} _id={shortcut._id} description={shortcut.description}/>
        </div>
        <div>
        <p className="text-xl pt-10 font-bold ">Description</p>
        {shortcut.description}

        </div>

        </div>
        </>
    )
}

export default ShortcutPage;