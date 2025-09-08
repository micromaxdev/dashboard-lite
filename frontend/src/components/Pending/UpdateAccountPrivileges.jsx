import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "../Authenticate/Header";

function UpdateAccountPrivileges() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Check if user has admin role
  const isAdmin = user?.roles?.includes("admin");

  return (
    <div className="container">
      <Header />
      {isAdmin ? (
        <div>
          <h2>Welcome Admin!</h2>
          <p>You have full administrative privileges.</p>
        </div>
      ) : (
        <div>
          <h2>Account Status: Pending</h2>
          <p>Contact Admin to update your account privileges</p>
        </div>
      )}
    </div>
  );
}

export default UpdateAccountPrivileges;
