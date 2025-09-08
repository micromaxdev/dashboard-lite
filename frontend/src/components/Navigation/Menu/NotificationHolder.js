import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const NotificationHolder = () => {
  return (
    <Box
      sx={{
        width: "25vw",
        height: "40vh",
        minHeight: "200px",
        minWidth: "250px",
        padding: 1.5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "1px dashed grey",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Notifications
      </Typography>
      <Typography variant="body2" sx={{ marginTop: 2 }}>
        (Notifications disabled)
      </Typography>
    </Box>
  );
};

export default NotificationHolder;
