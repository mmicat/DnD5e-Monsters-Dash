import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis
} from 'recharts';

import { useState, useEffect } from 'react'
import { Link } from "react-router";
import './App.css'

function App() {

  const [monsters, setMonsters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [numMonsters, setNumMonsters] = useState(80);
  const [sliderValue, setSliderValue] = useState(80);
  const [showCharts, setShowCharts] = useState(true);
  const [search, setSearch] = useState("");
  const [filterSize, setFilterSize] = useState("All");
  const [minHp, setMinHp] = useState("");
  const [maxHp, setMaxHp] = useState("");

  useEffect(() => {
    const fetchMonsters = async () => {
      setIsLoading(true);
      try {
        // fetch all
        const response = await fetch('https://www.dnd5eapi.co/api/monsters');
        const data = await response.json();

        // Fisher-Yates shuffle then grab selected number
        const shuffled = [...data.results];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        const randomSelection = shuffled.slice(0, numMonsters);

        // fetch full selected monsters
        const fullMonsters = await Promise.all(randomSelection.map(async (monster) => {
          const fullData = await fetch(`https://www.dnd5eapi.co${monster.url}`);
          return await fullData.json();
        }));

        // save full monsters to state
        setMonsters(fullMonsters);
      } catch (error) {
        console.error("Error fetching monsters:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMonsters();
  }, [numMonsters]); // re-run when numMonsters changes

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

  const filteredMonsters = monsters.filter((monster) => {
    const matchesSearch = monster.name.toLowerCase().includes(search.toLowerCase());
    const matchesSize = filterSize === 'All' || monster.size === filterSize;
    const matchesMinHp = minHp === "" || monster.hit_points >= Number(minHp);
    const matchesMaxHp = maxHp === "" || monster.hit_points <= Number(maxHp);
    return matchesSearch && matchesSize && matchesMinHp && matchesMaxHp;
  });

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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label style={{ fontSize: '14px', marginBottom: '5px' }}>Summoning {sliderValue} monsters</label>
        <input 
          type="range" 
          min="1" 
          max="100" 
          value={sliderValue}
          onChange={(e) => setSliderValue(e.target.value)}
          onMouseUp={(e) => setNumMonsters(e.target.value)}
          onTouchEnd={(e) => setNumMonsters(e.target.value)}
          style={{ width: '150px' }}
        />
      </div>

      <div className="dashboard-insights" style={{ textAlign: 'center', marginBottom: '30px', padding: '0 20px' }}>
        <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--text-light)', marginBottom: '20px', maxWidth: '800px', margin: '0 auto 20px auto', lineHeight: '1.5' }}>
          💡 <strong>Did you know?</strong> While you might expect Gargantuan monsters to automatically have the highest Armor Class, dexterity plays a huge role in D&D! However, Hit Points scale drastically with size. Adjust the slider above to summon a larger sample size and watch how the size distribution and HP vs AC plots evolve!
        </p>
        <button 
          onClick={() => setShowCharts(!showCharts)}
          style={{ padding: '10px 20px', fontSize: '1rem', backgroundColor: 'var(--accent-dark)', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontFamily: 'inherit', transition: 'opacity 0.2s' }}
          onMouseOver={(e) => e.target.style.opacity = 0.8}
          onMouseOut={(e) => e.target.style.opacity = 1}
        >
          {showCharts ? 'Hide Data Visualizations 📉' : 'Show Data Visualizations 📈'}
        </button>
      </div>

      {showCharts && (
        <div className="charts-container" style={{ display: 'flex', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' }}>
    
          {/* Chart 1: Size Distribution */}
          <div className="chart-card" style={{ flex: 1, minWidth: '300px', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
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
          <div className="chart-card" style={{ flex: 1, minWidth: '300px', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
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
      )}


      <div className="search-and-filter">
        {
          <>
          <input 
            type="text" 
            placeholder="Search a monster!" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={filterSize} onChange={(e) => setFilterSize(e.target.value)}>
            <option value="All">All Sizes</option>
            <option value="Tiny">Tiny</option>
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
        {isLoading ? (
          <div className="loader-container">
            <div className="loader"></div>
            <p>Summoning monsters...</p>
          </div>
        ) : filteredMonsters.length > 0 ? (
          filteredMonsters.map((monster) => (
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
          <div className="no-results" style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '20px' }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-light)' }}>No monsters matched your search criteria. Try adjusting your filters!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
