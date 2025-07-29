document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('proofForm');
  const pointsDisplay = document.getElementById('points');

  // Load from localStorage
  let userPoints = parseInt(localStorage.getItem('ecoPoints')) || 0;
  pointsDisplay.textContent = `${userPoints} points`;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const action = document.getElementById('action').value;
    const proof = document.getElementById('proof').value;

    // Assign points based on action
    let earnedPoints = 0;
    if (action === 'tree') earnedPoints = 50;
    else if (action === 'cleanup') earnedPoints = 40;
    else if (action === 'reuse') earnedPoints = 30;

    userPoints += earnedPoints;
    localStorage.setItem('ecoPoints', userPoints);

    alert(`You earned ${earnedPoints} points!`);
    pointsDisplay.textContent = `${userPoints} points`;

    form.reset();
  });
});
