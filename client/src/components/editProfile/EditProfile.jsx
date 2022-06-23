import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { PermMedia } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditProfile({ user, forceUpdate }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [localUser, setLocalUser] = React.useState(user);
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);

  const relationshipStatus = ["Single", "In a relationship", "Married", "-"];
  const handleChange = (event) => {
    setLocalUser({ ...localUser, [event.target.name]: event.target.value });
    console.log(localUser);
  };

  const submitHandler = async (e) => {
    // e.preventDefault();
    console.log(localUser);
    await axios.put(`/users/${localUser._id}`, {
      userId: localUser._id,
      ...localUser,
    });
    if (coverPicture) {
      const data = new FormData();
      const fileName = coverPicture.name;
      data.append("name", fileName);
      data.append("file", coverPicture);
      // newPost.img = fileName;
      //console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    if (profilePicture) {
      const data = new FormData();
      const fileName = profilePicture.name;
      data.append("name", fileName);
      data.append("file", profilePicture);
      // newPost.img = fileName;
      //console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    forceUpdate();
  };

  return (
    <div>
      <Button
        sx={{
          marginTop: "30px",
          marginBottom: " 10px",
          border: " none",
          backgroundColor: " #1872f2",
          color: " white",
          borderRadius: " 5px",
          padding: " 5px 10px",
          display: " flex",
          alignItems: " center",
          fontSize: " 16px",
          fontWeight: " 500",
          cursor: " pointer",
          fontFamily: "montserrat",
          textTransform: "capitalize",
        }}
        onClick={handleOpen}
      >
        Edit Profile
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h1">
              Edit profile
            </Typography>
            <TextField
              id="modalProfilePicture"
              label="Profile Picture"
              variant="outlined"
              sx={{ mt: 2 }}
              value={localUser.profilePicture}
            >
              Profile Picture:
            </TextField>
            <label htmlFor="profilePicture" className="shareOption">
              <PermMedia htmlColor="red" className="shareIcon" />
              <span className="editOptionText">Profile photo</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="profilePicture"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setProfilePicture(e.target.files[0])}
              />
            </label>

            <TextField
              id="modalCoverPicture"
              label="Cover Picture"
              variant="outlined"
              sx={{ mt: 2 }}
              value={localUser.coverPicture}
            >
              Cover Picture:
            </TextField>
            <label htmlFor="coverPicture" className="shareOption">
              <PermMedia htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Cover photo</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="coverPicture"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  setLocalUser({
                    ...localUser,
                    coverPicture: e.target.files[0].name,
                  });
                  setCoverPicture(e.target.files[0]);
                }}
              />
            </label>
            <TextField
              id="modalEmail"
              label="Email"
              variant="outlined"
              name="email"
              sx={{ mt: 2 }}
              value={localUser.email}
              onChange={handleChange}
            >
              Email :
            </TextField>
            {/* <TextField
              id="modalPassword"
              label="Password"
              variant="outlined"
              sx={{ mt: 2 }}
            >
              Password:
            </TextField> */}
            <TextField
              id="modalDescription"
              label="Description"
              variant="outlined"
              sx={{ mt: 2 }}
              name="desc"
              value={localUser.desc}
              onChange={handleChange}
            >
              Description:
            </TextField>
            <TextField
              id="modalCity"
              label="City"
              variant="outlined"
              sx={{ mt: 2 }}
              name="city"
              value={localUser.city}
              onChange={handleChange}
            >
              City:
            </TextField>
            <TextField
              id="modalFrom"
              label="From"
              variant="outlined"
              sx={{ mt: 2 }}
              value={localUser.from}
              name="from"
              onChange={handleChange}
            >
              From:
            </TextField>
            <InputLabel id="demo-simple-select-label">Relationship</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={localUser.relationship}
              label="Age"
              onChange={handleChange}
              name="relationship"
            >
              <MenuItem value={1}>Single</MenuItem>
              <MenuItem value={2}>In a relationship</MenuItem>
              <MenuItem value={3}>Married</MenuItem>
              <MenuItem value={0}> - </MenuItem>
            </Select>
            <Button
              sx={{
                marginTop: "30px",
                marginBottom: " 10px",
                border: " none",
                backgroundColor: " #1872f2",
                color: " white",
                borderRadius: " 5px",
                padding: " 5px 10px",
                display: " flex",
                alignItems: " flex-end",
                fontSize: " 16px",
                fontWeight: " 500",
                cursor: " pointer",
                fontFamily: "montserrat",
                textTransform: "capitalize",
              }}
              onClick={submitHandler}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Modal>
    </div>
  );
}
