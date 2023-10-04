/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import data from './data'
import './App.css'


function App() {
  const [datas, setdatas] = useState(data)
  const [count, setCount] = useState(0)
  const [clicked, addClicked] = useState([])

  function shuffle (array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
    }

  function handleClick (key) {
    if (clicked.includes( 
      key
    )) {
      setCount(0)
      addClicked([])
    } else {
      addClicked([...clicked, key])
      countSetter()
      console.log(clicked)
    }
    setdatas(shuffle(datas))
  }  

  function countSetter () {
    setCount(count + 1)
  }

  return (
    <>
      <List handleClick={handleClick} datas={datas}/>
      <Score counter={count}/>
    </>
  )
}

function List ({handleClick, datas}) {
  return (
    <div className='cards'>
      {datas.map(item => 
        <ListItem key={item.id} src={item.apiLink} onClick={() => handleClick(item.id)}></ListItem>
      )}
    </div>
  )
}

function ListItem ({ src, onClick, key }) {

  const [urlSrc, setUrl] = useState('')

  useEffect(() => {
    callAPI(src)
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

  async function callAPI (url) {
    const returned = await fetch(`https://picsum.photos/id/${url}/200`)
    setUrl(returned.url)
  }
  return <img key={key} src={urlSrc} onClick={onClick}></img>
}

function Score ({counter}) {
  const [bestScore, setBest] = useState(0)
  if (counter > bestScore) {
    setBest(counter)
  }
  return (
    <div>
      <BestScore score={bestScore}/>
      <CurrentScore score={counter}/>
    </div>
  )
}

function BestScore ({score}) {
  return (
    <p>{'Best: ' + score}</p>
  )
}

function CurrentScore ({score}) {
  return (
    <pc>{'Current: ' + score}</pc>
  )
}

export default App
