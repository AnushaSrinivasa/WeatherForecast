import React from 'react'

export default function ModalPopup({title, text, setFormValidation}) {

    const closeModal = () => {
        setFormValidation(false);
    }

    return (
        <div className='modal' tabIndex='-1' id="weatherModal" aria-hidden="true">
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title' id='weatherModalLabel'>{title}</h5>
                        <button type='button' className='btn-close' onClick={closeModal} aria-label='close'></button>
                    </div>
                    <div className='modal-body'>
                        <p>{text}</p>
                    </div>
                    <div className='modal-footer'>
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
