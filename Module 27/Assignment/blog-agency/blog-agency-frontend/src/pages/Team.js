import React, { useEffect, useState } from "react";
import "./Team.css"; // Assuming you have styles for the team page
import { fetchTeams } from "../API/api";

const Team = () => {
    const [teams, setTeams] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getTeams = async () => {
            try {
                const { data } = await fetchTeams(); // Fetch team data from API
                setTeams(data); // Set data to state
            } catch (err) {
                console.error("Failed to fetch team data:", err);
                setError("Failed to load team data. Please try again later.");
            }
        };

        getTeams();
    }, []);

    if (error) {
        return <div className="team-page-error">{error}</div>;
    }

    return (
        <div className="team-page">
            <h1 className="team-title">Meet My Team</h1>
            <div className="team-container">
                {teams.length > 0 ? (
                    teams.map((team) => (
                        <div className="team-member" key={team._id}>
                            <img
                                src={team.image || "/Profile-Male-PNG.png"}
                                alt={team.name}
                                className="team-photo"
                            />
                            <h3 className="team-name">{team.name}</h3>
                            <p className="team-role">{team.role}</p>
                            <p className="team-bio">{team.bio}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-team-message">No team members to display.</p>
                )}
            </div>
        </div>
    );
};

export default Team;
