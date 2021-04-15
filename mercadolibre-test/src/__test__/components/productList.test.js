import React from 'react';
import { render,mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import ContentProductList from '../../components/productList'
import {BrowserRouter as Router } from "react-router-dom";

describe('productListTest', () => {
    const originalConsoleError = console.error;
  
    beforeEach(() => {
      console.error = jest.fn((msg) => {
        if (msg.includes('Warning: useLayoutEffect does nothing on the server')) {
          return null;
        } else {
          originalConsoleError(msg);
        }
      });
    });
  
    afterEach(() => {
      console.error = originalConsoleError;
    });
  
    const mockStore = configureStore();
    it('render no products', () => {
        const store = mockStore({products: []}); 
        const wrapper = render(<ContentProductList store={store}/>)
         expect(wrapper.find("ul").length).toBe(0);
    });

    it('render products', () => {
        const store = mockStore({"products":{"items":{"author":{"name":"William","lastname":"Quintero"},"categories":["hola","como"],"items":[{"id":"MLA901088125","title":"Smart Tv Noblex Dm43x7100 Led Full Hd 43  220v","price":{"currency":"ARS","amount":42999,"decimals":0},"picture":"http://http2.mlstatic.com/D_966270-MLA44282592566_122020-I.jpg","condition":"new","free_shipping":true},{"id":"MLA899732274","title":"Smart Tv Samsung Series 7 Un50tu7000gczb Led 4k 50  220v - 240v","price":{"currency":"ARS","amount":72999,"decimals":0},"picture":"http://http2.mlstatic.com/D_878604-MLA44160072739_112020-I.jpg","condition":"new","free_shipping":true},{"id":"MLA916209501","title":"Smart Tv Noblex Dm32x7000 Led Hd 32  220v","price":{"currency":"ARS","amount":27699,"decimals":0},"picture":"http://http2.mlstatic.com/D_750880-MLA43970540786_112020-I.jpg","condition":"new","free_shipping":true},{"id":"MLA874870851","title":"Smart Tv Tedge Led 43 Pulgadas Ntv43hd Led Full Hd 43  220v","price":{"currency":"ARS","amount":42999,"decimals":0},"picture":"http://http2.mlstatic.com/D_908764-MLA43208793399_082020-I.jpg","condition":"new","free_shipping":true}]}}}); 
        const wrapper = mount(<Router><ContentProductList store={store}/></Router>)
         expect(wrapper.find(".container-center").length).toBe(1);
    });

  });

