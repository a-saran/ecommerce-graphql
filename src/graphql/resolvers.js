import { gql } from "apollo-boost";
import { addItemToCart } from "./cart.utils";

export const typeDefs = gql`
  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]!
  }

  extend type Item {
    quantity: Int
  }
`;

const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

export const resolvers = {
  Mutation: {
    toggleCartHidden: (_root, _args, _context, _info) => {
      const { cache } = _context;
      const { cartHidden } = cache.readQuery({
        query: GET_CART_HIDDEN
      });

      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden }
      });

      return !cartHidden;
    },

    addItemToCart: (_root, { item }, { cache }, _info) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS
      });
      const newCartItems = addItemToCart(cartItems, item);

      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: { cartItems: newCartItems }
      });

      return newCartItems;
    }
  }
};
