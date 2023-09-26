import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInfo } from "../../actions/infoactions";
import "./Home.css";
import { useNavigate } from "react-router-dom";

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
      setCurrentVideo(null);
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
    <>
      <div
        id="carouselExampleCaptions"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://source.unsplash.com/800x230/?code"
              class="d-block w-100"
              alt="..."
            />
            <div class="carousel-caption d-none d-md-block">
              {favorites.length > 0 && (
                <div className="favorites">
                  <button onClick={() => navigate("/favourites")}>
                    View My Favorites
                  </button>
                </div>
              )}{" "}
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://source.unsplash.com/800x230/?tecnology"
              class="d-block w-100"
              alt="..."
            />
            <div class="carousel-caption d-none d-md-block">
              {favorites.length > 0 && (
                <div className="favorites">
                  <button onClick={() => navigate("/favourites")}>
                    View My Favorites
                  </button>
                </div>
              )}{" "}
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://source.unsplash.com/800x230/?nature"
              class="d-block w-100"
              alt="..."
            />
            <div class="carousel-caption d-none d-md-block">
              {favorites.length > 0 && (
                <div className="favorites">
                  <button onClick={() => navigate("/favourites")}>
                    View My Favorites
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
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
    </>
  );
}

export default Home;
