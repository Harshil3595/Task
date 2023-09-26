import React, { useState } from 'react';
import './MyVideos.css'; 

function MyVideos() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const [currentVideo, setCurrentVideo] = useState(null);

  const playVideo = (video) => {
    setCurrentVideo(video);
  };

  const closeVideo = () => {
    setCurrentVideo(null);
  };

  return (
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
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            <div className="tags">
              {video.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
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
  );
}

export default MyVideos;
