import congrats from "../assets/congrats.svg";

export default function Result({ points, handleClick }) {
  return (
    <div className="bg-darkBlue my-auto h-fit rounded-xl text-center text-white font-semibold">
      <img className="m-8" src={congrats} alt="congrats" />
      <p className="text-2xl my-4">
        Congrats! You completed
        <br />
        the quiz
      </p>
      <p>You answer {points}/10 correctly</p>
      <button
        onClick={handleClick}
        className="w-60 h-14 rounded-xl my-10 bg-gradient-to-r from-pink to-purple"
      >
        Play Again
      </button>
    </div>
  );
}
