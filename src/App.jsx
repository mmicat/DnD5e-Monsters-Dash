import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [monsters, setMonsters] = useState([]);

  useEffect(() => {
    const fetchMonsters = async () => {
      try {
        // fetch all
        const response = await fetch('https://www.dnd5eapi.co/api/monsters');
        const data = await response.json();
        // grab only first 20
        const first20 = data.results.slice(0, 20);
        // fetch full first 20
        const fullMonsters = await Promise.all(first20.map(async (monster) => {
          const fullData = await fetch(`https://www.dnd5eapi.co${monster.url}`);
          return await fullData.json();
        }));
        // save full monsters to state
        setMonsters(fullMonsters);
      } catch (error) {
        console.error("Error fetching monsters:", error);
      }
    };
    fetchMonsters();
  }, []); // to run only when app loads

  return (
    <div className="App">
      <h1>D&D 5e Monsters Dashboard</h1>
      
      <div className="summary-stats">
        {
          <p>Monsters Loaded: {monsters.length}</p>
        }
      </div>

      <div className="search-and-filter">
         {}
      </div>

      <div className="list-container">
        {}
      </div>
    </div>
  )
}

export default App
