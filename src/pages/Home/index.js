import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import api from '../../services/api';
import * as CartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../utils/format';

import { ProductList } from './styles';

function Home(props) {
  const [products, setProducts] = useState([]);
  const handleAddProduct = (id) => {
    const { addToCartRequest } = props;
    addToCartRequest(id);
  };
  useEffect(() => {
    async function getProducts() {
      const response = await api.get('products');
      const data = response.data.map((product) => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));
      setProducts(...products, data);
    }
    getProducts();
  }, [products === ['']]);
  return (
    <>
      <ProductList>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>
            <button type="button" onClick={() => handleAddProduct(product.id)}>
              <div>
                <MdAddShoppingCart size={16} color="#FFF" />
                {props.amount[product.id] || 0}
              </div>
              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    </>
  );
}
const mapStateToProps = (state) => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home);
