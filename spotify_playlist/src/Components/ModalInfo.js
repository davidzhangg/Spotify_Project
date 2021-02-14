import React from 'react'
import Modal from 'react-modal';
import '../Styles/Modal.css';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      height                : '500px',
      width                 : '500px',
    }
  };

Modal.setAppElement('#root')
const ModalInfo = (props) => {
    return (
        <div>
            <Modal isOpen={props.open} style={customStyles} onRequestClose={props.close}>
                <div className="modal-header">
                    <h1 className="header">{props.modalinfo.name}</h1>
                    <span className="close-btn" onClick={props.close}>X</span>
                </div>
                <div className="modal-body">
                    <figure className="img-figure">
                        <img 
                            src={props.modalinfo.imageurl}
                            alt={props.modalinfo.name}>                    
                        </img>
                        <figcaption className="song-info">
                            <p className="artist">Artist: {props.modalinfo.artists}</p>
                            <p>Musical Album Type: {props.modalinfo.type}</p>
                            <p>Duration: {props.modalinfo.duration}</p>
                            <p>Spotify Link: <a href={props.modalinfo.link} target="_blank" rel="noreferrer">Click Here</a></p>
                            <p>Date Added: {props.modalinfo.date}</p>
                        </figcaption>
                    </figure>
                    <button className="close-btn1" onClick={props.close}>Close</button>
                </div>    
            </Modal>
        </div>
    )
}

export default ModalInfo
