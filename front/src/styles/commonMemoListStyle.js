import styled from 'styled-components';

export const Overlay = styled.div`
  a {
    display: inline-block;
    text-decoration: none;
    color: inherit;
  }
`;

export const MemoMenu = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #DFDFDF;
  padding: 10;
  align-items: center;
  .label-title {
    font-size: 20px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .label-btns {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    button {
      width: 20%;
      margin: 1%;
      padding: 7px 0;
      border-radius: 5px;
      background-color: white;
      font-size: 12px;
      border: 1px solid #bebebe;
      cursor: pointer;
      &:hover {
        color: #1890ff;
      }
      &:active {
        background-color: #e6f7ff;
      }
      &:disabled {
        background-color: gainsboro;
        cursor: not-allowed;
      }
    } 
  }
`;