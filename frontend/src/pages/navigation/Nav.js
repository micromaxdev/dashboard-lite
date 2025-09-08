import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navigation from "../../components/Navigation/Navigation";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import SummarizeIcon from "@mui/icons-material/Summarize";
import AccountBox from "@mui/icons-material/AccountBox";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import PeopleIcon from "@mui/icons-material/People";

import { FaPaperPlane } from "react-icons/fa";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { FaEye, FaSearch } from "react-icons/fa";
import CallToActionIcon from "@mui/icons-material/CallToAction";
import DoneIcon from "@mui/icons-material/Done";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import Badge from "@mui/material/Badge"; // Import Badge from MUI

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.hint,
  },
}));

export default function Nav({ main }) {
  //------------------ATTRIBUTES/VARIABLES------------------

  const classes = useStyles();

  const { user } = useSelector((state) => state.auth);

  // --------------------------useEffects----------------------------

  //------------------FUNCTIONS------------------

  //------------

  //----------------FOR AVATAR DROP DOWN MENU----------------
  function getLink() {
    var link = {
      brand: { image: "/images/logo.png", width: 110 },
      "brand-mobile": { image: "/images/logo.png", width: 110 },
      name: [],
      route: [],
      icon: [],
      settings: ["FAD", "Settings", "Logout"],
      settingsLink: ["/dashboard/fad", "/dashboard/settings", "/logout"],
      notifications: [],
      notificationsLink: [],
      notificationsIcon: [],
      //avatar: 'https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=612x612&w=0&h=Ov2YWXw93vRJNKFtkoFjnVzjy_22VcLLXZIcAO25As4=',
    };

    //----------------------------------------------------------------------------------------------------------
    if (user.roles.includes("employee") || user.roles.includes("admin")) {
      link.name = ["Dashboard", "F6", "Settings", "Logout"];

      link.route = [
        "/dashboard",
        "/dashboard/sap",
        "/dashboard/settings",
        "/logout",
      ];

      link.icon = [
        <DashboardIcon className={classes.icon} />,
        <SummarizeIcon className={classes.icon} />,
        <Icon icon="cib:sap" className={`${classes.icon} text-3xl`} />,
        <Icon
          icon="material-symbols:point-of-sale-sharp"
          className={`${classes.icon} text-3xl`}
        />,
        <Icon
          icon="carbon:report-data"
          className={`${classes.icon} text-2xl`}
        />,
        <Icon
          icon="material-symbols:task"
          className={`${classes.icon} text-2xl`}
        />,
        <Icon
          icon="material-symbols:calendar-add-on-sharp"
          className={`${classes.icon} text-2xl`}
        />,
        <BackupTableIcon className={classes.icon} />,
        <PeopleIcon className={classes.icon} />,
        <AccountBox className={classes.icon} />,
        <SettingsIcon className={classes.icon} />,
        <ExitToAppIcon className={classes.icon} />,
      ];

      link.notifications = [
        "Review & Classify",
        "Root Cause Analysis",
        "Improvement Action",
        "Improvement Action Verification",
        "Finalize",
        "Re-review",
      ];

      link.notificationsLink = [
        "/dashboard/cias/owned/review-and-classify",
        "/dashboard/cias/owned/root-cause-analysis",
        "/dashboard/cias/owned/improvement-action",
        "/dashboard/cias/owned/improvement-action-verification",
        "/dashboard/cias/owned/finalize",
        "/dashboard/cias/owned/review",
      ];
    } //----------------------------------------------------------------------------------------------------------
    else if (user.roles.includes("qm") || user.roles.includes("admin")) {
      link.name = ["Dashboard", "F6", "Settings", "Logout"];

      link.route = [
        "/dashboard",
        "/dashboard/sap",
        "/dashboard/settings",
        "/logout",
      ];

      link.icon = [
        <DashboardIcon className={classes.icon} />,
        <Badge badgeContent={0} color="secondary">
          <SummarizeIcon className={classes.icon} />
        </Badge>,
        <Icon icon="cib:sap" className={`${classes.icon} text-3xl`} />,
        <Icon
          icon="material-symbols:point-of-sale-sharp"
          className={`${classes.icon} text-3xl`}
        />,
        <Icon
          icon="carbon:report-data"
          className={`${classes.icon} text-2xl`}
        />,
        <Icon
          icon="material-symbols:task"
          className={`${classes.icon} text-2xl`}
        />,
        <Icon
          icon="material-symbols:calendar-add-on-sharp"
          className={`${classes.icon} text-2xl`}
        />,
        <BackupTableIcon className={classes.icon} />,
        <PeopleIcon className={classes.icon} />,
        <AccountBox className={classes.icon} />,
        <SettingsIcon className={classes.icon} />,
        <ExitToAppIcon className={classes.icon} />,
      ];

      link.notifications = [
        "Assign",
        "Review & Classify",
        "Root Cause Analysis",
        "Improvement Action",
        "Improvement Action Verification",
        "Finalize",
        "Re-review",
      ];

      link.notificationsLink = [
        "/dashboard/cias/assign",
        "/dashboard/cias/owned/review-and-classify",
        "/dashboard/cias/owned/root-cause-analysis",
        "/dashboard/cias/owned/improvement-action",
        "/dashboard/cias/owned/improvement-action-verification",
        "/dashboard/cias/owned/finalize",
        "/dashboard/cias/owned/review",
      ];

      link.notificationsIcon = [
        <FaPaperPlane />,
        <FaEye />,
        <FaSearch />,
        <CallToActionIcon />,
        <DoneIcon />,
        <VerifiedUserIcon />,
        <VisibilityIcon />,
      ];
    } //----------------------------------------------------------------------------------------------------------

    return link;
  }

  return (
    <React.Fragment>
      <Navigation content={getLink()} bucketMain={main} />
    </React.Fragment>
  );
}
