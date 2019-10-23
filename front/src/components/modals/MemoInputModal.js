import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Select } from 'antd';

import { createMemoAction, updateMemoAction } from '../../reducers/memo';
import { Overlay } from '../../styles/modals/memoInputModalStyle';

const { Option } = Select;

const MemoInputModal = ({ memo, labelList, close }) => {
  const dispatch = useDispatch();
  const [isEditMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [AddTargetLabels, setAddTargetLabels] = useState(null);

  useEffect(() => {
    if (memo !== null) {
      setEditMode(true);
      setTitle( memo.title ? memo.title : "");
      setContent( memo.content ? memo.content : "");
    } else {
      setEditMode(false);
    }
  }, [memo]);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onChangeAddTargetLabels = (value) => {
    setAddTargetLabels(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      dispatch(updateMemoAction({id: memo._id, title, content}));
    } else {
      dispatch(createMemoAction({title, content, AddTargetLabels}));
    }
    return close();
  };

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
          {typeof labelList !== 'undefined' &&
            <div>
              <Select
                mode="multiple"
                size="large"
                placeholder="라벨을 지정해주세요."
                onChange={onChangeAddTargetLabels}
                style={{ width: '100%' }}
              >
                {labelList.map((v)=>{
                  return <Option key={v._id}>{v.title}</Option>
                })}
              </Select>
            </div>
          }
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