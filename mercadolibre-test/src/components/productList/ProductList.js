import React from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  Link
} from "react-router-dom";
import "./ProductList.scss";

class ProductList extends React.Component {
  
  directTo(path) {
    this.props.history.push(path);
  }

  render() {
    const { error, loading, products } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Cargando...</div>;
    }

    if(products && products.categories){
      console.log('categorias' + products.categories)
    return (
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <div className="container-center">
              <div className="form-container">
                <ul className="breadcrumb">
                  {products.categories.map((product) => (
                    <li key={`id-${product}`}>{product}</li>
                  ))}
                </ul>
                {products.items.map((product) => (
                  <div key={product.id}>
                    <ol className="ui-search-layout ui-search-layout--stack">
                      <li className="ui-search-layout__item">
                        <div className="ui-search-result__wrapper">
                          <div className="productList andes-card--flat andes-card--default ui-search-result ui-search-result--core andes-card--padding-default">
                            <div className="ui-search-result__image">
                            <Link to={`/product/`+product.id}
                                className="ui-search-link"
                                title={product.title}
                              >
                                <div className="carousel-container arrow-visible">
                                  <div className="slick-initialized slick-slider">
                                    <div
                                      role="presentation"
                                      className="slick-list"
                                    >
                                      <div className="slick-track">
                                        <div
                                          data-index="0"
                                          className="slick-slide slick-active"
                                          tabIndex="-1"
                                        >
                                          <img
                                            width="160"
                                            height="160"
                                            src={product.picture}
                                            className="ui-search-result-image__element"
                                            alt={product.title}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </div>
                            <div className="ui-search-result__content-wrapper">
                              <div className="ui-search-price__second-line">
                                <span className="price-tag ui-search-price__part">
                                  <span className="price-tag-symbol">
                                    {product.price.currency} &nbsp;{product.price.amount}
                                  </span>
                                  <span className="price-tag-fraction">

                                  </span>
                                </span>
                              </div>
                              <div className="ui-search-item__group ui-search-item__group--title">
                              <Link to={`/product/`+product.id}
                                  className="ui-search-item__group__element ui-search-link"
                                  title={product.title}
                                >
                                  <h2 className="ui-search-item__title">
                                    {product.title}
                                  </h2>
                                </Link>
                              </div>
                              <div className="ui-search-result__content-columns">
                                <div className="ui-search-result__content-column ui-search-result__content-column--left">
                                  <div className="ui-search-item__group ui-search-item__group--price"></div>
                                </div>
                              </div>
                            </div>
                            <div className="ui-search-result__bookmark">
                              Distrito capital
                          </div>
                          </div>
                        </div>
                      </li>
                    </ol>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }else{
    return <div>No Existen Criterios de Busqueda...</div>;
  }
  }
}

const mapStateToProps = (state) => ({
  products: state.products.items,
  loading: state.products.loading,
  error: state.products.error,
});

export default connect(mapStateToProps)(ProductList);
