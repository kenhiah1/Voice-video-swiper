const videoPlayer = document.getElementById('videoPlayer');

const videoList = [
  'https://www.w3schools.com/html/mov_bbb.mp4',
  'https://www.w3schools.com/html/movie.mp4'
];
let currentVideo = 0;

function playVideo(index) {
  currentVideo = (index + videoList.length) % videoList.length;
  videoPlayer.src = videoList[currentVideo];
  videoPlayer.play();
}

playVideo(currentVideo);

// --- Voice Recognition Setup ---
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
    console.log('Heard:', transcript);

    if (transcript.includes('up')) {
      console.log('Voice Command: Up');
      alert("Voice Command: Up - You can add your custom action here!");
    } else if (transcript.includes('down')) {
      console.log('Voice Command: Down');
      alert("Voice Command: Down - You can add your custom action here!");
    } else if (transcript.includes('next') || transcript.includes('left')) {
      console.log('Voice Command: Next Video');
      playVideo(currentVideo + 1);
    } else if (transcript.includes('previous') || transcript.includes('right')) {
      console.log('Voice Command: Previous Video');
      playVideo(currentVideo - 1);
    }
  };

  recognition.onerror = (event) => {
    console.error('Voice recognition error:', event.error);
  };

  recognition.onend = () => {
    recognition.start(); // Restart automatically
  };

  recognition.start();
} else {
  alert("Speech Recognition is not supported in this browser.");
}
