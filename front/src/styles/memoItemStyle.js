import styled from 'styled-components';

export const Overlay = styled.div`
  border-bottom: 1px solid #DFDFDF;
  padding: 10px 0;
  display: flex;
  word-break: break-word;
  &:hover{
    color: #1890ff;
  }
  .memo-selection {
    margin: auto 20 auto 20;
  }
  .memo-content {
    width: 100%;
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