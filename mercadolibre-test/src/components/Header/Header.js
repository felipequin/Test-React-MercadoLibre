import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { fetchProducts } from "../../redux/actions/Products";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Header.scss";

class Header extends Component {
  componentDidMount() {
    const parameter = new URLSearchParams(this.props.location.search).get(
      "search"
    );
    if (parameter && parameter !== "null") {
      this.props.fetchProducts(parameter);
      this.input.value = parameter;
      this.props.history.push(`/products?search=${parameter}`);
    }
  }
  render() {
    const search = (e) => {
      e.preventDefault();
      const [{ value }] = e.target;
      const product = value.trim();
      if (product) {
        this.props.fetchProducts(product);
        this.props.history.push(`/products?search=${product}`);
      }
    };
    return (
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <div className="header">
              <div className="wrapper">
                <a className="nav-logo" href="/"></a>
                <form className="search" onSubmit={search}>
                  <input
                    name="search"
                    type="text"
                    ref={(myinput) => (this.input = myinput)}
                    placeholder="Nunca dejes de buscar"
                  ></input>
                  <button type="submit" className="nav-search-btn">
                    <div aria-label="Buscar" className="nav-icon-search">
                      <AiOutlineSearch />
                    </div>
                  </button>
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
});

const mapDispatchToProps = {
  fetchProducts,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
