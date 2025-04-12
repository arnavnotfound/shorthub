import React, { useState, useEffect } from "react";
import axios from "axios";
import Fuse from "fuse.js";
import { List, ListItemButton, ListItemText, Paper, Box } from "@mui/material";

import "./SearchBox.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../App";
const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [shortcuts, setShortcuts] = useState<any[]>([]);
  const [filteredShortcuts, setFilteredShortcuts] = useState<any[]>([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchShortcuts = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/shortcuts`,
          {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setShortcuts(response.data);
      } catch (error) {
        console.error("Error fetching shortcuts:", error);
      }
    };

    fetchShortcuts();
  }, []);

  useEffect(() => {
    const fuse = new Fuse(shortcuts, {
      keys: ["title"],
      includeScore: true,
      threshold: 0.3,
    });

    const results = fuse.search(query).map((result) => result.item);
    setFilteredShortcuts(results); 
  }, [query, shortcuts]);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(query);
  };
  const handleShortcutClick = (id: string) => {
    navigate(`/shortcuts/${id}`);
  };
  return (
    <>
      <div className="search-box-container md:min-h-[40vw] sm:min-h-[50vw] lg:min-h-[20vw] min-h-[60vw] flex flex-col">
        <div>
          <input
            onSubmit={handleSearch}
            onClick={handleSearch}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            type="text"
            className="search-box"
            placeholder="Search Shortcuts..."
          />
          {filteredShortcuts.length > 0 && query && (
            <Box>
              <Paper
                sx={{
                  maxHeight: 200,
                  overflow: "auto",
                  zIndex: 1000,
                  width: "100%",
                }}
              >
                <List>
                  {filteredShortcuts.map((shortcut) => (
                    <ListItemButton
                      key={shortcut.id}
                      onClick={() => handleShortcutClick(shortcut._id)}
                    >
                      <ListItemText primary={shortcut.title} />
                    </ListItemButton>
                  ))}
                </List>
              </Paper>
            </Box>
          )}
        </div>
      </div>
    </>
  );
};
export default SearchBox;
