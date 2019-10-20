import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { addLabelMemosAction } from '../../reducers/label';

const Overlay = styled.div`
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.16);
  }
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 320px;
    padding: 10px;
    border-radius: 5px;
    background-color: white;
    box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
    & > label {
        font-size: 20px;
        font-weight: bold;
    }
    .body {
      border-top: 1px solid #bebebe;
      margin-top: 10px;
      padding: 20px;
      select {
        width: 200px;
        font-size: 18px;
        overflow:hidden;
      }
    }
    .button-wrap{
      margin-top: 8px;
      button{
        width: 47%;
        margin: 1%;
        padding: 7px 0;
        border-radius: 5px;
        background-color: white;
        font-size: 12pt;
        border: 1px solid #bebebe;
        cursor: pointer;
        &:hover{
          background-color: mediumaquamarine;
        };
        &:active{
          background-color: gainsboro;
        }
      }
    }
  }
`;

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