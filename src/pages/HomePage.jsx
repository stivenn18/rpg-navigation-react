import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/gameStore";

export default function HomePage() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const setPlayerName = useGameStore((s) => s.setPlayerName);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Debes ingresar tu nombre, aventurero.");
      return;
    }
    setPlayerName(trimmed);
    navigate("/game");
  };

  return (
    <div className="home-page">
      <div className="home-card">
        <div className="home-rune">☽ ✦ ☾</div>
        <h1 className="home-title">Las Cavernas de Umbrath</h1>
        <p className="home-subtitle">
          Un oscuro laberinto aguarda tu llegada. Sólo los valientes se atreven
          a descender a sus profundidades.
        </p>

        <div className="home-divider">⚔ ─── ⚔</div>

        <form onSubmit={handleSubmit} className="home-form">
          <label className="form-label" htmlFor="playerName">
            ¿Cómo te llaman, aventurero?
          </label>
          <input
            id="playerName"
            type="text"
            className="form-input"
            placeholder="Tu nombre..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            maxLength={30}
          />
          {error && <p className="form-error">⚠ {error}</p>}
          <button type="submit" className="btn-primary">
            <span className="btn-icon">⚜</span> Comenzar Aventura
          </button>
        </form>

        <p className="home-warning">
          ⚠ El que entra rara vez regresa con cordura.
        </p>
      </div>
    </div>
  );
}
