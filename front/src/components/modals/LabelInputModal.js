import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { createLabelAction, updateLabelAction } from '../../reducers/label';
import { Overlay } from '../../styles/modals/labelInputModalStyle';

const LabelInputModal = ({ label, close }) => {
  const dispatch = useDispatch();
  const [isEditMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (label !== null) {
      setEditMode(true);
      setTitle( label.title ? label.title : "");
    } else {
      setEditMode(false);
    }
  }, [label]);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  }

  const onSubmit = useCallback((e) => {
    e.preventDefault();

    if (isEditMode) {
      dispatch(updateLabelAction({ id: label._id, title: title }));
    } else {
      dispatch(createLabelAction(title));
    }
    return close();
  }, [title]);

  return (
    <Overlay onSubmit={onSubmit}>
      <div className="modal-overlay"/>
      <div className="modal">
        <label>{isEditMode ? "라벨명변경" : "라벨추가"}</label>
        <div className="body">
          <fieldset>
            <input type="text" name="label-title" required placeholder="라벨명을 적어주세요" 
              value={title} onChange={onChangeTitle} />
          </fieldset>
        </div>
        <div className="button-wrap">
          <button type="submit">확인</button>
          <button type="button" onClick={close}>취소</button>
        </div>
      </div> 
    </Overlay>
  );
};

export default LabelInputModal;