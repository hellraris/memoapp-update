import styled from 'styled-components';

export const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    .memo-title {
      margin-top: 5px;
      padding: 10px;
      font-size: 20px;
      word-break: break-word;
      width: 75%;
    }
    .memo-btns {
      display: flex;
      margin-bottom: 5px;
      button {
        margin: 5px;
        padding: 7px;
        border-radius: 3px;
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
      }
    }
`;

export const Body = styled.div`
  word-break: break-word;
  white-space: pre-line;
  padding: 20px;
`;