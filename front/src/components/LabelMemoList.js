import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 
import { getMemoCountAction, resetDeletedMemoFlg, resetSelectedMemo } from '../reducers/memo';
import { getLabelListAction, removeLabelMemosAction, removeLabelAction, 
         getLabelAction, resetUpdatedLabelFlg } from '../reducers/label';
import LabelSettingModal from './modals/LabelSettingModal';
import LabelInputModal from './modals/LabelInputModal';
import ConfirmDialog from './dialogs/ConfirmDialog';
import MemoItem from './MemoItem';
import { Overlay, MemoMenu } from '../styles/commonMemoListStyle';


const LabelMemoList = ({ match, history }) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [isOpenLabelSettingModal, setLabelSettingModal] = useState(false);
  const [isOpenLabelInputModal, setLabelInputModal] = useState(false);
  const [isOpenConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({});
  const dispatch = useDispatch();
  const { labelList, selectedLabel, updatedLabelFlg } = useSelector(state => state.label);
  const { memoList, deletedMemoFlg } = useSelector(state => state.memo);

  const isDisabled = memoList.length === 0 || checkedItems.length === 0 || labelList.length === 0;
  const targetLabel = match.params.label;

   // 메모리스트뷰 초기화 
  useEffect(() => {
    dispatch(getLabelAction(targetLabel));
    dispatch(resetSelectedMemo);
    setCheckedItems([]);
  }, [match.params.label]);

  // 라벨업데이트시 라벨리스트 갱신
  useEffect(() => {
    if (updatedLabelFlg) {
      // 라벨를 통해 수정이 이루어진 경우 라벨리스트를 리프레쉬
      dispatch(getLabelAction(targetLabel));
      dispatch(getLabelListAction);
      dispatch(resetUpdatedLabelFlg);
      setCheckedItems([]);
    }
  }, [updatedLabelFlg]);

  // 메모삭제시 라벨메모리스트 갱신
  useEffect(() => {
    if (deletedMemoFlg) {
      dispatch(getMemoCountAction);
      dispatch(resetDeletedMemoFlg);
      history.push(`/l/${targetLabel}`);
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
    if (target === 'labelMemos') {
      const newMsg = checkedItems.length + "개의 메모를 라벨에서 지정취소하시겠습니까?";
      setConfirmDialog({msg: newMsg, confirm: confirmRemoveLabelMemos});
    } else if (target === 'label') {
      const newMsg = "라벨을 삭제하시겠습니까?";
      setConfirmDialog({msg: newMsg, confirm: confirmRemoveLabel});     
    }
    setOpenConfirmDialog(true);
  });

  return (
    <Overlay>
      { isOpenLabelSettingModal && <LabelSettingModal settingTarget={checkedItems} close={handleSettingModal} /> }
      { isOpenLabelInputModal && <LabelInputModal settingTarget={checkedItems} label={selectedLabel} close={handleInputModal} /> }
      { isOpenConfirmDialog && <ConfirmDialog msg={confirmDialog.msg} confirm={confirmDialog.confirm}/> }
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
      { memoList.length !== 0 
        ? memoList.map((v) => {
          return (
            <MemoItem 
              key={v._id} 
              localSelectedMemo={v}
              checkedItems={checkedItems}
              onChangeChekedItems={onChangeChekedItems} 
              toUrl={`l/${targetLabel}`}
            />
          )
        }
      ) :
        <div>메모를 작성해주세요</div>
    }
    </Overlay>
  );
};

export default LabelMemoList;