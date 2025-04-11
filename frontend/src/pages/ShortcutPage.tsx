import { useEffect, useState } from "react";
import ShortcutCard from "../components/ShortcutCard";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ShortcutPage:React.FC = () => {
    const { id } = useParams<{ id:string }>();
    const [shortcut, setShortcut] = useState<any>('');
    // const [error, setError] = useState<string>('');

    const navigate = useNavigate();
    useEffect(() => {
        const fetchShortcut = async () => {
          try {
            const response = await axios.get(`http://localhost:5001/api/shortcuts/${id}`,  {headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }},);
            setShortcut(response.data); 
            console.log(response.data);
          } catch (error) {
            console.error('Error fetching shortcut:', error);
          }
        };
    
        fetchShortcut();
      }, []);
    return (
        <>
        <div className="flex flex-col gap-5 p-5 sm:flex-row">
        <ShortcutCard  title = {shortcut.title} link={shortcut.link} _id={shortcut._id} description={shortcut.description}/>
        <div>
          <p><b>Created by:</b> <a href={`/profile/${shortcut.created_by}`}>{shortcut.created_by}</a></p>

          <p className=""><b>Description: </b> {shortcut.description}</p>
        



        </div>
        </div>
        <div>
          
        

        </div>
        </>
    )
}

export default ShortcutPage;