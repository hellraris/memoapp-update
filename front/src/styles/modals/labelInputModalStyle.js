import styled from 'styled-components';

export const Overlay = styled.form`
  margin:0;
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.16);
  }
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 320px;
    padding: 10px;
    border-radius: 5px;
    background-color: white;
    box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
    & > label {
        font-size: 20px;
        font-weight: bold;
    }
    .body {
      border-top: 1px solid #bebebe;
      margin-top: 10px;
      padding: 20px;
      fieldset {
        border: 1px solid #bebebe;
        padding: 10px;
        width: 90%;
        border-radius: 3px;
        vertical-align: middle;
        input {
          width: 100%;
          outline: 0;
          border: 0;
          padding: 0;
        }
      }
      label {
        font-size: 16px;
        margin-right: 10px;
      }
    }
    .button-wrap{
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