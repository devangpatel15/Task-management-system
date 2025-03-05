import { Link, useNavigate } from "react-router-dom";

import "./css/Navbar.css";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      console.log("log out");
      await localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };

  const navbarTab = [
    { path: "/", label: "Home" },
    ...(isLoggedIn
      ? [
          { path: "/addTask", label: "add Tasks" },
          { path: "/getUserTasks", label: "My Tasks" },
          { handleClick, label: "Logout" },
        ]
      : [
          { path: "/register", label: "signup" },
          { path: "/login", label: "Login" },
        ]),
  ];

  return (
    <nav className="signup-login-button">
      {navbarTab.map((item, key) => {
        return item.path ? (
          <Link to={item.path} key={key} className="nav_items">
            <button>{item.label}</button>
          </Link>
        ) : (
          <button key={key} onClick={item.handleClick}>
            {item.label}
          </button>
        );
      })}
    </nav>
  );
};

export default Navbar;
