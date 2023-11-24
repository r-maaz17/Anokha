// apiConfig.js

const API_BASE_URL = 'http://localhost:8000';
const API_ROUTE = '/api/v1'
export const API_URLS = {
  GET_PRODUCTS: `${API_BASE_URL}${API_ROUTE}/products`,
  GET_PRODUCT: `${API_BASE_URL}${API_ROUTE}/product`,
  CREATE_PRODUCT: `${API_BASE_URL}${API_ROUTE}/product/create`,
  UPDATE_PRODUCT: `${API_BASE_URL}${API_ROUTE}/product/update`,
  DELETE_PRODUCT: `${API_BASE_URL}${API_ROUTE}/product/delete`,

  SIGN_IN: `${API_BASE_URL}${API_ROUTE}/signin`,
  USER_AUTH: `${API_BASE_URL}${API_ROUTE}/userauth`,

  DELETE_FROM_CART: `${API_BASE_URL}${API_ROUTE}/cart/`,
  // SIGN_IN: `${API_BASE_URL}${API_ROUTE}/signin`,
  // SIGN_IN: `${API_BASE_URL}${API_ROUTE}/signin`,
  // SIGN_IN: `${API_BASE_URL}${API_ROUTE}/signin`,
  // SIGN_IN: `${API_BASE_URL}${API_ROUTE}/signin`,
  // SIGN_IN: `${API_BASE_URL}${API_ROUTE}/signin`,
  // SIGN_IN: `${API_BASE_URL}${API_ROUTE}/signin`,



};
