import React, { useCallback, useEffect, useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { withRouter } from "react-router";

import MemoInputModal from './modals/MemoInputModal';
import { resetLabelErrorMessage } from '../reducers/label';
import { resetMemoErrorMessage } from '../reducers/memo';
import { Overlay } from '../styles/appLayoutStyle'; 


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
      <Overlay>
        <button onClick={handleModal}>메모작성</button>
        <div className="search">
          <input type="text" className="search-input" value={searchWord} onChange={onChangeSearchWord} />
          <button className="search-button" onClick={searchMemo}>검색</button>
        </div>
      </Overlay>
      { children }
    </div>
  );
};

export default withRouter(AppLayout);