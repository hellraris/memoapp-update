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
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 700px;
    width: 90%;
    padding: 20px;
    border-radius: 5px;
    background-color: white;
    box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
    & > label {
        font-size: 20px;
        font-weight: bold;
    }
    .body {
      display: flex;
      flex-direction: column;
      height: 100%;
      border-top: 1px solid #bebebe;
      margin-top: 10px;
      padding: 5px;
      .memo-content {
        display: flex;
        flex-direction: column;
        height: 100%;
        fieldset {
          height: 100%;
          textarea {
            height: 100%;
            outline: 0;
            border: 0;
            width: 100%;
            resize: none;
            overflow-y: auto;
            font-size: 16px;
            &::placeholder {
              color: #bebebe;
            }
          }
        }
      }
      fieldset {
        border: 1px solid #bebebe;
        border-radius: 5px;
        vertical-align: middle;
        padding: 10px;
        margin: 15 0;
        input {
          outline: 0;
          border: 0;
          padding: 0;
          font-size: 16px;
          width: 100%;       
          &::placeholder {
            color: #bebebe;
          }
        }
      }
    }
    .button-wrap{
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