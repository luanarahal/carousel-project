const API_CATS_URL = "https://api.thecatapi.com/v1/images/search?limit=10";
const previousButtonHTML = document.getElementById("previousButton");
const nextButtonHTML = document.getElementById("nextButton");
const imageBanner = document.getElementById("imageBanner");
let allUrlsImages = [];
let contador = 0;

window.addEventListener("load", () => {
  imageBanner;
});

const extractImageUrls = (responseData) => {
  return responseData.map((imageUrl) => imageUrl.url);
};

const fetchTenImageUrls = async () => {
  const response = await fetch(API_CATS_URL);
  const imageData = await response.json();
  const listUrls = extractImageUrls(imageData);
  return listUrls;
};

const startImageCarousel = async () => {
  const list = await fetchTenImageUrls();
  imageBanner.setAttribute("src", list[contador]);
  allUrlsImages = list;
  nextImage;
};

startImageCarousel();

let initialIntervalId = null;

const startNextImage = () => {
  clearInterval(initialIntervalId);
  initialIntervalId = setInterval(() => {
    switchBannerImage();
  }, 5000);
};
startNextImage();

const switchBannerImage = (direction = "next") => {
  if (direction === "next") {
    contador == allUrlsImages.length - 1 ? (contador = 0) : contador++;
  } else if (direction === "previous") {
    contador == 0 ? (contador = allUrlsImages.length - 1) : contador--;
  }
  imageBanner.setAttribute("src", allUrlsImages[contador]);
};

nextButtonHTML.addEventListener("click", () => switchBannerImage());

previousButtonHTML.addEventListener("click", () =>
  switchBannerImage("previous")
);
