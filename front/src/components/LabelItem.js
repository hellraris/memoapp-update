import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Overlay = styled.div`
  border-bottom: 1px solid #DFDFDF;
  padding: 16px;
  text-align: center;
  word-break: break-word;
  text-overflow:ellipsis;
  white-space:nowrap;
  overflow:hidden;
  cursor: pointer;
  &:hover{
    color: #1890ff;
  }
  &:active{
    background-color: #e6f7ff;
  }
  &.add-btn {
    border-top: 1px solid #DFDFDF;
    border-bottom: 0px;
    margin-top: auto;
  }
`;

const LabelItem = ({ localSelectedLabel, onClickLabel }) => {
  const { selectedLabel } = useSelector(state => state.label);
  const { memoCount } = useSelector(state => state.memo);

  return (
    selectedLabel && 
    <Overlay
      key={localSelectedLabel._id}
      className="label-item"
      style={selectedLabel._id ===  localSelectedLabel._id ?
        { color: '1890ff', backgroundColor: '#e6f7ff' } : null}
      onClick={() => onClickLabel()}
    >
      {localSelectedLabel.title} ({localSelectedLabel._id === 'all' ? memoCount : localSelectedLabel.memos.length })
    </Overlay>
  );
};

export default LabelItem;