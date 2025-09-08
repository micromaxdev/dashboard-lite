import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import NotificationsIcon from "@material-ui/icons/Notifications";
import BugReportIcon from "@mui/icons-material/BugReport";
import { Badge } from "@mui/material";
import { useState } from "react";
import NotificationHolder from "./NotificationHolder";

export default function MenuNotifications() {
  // States
  const [badgeCount, setBadgeCount] = useState(0);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Notifications">
          <IconButton
            onClick={handleClick}
            color="inherit"
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            className="notificationsIcon"
          >
            <Badge badgeContent={badgeCount} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <NotificationHolder visible={open} />
      </Popover>
    </React.Fragment>
  );
}
