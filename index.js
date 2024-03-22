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

const fetchTenImageUrls = async (url) => {
  const response = await fetch(url);
  const imageData = await response.json();
  return extractImageUrls(imageData);
};

const startImageCarousel = async (url) => {
  allUrlsImages = await fetchTenImageUrls(url);
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

const startNextImage = (image) => {
  clearInterval(initialIntervalId);
  initialIntervalId = setInterval(() => {
    switchBannerImage(true, image);
  }, 5000);
};

const switchBannerImage = (isNext = true, image) => {
  counter = counterCalculate(image, counter, isNext);
  displayBanner(counter, image);
};

nextButtonHTML.addEventListener("click", () =>
  switchBannerImage(true, allUrlsImages)
);

previousButtonHTML.addEventListener("click", () =>
  switchBannerImage(false, allUrlsImages)
);

const main = async () => {
  await startImageCarousel(API_CATS_URL);
  startNextImage(allUrlsImages);
};

main();
