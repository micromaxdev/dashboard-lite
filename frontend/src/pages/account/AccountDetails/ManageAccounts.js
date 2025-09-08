import * as React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import {
  deleteUser,
  getUser,
  manageUserOne,
  reset,
  updateUser,
} from "../../../features/auth/authSlice";
import Spinner from "../../../components/Spinner";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import BreadcrumbsActiveLast from "../../../components/Navigation/Breadcrumbs/BreadcrumbsActiveLast";
import DropdownSelect from "../../../components/Forms/Dropdowns/DropdownSelect";
import DropDownMultiChip from "../../../components/Forms/Dropdowns/DropDownMultiChip";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogAlert from "../../../components/Feedback/Dialog/DialogAlert";
import { toast } from "react-toastify";
import UserInfo from "./UserInfo";

const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.email,
});

const useHelperTextStyles = makeStyles(() => ({
  root: {
    display: "flex",
    backgroundColor: "snow",
  },
}));

export default function ManageAccounts({ props }) {
  //------------------ATTRIBUTES/VARIABLES------------------

  const dispatch = useDispatch();

  const { user, users, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.auth
  );

  const arr1 = [{ email: "", _id: "" }];

  const execTeam = users.concat(arr1);

  // Create supervisor options with "None" option
  const supervisorOptions = [{ email: "None", _id: "none" }, ...users];

  const [one, setOne] = React.useState("");

  const [owner, setOwner] = React.useState(null);

  // Changed to arrays to handle multiple selections
  const [role, setRole] = React.useState([]);

  const [removeRole, setRemoveRole] = React.useState([]);
  // Phone number handlers
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [phoneNumberError, setPhoneNumberError] = React.useState(false);

  const [companyRole, setCompanyRole] = React.useState("");

  const [managementLevel, setManagementLevel] = React.useState("");
  const [ref, setRef] = React.useState("");

  const [exec, setExec] = React.useState("");

  const [supervisor, setSupervisor] = React.useState("");

  // Add state to track if supervisor has been changed
  const [supervisorChanged, setSupervisorChanged] = React.useState(false);

  const helperTextStyles = useHelperTextStyles();

  //------------------FUNCTIONS------------------

  //------------

  function setTheOwner(res) {
    setSupervisor("");
    setSupervisorChanged(false);
    setOwner(null);

    if (res) {
      setOwner(res);
      // setRole(res.roles.includes("qm") ? "QM" : "Employee");
      setExec(res.exec ? res.exec : "no");
      setSupervisor(res.supervisor ? res.supervisor : "");
    } else {
      setOwner(null);
      setRole([]);
      setExec("no");
      setSupervisor("");
      setSupervisorChanged(false);
    }
  }

  //------------
  function updateUser() {
    var roles = [];

    // Check if roles are pending - if so, process the new role assignments
    if (owner.roles.includes("pending")) {
      // Assign selected roles and convert to lowercase
      roles = [...new Set(role.map((r) => r.toLowerCase()))];

      // Remove deselected roles (case-insensitive)
      roles = roles.filter((r) => !removeRole.includes(r.toLowerCase()));
    } else {
      // For users without pending role, combine existing and new roles
      // Assign selected roles and convert to lowercase
      roles = [...new Set(role.map((r) => r.toLowerCase()))];

      // Remove deselected roles (case-insensitive)
      roles = roles.filter((r) => !removeRole.includes(r.toLowerCase()));

      // Add existing roles (case-insensitive) without duplicates
      roles = [
        ...new Set(roles.concat(owner.roles.map((r) => r.toLowerCase()))),
      ];
    }

    // Validate the phone number
    if (!isValidPhoneNumber(phoneNumber)) {
      setPhoneNumberError(true);
      alert("Please enter only numbers for the phone number.");
      return;
    }

    var _id = owner._id;

    // Convert roles to lowercase for consistency
    var removedRole = removeRole.map((role) => role.toLowerCase());

    var data = {
      _id,
      roles,
      exec,
      removedRole,
      phoneNumber,
      companyRole,
      managementLevel,
      ref,
    };

    // Only include supervisor if it has been changed
    if (supervisorChanged) {
      data.supervisor = supervisor === "none" ? null : supervisor;
    }

    try {
      if (user.roles.includes("admin")) {
        try {
          dispatch(manageUserOne(data));
          dispatch(getUser());
          toast.success(
            "Success! Please alert the updated user to logout and back into their account for updated changes."
          );
          setTimeout(function () {
            window.location.reload(); // reload page
          }, 3000); // delay for 3 seconds
        } catch (error) {
          toast.error("Error occurred!");
        }
      }
    } catch (error) {
      toast.error("You do not have admin access!");
    }

    // Reset state variables after updating
    setRole([]);
    setRemoveRole([]);
    setExec("");
    setSupervisor("");
    setSupervisorChanged(false);

    setPhoneNumber("");
    setPhoneNumberError(false);
    setCompanyRole("");
  }

  //------------

  function deleteUserById() {
    try {
      var _id = owner._id;
      dispatch(deleteUser(_id));
      toast.success("Deleted!");
    } catch (error) {
      toast.error("Error occured!");
    }
  }

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
    // Reset the phone number error message when the user starts typing
    setPhoneNumberError(false);
  };

  const handleCompanyRoleChange = (event, value) => {
    if (value) {
      setCompanyRole(value.role);
      setManagementLevel(value.managementlvl);
      setRef(value._id);
    } else {
      setCompanyRole("");
      setManagementLevel("");
      setRef("");
    }
  };

  const handleSupervisorChange = (event, value) => {
    if (value && value._id === "none") {
      setSupervisor("none");
    } else if (value) {
      setSupervisor(value._id);
    } else {
      setSupervisor("");
    }
    setSupervisorChanged(true);
  };

  const isValidPhoneNumber = (number) => {
    // Check if it contains only numerical characters
    return /^\d+$/.test(number) || number.trim() === "";
  };

  //------------------USE EFFECT------------------

  //------------

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    try {
      dispatch(getUser());
    } catch (error) {}

    // return () => {
    //     dispatch(reset())
    // }
  }, [isError, message, dispatch]);

  //------------

  if (isLoading) {
    return <Spinner />;
  }

  //------------------RETURN RENDER------------------

  return (
    <Box display="flex" width="100%" m={1}>
      <Container maxWidth="lg">
        <Box>
          <BreadcrumbsActiveLast
            links={[
              { heading: "Account", link: "/dashboard/settings" },
              { heading: "Manage", link: "/" },
            ]}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Box
            sx={{
              flex: "0 0 330px",
              padding: 4,
            }}
          >
            {/* Left column with fixed width */}
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Autocomplete
                  id="filter-demo"
                  options={users}
                  getOptionLabel={(option) => option.email}
                  onChange={(event, value) => setTheOwner(value ? value : null)}
                  filterOptions={filterOptions}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="User"
                      style={{ backgroundColor: "white" }}
                    />
                  )}
                />
              </Grid>

              {owner != null && (
                <>
                  <Grid item xs={12} sm={12} md={12}>
                    <DropDownMultiChip
                      dropDownLabel={"Assign Role/Access"}
                      getter={role}
                      setter={setRole}
                      list={["Employee", "QM", "Sales-Team", "Admin"]}
                      minWidth={"300px"}
                      maxWidth={"300px"}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <DropDownMultiChip
                      dropDownLabel={"Remove Role/Access"}
                      getter={removeRole}
                      setter={setRemoveRole}
                      list={["Employee", "QM", "Sales-Team", "Admin"]}
                      minWidth={"300px"}
                      maxWidth={"300px"}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <DropdownSelect
                      title={"Exec team"}
                      getter={exec}
                      setter={setExec}
                      backgroundColor={"White"}
                      mitems={["yes", "no"]}
                      minWidth={"300px"}
                      maxWidth={"300px"}
                      margin={1}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} style={{ marginTop: 2 }}>
                    <Autocomplete
                      id="filter-demo"
                      options={supervisorOptions}
                      getOptionLabel={(option) => option.email}
                      onChange={(event, value) =>
                        handleSupervisorChange(event, value)
                      }
                      filterOptions={filterOptions}
                      //value={supervisor}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Supervisor"
                          style={{ backgroundColor: "white" }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} style={{ marginTop: 2 }}>
                    <TextField
                      label="Phone Number"
                      variant="outlined"
                      fullWidth
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      error={phoneNumberError}
                      helperText={
                        phoneNumberError ? "Invalid phone number" : ""
                      }
                      style={{ backgroundColor: "white", width: 300 }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} style={{ marginTop: 2 }}>
                    <Box display="flex" width="230px">
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={6}>
                          <Button
                            variant="contained"
                            endIcon={<SendIcon />}
                            color="secondary2"
                            onClick={() => updateUser()}
                            sx={{
                              ml: 0,
                              mt: 0,
                              boxShadow: 3,
                              minWidth: "110px", //maxWidth: '100px',
                              "&:hover": { bgcolor: "#ff8f00" },
                            }}
                          >
                            Update
                          </Button>
                        </Grid>

                        <Grid item xs={12} sm={6} md={6}>
                          <DialogAlert
                            setter={deleteUserById}
                            buttonColor={"error"}
                            mWidth={"110px"}
                            buttonTitle={"Delete"}
                            buttonIcon={<DeleteIcon />}
                            dialogTitle={"Delete User"}
                            dialogDescription={
                              <>
                                <div className="text-red-500">
                                  <b>WARNING</b>
                                </div>
                                <div className="">
                                  Are you sure you want to delete the selected
                                  user? This action can't be undone.
                                </div>
                              </>
                            }
                            dialogCancelTitle={"Cancel"}
                            dialogAcceptTitle={"Delete user"}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
          <Box sx={{ flex: "1", padding: 3 }}>
            {/* Right column taking up the rest of the screen */}
            <div className="mt-7 flex-none">
              <UserInfo employee={owner} />
            </div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
