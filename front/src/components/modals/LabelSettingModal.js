import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addLabelMemosAction } from '../../reducers/label';
import { Overlay } from '../../styles/modals/labelSettingModalStyle';

const LabelSettingModal = ({ settingTarget, close }) => {
  const dispatch = useDispatch();
  const { labelList } = useSelector(state => state.label);
  const [settingLabel, setSettingLabel] = useState(labelList[0]._id);
  
  const onChangeSettingLabel = (e) => {
    setSettingLabel(e.target.value);
  };

  const setLabel = useCallback(() => {
    dispatch(addLabelMemosAction({labelId: settingLabel, memoIds: settingTarget}));
    return close();
  }, [settingLabel, settingTarget]);

  return (
    <Overlay>
      <div className="modal-overlay"/>
      <div className="modal">
        <label>라벨 설정</label>
        <div className="body">
          <select onChange={onChangeSettingLabel} value={settingLabel}>
            {labelList.map((v, i) => {
              return (<option key={i} value={v._id}>{v.title}</option>);
            })}
          </select>
        </div>
        <div className="button-wrap">
          <button onClick={setLabel}>확인</button>
          <button onClick={close}>취소</button>
        </div>
      </div> 
    </Overlay>
  );
};

export default LabelSettingModal;