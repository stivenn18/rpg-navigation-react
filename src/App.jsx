import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import PublicLayout from "./components/PublicLayout";
import ProtectedLayout from "./components/ProtectedLayout";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import MapPage from "./pages/MapPage";
import "./App.css";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <HomePage /> },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      { path: "/game", element: <GamePage /> },
      { path: "/map", element: <MapPage /> },
    ],
  },
]);

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
