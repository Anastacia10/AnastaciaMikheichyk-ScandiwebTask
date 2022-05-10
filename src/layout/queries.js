import { gql } from "apollo-boost";

export const queryCategoriesCurrencies = {
  query: gql`
  {
    categories{
      name
    }

    currencies{
      label, symbol
    }
  }
  `
};

export const queryCategory = (title) =>{
  return {
    query: gql`
    {
      category(input: { title: "${title}"\ }) {
        products {
          id
          name
          description
          brand
          gallery
          inStock
          prices {
            amount
            currency {
              symbol
              label
            }
          }
          attributes {
            id
            name
            type
            items {
              displayValue
              id
              value
            }
          }
        }
      }
    }`
  }
};

export const queryProduct = (id) =>{
  return {
    query: gql`{
      product(id: "${id}"\) {
        id
        name
        description
        brand
        inStock
        gallery
        prices {
          amount
          currency {
            symbol
            label
          }
        }
        attributes {
          id
          name
          type
          items {
            displayValue
            id
            value
          }
        }
      }

    }`
  }
}





