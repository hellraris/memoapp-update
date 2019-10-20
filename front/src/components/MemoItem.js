import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Moment from 'moment';
import { NavLink } from 'react-router-dom';


const Overlay = styled.div`
  border-bottom: 1px solid #DFDFDF;
  padding: 10px 0;
  display: flex;
  word-break: break-word;
  &:hover{
    color: #1890ff;
  }
  .memo-selection {
    margin: auto;
  }
  .memo-content {
    width: 92%;
    .memo-content-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
    }
    .memo-content-body {
      width: 95%;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }
    .memo-title{
      width: 70%;
      text-overflow:ellipsis;
      overflow:hidden;
      white-space:nowrap;
    }
    .memo-date{
      width: 70px;
      font-size: 12px;
      margin-left: 3%;
    }
  }
`;

const MemoItem = ({ match, localSelectedMemo, onChangeChekedItems, isLabelMemoList, checkedItems }) => {
  const { selectedMemo } = useSelector(state => state.memo);

  return (
    <Overlay 
      style={ localSelectedMemo._id === (selectedMemo !== null && selectedMemo._id) ?
        { color: '1890ff', backgroundColor: '#e6f7ff' } : null } 
    >
      <div className={"memo-selection"}>
        <input 
        type= "checkbox" 
        name={localSelectedMemo._id} 
        checked={checkedItems.indexOf(localSelectedMemo._id) !== -1} 
        onChange={(e) => onChangeChekedItems(e, localSelectedMemo._id)} 
      />
      </div>
      <NavLink 
        className={"memo-content"}  
        to={ isLabelMemoList ? `/${match.params.label}/${localSelectedMemo._id}` : `/all/${localSelectedMemo._id}`}
      >
        <div className={"memo-content-header"}>
          <div className={"memo-title"}>{localSelectedMemo.title}</div>
          <div className={"memo-date"}>{Moment(localSelectedMemo.updatedAt).format('YYYY-MM-DD')}</div>
        </div>
        <div className={"memo-content-body"}>
          {localSelectedMemo.content}
        </div>
      </NavLink>
    </Overlay>
  ) 
}

export default MemoItem;