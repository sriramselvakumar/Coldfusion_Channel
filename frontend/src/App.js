
import React, { useState, useEffect } from 'react';
import {Navbar,Jumbotron} from 'react-bootstrap'
import Searchbar from './Components/Searchbar'
import styles from './styles'
import {getVideos} from './api'

const App = () => {
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    fetchDefaultVideos()
  }, []);

  const fetchDefaultVideos = async() => { 
      const videos = await getVideos('12');
      console.log(videos)
  }


  const onSubmit = () => {
    
  }
  
  return ( 
    <React.Fragment>
      <Navbar bg="dark" variant="dark" expand = 'lg'>
        <Navbar.Brand href="#home">
          Coldfusion Channel
        </Navbar.Brand>
      </Navbar>
      <Jumbotron
        fluid
        style={styles.background}
      >
        <Searchbar
          setSearchText = {setSearchText}
          onSubmit = {onSubmit} 
        />
      </Jumbotron>

    </React.Fragment>
    );
}
 
export default App;

