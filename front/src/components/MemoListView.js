import React from 'react';
import { Route } from 'react-router-dom';

import AllMemoList from './AllMemoList';
import SearchMemoList from './SearchMemoList';
import LabelMemoList from './LabelMemoList';

const MemoListView = () => {
  return (
    <>
      <Route path="/all" component={AllMemoList} />
      <Route path="/s/:word" component={SearchMemoList} />
      <Route path="/l/:label" component={LabelMemoList} />
    </>
  );
};

export default MemoListView;