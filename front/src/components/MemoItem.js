import React from 'react';
import { useSelector } from 'react-redux';
import Moment from 'moment';
import { NavLink } from 'react-router-dom';

import { Overlay } from '../styles/memoItemStyle';


const MemoItem = ({ toUrl, localSelectedMemo, onChangeChekedItems, checkedItems }) => {
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
        to={`/${toUrl}/m/${localSelectedMemo._id}`}
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