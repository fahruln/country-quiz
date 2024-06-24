import { useState } from "react";
import checkRound from "../assets/Check_round_fill.svg";
import closeRound from "../assets/Close_round_fill.svg";

export default function AnswerOptions({ question, handleClick }) {
  return (
    <div className="w-fit grid grid-cols-2 justify-items-center gap-8 mt-14 text-white  *:w-60 *:h-14 *:rounded-xl *:font-semibold *:text-lg">
      {question.options.map((option, index) => (
        <button
          disabled={question.answer.length > 0 ? true : false}
          key={index}
          onClick={() => {
            handleClick(question.id, index);
          }}
          className={`${
            question.answer.length > 0 && question.answer === option.name.common
              ? "bg-gradient-to-r from-pink to-purple"
              : "bg-darkBlue"
          } hover:bg-gradient-to-r from-pink to-purple`}
        >
          <div className="flex justify-center space-x-4">
            <p>{option?.name.common}</p>
            {question.answer.length > 0 &&
            question.country.name.common === option.name.common ? (
              <img src={checkRound} alt="correct" />
            ) : question.answer.length > 0 &&
              question.answer === option.name.common ? (
              <img src={closeRound} alt="wrong" />
            ) : null}
          </div>
        </button>
      ))}
    </div>
  );
}
