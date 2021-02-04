import {Pagination} from 'react-bootstrap'
import React from 'react';


const Paginator = (props) => {
    const renderItems = () => {
        const items = []
        for(let number = 1;number<=props.pages;number++){
            items.push(
                (
                    <Pagination.Item key={number} active={number === props.activeNum} onClick = {() => props.setActiveNum(number)}>
                        {number}
                    </Pagination.Item>
                )
            )
        }
        return items
    }
    return ( 
        
            <Pagination style = {{justifyContent: 'center'}} size="sm">{renderItems()}</Pagination>
        
        
     );
}
 
export default Paginator;