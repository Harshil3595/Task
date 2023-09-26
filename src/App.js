import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from './components/Home/Home';
import VideoDetails from './components/VideoDetails/VideoDetails ';
import MyVideos from './components/myVideos/MyVideos';

function App() {
  return (
    <>
      <Router>
            <Routes>
                <Route  path="/" element={<Home />} />
                <Route path='/favourites' element={<MyVideos/>}/>
            </Routes>
        </Router>
    </>
  )
}

export default App
