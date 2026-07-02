import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [monsters, setMonsters] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMonsters = async () => {
      try {
        // fetch all
        const response = await fetch('https://www.dnd5eapi.co/api/monsters');
        const data = await response.json();

        // shuffle then grab first 20
        const random20 = 
          data.results.sort(() => 0.5 - Math.random()).slice(0, 20);

        // fetch full first 20
        const fullMonsters = await Promise.all(random20.map(async (monster) => {
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
      <h1>D&D 5e Random Monsters Dashboard</h1>
      
      <div className="summary-stats">
        {
          <p>Monsters Loaded: {monsters.length}</p>
        }
      </div>

      <div className="search-and-filter">
        {
          <input 
            type="text" 
            placeholder="Search a monster! Is it in this random selection?" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        }
      </div>

      <div className="list-container">
        {
          monsters.length > 0 ? (
            monsters.filter((monster) =>
              monster.name.toLowerCase().includes(search.toLowerCase())
            ).map((monster) => (
              <div className="monster-card" key={monster.index}>
                <h2>{monster.name}</h2>
                <p><strong>Type:</strong> {monster.type}</p>
                <p><strong>AC:</strong> {monster.armor_class[0].value}</p>
                <p><strong>HP:</strong> {monster.hit_points}</p>
                <p><strong>Size:</strong> {monster.size}</p>
                <p><strong>Alignment:</strong> {monster.alignment}</p>
                <p><strong>Speed:</strong> {monster.speed.walk}</p> 
              </div>
            ))
          ) : (
            <p>Loading monsters...</p>
          )
        }
      </div>
    </div>
  )
}

export default App
