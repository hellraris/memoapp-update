import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 
import { getMemoCountAction, removeMemosAction, resetDeletedMemoFlg,
         searchMemoAction, resetSelectedMemo } from '../reducers/memo';
import { getLabelListAction, resetUpdatedLabelFlg, resetSelectedLabel } from '../reducers/label';
import LabelSettingModal from './modals/LabelSettingModal';
import ConfirmDialog from './dialogs/ConfirmDialog';
import MemoItem from './MemoItem';
import { makeSortData } from './functions/commonMemoListFunc';
import { Overlay, MemoMenu } from '../styles/commonMemoListStyle';


const SearchMemoList = ({ match, history }) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [isOpenLabelSettingModal, setLabelSettingModal] = useState(false);
  const [isOpenConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({});
  const [sortType, setSortType] = useState('');
  const dispatch = useDispatch();
  const { labelList, updatedLabelFlg } = useSelector(state => state.label);
  const { memoList, deletedMemoFlg } = useSelector(state => state.memo);

  const isDisabled = memoList.length === 0 || checkedItems.length === 0 || labelList.length === 0;
  const targetWord = match.params.word;

   // 메모리스트뷰 초기화 
  useEffect(() => {
    dispatch(searchMemoAction(
      {word: targetWord, sortData: makeSortData("updateDateDesc")}
    ));
    dispatch(resetSelectedLabel);
    dispatch(resetSelectedMemo);
    setCheckedItems([]);
  }, [match.params.word]);

  // 라벨업데이트시 라벨리스트 갱신
  useEffect(() => {
    if (updatedLabelFlg) {
      dispatch(searchMemoAction(
        {word: targetWord, sortData: makeSortData("updateDateDesc")}
      ));
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

  const onChangeSortType = (e) => {
    setSortType(e.target.value);
    dispatch(searchMemoAction(
      {word: targetWord, sortData: makeSortData(e.target.value)}
    ));
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
            "{targetWord}" 검색결과
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