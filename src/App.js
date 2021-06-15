import { useEffect, useState } from 'react';
import './App.scss';
import COLORS_ARRAY from "./colorsArray"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";

let quoteWarehouse = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setQuote] = useState("Remember no one can make you feel inferior without your consent."); 
  const [author,setAuthor] = useState("Mr. Author");
  const [randomNumber,setRandomNumber] = useState(0);
  const [quotesArray,setQuotesArray] = useState(null);
  const [bgColor,setBgColor] = useState("#282c34")

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json();
    setQuotesArray(parsedJSON.quotes);
    console.log(parsedJSON);
  }
  useEffect(()=>{
    fetchQuotes(quoteWarehouse)
    }
    ,[quoteWarehouse])
  
  const changeQuote = ()=>{
    setQuote("Life shrinks or expands in proportion to one’s courage.");
    setAuthor("Whateva Nerw Author");
  }
  
  const getRandomQuote = () =>{
    let randomInteger=Math.floor(quotesArray.length * Math.random());
    setRandomNumber(randomInteger);
    setBgColor(COLORS_ARRAY[randomInteger]);
    setQuote(quotesArray[randomInteger].quote);
    setAuthor(quotesArray[randomInteger].author);
    
  }

  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor:bgColor}}>
        <div id="quote-box"  style={{color:bgColor}}>
          <p id="text">
            <FontAwesomeIcon icon={faQuoteLeft}/> {quote} <FontAwesomeIcon icon={faQuoteRight}/>
          </p>
          <p id="author">- {author}</p>
          
          
          <div className="button">
            <a id="tweet-quote" style={{backgroundColor:bgColor}} href={encodeURI(`https://twitter.com/intent/tweet?text=${quote} -${author}`)}><FontAwesomeIcon icon={faTwitter} /></a>
            <button id="new-quote" onClick={getRandomQuote} style={{backgroundColor:bgColor}}>New Quote</button>
          </div>
          
        </div>
        
      </header>
    </div>
  );
}

export default App;
