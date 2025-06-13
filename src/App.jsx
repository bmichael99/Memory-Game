import { useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const myRefs = useRef({});
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState([]);
  const pokemonSpriteURLs = [];
  


  function randomNum(){
    return Math.floor(Math.random() * 100);
  }

  async function useAPI(){
    let offset = randomNum();
    
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=' + offset)
      .then(response => {
        response.json().then(data => {

          const fetches = data.results.map((pokemon) => {
            return fetch(pokemon.url)
              .then(response => response.json())
              .then(pokeData => {
                console.log(pokeData.sprites.front_default);
                pokemonSpriteURLs.push(pokeData.sprites.front_default);
              });
          });


          Promise.all(fetches).then(() => {
            setCards(pokemonSpriteURLs);
          });
        });
      });
    
  }

  function handleClick(ID){
    const element = myRefs.current[ID];
        if (element.classList.contains("selected")) {
           // Do something with the element
          setScore(0);
          useAPI();
           
        } else{
          
          setScore((score) => { 
            if(score+1 > bestScore){
              setBestScore(score+1);
            }

            return score+1});
          
          element.classList.add("selected");

          const shuffle = cards;
           
           for(let i = 0; i < shuffle.length;i++){
              let j = Math.floor(Math.random() * 10);
              let temp = shuffle[i];
              shuffle[i] = shuffle[j];
              shuffle[j] = temp;
           }
           setCards(shuffle);

        }
  }

const hasFetched = useRef(false);

useEffect(() => {
  if (!hasFetched.current) {
    useAPI();
    hasFetched.current = true;
  }
}, []);



  



  return (
  <>
    <h2>Current Score: {score}</h2>
    <h2>Best Score: {bestScore}</h2>
    <div className="card-container">
        {cards.map((url) => {
        return <div className="card" key = {url} ref={el => myRefs.current[url] = el}
        onClick={() => handleClick(url)}>
        <img src={url} alt="" />
        
        </div>;
      })}
      </div>
  </>
  )
}

export default App
