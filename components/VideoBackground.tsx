

const VideoBackground = () => {
    return (
      <div className="absolute inset-0 w-full overflow-hidden -z-10 rounded-lg">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full opacity-20"
        >
          <source src="https://cdn.pixabay.com/video/2022/04/09/113368-697718069_large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-black to-transparent opacity-10"></div>
      </div>
    );
  };
  
  export default VideoBackground;