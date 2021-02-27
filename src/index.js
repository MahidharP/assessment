import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './customs.css'
import 'semantic-ui-css/semantic.min.css'  
import { Container } from 'react-bootstrap'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'

const store = configureStore()

console.log('Store Value', store.getState())

store.subscribe(() => {
  console.log('Updated State', store.getState())
})

ReactDOM.render(
  <React.StrictMode>
    <Container>
      <Provider store={store}>
        <App />
      </Provider>
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);
