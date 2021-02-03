import React from 'react';
import {Form,Button} from 'react-bootstrap'
import styles from '../styles'
const SearchBar = (props) => {
    return ( 
        <Form style ={styles.searchComponent}>
            <Form.Group style = {styles.searchBar}>
                <Form.Control type="text" placeholder="Search" onChange ={(e) => props.setSearchText(e.target.value)} />
            </Form.Group>
            <div style = {styles.searchButton}>
                <Button onClick = {props.onSubmit} variant="success">Search</Button>
            </div>
        </Form>
     );
}
 
export default SearchBar;