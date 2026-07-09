import { useState, useEffect } from "react";
import { useParams } from "react-router";
import "../App.css";

function DetailView() {
    const { id } = useParams(); // hook to grab the ID from the URL
    const [monster, setMonster] = useState(null);

    useEffect(() => {
        const fetchMonster = async () => {
            try {
                const response = await fetch(`https://www.dnd5eapi.co/api/monsters/${id}`);
                const data = await response.json();
                setMonster(data);
            } catch (error) {
                console.error("Error fetching monster:", error);
            }
        };
        fetchMonster();
    }, [id]);

    return (
        <div className="App">
            {/* If monster exists, show the data. Otherwise, show a loading message */}
            {monster ? (
                 <div className="monster-card" style={{ width: '80%', maxWidth: '800px', margin: '40px auto', textAlign: 'left', padding: '40px' }}>
                    <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>{monster.name}</h1>
                    <div style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                        <p><strong>Type:</strong> {monster.type}</p>
                        <p><strong>Alignment:</strong> {monster.alignment}</p>
                        <p><strong>Languages:</strong> {monster.languages}</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '20px', textAlign: 'center' }}>
                            <p><strong>Armor Class</strong><br/>{monster.armor_class[0].value}</p>
                            <p><strong>Hit Points</strong><br/>{monster.hit_points}</p>
                        </div>
                        
                        <h2 style={{ marginTop: '40px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Core Stats</h2>
                        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px', textAlign: 'center' }}>
                            <p><strong>STR</strong><br/>{monster.strength}</p>
                            <p><strong>DEX</strong><br/>{monster.dexterity}</p>
                            <p><strong>CON</strong><br/>{monster.constitution}</p>
                            <p><strong>INT</strong><br/>{monster.intelligence}</p>
                            <p><strong>WIS</strong><br/>{monster.wisdom}</p>
                            <p><strong>CHA</strong><br/>{monster.charisma}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="loader-container">
                    <div className="loader"></div>
                    <p>Summoning monster details...</p>
                </div>
            )}
        </div>
    );
}

export default DetailView;