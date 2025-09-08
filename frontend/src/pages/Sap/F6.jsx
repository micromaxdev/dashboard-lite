import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, alpha } from "@material-ui/core/styles";
import { Button } from "flowbite-react/lib/cjs/components";
import PersonIcon from "@mui/icons-material/Person";
import BuildIcon from "@mui/icons-material/Build";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import Part from "./Part";
import Customer from "./Customer";
import Supplier from "./Supplier";
import { Icon } from "@iconify/react";
import SalesEmployees from "./SalesEmployees";

import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  iconWrapper: {
    backgroundColor: alpha(theme.palette.background.emphasis, 0.6),
  },
}));

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const F6 = () => {
  const queryParam = useQuery().get("query") || "";
  const cusCodeQuery = useQuery().get("cusCode") || "";
  const cusNameQuery = useQuery().get("cusName") || "";

  const [query, setQuery] = React.useState(queryParam);
  const classes = useStyles();

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleSetQuery = (newQuery) => {
    setQuery(newQuery);
    navigate(`/dashboard/sap?query=${newQuery}`);
  };

  useEffect(() => {
    setQuery(queryParam);
  }, [queryParam]);

  return (
    <div>
      <div className="flex">
        <div className="mr-auto">
          <Button.Group>
            <Button color="gray" onClick={() => handleSetQuery("part")}>
              <Avatar className={`${classes.iconWrapper}`} variant="rounded">
                <BuildIcon color="primary" />
              </Avatar>
              <span className="w-full text-xl ml-3 font-bold text-blue-900 dark:text-white">
                Part
              </span>
            </Button>
            <Button color="gray" onClick={() => handleSetQuery("customer")}>
              <Avatar className={`${classes.iconWrapper}`} variant="rounded">
                <PersonIcon color="primary" />
              </Avatar>
              <span className="w-full text-xl ml-3 font-bold text-blue-900 dark:text-white">
                Customer
              </span>
            </Button>
            <Button color="gray" onClick={() => handleSetQuery("supplier")}>
              <Avatar className={`${classes.iconWrapper}`} variant="rounded">
                <WarehouseIcon color="primary" />
              </Avatar>
              <span className="w-full text-xl ml-3 font-bold text-blue-900 dark:text-white">
                Supplier
              </span>
            </Button>
            <Button
              color="gray"
              onClick={() => handleSetQuery("salesEmployee")}
              className="salesEmployee"
            >
              <Avatar className={`${classes.iconWrapper}`} variant="rounded">
                <Icon
                  icon="healthicons:money-bag"
                  className="text-blue-600 text-2xl"
                />
              </Avatar>
              <span className="w-full text-xl ml-3 font-bold text-blue-900 dark:text-white">
                Sales Employees
              </span>
            </Button>
          </Button.Group>
        </div>
      </div>

      <hr className="my-4 h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>

      {query === "part" && <Part />}
      {query === "customer" && (
        <Customer cusCode={cusCodeQuery} cusName={cusNameQuery} />
      )}
      {query === "supplier" && <Supplier />}
      {query === "salesEmployee" &&
        (user.roles.includes("sales-team") ? (
          <SalesEmployees />
        ) : (
          <h2 className="text-xl font-extrabold dark:text-white">
            Contact admin for access to this content.
          </h2>
        ))}
    </div>
  );
};

export default F6;
