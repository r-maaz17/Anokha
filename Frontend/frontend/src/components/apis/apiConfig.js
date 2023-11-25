// apiConfig.js

const API_BASE_URL = 'http://localhost:8000';
const API_ROUTE = '/api/v1'
export const API_URLS = {
  GET_PRODUCTS: `${API_BASE_URL}${API_ROUTE}/products`,
  GET_PRODUCT: `${API_BASE_URL}${API_ROUTE}/product/`,
  CREATE_PRODUCT: `${API_BASE_URL}${API_ROUTE}/product/create/`,
  UPDATE_PRODUCT: `${API_BASE_URL}${API_ROUTE}/product/update/`,
  DELETE_PRODUCT: `${API_BASE_URL}${API_ROUTE}/product/delete/`,

  SIGN_IN: `${API_BASE_URL}${API_ROUTE}/signin`,
  USER_AUTH: `${API_BASE_URL}${API_ROUTE}/userauth`,
  SIGN_UP: `${API_BASE_URL}${API_ROUTE}/user/signup`,
  CHECK_CODE: `${API_BASE_URL}${API_ROUTE}/user/checkcode`,

  GET_CARTITEMS: `${API_BASE_URL}${API_ROUTE}/cartitems`,
  GET_CARTITEM:`${API_BASE_URL}${API_ROUTE}/cartitem/`,
  DELETE_FROM_CART: `${API_BASE_URL}${API_ROUTE}/cart/`,
  ADD_INTO_CART: `${API_BASE_URL}${API_ROUTE}/cart/`,
  CREATE_NEW_CART: `${API_BASE_URL}${API_ROUTE}/cart/`,
  EMPTY_CART: `${API_BASE_URL}${API_ROUTE}/delete-cart/`,
  CREATE_NEW_MESSAGE: `${API_BASE_URL}${API_ROUTE}/messages`,
  GET_ALL_MESSAGES: `${API_BASE_URL}${API_ROUTE}/messages`,
  SET_MESSAGE_STATUS: `${API_BASE_URL}${API_ROUTE}/set-message-status/`,

  SET_ORDER_STATUS: `${API_BASE_URL}${API_ROUTE}/order/`,
  GET_ALL_ORDERS: `${API_BASE_URL}${API_ROUTE}/orders`,
  
  GET_USERS: `${API_BASE_URL}${API_ROUTE}/users`,
  GET_USER: `${API_BASE_URL}${API_ROUTE}/user/`,
  UPDATE_USER: `${API_BASE_URL}${API_ROUTE}/user/`,
  DELETE_USER: `${API_BASE_URL}${API_ROUTE}/user/`,
  CREATE_USER: `${API_BASE_URL}${API_ROUTE}/user/`,
  // SIGN_IN: `${API_BASE_URL}${API_ROUTE}/signin`,
  // SIGN_IN: `${API_BASE_URL}${API_ROUTE}/signin`,
  // SIGN_IN: `${API_BASE_URL}${API_ROUTE}/signin`,
  // SIGN_IN: `${API_BASE_URL}${API_ROUTE}/signin`,
  // SIGN_IN: `${API_BASE_URL}${API_ROUTE}/signin`,



};
