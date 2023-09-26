import React, { useState } from 'react';
import './MyVideos.css'; 
import { useNavigate } from 'react-router-dom';

function MyVideos() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const [currentVideo, setCurrentVideo] = useState(null);

  const navigate=useNavigate();

  const playVideo = (video) => {
    setCurrentVideo(video);
  };

  const closeVideo = () => {
    setCurrentVideo(null);
  };

  return (
    <>
     <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
                aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="https://source.unsplash.com/800x230/?code" class="d-block w-100" alt="..." />
                <div class="carousel-caption d-none d-md-block">
                <button class="btn btn-success" onClick={() => {navigate('/')}}>All videos</button>
                </div>
            </div>
            <div class="carousel-item">
                <img src="https://source.unsplash.com/800x230/?tecnology" class="d-block w-100" alt="..." />
                <div class="carousel-caption d-none d-md-block">
                    <button class="btn btn-success" onClick={() => {navigate('/')}}>All videos</button>
                </div>
            </div>
            <div class="carousel-item">
                <img src="https://source.unsplash.com/800x230/?nature" class="d-block w-100" alt="..." />
                <div class="carousel-caption d-none d-md-block">
                <button class="btn btn-success" onClick={() => {navigate('/')}}>All videos</button>
                </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
      <div className="my-favorite-videos">
      <h2>My Favorite Videos</h2>
      <div className="video-grid">
        {favorites.map((video) => (
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
        <div className="video-player">
          <iframe
            title={currentVideo.title}
            width="560"
            height="315"
            src={currentVideo.videolink}
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <button onClick={closeVideo}>Close Video</button>
        </div>
      )}
    </div>
    </>
  );
}

export default MyVideos;
