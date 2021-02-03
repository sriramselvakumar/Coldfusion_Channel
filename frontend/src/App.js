
import React, { useState, useEffect } from 'react';
import {Navbar,Jumbotron,Spinner,CardColumns} from 'react-bootstrap'
import Searchbar from './Components/Searchbar'
import styles from './styles'
import {getVideos} from './api'
import Card from './Components/VideoCard'
import Paginator from './Components/Pagination'

const App = () => {
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(false)
  const [fourPagination, setFourPagination] = useState([])
  const [threePagination,setThreePagination] = useState([])
  const [activeNum, setActiveNum] = useState(1)

  useEffect(() => {
    //fetchDefaultVideos()
    setLoading(false)
  }, []);

  const fetchDefaultVideos = async() => { 
      const videos = await getVideos('12');
      await setFourPagination(videos.paginatedFourItems)
      await setThreePagination(videos.paginatedThreeItems)
      await setLoading(false)
  }


  const onSubmit = () => {

    
  }

  const conditionalDisplay = () => {
    if(loading) {
      return (
        <div style = {styles.spinner}>
          <Spinner animation="border" variant="danger" />
        </div>
      )
    }
    else {
      let result = [] 
      for(let a = 0; a < 9;a++){
        result.push((
          <div style = {{marginLeft: '20%'}}>
          <Card 
          title = {"Toyota Plans Revolutionary Solid State Battery for 2021"}
          thumbnail = {'https://i.ytimg.com/vi/G01xv1RyRVw/mqdefault.jpg'}
          description = {'For your chance to win your own Tesla Model 3 and support a great cause, enter at http://home.omaze.com/fusion\n\n--- ColdFusion Social Media ---\n» Twitter | @ColdFusion_TV\n» Instagram | coldfusiontv\n» Facebook | https://www.facebook.com/'}
          />
          </div>
        ))
      }
      return (
        <CardColumns>
          <div>
          {result}
          </div>
          
        </CardColumns>
        
      ) 
    } 
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
        <div style = {styles.cardsLayout}>
          {conditionalDisplay()}
        </div>

        <Paginator 
          pages = {2}
          activeNum = {activeNum}
          setActiveNum = {setActiveNum}
        />
        
      </Jumbotron>

    </React.Fragment>
    );
}
 
export default App;

