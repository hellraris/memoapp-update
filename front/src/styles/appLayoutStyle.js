import styled from 'styled-components';

export const Overlay = styled.div`
  display: flex;
  border: 1px solid #DFDFDF;
  padding: 10px;
  align-items: center;
  button {
    border: 1px solid #DFDFDF;
    padding: 7px 30px;
    background-color: white;
    font-size: 16px;
    cursor: pointer;
    &:hover{
      color: #1890ff;
    }
    &:active {
      background-color: #e6f7ff;
    }
  };
  .search {
    display: flex;
    margin: 0 5% 0 auto;
    .search-input {
      height: 25px;
      border: 1px solid #DFDFDF;
    }
    .search-button {
      padding: 0 5px;
      height: 25px;
      border: 1px solid #DFDFDF;
      
    }
  }
`;