import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { createMemoAction, updateMemoAction } from '../../reducers/memo';

const Overlay = styled.form`
  margin:0;
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
    max-width: 700px;
    width: 90%;
    max-height: 800px;
    height: 90%;
    padding: 20px;
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
      padding: 5px;
      fieldset {
        border: 1px solid #bebebe;
        border-radius: 5px;
        vertical-align: middle;
        padding: 10px;
        margin: 15 0;
        input {
          outline: 0;
          border: 0;
          padding: 0;
          font-size: 16px;
          width: 100%;       
          &::placeholder {
            color: #bebebe;
          }
        }
        textarea {
          outline: 0;
          border: 0;
          width: 100%;
          height: calc(100% - 190px);
          resize: none;
          overflow-y: auto;
          font-size: 16px;
          &::placeholder {
            color: #bebebe;
          }
        }
      }
    }
    .button-wrap{
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