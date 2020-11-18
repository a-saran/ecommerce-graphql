import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import CollectionOverView from "./collections-overview.component";
import Spinner from "../spinner/spinner.component";

const GET_COLLECTIONS = gql`
  {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const CollectionOverViewContainer = () => (
  <Query query={GET_COLLECTIONS}>
    {({ loading, error, data }) => {
      console.log({ loading, error, data });
      if (loading) return <Spinner />;
      if (error)
        return (
          <Fragment>
            <h2>Some Went Wrong!</h2>
            {error.message}
          </Fragment>
        );
      return <CollectionOverView collections={data.collections} />;
    }}
  </Query>
);

export default CollectionOverViewContainer;
