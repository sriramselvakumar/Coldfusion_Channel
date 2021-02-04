
import React, { useState, useEffect } from 'react';
import {Navbar,Jumbotron,Spinner, CardDeck} from 'react-bootstrap'
import Searchbar from './Components/Searchbar'
import styles from './styles'
import {getVideos, searchVideos} from './api'
import Card from './Components/VideoCard'
import Paginator from './Components/Pagination'
import Modal from './Components/Modal'

const App = () => {
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(true)
  const [fourPagination, setFourPagination] = useState([])
  const [threePagination,setThreePagination] = useState([])
  const [activeNum, setActiveNum] = useState(1)
  const [useThree, setUseThree] = useState(true)
  const [show, setShow] = useState(false);
  const [videoId, setId] = useState(null)

  useEffect(() => {
    fetchDefaultVideos()
  }, [loading]);

  const fetchDefaultVideos = async() => { 
      const videos = await getVideos('12');
      await setFourPagination(videos.paginatedFourItems)
      await setThreePagination(videos.paginatedThreeItems)
      setLoading(false)
  }
  const onSubmit = async() => {
      setLoading(true)
      const videos = await searchVideos(searchText)
      await  setFourPagination(videos.paginatedFourItems)
      await setThreePagination(videos.paginatedThreeItems)
      setLoading(false)
      setActiveNum(1)
  }

  const videoClick = (videoId) => {
    setShow(!show)
    setId(videoId)
  }

  const returnPageLength = () => {
    if(useThree) return threePagination.length
    else return fourPagination.length
  }

  const splitter = (text,characterLimit) => {
    text = text.split(' ')
    let splittedText = ''
    for(let word of text){
        if(splittedText.length + word.length + 1  <= characterLimit) splittedText+= word + ' '
        else splittedText+='...'
    }
    let result = ''
    for(let a = 0; a < splittedText.length;a++){
      if(splittedText[a]!='.'){
        result+=splittedText[a]
      }
    }
    return result
  }


  const pagination = () => {
    let result = null
    let numColumns = 0 
    if(useThree) {
      result = threePagination[activeNum-1]
      numColumns = 3 
    }
    else {
      result = fourPagination[activeNum-1]
      numColumns = 4
    }
    let cards = []
  
    for(let a = 0; a < result.length;a+=numColumns){
      let row = []
      for(let b = a; b < a+numColumns; b++) {
        if(b == result.length) break 
        const item = result[b]
        row.push(
          <Card 
            title = {item.snippet.title}
            description = {splitter(item.snippet.description,236)}
            thumbnail = {item.snippet.thumbnails.medium.url}
            videoId = {item.contentDetails.videoId}
            onVideoClick = {videoClick}
          />
        )
      }
      cards.push(
        <CardDeck style = {{marginTop: '2%', justifyContent: 'center'}}>
          {row}
        </CardDeck>
      )
    }
    return cards
  }

  const conditionalDisplay = () => {
    if(loading) {
      return (
        <div style = {styles.spinner}>
          <Spinner animation="border" variant="danger" />
        </div>
      )
    }
      const cards = pagination() 
      return (
        <div>
          {cards}
        </div>
      )
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
          useThree = {useThree}
          setUseThree = {setUseThree}
        />
        <Paginator 
          pages = {returnPageLength()}
          activeNum = {activeNum}
          setActiveNum = {setActiveNum}
        />
        <div style = {styles.cardsLayout}>
          {conditionalDisplay()} 
        </div>

        <Modal 
          handleClose={videoClick}
          show = {show}
          videoId = {videoId}
        />
        
      </Jumbotron>

    </React.Fragment>
    );
}
 
export default App;

