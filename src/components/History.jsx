import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HistoryIcon from '@mui/icons-material/History';
import './History.css';

export const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = sessionStorage.getItem("userid");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/history/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistoryData(response.data.history);
      } catch (error) {
        console.error("Error al obtener el historial:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId, token]);

  if (loading) {
    return <p>Cargando historial...</p>;
  }

  return (
    <div className="history-container">
      <div className="history-main-text">
        <h1>Analysis History</h1>
        <p>Check your previous analysis and recommendations</p>
      </div>

      <div className="history-cards">
        {historyData.map((item, index) => (
          <div className="history-card" key={index}>
            <div className="history-card-header">
              <div className="history-icon-container">
                <HistoryIcon className="history-icon" />
              </div>
              <div className="history-card-title">
                <h3>
                  Detected emotion: <span className="emotion">{item.emotion}</span>
                </h3>
              </div>
              <div className="history-card-date">
                <p>{new Date(item.createdAt).toLocaleString()}</p>
              </div>
            </div>

            <div className="history-card-content">
              <h4>Recommendations:</h4>
              <ul className="recommendations-list">
                {item.songs.map((song, i) => (
                  <li key={i}>
                    {song.songName} — {song.artist}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
