import styled from 'styled-components';

export const Overlay = styled.div`
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