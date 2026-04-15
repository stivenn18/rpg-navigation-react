import { Link } from "react-router-dom";
import { useGameStore } from "../store/gameStore";
import { worldMap, getRoom } from "../data/worldMap";

export default function MapPage() {
  const currentLocationId = useGameStore((s) => s.currentLocationId);
  const playerName = useGameStore((s) => s.playerName);

  return (
    <div className="map-page">
      <div className="map-header">
        <h2 className="map-title">🗺 Mapa del Mundo</h2>
        <p className="map-subtitle">
          Las Cavernas de Umbrath — exploradas por{" "}
          <strong>{playerName}</strong>
        </p>
      </div>

      <div className="map-grid">
        {worldMap.map((room) => {
          const isHere = room.id === currentLocationId;
          const connections = Object.entries(room.direcciones)
            .filter(([, dest]) => dest !== null)
            .map(([dir, dest]) => ({ dir, dest }));

          return (
            <div
              key={room.id}
              className={`map-card ${isHere ? "map-card-active" : ""}`}
            >
              {isHere && (
                <div className="map-here-badge">
                  <span>🚩 ESTÁS AQUÍ</span>
                </div>
              )}

              <div className="map-card-icon">{room.icono}</div>
              <h3 className="map-card-title">{room.nombre}</h3>
              <p className="map-card-desc">{room.descripcion}</p>

              {connections.length > 0 && (
                <div className="map-connections">
                  <span className="map-connections-label">Salidas:</span>
                  <div className="map-connections-list">
                    {connections.map(({ dir, dest }) => {
                      const destRoom = getRoom(dest);
                      return (
                        <span key={dir} className="map-connection-tag">
                          {dir === "norte" && "▲"}
                          {dir === "sur" && "▼"}
                          {dir === "este" && "▶"}
                          {dir === "oeste" && "◀"}{" "}
                          {destRoom?.nombre}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {connections.length === 0 && (
                <div className="map-no-exit">🔒 Sin salidas</div>
              )}
            </div>
          );
        })}
      </div>

      <div className="map-footer">
        <Link to="/game" className="btn-primary">
          ⚔ Volver a Explorar
        </Link>
      </div>
    </div>
  );
}
