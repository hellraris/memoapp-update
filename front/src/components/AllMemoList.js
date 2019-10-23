import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 
import { getMemoListAction, removeMemosAction,
         resetDeletedMemoFlg, resetSelectedMemo } from '../reducers/memo';
import { getLabelListAction, resetUpdatedLabelFlg } from '../reducers/label';
import LabelSettingModal from './modals/LabelSettingModal';
import ConfirmDialog from './dialogs/ConfirmDialog';
import MemoItem from './MemoItem';
import { makeSortData, CREATED_DATE_DESC, CREATED_DATE_ASC,
         UPDATED_DATE_DESC, UPDATED_DATE_ASC, TITLE_ASC } from './functions/commonMemoListFunc';
import { Overlay, MemoMenu } from '../styles/commonMemoListStyle';


const AllMemoList = ({ history }) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [isOpenLabelSettingModal, setLabelSettingModal] = useState(false);
  const [isOpenConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({});
  const dispatch = useDispatch();
  const { labelList, updatedLabelFlg } = useSelector(state => state.label);
  const { memoList, deletedMemoFlg, updatedMemoFlg, createdMemoFlg } = useSelector(state => state.memo);
  const [sortType, setSortType] = useState('');
  const [allCheckedItemFlg, setAllCheckedItemFlg] = useState(false);

  const isDisabled = memoList.length === 0 || checkedItems.length === 0 || labelList.length === 0;

   // 메모리스트뷰 초기화 
  useEffect(() => {
    dispatch(getMemoListAction(makeSortData(UPDATED_DATE_DESC)));
    dispatch(resetSelectedMemo);
    setCheckedItems([]);
  }, []);

  // 플래그 업데이트시 정렬 디폴트설정
  useEffect(() => {
    setSortType(UPDATED_DATE_DESC);
  }, [ updatedMemoFlg, deletedMemoFlg, createdMemoFlg]);

  // 라벨업데이트시 라벨리스트를 갱신
  useEffect(() => {
    if (updatedLabelFlg) {
      dispatch(getLabelListAction);
      dispatch(resetUpdatedLabelFlg);
      setAllCheckedItemFlg(false);
      setCheckedItems([]);
    }
  }, [updatedLabelFlg]);

  // 메모삭제시 전체메모 리스트 갱신
  useEffect(() => {
    if (deletedMemoFlg) {
      dispatch(getMemoListAction(makeSortData(UPDATED_DATE_DESC)));
      dispatch(resetDeletedMemoFlg);
      setAllCheckedItemFlg(false);
      history.push(`/all`);
    }
  }, [deletedMemoFlg]);

  const checkAllItem = () => {
    let newCheckedItems;
    if (allCheckedItemFlg) {
      newCheckedItems = []
    } else {
      newCheckedItems = memoList.map((v) => {
        return v._id;
      })
    }
    setCheckedItems(newCheckedItems);
    setAllCheckedItemFlg(!allCheckedItemFlg);
  }

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
          <div className={"memo-sort"}>
            <select onChange={onChangeSortType} value={sortType}>>
              <option value={UPDATED_DATE_DESC}>갱신일▽</option>
              <option value={UPDATED_DATE_ASC}>갱신일△</option>
              <option value={CREATED_DATE_DESC}>작성일▽</option>
              <option value={CREATED_DATE_ASC}>작성일△</option>
              <option value={TITLE_ASC}>제목</option>
            </select>
          </div>
          <div className={"memo-list-menu"}>
            <div className={"memo-all-selection"}>
              <input type="checkbox" checked={allCheckedItemFlg} onChange={checkAllItem}/>
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