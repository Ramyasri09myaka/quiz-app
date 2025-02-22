import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Quiz.css"; // Make sure this file exists

const quizData = [
  { question: "Which planet is closest to the Sun?", options: ["Venus", "Mercury", "Earth", "Mars"], answer: "Mercury" },
  { question: "Which data structure follows FIFO?", options: ["Stack", "Queue", "Tree", "Graph"], answer: "Queue" },
  { question: "Which is used for structuring web pages?", options: ["Python", "Java", "HTML", "C++"], answer: "HTML" },
  { question: "What is the chemical symbol for Gold?", options: ["Au", "Gd", "Ag", "Pt"], answer: "Au" },
  { question: "Which process is not used in petroleum refining?", options: ["Fractional distillation", "Cracking", "Polymerization", "Filtration"], answer: "Filtration" }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft <= 0) {
      setFeedback("Time's up!");
      setTimeout(() => nextQuestion(), 1000);
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const checkAnswer = (selected) => {
    const correct = quizData[currentQuestion].answer;
    if (selected === correct) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Wrong! Correct answer: ${correct}`);
    }
    setTimeout(() => nextQuestion(), 1000);
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setFeedback("");
      setTimeLeft(30);
    } else {
      saveHistory();
      navigate("/scoreboard", { state: { score } });
    }
  };

  const saveHistory = () => {
    let history = JSON.parse(localStorage.getItem("quizHistory")) || [];
    history.push({ score, date: new Date().toLocaleString() });
    localStorage.setItem("quizHistory", JSON.stringify(history));
  };

  return (
    <div className="quiz-container">
      <h1>Interactive Quiz</h1>
      <div className="question-box">
        <h3>{quizData[currentQuestion].question}</h3>
      </div>
      <div className="options-container">
        {quizData[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            className="option-button"
            onClick={() => checkAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <p className="timer">⏳ Time Left: {timeLeft}s</p>
      <p className="feedback">{feedback}</p>
    </div>
  );
};

export default Quiz;

