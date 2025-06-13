import { useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState([]);
  const pokemonSpriteURLs = [];
  



  function displayScore(){

  }

  

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
const hasFetched = useRef(false);

useEffect(() => {
  if (!hasFetched.current) {
    useAPI();
    hasFetched.current = true;
  }
}, []);



  



  return (
  <>
    <div className="card-container">
        {cards.map((child) => {
        return <div className="card" key = {child}>
        <img src={child} alt="" />
        
        </div>;
      })}
      </div>
  </>
  )
}

export default App
