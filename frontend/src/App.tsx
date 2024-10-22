import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import AuthProvider from "./contexts/AuthContext";
import Main from "./Layout/Main";



function PrivateRoute({ children }: { children: React.ReactNode }) {
  
  const storedUser = localStorage.getItem("user");

  return storedUser ? <>{children}</> : <Navigate to="/login" replace />;
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
