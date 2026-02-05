// Valentine site interactions (refactor: remove inline JS/onclick)
document.addEventListener('DOMContentLoaded', () => {
  const noButton = document.getElementById('noButton');
  const yesButton = document.getElementById('yesButton');
  const buttonsContainer = document.getElementById('buttonsContainer');
  const mainPage = document.getElementById('mainPage');
  const errorPage = document.getElementById('errorPage');

  if (!noButton || !yesButton || !buttonsContainer || !mainPage || !errorPage) {
    // If elements are missing, do nothing to avoid runtime errors.
    return;
  }

  let isDodging = false;

  function getRandomPosition() {
    const container = buttonsContainer.getBoundingClientRect();
    const button = noButton.getBoundingClientRect();

    // Leave some margin so the button stays in view.
    const maxX = container.width - button.width - 100;
    const maxY = container.height - button.height - 40;

    const randomX = Math.random() * maxX - (maxX / 2);
    const randomY = Math.random() * maxY - (maxY / 2);

    return { x: randomX, y: randomY };
  }

  function dodgeButton() {
    if (!isDodging) return;

    const pos = getRandomPosition();
    noButton.style.left = `calc(50% + ${pos.x}px)`;
    noButton.style.top = `${pos.y}px`;
  }

  function createHeart() {
    const heart = document.createElement('div');
    heart.textContent = ['💕', '💖', '💗', '💝', '💓', '💞'][Math.floor(Math.random() * 6)];
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = Math.random() * 100 + 'vh';
    heart.style.fontSize = (Math.random() * 3 + 1) + 'rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    heart.style.animation = 'float 2s ease-out forwards';
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 2000);
  }

  function handleYes() {
    for (let i = 0; i < 30; i++) {
      createHeart();
    }

    setTimeout(() => {
      alert('YOUUUPIIIIIIIIII! 💕💖💗 Rendez-vous le 14/02 Boubou! 😍');
    }, 500);
  }

  function handleNo() {
    mainPage.style.display = 'none';
    errorPage.style.display = 'block';

    sessionStorage.setItem('hasSeenError', 'true');

    setTimeout(() => {
      errorPage.style.display = 'none';
      mainPage.style.display = 'block';
      isDodging = true;
    }, 5000);
  }

  // Events
  yesButton.addEventListener('click', handleYes);
  noButton.addEventListener('click', handleNo);

  noButton.addEventListener('mouseenter', () => {
    if (isDodging) dodgeButton();
  });

  // Activate dodging if user has already seen the error page in this session
  const hasSeenError = sessionStorage.getItem('hasSeenError');
  if (hasSeenError === 'true') {
    isDodging = true;
  }
});
