import React, { useState } from "react";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  modalBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: 24,
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const BugReportForm = ({ open, handleClose, currentUrl }) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const handlePaste = (event) => {
    const items = (event.clipboardData || event.originalEvent.clipboardData)
      .items;
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const blob = item.getAsFile();
        setImage(blob);
        break;
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("description", text);
      formData.append("currentUrl", currentUrl);
      formData.append("user", user.email);
      if (image) {
        formData.append("file", image, "pasted-image.png"); // Ensure the file has a name
      }

      const response = await fetch("/api/all/bug", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Bug report submitted successfully");
        toast.success("Bug report submitted successfully.");
        handleClose();
      } else {
        console.error("Failed to submit bug report");
        toast.error("Failed to submit bug report");
      }
    } catch (error) {
      console.error("Error submitting bug report:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      onPaste={handlePaste}
      aria-labelledby="bug-report-modal-title"
      aria-describedby="bug-report-modal-description"
    >
      <Box className={classes.modalBox}>
        <Typography id="bug-report-modal-title" variant="h6" component="h2">
          Report a Bug
        </Typography>
        <TextField
          fullWidth
          label="Describe the issue and insert a screen clipping if required"
          multiline
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Pasted from clipboard"
            style={{ maxWidth: "100%", marginBottom: "10px" }}
          />
        )}
        <Typography variant="body2" color="textSecondary">
          Current URL: {currentUrl}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleSubmit}
          style={{ marginRight: "16px" }}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={handleClose}
        >
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default BugReportForm;
