import React, { useState } from 'react';
import './Modal.css';

function Modal({ textModal, closeModal }) {

  return (
    <div className="container-modal">
      <div className="content-modal" style={{margin: "20vh auto"}}>
        <div>{textModal}</div>        
        <div className='buttons-modal'>
          <div className="close-button" onClick={closeModal} >סגור</div>
        </div>
      </div>

    </div>

  );
}

export default Modal;
