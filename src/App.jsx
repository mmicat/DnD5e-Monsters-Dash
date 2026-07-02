import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [monsters, setMonsters] = useState([]);
  const [search, setSearch] = useState("");
  const [filterSize, setFilterSize] = useState("All");
  const [minHp, setMinHp] = useState("");
  const [maxHp, setMaxHp] = useState("");

  useEffect(() => {
    const fetchMonsters = async () => {
      try {
        // fetch all
        const response = await fetch('https://www.dnd5eapi.co/api/monsters');
        const data = await response.json();

        // shuffle then grab first 20
        const random20 = 
          data.results.sort(() => 0.5 - Math.random()).slice(0, 80);

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

  const averageHp = monsters.length > 0 
    ? Math.round(monsters.reduce((total, monster) => total + monster.hit_points, 0) / monsters.length) 
    : 0;
  const highestAc = monsters.length > 0 
    ? Math.max(...monsters.map(monster => monster.armor_class[0].value)) 
    : 0;

  return (
    <div className="App">
      <h1>D&D 5e Random Monsters Dashboard</h1>
      
      <div className="summary-stats">
        <div className="stat-card">
          <h3>Total Monsters</h3>
          <p>{monsters.length}</p>
        </div>
        <div className="stat-card">
          <h3>Average HP</h3>
          <p>{averageHp}</p>
        </div>
        <div className="stat-card">
          <h3>Highest AC</h3>
          <p>{highestAc}</p>
        </div>
      </div>


      <div className="search-and-filter">
        {
          <>
          <input 
            type="text" 
            placeholder="Search a monster! Is it in this random selection?" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={filterSize} onChange={(e) => setFilterSize(e.target.value)}>
            <option value="All">All Sizes</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="Huge">Huge</option>
            <option value="Gargantuan">Gargantuan</option>
          </select>
          <input 
            type="number" 
            placeholder="Min HP" 
            value={minHp}
            onChange={(e) => setMinHp(e.target.value)}
          />
          <input 
            type="number" 
            placeholder="Max HP" 
            value={maxHp}
            onChange={(e) => setMaxHp(e.target.value)}
          />
          </>
        }
      </div>

      <div className="list-container">
        {
          monsters.length > 0 ? (
            monsters.filter((monster) =>
              {
                const matchesSearch =                 
                monster.name.toLowerCase().includes(search.toLowerCase())

                const matchesSize =
                filterSize === 'All' || monster.size === filterSize;
                
                const matchesMinHp = monster.hit_points >= Number(minHp);

                const matchesMaxHp = maxHp === "" || monster.hit_points <= Number(maxHp);
              
                return matchesSearch && matchesSize && matchesMinHp && matchesMaxHp;
              }
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
            <div className="loader-container">
              <div className="loader"></div>
              <p>Summoning monsters...</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default App
