import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import {  useDispatch, useSelector } from 'react-redux';

import MemoInputModal from './modals/MemoInputModal';
import { resetLabelErrorMessage } from '../reducers/label';
import { resetMemoErrorMessage } from '../reducers/memo';

const MenuBar = styled.div`
  display: flex;
  border: 1px solid #DFDFDF;
  padding: 7px;
  height: 40px;
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
`;

const AppLayout = ({ children }) => {
  const { memoErrorMessage } = useSelector(state => state.memo);
  const { labelErrorMessage } = useSelector(state => state.label);
  const dispatch = useDispatch();

  const [isOpenModal, setModal] = useState(false);

  const handleModal = useCallback(() => {
    setModal(!isOpenModal);
  }, [isOpenModal]);

  // 메모 관련 에러 메세지가 업데이트 될 시 그 내용을 팝업메세지로 출력
  useEffect(()=> {
    if (memoErrorMessage !== '') {
      alert(memoErrorMessage);
      dispatch(resetMemoErrorMessage);
    }
  },[memoErrorMessage])

  // 라벨 관련 에러 메세지가 업데이트 될 시 그 내용을 팝업메세지로 출력
  useEffect(()=> {
    if (labelErrorMessage !== '') {
      alert(labelErrorMessage);
      dispatch(resetLabelErrorMessage);
    }
  },[labelErrorMessage])

  return (
    <div>
      { isOpenModal ? <MemoInputModal memo={null} close={handleModal}/> : null }
      <MenuBar>
        <button onClick={handleModal}>메모작성</button>
      </MenuBar>
      {children}
    </div>
  );
};

export default AppLayout;