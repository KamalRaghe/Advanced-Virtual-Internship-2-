import { useRef, useState, useEffect } from 'react';
import { MdReplay10, MdOutlineForward10 } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { IoMdPause } from "react-icons/io";

const AudioPlayer = ({ audioUrl, author, title, img }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  

  // Play or pause audio
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Update current time as audio plays
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Update duration when audio metadata is loaded
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  // Format time for display
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  // Skip backward 10 seconds
  const handleSkipBack = () => {
    audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
  };

  // Skip forward 10 seconds
  const handleSkipForward = () => {
    audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10);
  };

  // Handle seek bar change
  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#0A2E3D',
      padding: '25px',
      color: 'white',
      width: '100%',
      zIndex:"200",
      position:"fixed",
      top:"87%", 
    }}>
      {/* Link label */}
     

      <div style={{display:'flex', alignItems: 'center',justifyContent:"space-between", gap: '10px', width: '100%' }}>
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />

        <div style={{display:"flex",alignItems:"center",fontSize:"12px"}} >
        <div style={{scale:"0.09",width:"20px",height:"30px",position:'relative',bottom:"25px"}} >
          <img src={img}></img>
        </div>
          <div style={{position:'relative',left:"50px"}} >
            <div>{title}</div>
            <div style={{color:"lightgrey"}} >{author}</div>
          </div>
        </div>

        <div style={{width:"100px",display:'flex', alignItems: 'center',justifyContent:"space-between",left:"40px",top:"4px",position:'relative'}}>
            {/* Skip Backward Button */}
          <button onClick={handleSkipBack} style={buttonStyle}>< MdReplay10 style={{scale:"1.5"}}/></button>
          
          {/* Play/Pause Button */}
          <button onClick={togglePlayPause} style={buttonStyle}>
            {isPlaying ? <IoMdPause/> :  <FaPlay/>}
          </button>

          {/* Skip Forward Button */}
          <button onClick={handleSkipForward} style={buttonStyle}><MdOutlineForward10 style={{scale:"1.5"}}/></button>

        </div>

        <div style={{width:"180px",display:'flex', alignItems: 'center',justifyContent:"space-between"}}>
          {/* Current Time */}
          <span>{formatTime(currentTime)}</span>

          {/* Seek Bar */}
          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
            style={{
              width: '100px',
              marginLeft: '10px',
              accentColor: 'white',
            }}
          />

          {/* Total Duration */}
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

const buttonStyle = {
  color: 'white',
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '20px',
  cursor: 'pointer',

};

export default AudioPlayer;