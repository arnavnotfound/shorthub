import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  
} from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginForm from "./LoginBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isUploadShortcutPage = location.pathname === "/upload-shortcut";

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsDropdownOpen(false);
    setIsLoggedIn(false);
  };
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginForm(false);
  };

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const toggleDropDown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className="flex flex-row gap-2 items-center justify-between p-2 bg-violet-900">
        <p
          className="text-white font-sans text-2xl pl-2 "
          onClick={() => navigate("/home")}
        >
          Shorthub
        </p>
        <div className="flex space-x-4 gap-2">
          {isLoggedIn ? (
            <></>
          ) : (
            <Button
              className="place-items-end"
              variant="outlined"
              onClick={toggleLoginForm}
            >
              Login
            </Button>
          )}

          {/* { !isUploadShortcutPage ? <Button className="place-items-end" variant="contained" onClick={() => navigate("/upload-shortcut")}>Upload Shortcut</Button> : <></>} */}

          {!isUploadShortcutPage ? (
            <Button
              className="place-items-center"
              variant="contained"
              onClick={
                isLoggedIn
                  ? () => navigate("/upload-shortcut")
                  : () => setShowLoginForm(true)
              }
            >
              Upload Shortcut
            </Button>
          ) : (
            <></>
          )}

          {/* <button 
          className="text-white bg-blue-500 p-2 rounded-full"
          onClick={toggleDropdown}
        >
          <img 
            src="https://via.placeholder.com/40" 
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        </button> */}

          {/* Dropdown Menu */}

          {isLoggedIn ? (
            <div>
              <AccountCircleIcon
                className="text-white"
                fontSize="large"
                onClick={toggleDropDown}
              />
              {isDropdownOpen && (
                <>
                  <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-48">
                    <List>
                      <ListItem>
                        <ListItemButton onClick={()=>navigate('/profile')}>
                          <ListItemIcon>
                            <AccountCircleIcon />
                          </ListItemIcon>
                          Profile
                        </ListItemButton>
                      </ListItem>
                      <ListItem>
                        <ListItemButton onClick={handleLogout}>
                          <ListItemIcon>
                            <LogoutIcon />
                          </ListItemIcon>
                          Logout
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </div>
                </>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {showLoginForm && <LoginForm onClose={handleLoginSuccess} />}

      {}
    </>
  );
};

export default Navbar;
