import React from 'react';
import {Card} from 'react-bootstrap'

const VideoCard = (props) => {
    return (
      <Card style={{ width: '75%' }}>
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