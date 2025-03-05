import { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/home";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import Login from "./components/Login";
import AddTask from "./components/AddTask";
import ViewTask from "./components/ViewTask";
import UpdateTask from "./components/UpdateTask";
import MyTask from "./components/MyTask";

function App() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLogin(!!token);
  }, []);

  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <Navbar isLoggedIn={login} setIsLoggedIn={setLogin} />

      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Login setIsLoggedIn={setLogin} />} />

        <Route path="/" element={<Home />} />
        <Route
          path="/addTask"
          element={
            <PrivateRoute>
              <AddTask />
            </PrivateRoute>
          }
        />
        <Route
          path="/getUserTasks"
          element={
            <PrivateRoute>
              <MyTask isLoggedIn={login} />
            </PrivateRoute>
          }
        />
        <Route
          path="/viewTask/:id"
          element={
            <PrivateRoute>
              <ViewTask />
            </PrivateRoute>
          }
        />
        <Route
          path="/getUserTasks/viewTask/:id"
          element={
            <PrivateRoute>
              <ViewTask userTask="userTask" />
            </PrivateRoute>
          }
        />
        <Route
          path="/updateTask/:id"
          element={
            <PrivateRoute>
              <UpdateTask />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
