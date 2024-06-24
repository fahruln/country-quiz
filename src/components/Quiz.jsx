import { useState } from "react";
import AnswerOptions from "../components/AnswerOptions.jsx";

export default function Quiz({ question, handleAnswer }) {
  const [number, setNumber] = useState(1);
  return (
    <div className="w-2/3 h-2/3 bg-blue my-auto rounded-xl p-14 text-center">
      <p className="text-grey font-bold">Country Quiz</p>
      <div className="flex justify-center space-x-4 mt-6 mb-10">
        {question.map((quest) => (
          <button
            onClick={(e) => {
              e.preventDefault();
              setNumber(quest.id);
            }}
            key={quest.id}
            className={`flex justify-center items-center rounded-full w-12 h-12 text-white text-lg font-semibold ${
              quest.id === number || quest.answer.length > 0
                ? "bg-gradient-to-r from-pink to-purple"
                : "bg-darkBlue"
            }`}
          >
            {quest.id}
          </button>
        ))}
      </div>
      <div className=" text-white text-2xl font-semibold">
        {question[number - 1].questionType === 0 ? (
          <p>
            Which country is {question[number - 1]?.country?.capital} the <br />
            capital?
          </p>
        ) : (
          <div>
            <p className="flex justify-center">
              Which country does this flag{" "}
              <img
                className="w-12 h-8 rounded-sm mx-3 object-cover"
                src={question[number - 1]?.country?.flags.svg}
                alt="flag"
              />
              belong
            </p>
            <p>to?</p>
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <AnswerOptions
          question={question[number - 1]}
          handleClick={handleAnswer}
        />
      </div>
    </div>
  );
}
