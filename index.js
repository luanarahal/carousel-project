const API_CATS_URL = "https://api.thecatapi.com/v1/images/search?limit=10";
const previousButtonHTML = document.getElementById("previousButton");
const nextButtonHTML = document.getElementById("nextButton");
const imageBanner = document.getElementById("imageBanner");
let allUrlsImages = [];
let counter = 0;

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
  allUrlsImages = await fetchTenImageUrls();
  displayBanner(counter, allUrlsImages);
};

const displayBanner = (imagePosition, images) => {
  imageBanner.setAttribute("src", images[imagePosition]);
};

const counterCalculate = (images, imagePosition, isNext) => {
  if (!isNext) {
    return (imagePosition - 1 + images.length) % images.length;
  }
  return (imagePosition + 1) % images.length;
};

let initialIntervalId = null;

const startNextImage = () => {
  clearInterval(initialIntervalId);
  initialIntervalId = setInterval(() => {
    switchBannerImage();
  }, 5000);
};

const switchBannerImage = (isNext = true) => {
  counter = counterCalculate(allUrlsImages, counter, isNext);
  displayBanner(counter, allUrlsImages);
};

nextButtonHTML.addEventListener("click", () => switchBannerImage());

previousButtonHTML.addEventListener("click", () => switchBannerImage(false));

startNextImage();
startImageCarousel();
