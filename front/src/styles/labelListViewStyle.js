import styled from 'styled-components';

export const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  .label-list {
    overflow-y: scroll;
    height: 100%;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const LabelItemStyle = styled.div`
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