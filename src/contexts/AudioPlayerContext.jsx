import { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';

const AudioPlayerContext = createContext(null);

// URL de démonstration - à remplacer par vos vrais fichiers audio
const DEMO_BEATS = {
  1: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  2: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  3: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  4: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  5: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
  6: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
};

export function AudioPlayerProvider({ children }) {
  const [currentBeat, setCurrentBeat] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio();
    
    const audio = audioRef.current;
    
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    const handleCanPlay = () => setIsLoading(false);
    const handleWaiting = () => setIsLoading(true);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('waiting', handleWaiting);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('waiting', handleWaiting);
      audio.pause();
      audio.src = '';
    };
  }, []);

  const playBeat = useCallback((beat) => {
    const audio = audioRef.current;
    
    if (currentBeat?.id === beat.id) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().catch(console.error);
        setIsPlaying(true);
      }
    } else {
      setCurrentBeat(beat);
      setIsLoading(true);
      audio.src = DEMO_BEATS[beat.id] || DEMO_BEATS[1];
      audio.volume = volume;
      audio.play().then(() => {
        setIsPlaying(true);
        setIsLoading(false);
      }).catch(err => {
        console.error('Audio play error:', err);
        setIsLoading(false);
      });
    }
  }, [currentBeat, isPlaying, volume]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const resume = useCallback(() => {
    if (audioRef.current && currentBeat) {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  }, [currentBeat]);

  const seek = useCallback((time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const changeVolume = useCallback((newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, []);

  const formatTime = useCallback((time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const value = {
    currentBeat,
    isPlaying,
    isLoading,
    currentTime,
    duration,
    volume,
    progress: duration ? (currentTime / duration) * 100 : 0,
    playBeat,
    pause,
    resume,
    seek,
    changeVolume,
    formatTime
  };

  return <AudioPlayerContext.Provider value={value}>{children}</AudioPlayerContext.Provider>;
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
}
