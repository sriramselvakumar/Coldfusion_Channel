import React from 'react';
import {Card} from 'react-bootstrap'
// width: 75%
const VideoCard = (props) => {
    return (
      <Card style={{ width: '75%', maxWidth: '280px' }} onClick = {() => props.onVideoClick(props.videoId)}>
        <Card.Img variant="top" src={props.thumbnail} />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
            {props.description}
          </Card.Text>
        </Card.Body>
      </Card>  
  );
}
 
export default VideoCard;