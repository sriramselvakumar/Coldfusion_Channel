import React from 'react';
import {Form,Button} from 'react-bootstrap'
import styles from '../styles'
const SearchBar = (props) => {
    const returnState = () => {
        if(props.useThree) return '+'
        else return '-'
    }
    return ( 
        <Form style ={styles.searchComponent}>
            <Form.Group style = {styles.searchBar}>
                <Form.Control type="text" placeholder="Search" onChange ={(e) => props.setSearchText(e.target.value)} />
            </Form.Group>
            <div style = {styles.searchButton}>
                <Button onClick = {props.onSubmit} variant="success">Search</Button>
            </div>
            <div style = {styles.searchButton}>
                <Button onClick = {() => props.setUseThree(!props.useThree)} variant="danger">{returnState()}</Button>
            </div>
        </Form>
     );
}
 
export default SearchBar;