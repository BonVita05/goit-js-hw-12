import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImagesByQuery, PER_PAGE } from './js/pixabay-api';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  loader,
  galleryUl,
  loadMoreBtn,
} from './js/render-functions';
import './css/spinner.css';

const lightbox = new SimpleLightbox(`.gallery a`, {
  caption: true,
  captionDelay: 250,
  captionPosition: 'bottom',
  nav: true,
  showCounter: true,
  loop: true,
});

const STORAGE_KEY = 'search-queries';
const form = document.querySelector('.form');
const searchBtn = form.querySelector('.search-button');

let query = '';
let page = 0;
let totalPages = 0;

form.addEventListener('submit', onSubmit);

async function onSubmit(event) {
  event.preventDefault();

  searchBtn.disabled = true;

  try {
    hideLoadMoreButton();
    showLoader();
    clearGallery();

    page = 1;
    totalPages = 0;

    query = event.target.elements['search-text'].value.trim();

    if (!query) {
      hideLoadMoreButton();
      throw new Error('Please, type query!');
    }

    localStorage.setItem(STORAGE_KEY, query);

    const { hits, totalHits } = await getImagesByQuery(query, page);

    if (!hits.length) {
      hideLoadMoreButton();
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    }

    totalPages = Math.ceil(totalHits / PER_PAGE);

    galleryUl.insertAdjacentHTML('beforeend', createGallery(hits));
    lightbox.refresh();

    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();

      iziToast.info({
        message: `We are sorry, but you have reached the end of search results!`,
        position: 'topCenter',
        timeout: 4000,
        backgroundColor: '#009b18',
        messageColor: 'white',
        close: false,
      });
      return;
    }
  } catch (error) {
    iziToast.error({
      message: `${error.message ?? String(err)}`,
      position: 'topCenter',
      timeout: 4000,
      backgroundColor: '#EF4040',
      messageColor: 'white',
      close: false,
    });
  } finally {
    hideLoader();
    event.target.reset();
    searchBtn.disabled = false;
  }
}

loadMoreBtn.addEventListener('click', onLoadMoreClick);

async function onLoadMoreClick() {
  hideLoadMoreButton();

  loadMoreBtn.insertAdjacentElement('afterend', loader);
  showLoader();

  let currentQuery = form.elements['search-text'].value.trim();
  let savedQuery = localStorage.getItem(STORAGE_KEY);

  if (currentQuery !== '' && currentQuery !== savedQuery) {
    iziToast.info({
      message: `Please make a new search before loading next page!`,
      position: 'topCenter',
      timeout: 4000,
      backgroundColor: '#009b18',
      messageColor: 'white',
      close: false,
    });
    hideLoader();
    clearGallery();
    hideLoadMoreButton();
    loadMoreBtn.disabled = false;
    return;
  }

  try {
    page++;

    const { hits, totalHits } = await getImagesByQuery(savedQuery, page);

    totalPages = Math.ceil(totalHits / PER_PAGE);

    galleryUl.insertAdjacentHTML('beforeend', createGallery(hits));
    lightbox.refresh();

    //плавний скрол до нової колекції
    const galleryItem = document.querySelector('.gallery-item');
    const height = galleryItem.getBoundingClientRect().height;
    if (galleryItem) {
      window.scrollBy({
        left: 0,
        top: height * 2,
        behavior: 'smooth',
      });
    }

    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      throw new Error(
        'We are sorry, but you have reached the end of search results!'
      );
    }
  } catch (error) {
    iziToast.error({
      message: `${error.message ?? String(error)}`,
      position: 'topCenter',
      timeout: 4000,
      backgroundColor: '#EF4040',
      messageColor: 'white',
      close: false,
    });
  } finally {
    hideLoader();
  }
}