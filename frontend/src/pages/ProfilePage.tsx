import { useParams } from "react-router-dom";

const ProfilePage = () => {
    const { username } = useParams<{ username:string }>();
    

    return (

        <>

        </>
    )
}

export default ProfilePage;