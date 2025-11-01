import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';
const API_KEY = '53047751-cea4bcad23f1cdb0ee3074407';
export const PER_PAGE = 15;

export async function getImagesByQuery(query, page) {
  try {
    const { data } = await axios('/api/', {
      params: {
        key: API_KEY,
        q: query,
        per_page: PER_PAGE,
        page,
        image_type: 'photo',
        orientation: 'horizontal',
      },
    });
    return data;
  } catch (error) {
    iziToast.error({
      message: `${error.message ?? String(err)}`,
      position: 'topCenter',
      timeout: 3000,
      backgroundColor: '#EF4040',
      messageColor: 'white',
      close: false,
    });
  }
}