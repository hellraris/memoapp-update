import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Moment from 'moment';
import { NavLink } from 'react-router-dom';
 
import { getMemoListAction, removeMemosAction, resetDeletedMemoFlg } from '../reducers/memo';
import { getLabelListAction, removeLabelMemosAction, removeLabelAction, 
         getLabelAction, resetSelectedLabel, resetUpdatedLabelFlg } from '../reducers/label';

import LabelSettingModal from './modals/LabelSettingModal';
import LabelInputModal from './modals/LabelInputModal';
import ConfirmDialog from './dialogs/ConfirmDialog';

const Overlay = styled.div`
  a {
    display: inline-block;
    text-decoration: none;
    color: inherit;
  }
`;

const MemoItem = styled.div`
  border-bottom: 1px solid #DFDFDF;
  padding: 10px 0;
  display: flex;
  word-break: break-word;
  &:hover{
    color: #1890ff;
  }
  .memo-selection {
    margin: auto;
  }
  .memo-content {
    width: 92%;
    .memo-content-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
    }
    .memo-content-body {
      width: 95%;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }
    .memo-title{
      width: 70%;
      text-overflow:ellipsis;
      overflow:hidden;
      white-space:nowrap;
    }
    .memo-date{
      width: 70px;
      font-size: 12px;
      margin-left: 3%;
    }
  }
`;

const MemoMenu = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #DFDFDF;
  padding: 10;
  align-items: center;
  .label-title {
    font-size: 20px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .label-btns {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    button {
      width: 20%;
      margin: 1%;
      padding: 7px 0;
      border-radius: 5px;
      background-color: white;
      font-size: 12px;
      border: 1px solid #bebebe;
      cursor: pointer;
      &:hover {
        color: #1890ff;
      }
      &:active {
        background-color: #e6f7ff;
      }
      &:disabled {
        background-color: gainsboro;
        cursor: not-allowed;
      }
    } 
  }
`;

const MemoListView = ({ match, history }) => {
  const dispatch = useDispatch();
  const { labelList, selectedLabel, updatedLabelFlg } = useSelector(state => state.label);
  const { memoList, selectedMemo, deletedMemoFlg } = useSelector(state => state.memo);
  const [checkedItems, setCheckedItems] = useState([]);
  const [isOpenLabelSettingModal, setLabelSettingModal] = useState(false);
  const [isOpenLabelInputModal, setLabelInputModal] = useState(false);
  const [isLabelMemoList, setLabelMemoMode] = useState(false);
  const [isOpenConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({});

   // 메모리스트뷰 초기화 
  useEffect(() => {
    // URL의 파라미터를 판별해 전체메모 목록 혹은 라벨메모 목록을 렌더링 
    if (match.params.label === 'all') {
      dispatch(getMemoListAction);
      setLabelMemoMode(false);
    } else {
      dispatch(getLabelAction(match.params.label));
      setLabelMemoMode(true);
    }
    dispatch(resetSelectedLabel);
    setCheckedItems([]);
  }, [match.params.label]);

  // 라벨업데이트시 라벨리스트 갱신
  useEffect(() => {
    if (updatedLabelFlg) {
      dispatch(getLabelListAction);
      // 라벨를 통해 수정이 이루어진 경우 라벨리스트를 리프레쉬
      if (match.params.label !== 'all') {
        dispatch(getLabelAction(match.params.label));
      };
      dispatch(resetUpdatedLabelFlg);
      setCheckedItems([]);
    }
  }, [updatedLabelFlg]);

  // 메모삭제시 전체메모 갱신
  useEffect(() => {
    if (deletedMemoFlg) {
      history.push(`/${match.params.label}`);
      dispatch(getMemoListAction);
      dispatch(resetDeletedMemoFlg);
    }
  }, [deletedMemoFlg]);

  const onChangeChekedItems = useCallback((e, _id) => {
    const newCheckedItems = [ ...checkedItems ];
    if (e.target.checked) {
      newCheckedItems.push(_id);
    } else {
      const index = newCheckedItems.findIndex((v) => v === _id);
      newCheckedItems.splice(index, 1);
    };
    setCheckedItems(newCheckedItems);
  }, [checkedItems]);

  const handleSettingModal = useCallback(() => {
    setLabelSettingModal(!isOpenLabelSettingModal);
  }, [isOpenLabelSettingModal]);

  const handleInputModal = useCallback(() => {
    setLabelInputModal(!isOpenLabelInputModal);
  }, [isOpenLabelInputModal]);

  const confirmRemoveMemos = ((confirm) => {
    if (confirm) {
      dispatch(removeMemosAction(checkedItems));
    }
    setOpenConfirmDialog(false);
  });

  const confirmRemoveLabelMemos = ((confirm) => {
    if (confirm) {
      dispatch(removeLabelMemosAction({labelId: selectedLabel._id ,memoIds: checkedItems}));
    }
    setOpenConfirmDialog(false);
  });

  const confirmRemoveLabel = ((confirm) => {
    if (confirm) {
      dispatch(removeLabelAction(selectedLabel._id));
    }
    setOpenConfirmDialog(false);
  });

  // 오픈할 다이어로그를 판별
  const handleDialog = ((target) => {
    let newMsg = "";
    if (target === 'memos') {
      newMsg = checkedItems.length + "개의 메모를 삭제하시겠습니까?";
      setConfirmDialog({msg: newMsg, confirm: confirmRemoveMemos});
    } else if (target === 'labelMemos') {
      newMsg = checkedItems.length + "개의 메모를 라벨에서 지정취소하시겠습니까?";
      setConfirmDialog({msg: newMsg, confirm: confirmRemoveLabelMemos});
    } else if (target === 'label') {
      newMsg = "라벨을 삭제하시겠습니까?";
      setConfirmDialog({msg: newMsg, confirm: confirmRemoveLabel});     
    }
    setOpenConfirmDialog(true);
  });

  const isDisabled = memoList.length === 0 || checkedItems.length === 0 || labelList.length === 0;

  return (
    <Overlay>
      { isOpenLabelSettingModal && <LabelSettingModal settingTarget={checkedItems} close={handleSettingModal} /> }
      { isOpenLabelInputModal && <LabelInputModal settingTarget={checkedItems} label={selectedLabel} close={handleInputModal} /> }
      { isOpenConfirmDialog && <ConfirmDialog msg={confirmDialog.msg} confirm={confirmDialog.confirm}/> }
      {isLabelMemoList ? 
        <MemoMenu>
          <div className={"label-title"}>{ selectedLabel.title }</div> 
          <div className={"label-btns"}>
            <button
              onClick={handleInputModal}>라벨명변경
            </button>
            <button
              onClick={() => handleDialog("label")}>라벨삭제
            </button>
            <button
              disabled={isDisabled}   
              onClick={handleSettingModal}>라벨지정
            </button>
            <button 
              disabled={isDisabled} 
              onClick={() => handleDialog("labelMemos")}>라벨해제
            </button>
          </div>
        </MemoMenu>
          :
        <MemoMenu>
          <div className={"label-title"}>전체메모</div>
          <div className={"label-btns"}>
            <button 
              disabled={isDisabled} 
              onClick={handleSettingModal}>라벨지정
            </button>
            <button 
              disabled={ memoList.length === 0 || checkedItems.length === 0 }   
              onClick={() => handleDialog("memos")}>삭제
            </button>
          </div>
        </MemoMenu>
      }
      { memoList.length !== 0 
        ? memoList.map((v,i) => {
          return (
            <MemoItem 
              style={ v._id === (selectedMemo !== null && selectedMemo._id) ?
                 { color: '1890ff', backgroundColor: '#e6f7ff' } : null } 
              key={i}
            >
              <div className={"memo-selection"}>
                <input 
                type= "checkbox" 
                name={v._id} 
                checked={checkedItems.indexOf(v._id) !== -1} 
                onChange={(e) => onChangeChekedItems(e, v._id)} 
              />
              </div>
              <NavLink 
                className={"memo-content"}  
                key={i} 
                to={ isLabelMemoList ? `/${match.params.label}/${v._id}` : `/all/${v._id}`}
              >
                <div className={"memo-content-header"}>
                  <div className={"memo-title"}>{v.title}</div>
                  <div className={"memo-date"}>{Moment(v.updatedAt).format('YYYY-MM-DD')}</div>
                </div>
                <div className={"memo-content-body"}>
                  {v.content}
                </div>
              </NavLink>
            </MemoItem>
          )
        }
      ) :
        <div>메모를 작성해주세요</div>
    }
    </Overlay>
  );
};

export default MemoListView;