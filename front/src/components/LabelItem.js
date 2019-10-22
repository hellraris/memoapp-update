import React from 'react';
import { useSelector } from 'react-redux';

import { Overlay } from '../styles/labelItemStyle'; 


const LabelItem = ({ localSelectedLabel }) => {
  const { selectedLabel } = useSelector(state => state.label);
  const { memoCount } = useSelector(state => state.memo);

  return (
    selectedLabel && 
    <Overlay
      key={localSelectedLabel._id}
      className="label-item"
      style={selectedLabel._id ===  localSelectedLabel._id ?
        { color: '1890ff', backgroundColor: '#e6f7ff' } : null}
    >
      {localSelectedLabel.title} ({localSelectedLabel._id === 'all' ? memoCount : localSelectedLabel.memos.length })
    </Overlay>
  );
};

export default LabelItem;