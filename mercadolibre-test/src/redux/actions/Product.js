import {
    FETCH_PRODUCT_BEGIN,
    FETCH_PRODUCT_FAILURE,
    FETCH_PRODUCT_SUCCESS,
  } from "./types";
  import {baseUrl} from "../../constants/fileWithConstants";

  export const fetchProduct = (Product) => (dispatch) => {
    dispatch(fetchProductBegin());
    fetch(`${baseUrl}/api/items/${Product}`)
      .then((res) => res.json())
      .catch((err) =>(
            console.log(err)
      )
      )
      .then((data) => {
        dispatch(fetchProductSuccess(data));
      });
  };

export const fetchProductBegin = () => ({
  type: FETCH_PRODUCT_BEGIN
});

export const fetchProductSuccess = product => ({
  type: FETCH_PRODUCT_SUCCESS,
  payload: { product }
});

export const fetchProductFailure = error => ({
  type: FETCH_PRODUCT_FAILURE,
  payload: { error }
});