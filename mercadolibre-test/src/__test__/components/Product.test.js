import React from 'react';
import { render,mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import ContentProduct from '../../components/Product'


describe('productTest', () => {
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
    it('render no product', () => {
        const store = mockStore({product: []}); 
        const wrapper = render(<ContentProduct store={store}/>)
         expect(wrapper.find("ul").length).toBe(0);
    });

    
    it('render product', () => {
      let props = {
        // whatever fake props you want passed to the component
        // ...
        fetchProduct: jest.fn()
      };
      const match={params: {idItem: ''},}
      const store = mockStore({"product":{"item":{"author":{"name":"William","lastname":"Quintero"},"item":{"id":"MLA913631864","title":" Xiaomi Mi Tv Stick Mdz-24-aa  De Voz Full Hd 8gb  Negro Con 1gb De Memoria Ram","price":{"currency":"ARS","amount":5238,"decimals":0},"picture":"http://http2.mlstatic.com/D_890199-MLA43336333673_092020-I.jpg","condition":"new","free_shipping":true,"sold_quantity":250,"description":"Con el media player de Xiaomi vas a poder aprovechar al máximo de un reproductor multimedia. Podrás utilizar una infinidad de aplicaciones que el dispositivo ofrece. Acceder y conectarte a distintas pantallas para ver todo tipo de contenido es posible.\n\nCalidad de imagen\nGracias a su compatibilidad con streaming en Full HD, aprovecharás de todo el contenido disponible en definición 1080p, con imágenes de colores más vibrantes y llamativos en comparación a su predecesor HD.\n\nDiversión asegurada\nEs compatible con Disney+. Con esta app reviví las historias que marcaron un hito en la infancia de muchas personas. Series y películas de Pixar, Marvel, Star Wars, Disney y National Geographic son uno de los tantos entretenimientos que se pueden disfrutar dentro de la plataforma.\n\nManejo simple\nA diferencia de los controles estándares, este aparato posee la función de control de voz. Con la misma, manejarlo es muy simple. Responde a tus órdenes con tan solo hablarle.","categories":["Electrónica, Audio y Video","Media Streaming"]}}}}); 
      const wrapper = mount(<ContentProduct {...props} match={match} store={store}/>)
      expect(wrapper.find(".container-center").length).toBe(1);


  });

  });