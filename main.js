const scene = document.getElementById('parallax-scene');
const parallaxInstance = new Parallax(scene);

AOS.init();

const audio = document.getElementById('background-music');
audio.volume = 0.4;