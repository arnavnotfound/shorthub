import './App.css'
import { BrowserRouter as Router, Route, Routes,  } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UploadShortcut from './pages/UploadShortcut';
import RequestShortcut from './pages/RequestShortcut';
import Navbar from './components/Navbar';
import ShortcutPage from './pages/ShortcutPage';
import ProfilePage from './pages/ProfilePage';

export const API_URL = import.meta.env.VITE_API_URL;

function App() {
  
  return (
    <>
    <Router>
    <Navbar/>
    <Routes>
    <Route path="/" element={<HomePage/>} />

    <Route path="/home" element={<HomePage/>} />
    <Route path="/upload-shortcut" element={<UploadShortcut/>}/>
    <Route path="/request-shortcut" element={<RequestShortcut/>}/>
    <Route path= "/shortcuts/:id" element={<ShortcutPage />}/>
    <Route path= "/profile/:username" element= {<ProfilePage/>}/>
    </Routes>
    </Router>
    

    </>
  )
}

export default App
