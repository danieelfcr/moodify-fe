import CloseIcon from '@mui/icons-material/Close';
import "./EmotionModal.css"

export const EmotionModal = ({ isOpen, onClose, image, emotion, songs }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <CloseIcon size={24} />
        </button>

        <h2 className="modal-title">Emotion Analysis</h2>

        <div className="modal-image-container">
          <img src={image || "/placeholder.svg"} alt="Analyzed" className="modal-image" />
        </div>

        <div className="modal-results">
          <div className="emotion-result">
            <h3>Detected emotion:</h3>
            <p className="emotion-text">{emotion}</p>
          </div>

          <div className="songs-recommendation">
            <h3>Recommended songs:</h3>
            <ul className="songs-list">
              {songs.map((song, index) => (
                <li key={index} className="song-item">
                  {song}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
