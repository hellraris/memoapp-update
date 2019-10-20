import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import LabelInputModal from './modals/LabelInputModal';
import { getLabelListAction, resetDeletedLabelFlg, resetCreatedLabelFlg } from '../reducers/label';
import { resetSelectedMemo, resetCreatedMemoFlg, getMemoCountAction } from '../reducers/memo';

const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  .label-list {
    overflow-y: scroll;
    height: 100%;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;
const LabelItem = styled.div`
  border-bottom: 1px solid #DFDFDF;
  padding: 16px;
  text-align: center;
  word-break: break-word;
  text-overflow:ellipsis;
  white-space:nowrap;
  overflow:hidden;
  cursor: pointer;
  &:hover{
    color: #1890ff;
  }
  &:active{
    background-color: #e6f7ff;
  }
  &.add-btn {
    border-top: 1px solid #DFDFDF;
    border-bottom: 0px;
    margin-top: auto;
  }
`;

const LabelListView = ({ history, location }) => {
  const { labelList, selectedLabel, deletedLabelFlg, createdLabelFlg } = useSelector(state => state.label);
  const { memoCount, createdMemoFlg, selectedMemo } = useSelector(state => state.memo);
  const dispatch = useDispatch();

  // 초기 리스트 랜더링 (초기 1회만 실행)
  useEffect(() => {
    if (location.pathname === '/') {
      history.push('/all');
    } 
    dispatch(getMemoCountAction);
    dispatch(getLabelListAction);
  }, []);

  // 라벨생성시 URL변경
  useEffect(() => {
    if (createdLabelFlg) {
      history.push(`/${selectedLabel._id}`);
    }
    dispatch(resetCreatedLabelFlg);
  }, [createdLabelFlg]);

  // 라벨삭제시 라벨리스트 갱신
  useEffect(() => {
    if (deletedLabelFlg) {
      dispatch(getLabelListAction);
      dispatch(resetDeletedLabelFlg);
      history.push('/all');
    }
  }, [deletedLabelFlg]);

  // 메모생성시 해당 메모상세뷰URL로 이동
  useEffect(() => {
    if (createdMemoFlg) {
      history.push(`/all/${selectedMemo._id}`);
      dispatch(resetCreatedMemoFlg);
    }
  }, [createdMemoFlg]);

  const [isOpenModal, setModal] = useState(false);

  const onClickLabel = useCallback(() => {
    dispatch(resetSelectedMemo);
  }, [selectedLabel]);

  const handleModal = useCallback(() => {
    setModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <Overlay>
      <div className="label-list">
        { isOpenModal ? 
            <LabelInputModal label={null} close={handleModal} /> 
          : null }
        <NavLink to={`/all`}>
          <LabelItem
            style={ (selectedLabel !== null && selectedLabel._id)　=== 'all' ? 
                    { color: '1890ff', backgroundColor: '#e6f7ff' } : null }
            onClick={() => onClickLabel()} 
            >
            전체메모 ({memoCount})
          </LabelItem>
        </NavLink>
        {labelList.map((v,i) => {
          return (
            <NavLink key={i} to={`/${v._id}`}>
              <LabelItem
                className="label-item"
                style={ (selectedLabel !== null && selectedLabel._id ) === v._id ?
                        { color: '1890ff', backgroundColor: '#e6f7ff' } : null } 
                onClick={() => onClickLabel()} 
              >
                {v.title} ({v.memos.length})
              </LabelItem>
            </NavLink>
          )})
        }
      </div>
      <LabelItem className="add-btn" onClick={handleModal}>
        라벨추가
      </LabelItem>
    </Overlay>
  );
};

export default LabelListView;