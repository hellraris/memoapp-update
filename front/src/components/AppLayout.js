import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import {  useDispatch, useSelector } from 'react-redux';
import { withRouter } from "react-router";

import MemoInputModal from './modals/MemoInputModal';
import { resetLabelErrorMessage } from '../reducers/label';
import { resetMemoErrorMessage } from '../reducers/memo';

const MenuBar = styled.div`
  display: flex;
  border: 1px solid #DFDFDF;
  padding: 10px;
  align-items: center;
  button {
    border: 1px solid #DFDFDF;
    padding: 7px 30px;
    background-color: white;
    font-size: 16px;
    cursor: pointer;
    &:hover{
      color: #1890ff;
    }
    &:active {
      background-color: #e6f7ff;
    }
  };
  .search {
    display: flex;
    margin: 0 5% 0 auto;
    .search-input {
      height: 25px;
      border: 1px solid #DFDFDF;
    }
    .search-button {
      padding: 0 5px;
      height: 25px;
      border: 1px solid #DFDFDF;
      
    }
  }
`;

const AppLayout = ({ children, history }) => {
  const [isOpenModal, setModal] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const { memoErrorMessage } = useSelector(state => state.memo);
  const { labelErrorMessage } = useSelector(state => state.label);
  const dispatch = useDispatch();

  const handleModal = useCallback(() => {
    setModal(!isOpenModal);
  }, [isOpenModal]);

  const onChangeSearchWord = (e) => {
    setSearchWord(e.target.value);
  };

  const searchMemo = () => {
    if (searchWord === '') {
      alert('검색어를 입력해주세요');
      return;
    }
    history.push(`/s/${searchWord}`);
    setSearchWord('');
  };

  // 메모 관련 에러 메세지가 업데이트 될 시 그 내용을 팝업메세지로 출력
  useEffect(()=> {
    if (memoErrorMessage !== '') {
      alert(memoErrorMessage);
      dispatch(resetMemoErrorMessage);
    }
  },[memoErrorMessage]);

  // 라벨 관련 에러 메세지가 업데이트 될 시 그 내용을 팝업메세지로 출력
  useEffect(()=> {
    if (labelErrorMessage !== '') {
      alert(labelErrorMessage);
      dispatch(resetLabelErrorMessage);
    }
  },[labelErrorMessage]);

  return (
    <div>
      { isOpenModal ? <MemoInputModal memo={null} close={handleModal}/> : null }
      <MenuBar>
        <button onClick={handleModal}>메모작성</button>
        <div className="search">
          <input type="text" className="search-input" value={searchWord} onChange={onChangeSearchWord} />
          <button className="search-button" onClick={searchMemo}>검색</button>
        </div>
      </MenuBar>
      { children }
    </div>
  );
};

export default withRouter(AppLayout);