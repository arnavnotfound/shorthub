import React, { useState } from "react";
import {
  TextField,
  Button,
  Snackbar,
  Alert
} from "@mui/material";
import axios from "axios";

const UploadShortcut: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [error, setErrors] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  //   const history = useHistory(); // To navigate after form submission


  const handleCreateShortcut = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send the POST request to create a new shortcut
      const response = await axios.post(
        "http://localhost:5001/api/shortcuts",
        {
          title,
          description,
          link,
        },
        {
          headers: {
            'Authorization':`Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",

            "Access-Control-Allow-Headers": "Content-Type, Authorization"

            
          },
        }
      );

      if (response.status === 201) {
        setSnackbarMessage("Shortcut created successfully!");
        setOpenSnackbar(true);
        setDescription("");
        setTitle("");
        setLink("");

      }
    } catch (error) {
      setSnackbarMessage("Failed to create shortcut!");
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <div className="p-10">
        <h1 className="text-3xl font-bold">Upload your own shortcuts</h1>
        <form
          onSubmit={handleCreateShortcut}
          className="flex flex-col mt-10 gap-2"
        >
          <TextField
            required
            id="filled-required"
            label="Title"
            variant="filled"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            required
            id="filled-required"
            label="Shortcut Link"
            variant="filled"
            placeholder="Shortcut Link"
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
            }}
          />
          <TextField
            required
            id="filled-multiline-flexible"
            label="Description"
            multiline
            maxRows={5}
            variant="filled"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "16px" }}
            onClick={handleCreateShortcut}
          >
            Upload Shortcut
          </Button>
        </form>
        <div className="instructions mt-5">
          1. Go to the Shortcuts app on your iPhone.
          <br />
          2. Tap and hold on to the shortcut you wanna upload.
          <br />
          3. Click on the "Share" option.
          <br />
          4. Copy the iCloud link and paste it in the field above.
          <br />
        </div>

        {/* Snackbar to show success or error messages */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={error ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default UploadShortcut;
