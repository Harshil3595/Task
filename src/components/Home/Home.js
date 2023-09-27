import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInfo } from "../../actions/infoactions";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const dispatch = useDispatch();

  const { info } = useSelector((state) => state.info);

  const favorites_videos = JSON.parse(localStorage.getItem("favorites")) || [];

  useEffect(() => {
    dispatch(getAllInfo());
  }, [dispatch]);

  const [currentVideo, setCurrentVideo] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [selectedOption, setSelectedOption] = useState("All Videos");

  const addToFavorites = (video) => {
    if (!favorites.find((fav) => fav.videolink === video.videolink)) {
      const updatedFavorites = [...favorites, video];
      setFavorites(updatedFavorites);

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setCurrentVideo(null);
    } else {
      removeFromFavorites(video);
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
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    value="All Videos"
                    checked={selectedOption === "All Videos"}
                    onChange={() => setSelectedOption("All Videos")}
                  />
                  All Videos
                </label>
                <label>
                  <input
                    type="radio"
                    value="Favorites"
                    checked={selectedOption === "Favorites"}
                    onChange={() => setSelectedOption("Favorites")}
                  />
                  Favorites
                </label>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://source.unsplash.com/800x230/?tecnology"
              class="d-block w-100"
              alt="..."
            />
            <div class="carousel-caption d-none d-md-block">
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    value="All Videos"
                    checked={selectedOption === "All Videos"}
                    onChange={() => setSelectedOption("All Videos")}
                  />
                  All Videos
                </label>
                <label>
                  <input
                    type="radio"
                    value="Favorites"
                    checked={selectedOption === "Favorites"}
                    onChange={() => setSelectedOption("Favorites")}
                  />
                  Favorites
                </label>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://source.unsplash.com/800x230/?nature"
              class="d-block w-100"
              alt="..."
            />
            <div class="carousel-caption d-none d-md-block">
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    value="All Videos"
                    checked={selectedOption === "All Videos"}
                    onChange={() => setSelectedOption("All Videos")}
                  />
                  All Videos
                </label>
                <label>
                  <input
                    type="radio"
                    value="Favorites"
                    checked={selectedOption === "Favorites"}
                    onChange={() => setSelectedOption("Favorites")}
                  />
                  Favorites
                </label>
              </div>
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
     
      {selectedOption === "Favorites" && (
        <div className="favourite-videos">
          <h5>My Favorite Videos</h5>
          <div className="video-grid">
          {favorites_videos &&
            favorites_videos.map((video) => (
            <div key={video.videolink} className="video-thumbnail">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                onClick={() => playVideo(video)}
              />
              <div className="favorite-button" onClick={() => addToFavorites(video)}>
                <FontAwesomeIcon
                  icon={faHeart}
                />
              </div>
            </div>
          ))}
          </div>
        </div>
      )}
      <div className="all-videos">
      <h5>All videos</h5>
      <div className="video-grid">
        {info &&
          info.map((video) => (
            <div key={video.videolink} className="video-thumbnail">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                onClick={() => playVideo(video)}
              />
              <div className="favorite-button" onClick={() => addToFavorites(video)}>
                <FontAwesomeIcon
                  icon={faHeart}
                />
              </div>
            </div>
          ))}
      </div>
    </div>

      <div className="main">
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
                <button onClick={() => setCurrentVideo(null)}>
                  Close Video
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
