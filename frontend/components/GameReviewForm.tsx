import { Game } from "@/app/models/Game";
import { useState } from "react";

export default function GameReviewForm() {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const movie = new Game(title, rating, message);
    handleTransactionSubmit(movie);
  };
  const handleTransactionSubmit = async (game: Game) => {
    console.log(JSON.stringify(game));
  };

return (
    <>
        <h2 className="text-2xl mt-4 ml-4 font-mono">Add a Review</h2>
        <div className="flex flex-col items-center justify-center mt-4">
            <form
                className="p-6 bg-black text-white rounded shadow-md w-4/5 md:max-w-2xl mx-auto border-2 border-purple-500"
                onSubmit={handleSubmit}
            >
                <div className="mb-4">
                    <label className="block" htmlFor="gameTitle">Game Title</label>
                    <input
                        className="mt-1 p-2 w-full border rounded-md text-black"
                        id="gameTitle"
                        type="text"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block" htmlFor="gameReview">Add your review</label>
                    <textarea
                        className="mt-1 p-2 w-full border rounded-md text-black"
                        id="gameReview"
                        required
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block" htmlFor="gameRating">Rating</label>
                    <input
                        className="mt-1 p-2 w-full border rounded-md text-black"
                        id="gameRating"
                        type="number"
                        min="1"
                        max="5"
                        required
                        onChange={(e) => setRating(Number(e.target.value))}
                    />
                </div>
                <button
                    className="w-full py-2 px-4 bg-purple-500 text-black rounded hover:bg-custom-teal"
                    type="submit"
                >
                    Submit Review
                </button>
            </form>
        </div>
    </>
);
}
