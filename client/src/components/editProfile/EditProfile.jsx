import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

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

export default function EditProfile({ user }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [localUser, setLocalUser] = React.useState(user);

  const relationshipStatus = ["Single", "In a relationship", "Married", "-"];
  const handleChange = (event) => {
    setLocalUser({ ...localUser, relationship: event.target.value });
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
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h1">
            Edit profile
          </Typography>
          <TextField
            id="modalProfilePicture"
            label="Profile Picture"
            variant="outlined"
            sx={{ mt: 2 }}
            value={user.profilePicture}
          >
            Profile Picture:
          </TextField>

          <TextField
            id="modalCoverPicture"
            label="Cover Picture"
            variant="outlined"
            sx={{ mt: 2 }}
            value={user.coverPicture}
          >
            Cover Picture:
          </TextField>
          <TextField
            id="modalEmail"
            label="Email"
            variant="outlined"
            sx={{ mt: 2 }}
            value={user.email}
          >
            Email :
          </TextField>
          <TextField
            id="modalPassword"
            label="Password"
            variant="outlined"
            sx={{ mt: 2 }}
          >
            Password:
          </TextField>
          <TextField
            id="modalDescription"
            label="Description"
            variant="outlined"
            sx={{ mt: 2 }}
            value={user.desc}
          >
            Description:
          </TextField>
          <TextField
            id="modalCity"
            label="City"
            variant="outlined"
            sx={{ mt: 2 }}
            value={user.city}
          >
            City:
          </TextField>
          <TextField
            id="modalFrom"
            label="From"
            variant="outlined"
            sx={{ mt: 2 }}
            value={user.from}
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
          >
            <MenuItem value={1}>Single</MenuItem>
            <MenuItem value={2}>In a relationship</MenuItem>
            <MenuItem value={3}>Married</MenuItem>
            <MenuItem value={0}> - </MenuItem>
          </Select>
        </Box>
      </Modal>
    </div>
  );
}
