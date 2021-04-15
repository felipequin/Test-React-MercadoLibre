import {
    FETCH_PRODUCT_BEGIN,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAILURE
  } from "../actions/types";
  const initialState = {
    items: {},
    loading: false,
    error: null
  };
  
  export default function productReducer (state = initialState, action) {
    switch (action.type) {
      case FETCH_PRODUCT_BEGIN:
        return {
          ...state,
          loading: true,
          error: null
        };
       case FETCH_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          item: action.payload.product
        };
  
        case FETCH_PRODUCT_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload.error,
            item: {}
          };
      default:
        return state;
    }
  }
  