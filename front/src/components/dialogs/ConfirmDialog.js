import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  margin:0;
  .dialaog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.16);
  }
  .dialaog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    padding: 10px;
    border-radius: 5px;
    background-color: white;
    box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
    .dialog-body {
      display: flex;
      border-bottom: 1px solid #bebebe;
      padding: 20px;
      label {
        margin: auto;
        font-size: 18px;
        padding: 10px;
      }
    }
    .dialog-footer {
      margin-top: 8px;
      button{
        width: 47%;
        margin: 1%;
        padding: 7px 0;
        border-radius: 5px;
        background-color: white;
        font-size: 12pt;
        border: 1px solid #bebebe;
        cursor: pointer;
        &:hover{
          background-color: mediumaquamarine;
        };
        &:active{
          background-color: gainsboro;
        }
      }
    }
  }
`;

const ConfirmDialog = ({ msg, confirm }) => {
  return (
    <Overlay>
      <div className="dialaog-overlay"/>
      <div className="dialaog">
        <div className="dialog-body">
          <label>{ msg }</label>
        </div>
        <div className="dialog-footer">
          <button type="submit" onClick={()=>confirm(true)}>확인</button>
          <button type="button" onClick={()=>confirm(false)}>취소</button>
        </div>
      </div> 
    </Overlay>
  );
};

export default ConfirmDialog;