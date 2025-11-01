export const galleryUl = document.querySelector('.gallery');
export const loader = document.querySelector('.loading');
export const loadMoreBtn = document.querySelector('.load-more-button');

export function createGallery(images = []) {
  return images
    .map(
      ({
        tags,
        previewURL,
        largeImageURL,
        views,
        downloads,
        likes,
        comments,
      }) => `
        <li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
                <img class="gallery-image" src="${previewURL}" alt="${tags}" loading="lazy" 
                title="Title: ${tags.split(',')[0].trim()}  |  
                Views: ${views.toLocaleString()}  | 
                Likes: ${likes.toLocaleString()}  |  
                Comments: ${comments.toLocaleString()}  |
                Downloads: ${downloads.toLocaleString()}"/>
            </a>
            <ul class="info-container">
                <li class="info-box">
                    <p class="info-title">Views</p>
                    <p class="info-value">${views.toLocaleString()}</p>
                </li>
                 <li class="info-box">
                    <p class="info-title">Likes</p>
                    <p class="info-value">${likes.toLocaleString()}</p>
                </li>
                 <li class="info-box">
                    <p class="info-title">Comments</p>
                    <p class="info-value">${comments.toLocaleString()}</p>
                </li>
                 <li class="info-box">
                    <p class="info-title">Downloads</p>
                    <p class="info-value">${downloads.toLocaleString()}</p>
                </li>
            </ul>
        </li>
    `
    )
    .join('');
}

export function clearGallery() {
  galleryUl.innerHTML = '';
}

export function showLoader() {
  loader.hidden = false;
}

export function hideLoader() {
  loader.hidden = true;
}

export function showLoadMoreButton() {
  loadMoreBtn.hidden = false;
}

export function hideLoadMoreButton() {
  loadMoreBtn.hidden = true;
}
