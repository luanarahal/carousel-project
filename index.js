const divContainerHTML = document.getElementById("container");

const carousels = [
  {
    api: "https://api.thecatapi.com/v1/images/search?limit=10",
    previousButtonId: "catPreviousButton",
    nextButtonId: "catNextButton",
    carouselBannerId: "catImageBanner",
    counter: 0,
    allUrlsImages: [],
    autoSwitch: null,
  },
  {
    api: "https://api.thedogapi.com/v1/images/search?limit=10",
    previousButtonId: "dogPreviousButton",
    nextButtonId: "dogNextButton",
    carouselBannerId: "dogImageBanner",
    counter: 0,
    allUrlsImages: [],
    autoSwitch: null,
  },
];

const createElementButton = (elementId, elementContent) => {
  const divButtonHTML = document.createElement("div");
  const spanButtonHTML = document.createElement("span");
  const buttonHTML = document.createElement("button");

  buttonHTML.setAttribute("id", elementId);
  buttonHTML.textContent = elementContent;

  spanButtonHTML.appendChild(buttonHTML);
  divButtonHTML.appendChild(spanButtonHTML);

  return divButtonHTML;
};

const createElementImg = (elementId) => {
  const divImgHTML = document.createElement("div");
  const imgHTML = document.createElement("img");

  imgHTML.setAttribute("id", elementId);
  imgHTML.setAttribute("alt", "image");

  divImgHTML.appendChild(imgHTML);

  return divImgHTML;
};

carousels.forEach((element) => {
  const buttonPrevious = createElementButton(element.previousButtonId, "<");
  const imgBanner = createElementImg(element.carouselBannerId);
  const buttonNext = createElementButton(element.nextButtonId, ">");

  divContainerHTML.appendChild(buttonPrevious);
  divContainerHTML.appendChild(imgBanner);
  divContainerHTML.appendChild(buttonNext);
});

const fetchTenImageUrls = async (url) => {
  const response = await fetch(url);
  const imageData = await response.json();
  return imageData.map((imageUrl) => imageUrl.url);
};

const startImageCarousel = async (carousel, banner) => {
  carousel.allUrlsImages = await fetchTenImageUrls(carousel.api);
  displayBanner(banner, carousel.allUrlsImages[carousel.counter]);
};

const displayBanner = (carouselContainer, image) => {
  carouselContainer.setAttribute("src", image);
};

const counterCalculate = (imagesLength, counter, isNext) => {
  const step = isNext ? 1 : -1;
  return (counter + step + imagesLength) % imagesLength;
};

const startAutoSwitchImage = (carousel, banner) => {
  return setInterval(() => {
    switchBannerImage(true, carousel, banner);
  }, 3000);
};

const switchBannerImage = (isNext = true, carousel, banner) => {
  carousel.counter = counterCalculate(
    carousel.allUrlsImages.length,
    carousel.counter,
    isNext
  );
  displayBanner(banner, carousel.allUrlsImages[carousel.counter]);
};

const setAllEventListenners = (
  nextButton,
  previousButton,
  banner,
  carousel
) => {
  eventChangeImage(nextButton, banner, true, carousel);
  eventChangeImage(previousButton, banner, false, carousel);
};

const eventChangeImage = (buttonHTML, banner, isNext, carousel) => {
  buttonHTML.addEventListener("click", () => {
    switchBannerImage(isNext, carousel, banner);
    clearInterval(carousel.autoSwitch);
    autoSwitch = startAutoSwitchImage(
      carousel.counter,
      carousel.allUrlsImages,
      banner
    );
  });
};

const main = async () => {
  for (const carousel of carousels) {
    const previousButton = document.getElementById(carousel.previousButtonId);
    const nextButton = document.getElementById(carousel.nextButtonId);
    const banner = document.getElementById(carousel.carouselBannerId);

    await startImageCarousel(carousel, banner);
    carouselAutoSwitch = startAutoSwitchImage(carousel, banner);
    setAllEventListenners(nextButton, previousButton, banner, carousel);
  }
};

main();
