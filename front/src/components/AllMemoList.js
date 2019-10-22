import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 
import { getMemoListAction, removeMemosAction,
         resetDeletedMemoFlg, resetSelectedMemo } from '../reducers/memo';
import { getLabelListAction, resetUpdatedLabelFlg } from '../reducers/label';
import LabelSettingModal from './modals/LabelSettingModal';
import ConfirmDialog from './dialogs/ConfirmDialog';
import MemoItem from './MemoItem';
import { makeSortData } from './functions/commonMemoListFunc';
import { Overlay, MemoMenu } from '../styles/commonMemoListStyle';


const AllMemoList = ({ history }) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [isOpenLabelSettingModal, setLabelSettingModal] = useState(false);
  const [isOpenConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({});
  const dispatch = useDispatch();
  const { labelList, updatedLabelFlg } = useSelector(state => state.label);
  const { memoList, deletedMemoFlg } = useSelector(state => state.memo);
  const [sortType, setSortType] = useState('');

  const isDisabled = memoList.length === 0 || checkedItems.length === 0 || labelList.length === 0;

   // 메모리스트뷰 초기화 
  useEffect(() => {
    dispatch(getMemoListAction(makeSortData("updateDateDesc")));
    dispatch(resetSelectedMemo);
    setCheckedItems([]);
  }, []);

  // 라벨업데이트시 라벨리스트를 갱신
  useEffect(() => {
    if (updatedLabelFlg) {
      dispatch(getLabelListAction);
      dispatch(resetUpdatedLabelFlg);
      setCheckedItems([]);
    }
  }, [updatedLabelFlg]);

  // 메모삭제시 전체메모 리스트 갱신
  useEffect(() => {
    if (deletedMemoFlg) {
      dispatch(getMemoListAction(makeSortData("updateDateDesc")));
      dispatch(resetDeletedMemoFlg);
      history.push(`/all`);
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

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
    dispatch(getMemoListAction(makeSortData(e.target.value)));
  };

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
            전체메모
          </div>
          <div className={"label-sort"}>
            <select onChange={onChangeSortType} value={sortType}>>
              <option value="updateDateDesc">갱신일▽</option>
              <option value="updateDateAsc">갱신일△</option>
              <option value="writeDateDesc">작성일▽</option>
              <option value="writeDateAsc">작성일△</option>
              <option value="TitleAsc">타이틀</option>
            </select>
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
              toUrl={'all'}
            />
          )
        }
      ) :
        <div>메모를 작성해주세요</div>
    }
    </Overlay>
  );
};

export default AllMemoList;