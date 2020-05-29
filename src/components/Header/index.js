import React from 'react';
import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';
import { connect } from 'react-redux';

import { Container, Cart } from './style';

import Logo from '../../assets/images/Logo.svg';

function Header({ cartSize }) {
  return (
    <>
      <Container>
        <Link to="/">
          <img src={Logo} alt="Rocketshoes" />
        </Link>
        <Cart to="/cart">
          <div>
            <strong>Meu carrinho</strong>
            <span>{cartSize} itens</span>
          </div>
          <MdShoppingBasket size={36} color="#FFF" />
        </Cart>
      </Container>
    </>
  );
}

export default connect((state) => ({
  cartSize: state.cart.length,
}))(Header);
