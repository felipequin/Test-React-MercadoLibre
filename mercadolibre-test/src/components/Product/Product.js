import React from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { fetchProduct } from "../../redux/actions/Product";
import "./Product.scss";

class Product extends React.Component {
  componentDidMount() {
    const {
      match: {
        params: { idItem },
      },
    } = this.props;

    if(idItem !=="" ){
    this.props.fetchProduct(idItem);
}
  }

  render() {
    const { error, loading, product } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Cargando...</div>;
    }
    if (product && product.item) {
      return (
        <Container>
          <Row>
            <Col xs={12} md={8}>
              <div className="container-center">
                <div className="form-container">
                  <ul className="breadcrumb">
                  {
                  product.item.categories.map((product) => (
                    <li key={`id-${product}`}>{product}</li>
                  ))}
                  </ul>
                  <div className="ui-vip-core">
                    <div className="ui-pdp-container ui-pdp-container--pdp">
                      <div className="ui-pdp-container__row ui-pdp--relative pb-40">
                        <div className="ui-pdp-container__col col-2 ui-pdp-container--column-left pb-40">
                          <div className="ui-pdp-container__row">
                            <div className="ui-pdp-container__col col-2">
                              <div className="ui-pdp-container__row ui-pdp-container__row--gallery">
                                <div className="ui-pdp-gallery">
                                <img className="img-fluid" src={product.item.picture}/>     
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="ui-pdp-container__col col-1 ui-vip-core-container--content-left">
                            <div className="ui-pdp-container__row ui-pdp-container__row--description">
                              <div className="ui-pdp-description">
                                <h2 className="ui-pdp-description__title">
                                  Descripción del producto
                                </h2>
                                <p className="ui-pdp-description__content">
                                  {product.item.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="ui-pdp-container__col col-1 ui-pdp-container--column-right mt-16 pr-16">
                          <div className="ui-pdp-container__row ui-pdp-component-list pr-16 pl-16">
                            <div className="ui-pdp-container__col col-2 ui-vip-core-container--short-description ui-vip-core-container--column__right">
                              <div className="ui-pdp-container__row ui-pdp-container__row--header">
                                <div className="ui-pdp-header">
                                  <div className="ui-pdp-header__subtitle">
                                    <span className="ui-pdp-subtitle">
                                    {product.item.condition} | {product.item.sold_quantity} vendidos
                                    </span>
                                  </div>
                                  <div className="ui-pdp-header__title-container">
                                    <h1 className="ui-pdp-title">
                                    {product.item.title}
                                    </h1>
                                  </div>
                                </div>
                              </div>
                              <div className="ui-pdp-container__row ui-pdp-container__row--price">
                                <div className="ui-pdp-price mt-16 ui-pdp-price--size-large">
                                  <div className="andes-tooltip__trigger">
                                    <div className="ui-pdp-price__second-line">
                                      <span
                                        className="price-tag ui-pdp-price__part"
                                      >
                                        <meta
                                          itemProp="price"
                                        />
                                        <span
                                          className="price-tag-symbol"
                                        >
                                          {product.item.price.currency} 
                                        </span>
                                        <span className="price-tag-fraction">
                                        {product.item.price.amount}
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="ui-pdp-container__row ui-pdp-container__row--available-quantity">
                                <div className="ui-pdp-buybox__quantity">
                                  <div className="andes-tooltip__trigger">
                                    <div></div>
                                  </div>
                                  <input
                                    type="hidden"
                                    name="quantity"
                                    value="1"
                                  />
                                  <div className="ui-pdp-buybox__quantity__messages"></div>
                                </div>
                              </div>
                              <div className="ui-pdp-container__row ui-pdp-container__row--main-actions">
                                <form className="ui-pdp-actions" method="get">
                                  <div className="ui-pdp-actions__container">
                                    <button
                                      type="submit"
                                      className="andes-button andes-button--loud"
                                    >
                                      <span className="andes-button__content">
                                        Comprar
                                      </span>
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      );
    } else {
      return <div>No Existen Criterios de Busqueda...</div>;
    }
  }
}

const mapStateToProps = (state) => ({
  product: state.product.item,
  loading: state.product.loading,
  error: state.product.error,
});

const mapDispatchToProps = {
  fetchProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
