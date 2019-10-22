import React from 'react';

import { Overlay } from '../../styles/dialogs/confirmDialogStyle';


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