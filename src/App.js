import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  // Store questions
  const questions = [
		{
			questionText: 'What is the capital of Germany?',
			answerOptions: [
				{ answerText: 'Frankfurt', isCorrect: false },
				{ answerText: 'Stuttgart', isCorrect: false },
				{ answerText: 'Paris', isCorrect: false },
				{ answerText: 'Berlin', isCorrect: true },
			],
		},
		{
			questionText: 'What is the capital of Pakistan?',
			answerOptions: [
				{ answerText: 'Islamabad', isCorrect: true },
				{ answerText: 'Karachi', isCorrect: false },
				{ answerText: 'Hyderabad', isCorrect: false },
				{ answerText: 'New Delhi', isCorrect: false },
			],
		},
		{
			questionText: 'What is the capital of Canada?',
			answerOptions: [
				{ answerText: 'Toronto', isCorrect: false },
				{ answerText: 'Ottawa', isCorrect: true },
				{ answerText: 'Vancouver', isCorrect: false },
				{ answerText: 'New York', isCorrect: false },
			],
		},
		{
			questionText: 'What is the capital of New Zealand?',
			answerOptions: [
				{ answerText: 'Auckland', isCorrect: false },
				{ answerText: 'Christchurch', isCorrect: false },
				{ answerText: 'Wellington', isCorrect: true },
				{ answerText: 'Sydney', isCorrect: false },
			],
		},
	];

  //Track current question
  const [currentQuestion, setCurrentQuestion] = useState(0);
  //Track score
  const [currentScore, setScore] = useState(0);
  //Track option  
  const [currentOption, setCurrentOption] = useState('');
  //Track Time
  const [seconds, setSeconds] = useState(20);

  //Track Answers
  const [answers, setAnswers] = useState(['N/A', 'N/A', 'N/A', 'N/A'])

  //Event handler for next question
  const handleSubmitClick = () => {
    if(currentOption && currentOption.isCorrect){
      setScore(currentScore+1);
      let answersCopy = [...answers];
      answersCopy[currentQuestion] = 'Right';
      setAnswers(answersCopy);
    }
    else if(currentOption){
      let answersCopy = [...answers];
      answersCopy[currentQuestion] = 'Wrong';
      setAnswers(answersCopy);
    }
    const nextQuestion = currentQuestion + 1;
    setCurrentQuestion(nextQuestion);
    setCurrentOption('');
    if(nextQuestion < questions.length){
      setSeconds(20);
      clearTimeout(q_timer);
    }
  }

  //Handle option change
  const handleOptionChange = (option) => {
    // console.log(option)
    // console.log(option.target.value);
    setCurrentOption(option);
  }

  //Handle skip 
  const handleSkip = () => {
    const nextQuestion = currentQuestion + 1;
    setCurrentQuestion(nextQuestion);
    setCurrentOption('');
    if(nextQuestion < questions.length){
      setSeconds(20);
      clearTimeout(q_timer);
    }
      
  }
  //Timer hook
  var q_timer;
  useEffect(() => {
    if (seconds >= 0) {
      q_timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      // console.log(seconds)
    } else {
      if(currentQuestion >= 4){
        clearTimeout(q_timer);
      }
      else{
        setSeconds(20);
        handleSubmitClick();
      }
      
    }
  });

  return (
    <>
      <div className='app'>
        {currentQuestion >= questions.length ? (
          <div className='score-section'>You scored {currentScore} out of {questions.length}</div>
        ) : (
          <>
            <div className='question-section'>
              <div className='question-count'>
                <span>Question {currentQuestion+1} </span>/{questions.length}
              </div>
              <div className='question-text'>{questions[currentQuestion].questionText}</div>
              <div className='timer-text'>Time Left: {seconds}</div>
            </div>

            <div className='answer-section'>

              {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                <div>
                  <input
                    type="radio"
                    name="answer-radio"
                    value={answerOption.answerText}
                    onChange ={() => handleOptionChange(answerOption)}
                    checked={currentOption.answerText == answerOption.answerText}
                  />
                  <label>{answerOption.answerText}</label>
                
          
                  
                </div>
              ))}
              <button onClick={handleSubmitClick} disabled={!currentOption}>Submit</button>
              <button onClick={handleSkip}>Skip</button>
            </div>


          </>
        )}
        
      </div>
      <div className="response-table">
        <table>
          <tr>
            <th>Q1</th>
            <th>Q2</th>
            <th>Q3</th>
            <th>Q4</th>
          </tr>
          <tr>
            <td>{answers[0]}</td>
            <td>{answers[1]}</td>
            <td>{answers[2]}</td>
            <td>{answers[3]}</td>
          </tr>
        </table>
      </div>
    </>
  );
}

export default App;
