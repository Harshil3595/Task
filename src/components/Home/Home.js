import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInfo } from "../../actions/infoactions";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { info } = useSelector((state) => state.info);

  useEffect(() => {
    dispatch(getAllInfo());
  }, [dispatch]);

  const [currentVideo, setCurrentVideo] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (video) => {
    if (!favorites.find((fav) => fav.videolink === video.videolink)) {
      const updatedFavorites = [...favorites, video];
      setFavorites(updatedFavorites);

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setCurrentVideo(null)
    }
  };

  const removeFromFavorites = (video) => {
    const updatedFavorites = favorites.filter(
      (fav) => fav.videolink !== video.videolink
    );
    setFavorites(updatedFavorites);

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const playVideo = (video) => {
    setCurrentVideo(video);
  };

  const addToFavoritesButton = () => {
    if (currentVideo) {
      addToFavorites(currentVideo);
    }
  };

  return (
    <div>
      {favorites.length > 0 && (
        <div className="favorites">
          <button onClick={() => navigate("/favourites")}>
            View My Favorites
          </button>
        </div>
      )}
      <div className="video-grid">
        {info &&
          info.map((video) => (
            <div key={video.videolink} className="video-thumbnail">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                onClick={() => playVideo(video)}
              />
            </div>
          ))}
      </div>

      {currentVideo && (
       <>
       <div className="video-player">
          <iframe
            title={currentVideo.title}
            width="560"
            height="315"
            src={currentVideo.videolink}
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <h4>{currentVideo.title}</h4>
          <div className="all-tags">
          {currentVideo.tags.map((tag) => (
            <span className="tags" key={tag}>
              {tag}
            </span>
          ))}
          </div>
          <div className="all-btn">
          <button onClick={() => setCurrentVideo(null)}>Close Video</button>
          <button onClick={addToFavoritesButton}>Add to Favorites</button>
          </div>
        </div>
       </>
      )}
    </div>
  );
}

export default Home;
