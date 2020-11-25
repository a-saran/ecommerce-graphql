import React from "react";
import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";

import CartDropDown from "./cart-dropdown.component";

const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

const CartDropDownContainer = () => (
  <Mutation mutation={TOGGLE_CART_HIDDEN}>
    {toggleCartHidden => (
      <Query query={GET_CART_ITEMS}>
        {({ data: { cartItems } }) => (
          <CartDropDown
            cartItems={cartItems}
            toggleCartHidden={toggleCartHidden}
          />
        )}
      </Query>
    )}
  </Mutation>
);

export default CartDropDownContainer;
