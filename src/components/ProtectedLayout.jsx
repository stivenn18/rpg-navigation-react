import { Navigate, Outlet } from "react-router-dom";
import { useGameStore } from "../store/gameStore";
import Navbar from "./Navbar";

export default function ProtectedLayout() {
  const playerName = useGameStore((s) => s.playerName);

  if (!playerName) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
