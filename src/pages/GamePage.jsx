import { useEffect, useState } from "react";
import { useGameStore } from "../store/gameStore";
import { getRoom } from "../data/worldMap";

const DIRECTION_LABELS = {
  norte: { label: "Norte", icon: "▲", key: "norte" },
  sur: { label: "Sur", icon: "▼", key: "sur" },
  este: { label: "Este", icon: "▶", key: "este" },
  oeste: { label: "Oeste", icon: "◀", key: "oeste" },
};

export default function GamePage() {
  const playerName = useGameStore((s) => s.playerName);
  const currentLocationId = useGameStore((s) => s.currentLocationId);
  const move = useGameStore((s) => s.move);
  const [animating, setAnimating] = useState(false);
  const [prevRoom, setPrevRoom] = useState(null);

  const currentRoom = getRoom(currentLocationId);

  const handleMove = (direction) => {
    const nextId = currentRoom?.direcciones[direction];
    if (!nextId) return;
    setAnimating(true);
    setPrevRoom(currentRoom);
    setTimeout(() => {
      move(direction);
      setAnimating(false);
    }, 350);
  };

  if (!currentRoom) return null;

  return (
    <div className="game-page">
      <div className="game-header">
        <span className="game-player-tag">⚜ {playerName}</span>
        <span className="game-location-tag">📍 {currentRoom.nombre}</span>
      </div>

      <div className={`room-card ${animating ? "room-exit" : "room-enter"}`}>
        <div className="room-icon">{currentRoom.icono}</div>
        <h2 className="room-title">{currentRoom.nombre}</h2>
        <div className="room-divider">── ✦ ──</div>
        <p className="room-description">{currentRoom.descripcion}</p>
      </div>

      <div className="compass-container">
        <div className="compass-grid">
          {/* Norte */}
          <div className="compass-slot compass-north">
            {currentRoom.direcciones.norte ? (
              <button
                className="compass-btn active"
                onClick={() => handleMove("norte")}
              >
                <span className="compass-arrow">▲</span>
                <span className="compass-label">Norte</span>
                <span className="compass-dest">
                  {getRoom(currentRoom.direcciones.norte)?.nombre}
                </span>
              </button>
            ) : (
              <div className="compass-btn disabled">
                <span className="compass-arrow">▲</span>
                <span className="compass-label">Norte</span>
                <span className="compass-blocked">Bloqueado</span>
              </div>
            )}
          </div>

          {/* Fila media: Oeste | Centro | Este */}
          <div className="compass-slot compass-west">
            {currentRoom.direcciones.oeste ? (
              <button
                className="compass-btn active"
                onClick={() => handleMove("oeste")}
              >
                <span className="compass-arrow">◀</span>
                <span className="compass-label">Oeste</span>
                <span className="compass-dest">
                  {getRoom(currentRoom.direcciones.oeste)?.nombre}
                </span>
              </button>
            ) : (
              <div className="compass-btn disabled">
                <span className="compass-arrow">◀</span>
                <span className="compass-label">Oeste</span>
                <span className="compass-blocked">Bloqueado</span>
              </div>
            )}
          </div>

          <div className="compass-center">
            <span className="compass-rose">✦</span>
          </div>

          <div className="compass-slot compass-east">
            {currentRoom.direcciones.este ? (
              <button
                className="compass-btn active"
                onClick={() => handleMove("este")}
              >
                <span className="compass-arrow">▶</span>
                <span className="compass-label">Este</span>
                <span className="compass-dest">
                  {getRoom(currentRoom.direcciones.este)?.nombre}
                </span>
              </button>
            ) : (
              <div className="compass-btn disabled">
                <span className="compass-arrow">▶</span>
                <span className="compass-label">Este</span>
                <span className="compass-blocked">Bloqueado</span>
              </div>
            )}
          </div>

          {/* Sur */}
          <div className="compass-slot compass-south">
            {currentRoom.direcciones.sur ? (
              <button
                className="compass-btn active"
                onClick={() => handleMove("sur")}
              >
                <span className="compass-arrow">▼</span>
                <span className="compass-label">Sur</span>
                <span className="compass-dest">
                  {getRoom(currentRoom.direcciones.sur)?.nombre}
                </span>
              </button>
            ) : (
              <div className="compass-btn disabled">
                <span className="compass-arrow">▼</span>
                <span className="compass-label">Sur</span>
                <span className="compass-blocked">Bloqueado</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
