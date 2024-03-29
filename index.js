const carousels = [
  {
    api: 'https://api.thecatapi.com/v1/images/search?limit=10' ,
    previousButton: document.getElementById("previousButton1"),
    nextButton: document.getElementById("nextButton1"),
    carouselContainer: document.getElementById("imageBanner1"),
    counter: 0,
    allUrlsImages: [],
    autoSwitch: null
  },
  {
    api: 'https://api.thedogapi.com/v1/images/search?limit=10' ,
    previousButton: document.getElementById("previousButton2"),
    nextButton: document.getElementById("nextButton2"),
    carouselContainer: document.getElementById("imageBanner2"),
    counter: 0,
    allUrlsImages: [],
    autoSwitch: null
  }
]


const fetchTenImageUrls = async (url) => {
  const response = await fetch(url);
  const imageData = await response.json();
  return imageData.map((imageUrl) => imageUrl.url);
};

const startImageCarousel = async (carousel) => {
  carousel.allUrlsImages = await fetchTenImageUrls(carousel.api);
  displayBanner(carousel.carouselContainer, carousel.allUrlsImages[carousel.counter]);
};

const displayBanner = (carouselContainer, image) => {
  carouselContainer.setAttribute("src", image);
};

const counterCalculate = (imagesLength, counter, isNext) => {
  const step = isNext ? 1 : -1;
  return (counter + step + imagesLength) % imagesLength;
};

const startAutoSwitchImage = (carousel) => {
  return setInterval(() => {
    console.log("Vai trocar a imagem")
    switchBannerImage(true, carousel);
  }, 5000);
};

const switchBannerImage = (isNext = true, carousel) => {
  carousel.counter = counterCalculate(carousel.allUrlsImages.length, carousel.counter, isNext);
  displayBanner(carousel.carouselContainer, carousel.allUrlsImages[carousel.counter]);
};

const setAllEventListenners = (carousel) => {
  carousel.nextButton.addEventListener("click", () => {
    switchBannerImage(true, carousel);
    clearInterval(carousel.autoSwitch);
    carousel.autoSwitch = startAutoSwitchImage(carousel);
  });

  carousel.previousButton.addEventListener("click", () => {
    switchBannerImage(false, carousel);
    clearInterval(carousel.autoSwitch);
    carousel.autoSwitch = startAutoSwitchImage(carousel);
  });
};

const main = async () => {
  for (const carousel of carousels) {
    await startImageCarousel(carousel);
    carouselAutoSwitch = startAutoSwitchImage(carousel);
    setAllEventListenners(carousel);
  }
};

main();
