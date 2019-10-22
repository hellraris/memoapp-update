import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
 
import { getMemoCountAction, removeMemosAction, resetDeletedMemoFlg,
         searchMemoAction, resetSelectedMemo } from '../reducers/memo';
import { getLabelListAction, resetUpdatedLabelFlg, resetSelectedLabel } from '../reducers/label';

import LabelSettingModal from './modals/LabelSettingModal';
import ConfirmDialog from './dialogs/ConfirmDialog';
import MemoItem from './MemoItem';

const Overlay = styled.div`
  a {
    display: inline-block;
    text-decoration: none;
    color: inherit;
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

const SearchMemoList = ({ match, history }) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [isOpenLabelSettingModal, setLabelSettingModal] = useState(false);
  const [isOpenConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({});
  const dispatch = useDispatch();
  const { labelList, updatedLabelFlg } = useSelector(state => state.label);
  const { memoList, deletedMemoFlg } = useSelector(state => state.memo);

  const isDisabled = memoList.length === 0 || checkedItems.length === 0 || labelList.length === 0;
  const targetWord = match.params.word;

   // 메모리스트뷰 초기화 
  useEffect(() => {
    dispatch(searchMemoAction(targetWord));
    dispatch(resetSelectedLabel);
    dispatch(resetSelectedMemo);
    setCheckedItems([]);
  }, [match.params.word]);

  // 라벨업데이트시 라벨리스트 갱신
  useEffect(() => {
    if (updatedLabelFlg) {
      dispatch(searchMemoAction(targetWord));
      dispatch(getLabelListAction);
      dispatch(resetUpdatedLabelFlg);
      setCheckedItems([]);
    }
  }, [updatedLabelFlg]);

  // 메모삭제시 검색메모 리스트 갱신
  useEffect(() => {
    if (deletedMemoFlg) {
      dispatch(getMemoCountAction);
      dispatch(resetDeletedMemoFlg);
      history.push(`/s/${targetWord}`);
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

  const confirmRemoveMemos = ((confirm) => {
    if (confirm) {
      dispatch(removeMemosAction(checkedItems));
    }
    setOpenConfirmDialog(false);
  });

  // 오픈할 다이어로그를 판별
  const handleDialog = ((target) => {
    let newMsg = "";
    if (target === 'memos') {
      newMsg = checkedItems.length + "개의 메모를 삭제하시겠습니까?";
      setConfirmDialog({msg: newMsg, confirm: confirmRemoveMemos});
    } 
    setOpenConfirmDialog(true);
  });

  return (
    <Overlay>
      { isOpenLabelSettingModal && <LabelSettingModal settingTarget={checkedItems} close={handleSettingModal} /> }
      { isOpenConfirmDialog && <ConfirmDialog msg={confirmDialog.msg} confirm={confirmDialog.confirm}/> }
        <MemoMenu>
          <div className={"label-title"}>
            "{targetWord}" 검색결과
          </div>
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
      { memoList.length !== 0 
        ? memoList.map((v) => {
          return (
            <MemoItem 
              key={v._id} 
              localSelectedMemo={v}
              checkedItems={checkedItems}
              onChangeChekedItems={onChangeChekedItems} 
              toUrl={`s/${targetWord}`}
            />
          )
        }
      ) :
        <div>검색결과가 없습니다</div>
    }
    </Overlay>
  );
};

export default SearchMemoList;