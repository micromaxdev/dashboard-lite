import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//components
import Login from "./components/Authenticate/Login";
import Logout from "./components/Authenticate/Logout";
import Register from "./components/Authenticate/Register";
import ForgotPassword from "./components/Authenticate/ForgotPassword";
import ResetPassword from "./components/Authenticate/ResetPassword";
import Layout from "./components/Layout/Layout";
import RequireAuth from "./components/Authenticate/RequireAuth";
import PageNotFound from "./components/Authenticate/PageNotFound";
import Forbidden from "./components/Authenticate/AccessDenied";
import QMAccountHeader from "./components/QM/Account/AccountHeader";

//pages
import HomePage from "./pages/home/HomePage";
import Nav from "./pages/navigation/Nav";
import Account from "./pages/account/Account";
import AccountDetails from "./pages/account/AccountDetails/AccountDetails";
import PrintChart from "./pages/account/PrintChart";
import ManageAccounts from "./pages/account/AccountDetails/ManageAccounts";
import F6 from "./pages/Sap/F6";

const ROLES = {
  employee: "employee",
  qm: "qm",
  admin: "admin",
  pending: "pending",
  salesTeam: "sales-team",
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* -----------------------------------Public Routes----------------------------------- */}

          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="unauthorised" element={<Unauthorised />} /> */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:resetToken"
            element={<ResetPassword />}
          />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<PageNotFound />} />

          {/* -----------------------------------Authenticated Routes----------------------------------- */}

          {/* -------------------Multiple Routes everyone------------------- */}

          <Route
            element={
              <RequireAuth
                allowedRoles={[
                  ROLES.employee,
                  ROLES.qm,
                  ROLES.pending,
                  ROLES.salesTeam,
                  ROLES.admin,
                ]}
              />
            }
          >
            <Route path="dashboard" element={<HomePage />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/forbidden" element={<Forbidden />} />
          </Route>

          {/* -------------------Multiple Routes emp and qm------------------- */}

          <Route
            element={
              <RequireAuth
                allowedRoles={[
                  ROLES.employee,
                  ROLES.qm,
                  ROLES.salesTeam,
                  ROLES.admin,
                ]}
              />
            }
          >
            <Route
              path="/dashboard/settings"
              element={<Nav main={[<Account />]} />}
            />
            <Route />
            <Route
              path="/dashboard/settings/details"
              element={<Nav main={[<AccountDetails />]} />}
            />
            <Route
              path="/dashboard/settings/print"
              element={<Nav main={[<PrintChart />]} />}
            />
            <Route path="/dashboard/sap" element={<Nav main={[<F6 />]} />} />
            <Route path="/uploadfiles" />
          </Route>

          {/* -------------------Employee Routes------------------- */}

          <Route
            element={
              <RequireAuth allowedRoles={[ROLES.employee, ROLES.admin]} />
            }
          ></Route>

          {/* -------------------Admin Routes------------------- */}

          <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
            <Route
              path="/dashboard/settings/manage"
              element={<Nav main={[<ManageAccounts />]} />}
            />
          </Route>

          {/* -------------------QM Routes------------------- */}

          <Route
            element={<RequireAuth allowedRoles={[ROLES.qm, ROLES.admin]} />}
          >
            <Route
              path="/lounge"
              element={<Nav main={[<QMAccountHeader />]} />}
            />
            <Route
              path="/dashboard/settings"
              element={<Nav main={[<QMAccountHeader />]} />}
            />
          </Route>
          {/* -------------------Pending Account Routes------------------- */}

          <Route
            element={
              <RequireAuth allowedRoles={[ROLES.pending, ROLES.admin]} />
            }
          >
            <Route path="*" element={<HomePage />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
