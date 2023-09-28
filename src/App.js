import { useEffect, useState } from "react";
// import { createClient } from "pexels";
import "./App.css";

function App() {
  const API_KEY = "MqfKDtZmz5CfB9fpp1ooaDBUNs1y8kvP7iJ5UXumfyZMssEbr2ABYH3s";
  // let images = [image1, image2, image3, image4, image5, image6];
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [photographers, setPhotographers] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  const getPhotos = async () => {
    await fetch("https://api.pexels.com/v1/curated?per_page=10", {
      headers: { Authorization: API_KEY },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setLoading(false);
        const photos = data.photos;
        setImages(photos.map((photo) => photo.src.medium));
        setPhotographers(photos.map((photo) => photo.photographer));
      });
  };

  useEffect(() => {
    getPhotos();
  }, []);

  const nextSlide = () => {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
  };
  const prevSlide = () => {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
  };
  return (
    <div className="App">
      <h2>Image Carousel</h2>
      <div className="slide-wrapper">
        <button className="button" onClick={prevSlide}>
          &lt;
        </button>
        {!loading && (
          <div className="image-box">
            <img className="image" src={images[currentImage]} alt="back" />
          </div>
        )}
        <button className="button" onClick={nextSlide}>
          &gt;
        </button>
      </div>
      <div className="text">{photographers[currentImage]}</div>
    </div>
  );
}

export default App;
