import React from 'react'
import HistoryIcon from '@mui/icons-material/History';
import historyData from '../data/history.json'
import './History.css'

export const History = () => {
    return(
        <div className="history-container">
            <div className="history-main-text">
                <h1>Historial de análisis</h1>
                <p>Revisa tus análisis anteriores y recomendaciones</p>
            </div>

            <div className="history-cards">
                {historyData.map((item) => (
                    <div className="history-card" key={item.id}>
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
                            <p>{item.timestamp}</p>
                        </div>
                        </div>

                        <div className="history-card-content">
                        <h4>Recommendations:</h4>
                        <ul className="recommendations-list">
                            {item.recommendations.map((recommendation, index) => (
                            <li key={index}>{recommendation}</li>
                            ))}
                        </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
