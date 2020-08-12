import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Game() {
  const { vocab } = useSelector(state => state.vocabReducer);
  const [ar, setAr] = useState([]);
  const [show, setShow] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setAr(vocab);
  }, [vocab]);

  const play = () => {
    if (ar.length > 0) {
      game();
    } else {
      setScore(0);
      setAr(vocab);
    }
  };

  const game = () => {
    if (ar.length > 0) {
      const randomQuestionIndex = Math.floor(Math.random() * ar.length);
      const question = ar[randomQuestionIndex];

      const filterExceptQuestion = vocab.filter(
        item => item.word !== question.word
      );
      const randomAnswerIndex = Math.floor(
        Math.random() * filterExceptQuestion.length
      );
      const answer = filterExceptQuestion[randomAnswerIndex];

      const newAr = ar.filter(item => item.word !== question.word);
      setAr(newAr);

      let choice = [question.trans];
      const random = Math.floor(Math.random() * 2);
      random === 0 ? choice.unshift(answer.trans) : choice.push(answer.trans);
      setShow({ question, choice });
    } else {
      setShow(false);
    }
  };

  const checkAnswer = answer => {
    if (answer === show.question.trans) {
      alert("Correct. You get one point.");
      setScore(score + 1);
    } else {
      alert("Wrong. Do not give up.");
    }
    game();
  };

  return (
    <div
      className="has-background-info"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      {vocab.length > 2 ? (
        <>
          <div>
            <h1
              className="title is-1 has-text-white"
              style={{ marginBottom: 50 }}
            >
              Score : {score}
            </h1>
          </div>
          {show ? (
            <>
              <div
                style={{
                  width: 400,
                  height: 200,
                  backgroundColor: "white",
                  borderRadius: 18,
                  paddingTop: 60,
                  margin: 10,
                  textAlign: "center"
                }}
              >
                <h1 className="title is-2">{show.question.word}</h1>
                <small
                  style={{ cursor: "pointer" }}
                  onClick={() => alert(show.question.hint)}
                >
                  Hint
                </small>
              </div>
              <div
                className="hvr-buzz-out"
                style={{
                  width: 400,
                  height: 50,
                  backgroundColor: "white",
                  borderRadius: 18,
                  padding: 15,
                  margin: 5,
                  textAlign: "center",
                  cursor: "pointer"
                }}
                onClick={() => checkAnswer(show.choice[0])}
              >
                <p>{show.choice[0]}</p>
              </div>
              <div
                className="hvr-buzz-out"
                style={{
                  width: 400,
                  height: 50,
                  backgroundColor: "white",
                  borderRadius: 18,
                  padding: 15,
                  margin: 5,
                  textAlign: "center",
                  cursor: "pointer"
                }}
                onClick={() => checkAnswer(show.choice[1])}
              >
                <p>{show.choice[1]}</p>
              </div>
            </>
          ) : (
            <button className="button is-warning" onClick={play}>
              {ar.length > 0 ? "Start" : "Play again."}
            </button>
          )}
        </>
      ) : (
        <h1 className="title has-text-white">You don't have enough vocab.</h1>
      )}
    </div>
  );
}
