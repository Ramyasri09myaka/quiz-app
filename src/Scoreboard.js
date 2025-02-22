import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Scoreboard.css"; // Ensure this file exists

const Scoreboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const score = location.state?.score || 0;
  const quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];

  return (
    <div className="scoreboard-container">
      <h1>🎉 Quiz Completed!</h1>
      <div className="score-box">
        <h2>Your Score: {score} / 5</h2>
        <button className="retry-button" onClick={() => navigate("/")}>🔄 Retry</button>
      </div>

      <h2>📜 Quiz History</h2>
      <ul className="history-list">
        {quizHistory.map((entry, index) => (
          <li key={index}>
            <span className="history-date">{entry.date}</span>
            <span className="history-score"> - Score: {entry.score} / 5</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scoreboard;

