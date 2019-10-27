window.addEventListener('load', () => {
  const scene = document.getElementById('parallax-scene');
  const parallaxInstance = new Parallax(scene);
  
  AOS.init();
  
  const bgMusic = new Audio('./assets/background-music.mp3');
  bgMusic.volume = 0.1;
  bgMusic.autoplay = true;
  bgMusic.loop = true;
  
  const snapSound = new Audio('./assets/thanos-snap.mp3');
  snapSound.volume = 0.3;
  
  const stoneSound = new Audio('./assets/stone-sound.mp3');
  stoneSound.volume = 1;

  const thanosQuote = new Audio('./assets/thanos-quote.mp3');
  thanosQuote.volume = 0.5;

  let originalPopulation = 7704273379;
  let currentPopulation = 7704273379;
  //let currentPopulation = 1;
  document.querySelector('.infinity-gauntlet__population').innerText = currentPopulation.toLocaleString('hu-HU');

  let snapPopulation = 0;
  
  let isSnapEnded = true;
  
  document.querySelector('.infinity-gauntlet__gauntlet').addEventListener('click', () => {
    if (currentPopulation === 1) {
      Swal.fire({
        title: 'Már csak te maradtál...',
        width: 600,
        imageUrl: './assets/thanos-throne.jpg',
        background: 'rgba(255, 255, 255, 0.1)',
        backdrop: `
          rgba(0, 0, 0, 0.9)
        `,
        timer: 3000,
        showConfirmButton: false
      })

      return;
    }

    if (isSnapEnded) {
      snapSound.play().then(() => {
        document.getElementById('snap-effect').style.opacity = 1;
        document.getElementById('snap-effect').style.visibility = 'visible';

        setTimeout(() => {
          document.getElementById('snap-effect').style.opacity = 0;
          document.getElementById('snap-effect').style.visibility = 'hidden';

          let options = {
            useEasing : false,
            useGrouping : true,
            separator : ' ',
            decimal : '',
            prefix : '',
            suffix : ''
          };
      
          snapPopulation = Math.round(currentPopulation/2);
          
          let counter = new CountUp('worldPopulation', currentPopulation, snapPopulation, 0, 2, options);
          
          currentPopulation = snapPopulation;
          
          counter.start();
        }, 1200);
      });
    }
  
    isSnapEnded = false;
    
    snapSound.addEventListener('ended', () => {
      isSnapEnded = true;
    });
  });

  isStoneEffectEnded = true;

  Array.from(document.querySelectorAll('.infinity-stones__stones__stone')).forEach((stone) => {
    stone.addEventListener('click', (element) => {
      if (isStoneEffectEnded) {        
        stoneSound.play().then(() => {
          let temp = element.srcElement;

          if (temp.id === 'stone-green') {
            let options = {
              useEasing : false,
              useGrouping : true,
              separator : ' ',
              decimal : '',
              prefix : '',
              suffix : ''
            };

            let counter = new CountUp('worldPopulation', currentPopulation, originalPopulation, 0, 2, options);
            counter.start();

            currentPopulation = originalPopulation;
          }

          document.getElementById(`${temp.id}-effect`).style.opacity = 0.15;
          document.getElementById(`${temp.id}-effect`).style.visibility = 'visible';
    
          setTimeout(() => {
            document.getElementById(`${temp.id}-effect`).style.opacity = 0;
            document.getElementById(`${temp.id}-effect`).style.visibility = 'hidden';
          }, 500);
        });
        
        isStoneEffectEnded = false;

        stoneSound.addEventListener('ended', () => {
          isStoneEffectEnded = true;
        });
      }
    });

    stone.addEventListener('mouseover', () => {
      document.querySelector('.infinity-stones__stones__choose').style.opacity = '0';
    });
  
    stone.addEventListener('mouseout', () => {
      document.querySelector('.infinity-stones__stones__choose').style.opacity = '0.2';
    });
  });

  document.querySelector('.mission__thanos').addEventListener('click', () => {
    thanosQuote.play();
  });
});
