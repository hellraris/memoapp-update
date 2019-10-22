import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { createMemoAction, updateMemoAction } from '../../reducers/memo';
import { Overlay } from '../../styles/modals/memoInputModalStyle';


const MemoInputModal = ({ memo, close }) => {
  const dispatch = useDispatch();
  const [isEditMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  }

  const onChangeContent = (e) => {
    setContent(e.target.value);
  }

  const onSubmit = useCallback((e) => {
    e.preventDefault();

    if (isEditMode) {
      dispatch(updateMemoAction({id: memo._id, title: title, content: content}));
    } else {
      dispatch(createMemoAction({title, content}));
    }
    return close();
  }, [title, content]);

  useEffect(() => {
    if (memo !== null) {
      setEditMode(true);
      setTitle( memo.title ? memo.title : "");
      setContent( memo.content ? memo.content : "");
    } else {
      setEditMode(false);
    }
  }, [memo]);

  return (
    <Overlay onSubmit={onSubmit}>
      <div className="modal-overlay"/>
      <div className="modal">
        <label>{isEditMode ? "메모수정" : "메모작성"}</label>
        <div className="body">
          <div className="memo-title">
            <fieldset>
              <input type="text" name="memo-title" placeholder="제목을 입력해주세요" 
                required value={title} onChange={onChangeTitle} />
            </fieldset>
          </div>
          <div className="memo-content">
            <fieldset>
                <textarea placeholder="내용을 입력해주세요" value={content} onChange={onChangeContent}/>
            </fieldset>
          </div>
        </div>
        <div className="button-wrap">
          <button type="submit">확인</button>
          <button type="button" onClick={close}>취소</button>
        </div>
      </div> 
    </Overlay>
  );
};

export default MemoInputModal;