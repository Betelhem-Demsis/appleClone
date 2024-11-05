import React, { Component } from "react";

class Productpage extends Component {
  constructor(props) {
    super();
    this.state = {
      products: [],
      productID: props.match.params.product.product_url, 
    };
  }

  componentDidMount() {
    fetch("/iphones.json")
      .then((res) => res.json())
      .then((products) => {
        const productList = products.products;
        const singleProduct = productList.filter(
          (x) => x.product_url === this.state.productID
        );
        this.setState({ products: singleProduct });
      });
  }

  render() {
    if (this.state.products.length === 0) {
      return <div>Product not found</div>; 
    }

    return (
      <div>
        <section className="internal-page-wrapper top-100">
          <div className="container">
            {this.state.products.map((product) => {
              let id = product.product_url;
              let title = product.product_name;
              let img = product.product_img;
              let Brief = product.product_brief_description;
              let StartPrice = product.starting_price;
              let PriceRange = product.price_range;
              let details = product.product_description;

              return (
                <div key={id} className="bottom-100">
                  <div className="row justify-content-center text-center bottom-50">
                    <div className="col-12">
                      <div className="title-wraper bold">{title}</div>
                      <div className="brief-description">{Brief}</div>
                    </div>
                  </div>

                  <div className="row justify-content-center text-center product-holder h-100">
                    <div className={`col-sm-12 col-md-6 my-auto`}>
                      <div className="starting-price">{`Starting at ${StartPrice}`}</div>
                      <div className="monthly-price">{PriceRange}</div>
                      <div className="product-details">{details}</div>
                    </div>

                    <div className={`col-sm-12 col-md-6`}>
                      <div className="product-image">
                        <img src={img} alt=""/>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }
}

export default Productpage;
