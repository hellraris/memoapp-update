import React from 'react';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import reducer from '../reducers';
import rootSaga from '../sagas/index';
import MemoDetailView from '../components/MemoDetailView';
import LabelListView from '../components/LabelListView';
import MemoListView from '../components/MemoListView';
import AppLayout from '../components/AppLayout';

const Overlay = styled.div`
  display: flex;
  height: calc(100% - 70px);
  margin-top: 10;
  .label-list-view {
    flex: 1 1 20%;
    margin-right: 5px;
    border: 1px solid #DFDFDF;
    height: auto;
  }
  .memo-list-view {
    flex: 1 1 30%;
    margin: 0 5;
    border: 1px solid #DFDFDF;
    height: auto;
    overflow-y: scroll;
  }
  .memo-detail-view {
    flex: 1 1 45%;
    margin-left: 5px;
    border: 1px solid #DFDFDF;
    height: auto;
    overflow-y: scroll;
  }
`;

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const enhancer = process.env.NODE_ENV === 'production'
  ? compose(applyMiddleware(...middlewares))
  : compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ 
      && window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  );
const store = createStore(reducer, enhancer);
sagaMiddleware.run(rootSaga);

const Home = () => {
  return (
    <Provider store={store}>
      <AppLayout>
          <Overlay>
            <div className="label-list-view">
              <Route path="/" component={LabelListView} />
            </div>
            <div className="memo-list-view"> 
            < Route path="/:label" component={MemoListView} />
            </div>
            <div className="memo-detail-view">
              <Route exact path="/:label/:memo" component={MemoDetailView} />
            </div>
          </Overlay>
      </AppLayout>
    </Provider>
  )
};

export default Home;