
import { useState, useRef } from "react"
import { EmotionModal } from "./EmotionModal";
import "./Analyze.css"
import FileUploadIcon from '@mui/icons-material/FileUpload';
import axios from "axios";

export const Analyze = () => {

  const [selectedFile, setSelectedFile] = useState(null)
  const [image, setImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [showModal, setShowModal] = useState(false)
  //Just for now..
  const [emotion, setEmotion] = useState(null);
  const songs = ["Someone Like You - Adele", "Fix You - Coldplay", "Hurt - Johnny Cash"]
  ///
  const fileInputRef = useRef(null)

  //**************FILE USAGE******************* */
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    handleFile(file)
  }

  const handleDrop = (event) => {
    event.preventDefault() //Prevent default behavior from browser
    event.stopPropagation()

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0]
      handleFile(file)
    }
  }

  const handleFile = (file) => {
    if (file) {
      //Verify size file 5MB
      if (file.size > 5 * 1024 * 1024) {
        alert("File is too big. Max file is 5MB.")
        return
      }

      //Verify file type
      if (!file.type.match("image/jpeg") && !file.type.match("image/png")) {
        alert("We only accepts JPG or PNG files.")
        return
      }

      setSelectedFile(file)

      //Create URL for previsualization
      const fileUrl = URL.createObjectURL(file)
      setPreviewUrl(fileUrl)
      setImage(fileUrl)
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleUploadClick = () => {
    fileInputRef.current.click()
  }

  //Analyze emotion modal
  const analyzeEmotion = async () => {
    if (!selectedFile) {
      alert("Upload an image first...")
      return
    }

    //Encode file to base64
    const reader = new FileReader();

    //"Promise"
    reader.onload = async () => {
      const base64Image = reader.result;
      console.log(base64Image);
      try {
        const res = await axios.post(
          'http://localhost:3001/emotion/detect-emotion',
          { image_base64: base64Image },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
  
        console.log(res.data);
        setEmotion(res.data.emotion);
        setShowModal(true);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          alert("Image doesn't contain any faces.");
        }
        else {
          console.error("Error analyzing emotion:", error);
          alert("There was an error analyzing the emotion.");
        }
      }
    };
    reader.readAsDataURL(selectedFile); //Convert image to a base64 string
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <div className="photo-upload-container">
      <div className="photo-section">
        <div className="photo-text-section">
            <div className="text-container">
                <h2>Upload a photo</h2>
                <p>Upload an existing photo to analyze it</p>
            </div>
            <div className="btn-container">
                <button id="analyze-btn" disabled={!selectedFile} onClick={analyzeEmotion}>Analyze</button>
            </div>
        </div>
        
        {/*Add class with-preview if previewUrl has some value*/}
        <div
          className={`upload-area ${previewUrl ? "with-preview" : ""}`} 
          onClick={handleUploadClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
        {/*Conditional. If previewUrl has a value or not*/}
          {previewUrl ? (
            <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="preview-image" />
          ) : (
            <>
              <FileUploadIcon size={40} className="upload-icon" />
              <p className="upload-text">Click to upload or drag and drop</p>
              <p className="upload-format">PNG, JPG (MAX. 5MB)</p>
            </>
          )}
          {/*Formats and type*/}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png"
            className="file-input"
          />
        </div>
      </div>
      {/*Modal Comp.*/}
      <EmotionModal isOpen={showModal} onClose={closeModal} image={image} emotion={emotion} songs={songs} />
    </div>
  )
}


