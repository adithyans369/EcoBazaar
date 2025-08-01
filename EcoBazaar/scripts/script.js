// List of image paths inside "images/" folder
const images = [
  "assets/images/bag/b1.jpeg",
  "assets/images/bag/b2.jpeg",
  "assets/images/bag/b3.jpeg",
  "assets/images/bag/b4.jpeg",
  "assets/images/bag/b5.jpeg",
  "assets/images/bag/b6.jpeg",
  "assets/images/bag/b7.jpeg",
  "assets/images/bag/b8.jpeg",
  "assets/images/bag/b9.jpeg",
  "assets/images/bag/b10.jpeg",
  "assets/images/bag/b11.jpeg",

  "assets/images/brush/br1.png",

  "assets/images/comb/c1.jpeg",
  "assets/images/comb/c2.jpeg",
  "assets/images/comb/c3.jpeg",
  "assets/images/comb/c4.jpeg",
  "assets/images/comb/c5.jpeg",
  "assets/images/comb/c6.jpeg",
  "assets/images/comb/c7.jpeg",
  "assets/images/comb/c8.jpeg",
  "assets/images/comb/c9.jpeg",
  "assets/images/comb/c10.jpeg",
  "assets/images/comb/c11.jpeg"
];


let currentIndex = Math.floor(Math.random() * images.length);
const imgEl = document.getElementById("carousel-image");

// Display initial image
imgEl.src = images[currentIndex];

// Change image manually or automatically
function showImage(index) {
  currentIndex = (index + images.length) % images.length;
  imgEl.src = images[currentIndex];
}

// Left/right button handlers
document.getElementById("left-arrow").addEventListener("click", () => {
  showImage(currentIndex - 1);
});

document.getElementById("right-arrow").addEventListener("click", () => {
  showImage(currentIndex + 1);
});

// Arrow key support
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") showImage(currentIndex - 1);
  if (e.key === "ArrowRight") showImage(currentIndex + 1);
});

// Auto rotate images every 3 seconds
setInterval(() => {
  const nextIndex = Math.floor(Math.random() * images.length);
  showImage(nextIndex);
}, 3000);

