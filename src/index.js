import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './layout';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

const Root = () =>{
  return(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/*" element={<Layout client={client} />}/>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>   
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));


