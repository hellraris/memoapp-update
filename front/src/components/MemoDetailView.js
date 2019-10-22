import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';

import { getMemoListAction, removeMemoAction, searchMemoAction,
   getMemoAction, resetUpdatedMemoFlg } from '../reducers/memo';
import { getLabelAction } from '../reducers/label';
import MemoInputModal from './modals/MemoInputModal';
import ConfirmDialog from './dialogs/ConfirmDialog';
import { makeSortData } from './functions/commonMemoListFunc';
import { Overlay, Header, Body } from '../styles/memoDetailViewStyle';


const MemoDetailView = ({match, location}) => {
  const dispatch = useDispatch();
  const { selectedMemo, updatedMemoFlg } = useSelector(state => state.memo);
  const [isOpenModal, setModal] = useState(false);
  const [isOpenConfirmDialog, setOpenConfirmDialog] = useState(false);

  // 메모 수정시 메모리스트 갱신
  useEffect(() => {
    if (updatedMemoFlg) {
      const updateTarget = location.pathname.substring(1,2);
      // 전체메모리스트를 통해서 수정
      if (updateTarget === 'a') {
        dispatch(getMemoListAction(makeSortData("updateDateDesc")));
      // 라벨메모리스트를 통해서 수정
      } else if (updateTarget === 'l'){
        dispatch(getLabelAction(
          {labelId: match.params.label, sortData: makeSortData("updateDateDesc")}
        ));
      // 검색메모리스트를 통해서 수정
      } else if (updateTarget === 's') {
        dispatch(searchMemoAction(
          {word: match.params.word, sortData: makeSortData("updateDateDesc")}
        ));
      }
      dispatch(resetUpdatedMemoFlg);
    }
  }, [updatedMemoFlg]);

  const handleModal = useCallback(() => {
    setModal(!isOpenModal);
  }, [isOpenModal]);

  const handleDialog = useCallback(() => {
    setOpenConfirmDialog(true);
  }, [isOpenConfirmDialog]);

  const confirmRemoveMemo = ((confirm) => {
    if (confirm) {
      dispatch(removeMemoAction(selectedMemo._id));
    }
    setOpenConfirmDialog(false);
  });

  useEffect(() => {
    dispatch(getMemoAction(match.params.memo));
  }, [match.params.memo]);

  return (
    <Overlay>
      { isOpenModal ? 
          <MemoInputModal memo={selectedMemo} close={handleModal} /> 
        : null }
      { isOpenConfirmDialog ?
        <ConfirmDialog msg="메모를 삭제하겠습니까?" confirm={confirmRemoveMemo}/>
        : null }
      { selectedMemo !== null ? 
      <div>
        <Header>
          <label className='memo-title'>{ selectedMemo.title }</label>
          <div>
            <div className="memo-btns">
              <button onClick={handleModal}>수정</button> 
              <button onClick = {handleDialog}>삭제</button>
            </div>
            <label>{ Moment(selectedMemo.updatedAt).format('YYYY-MM-DD') }</label>
          </div>
        </Header>
        <Body>
          { selectedMemo.content }
        </Body>
      </div>
      : <div></div>}
    </Overlay>
  );
};

export default MemoDetailView;