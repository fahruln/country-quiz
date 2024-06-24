import { useEffect, useState } from "react";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import axios from "axios";

function App() {
  const [countries, SetCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [points, setPoints] = useState(0);

  const handleAnswer = (id, index) => {
    const answeredQuestion = questions.map((quest) => {
      if (quest.id === id) {
        if (quest.country.name.common === quest.options[index].name.common) {
          setPoints(points + 1);
        }
        return {
          ...quest,
          answer: quest.options[index].name.common,
        };
      } else {
        return quest;
      }
    });
    setQuestions(answeredQuestion);
    if (answeredQuestion.every((question) => question.answer !== ""))
      setAnswered(true);
  };

  const playAgain = () => {
    setAnswered(false);
  };

  useEffect(() => {
    axios
      .get(
        "https://restcountries.com/v3.1/all?fields=name,flags,capital,population"
      )
      .then((response) => {
        const data = response.data;
        SetCountries(data.filter((country) => country.population > 5000000));
      });
  }, []);

  useEffect(() => {
    if (!answered) {
      const generatedQuestions = [];

      const pickRandomCountry = () => {
        const randomCountry =
          countries.length > 0
            ? countries[Math.floor(Math.random() * countries.length)]
            : null;
        if (randomCountry) {
          return randomCountry;
        }
      };

      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };

      const generateOptions = (country) => {
        const options = [];
        options.push(country);
        while (options.length < 4) {
          const opt = pickRandomCountry();
          if (options.every((item) => item?.name.common !== opt?.name.common))
            options.push(pickRandomCountry());
        }
        return shuffleArray(options);
      };

      for (let index = 1; index <= 10; index++) {
        const randomCountry = pickRandomCountry();
        generatedQuestions.push({
          id: index,
          country: randomCountry,
          options: generateOptions(randomCountry),
          questionType: Math.floor(Math.random() * (1 - 0 + 1) - 0),
          answer: "",
        });
      }
      setQuestions(generatedQuestions);
      setLoading(false);
    }
  }, [countries, answered]);

  return (
    <div className="flex justify-center content-center bg-[url('./assets/bg.jpg')] w-screen h-screen bg-cover">
      {loading ? (
        <p className="text-white text-xl my-auto">Loading...</p>
      ) : answered ? (
        <Result points={points} handleClick={playAgain} />
      ) : (
        <Quiz question={questions} handleAnswer={handleAnswer} />
      )}
    </div>
  );
}

export default App;
