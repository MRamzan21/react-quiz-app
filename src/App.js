import React, { useState } from "react";
import questions from "./data/questions.json";
import correctAudioFile from "./data/Correct.wav";
import wrongAudioFile from "./data/Wrong.wav";
import "./App.css";

function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [progress, setProgress] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const playCorrectSound = () => {
    const audio = new Audio(correctAudioFile);
    audio.play();
  };
  const playWrongSound = () => {
    const audio = new Audio(wrongAudioFile);
    audio.play();
  };
  const ClickedOption = (selectedOption) => {
    setSelectedOption(selectedOption);
    setProgress(((currentQuestion + 1) / questions.length) * 100);

    if (selectedOption === currentQuestionData.answer) {
      playCorrectSound();
    } else {
      playWrongSound();
    }
  };

  const goToNextQuestion = () => {
    if (selectedOption !== null) {
      if (selectedOption === questions[currentQuestion].answer) {
        setScore(score + 1);
      }

      const nextQuestion = currentQuestion + 1;

      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedOption(null);
      } else {
        setQuizCompleted(true);
      }
    }
  };

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="container">
      <h1 className="text-center mt-4">React Quiz App</h1>
      <div className="quiz-container text-center">
        {quizCompleted === false ? (
          <>
            <p className="question-count">
              Question {currentQuestion + 1} of {questions.length}
            </p>
            <div className="question">
              <h2>{currentQuestionData.statement}</h2>
            </div>
            
            <div className="answers">
              {currentQuestionData.options.map((option, index) => (
                <div className="answer-wrapper" key={index}>
                  <button
                    className={`btn btn-primary answer ${
                      selectedOption === option
                        ? selectedOption === currentQuestionData.answer
                          ? "correct-answer"
                          : "wrong-answer"
                        : ""
                    }`}
                    onClick={() => ClickedOption(option)}
                  >
                    {option}
                  </button>
                </div>
              ))}
            </div>

            <button
              className={`btn btn-primary next-btn ${
                selectedOption === null ? "disabled" : ""
              }`}
              onClick={goToNextQuestion}
              disabled={selectedOption === null}
            >
              Next
            </button>
            <div className="controls">
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${progress}%`,
                  }}
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  {progress}%
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <p>
              Your score is {score} out of {questions.length}
            </p>
            <button
              className="btn btn-primary try-again-btn"
              onClick={() => {
                setQuizCompleted(false);
                setCurrentQuestion(0);
                setScore(0);
                setSelectedOption(null);
                setProgress(0);
              }}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizApp;
