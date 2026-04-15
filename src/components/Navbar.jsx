import { Link, useNavigate } from "react-router-dom";
import { useGameStore } from "../store/gameStore";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const playerName = useGameStore((s) => s.playerName);
  const reset = useGameStore((s) => s.reset);
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleReset = () => {
    reset();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-skull">☠</span>
        <span className="navbar-title">Cavernas de Umbrath</span>
      </div>

      <div className="navbar-links">
        <Link to="/" className="nav-link">
          ⚔ Inicio
        </Link>
        {playerName && (
          <>
            <Link to="/game" className="nav-link">
              🗡 Explorar
            </Link>
            <Link to="/map" className="nav-link">
              🗺 Mapa
            </Link>
          </>
        )}
      </div>

      <div className="navbar-right">
        {playerName && (
          <span className="player-badge">
            <span className="player-icon">⚜</span> {playerName}
          </span>
        )}
        <button className="theme-toggle" onClick={toggleTheme} title="Cambiar tema">
          {isDark ? "☀ Pergamino" : "🌑 Calabozo"}
        </button>
        {playerName && (
          <button className="btn-reset" onClick={handleReset}>
            ✕ Salir
          </button>
        )}
      </div>
    </nav>
  );
}
