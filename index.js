const API_CATS_URL = "https://api.thecatapi.com/v1/images/search?limit=10";

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

listTenImagesUrls();
