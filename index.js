const API_CATS_URL = "https://api.thecatapi.com/v1/images/search?limit=10";
const previousButtonHTML = document.getElementById("previousButton");
const nextButtonHTML = document.getElementById("nextButton");
const imageBannerHTML = document.getElementById("imageBanner");
let allUrlsImages = [];
let contador = 0;

window.addEventListener("load", () => {
  imageBannerHTML();
});

const listUrlsImages = (responseData) => {
  const urlsImages = [];
  for (const imageUrl of responseData) {
    urlsImages.push(imageUrl.url);
  }
  return urlsImages;
};

const listTenImagesUrls = async () => {
  const getImagesData = await fetch(API_CATS_URL);
  const response = await getImagesData.json();
  const listUrls = listUrlsImages(response);
  return listUrls;
};

const main = async () => {
  const list = await listTenImagesUrls();
  imageBannerHTML.setAttribute("src", list[contador]);
  allUrlsImages = list;
  console.log(allUrlsImages);
};

main();

nextButtonHTML.addEventListener("click", () => {
  if (contador == allUrlsImages.length - 1) {
    contador = 0;
  } else {
    contador++;
  }
  imageBannerHTML.setAttribute("src", allUrlsImages[contador]);
});

previousButtonHTML.addEventListener("click", () => {
  if (contador == 0) {
    contador = allUrlsImages.length - 1;
  } else {
    contador--;
  }
  imageBannerHTML.setAttribute("src", allUrlsImages[contador]);
});

setTimeout(() => {
  if (contador == allUrlsImages.length - 1) {
    contador = 0;
  } else {
    contador++;
  }
  imageBannerHTML.setAttribute("src", allUrlsImages[contador]);
}, 5000);
