import { useState, useEffect } from "react";
import { useParams } from "react-router";

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
        <div className="detail-view">
            {/* If monster exists, show the data. Otherwise, show a loading message */}
            {monster ? (
                 <div>
                    <h2>{monster.name}</h2>
                    <p><strong>Alignment:</strong> {monster.alignment}</p>
                    <p><strong>Languages:</strong> {monster.languages}</p>
                    
                    {/* Let's show the core stats! */}
                    <div className="stats-grid">
                        <p>STR: {monster.strength}</p>
                        <p>DEX: {monster.dexterity}</p>
                        <p>CON: {monster.constitution}</p>
                        <p>INT: {monster.intelligence}</p>
                        <p>WIS: {monster.wisdom}</p>
                        <p>CHA: {monster.charisma}</p>
                    </div>
                </div>
            ) : (
                <h2>Summoning monster details...</h2>
            )}
        </div>
    );
}

export default DetailView;