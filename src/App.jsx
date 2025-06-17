import { useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const myRefs = useRef({});
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  


  function randomNum(){
    return Math.floor(Math.random() * 100);
  }

  async function useAPI(){
    myRefs.current = {};
    let offset = randomNum();
    const pokemonSpriteURLs = [];

      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=' + offset);
      const data = await response.json();
      setLoading(true);
      const fetches = data.results.map(async (pokemon) => {
            const pokeData = await fetch(pokemon.url);
            const pokeDataJSON = await pokeData.json();
            console.log(pokeDataJSON.sprites.front_default);
            pokemonSpriteURLs.push({id:pokeDataJSON.id, url:pokeDataJSON.sprites.front_default});
          });

      Promise.all(fetches).then(() => {
        setCards(pokemonSpriteURLs);
        setLoading(false);
        console.log("Done loading");
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

  function BuildCards(){
    return 
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
        {loading === false ?
        (cards.map((cardData) => 
        <div className="card" key = {cardData.id} ref={el => myRefs.current[cardData.id] = el}
        onClick={() => handleClick(cardData.id)}>
        <img src={cardData.url} alt="" />
        
        </div>
      ))
      : (<div>Loading...</div>)}
      </div>
  </>
  )
}

export default App
