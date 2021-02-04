import {Modal,Button} from 'react-bootstrap'
import React from 'react';
import ReactPlayer from 'react-player'


const VideoModal = (props) => {
    return (  
        <Modal show={props.show} onHide={props.handleClose}>
            <ReactPlayer controls width = '100%' url = {`https://www.youtube.com/watch?v=${props.videoId}`}/>
        </Modal>
    );
}
 
export default VideoModal;