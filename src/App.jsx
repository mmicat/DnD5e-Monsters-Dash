import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis
} from 'recharts';

import { useState, useEffect } from 'react'
import { Link } from "react-router";
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

    // data for size bar chart
    const sizeCounts = monsters.reduce((acc, monster) => {
        acc[monster.size] = (acc[monster.size] || 0) + 1;
        return acc;
    }, {});
    // convert into the array format Recharts wants: [{ name: 'Medium', count: 12 }, ...]
    const sizeChartData = Object.keys(sizeCounts).map(size => ({
        name: size,
        count: sizeCounts[size]
    }));

    // data for HP vs AC Scatter Chart
    // just map over the monsters to grab exactly what we need
    const hpAcData = monsters.map(m => ({
        name: m.name,
        hp: m.hit_points,
        ac: m.armor_class[0].value
    }));

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

      <div className="charts-container" style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
  
        {/* Chart 1: Size Distribution */}
        <div className="chart-card" style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
          <h3>Monster Size Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sizeChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#6a8a6b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2: HP vs AC */}
        <div className="chart-card" style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
          <h3>HP vs. Armor Class</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="ac" name="Armor Class" label={{ value: 'Armor Class', position: 'insideBottom', offset: -5 }} />
              <YAxis type="number" dataKey="hp" name="Hit Points" label={{ value: 'Hit Points', angle: -90, position: 'insideLeft' }} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              {/* We pass our data directly to the Scatter component here */}
              <Scatter name="Monsters" data={hpAcData} fill="#4b664d" />
            </ScatterChart>
          </ResponsiveContainer>
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
              <Link to={`/item/${monster.index}`} key={monster.index}>
                <div className="monster-card">
                  <h2>{monster.name}</h2>
                  <p><strong>Type:</strong> {monster.type}</p>
                  <p><strong>AC:</strong> {monster.armor_class[0].value}</p>
                  <p><strong>HP:</strong> {monster.hit_points}</p>
                  <p><strong>Size:</strong> {monster.size}</p>
                  <p><strong>Alignment:</strong> {monster.alignment}</p>
                  <p><strong>Speed:</strong> {monster.speed.walk}</p> 
                </div>
              </Link>
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
