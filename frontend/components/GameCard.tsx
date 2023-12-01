import { Game } from '@/app/models/Game';

export interface GameCardProps {
    game: Game;
}

export default function GameCard({game}: GameCardProps){
    return (
        <div
            className="p-4 md:flex max-w-2xl border m-2"
        >
            <div
                className="w-full text-center md:text-left mt-4 md:mt-0 ml-6 md:ml-6 mr-6 md:mr-6"
            >
                <div className="flex justify-between items-center">
                    <p
                        className="font-bold uppercase text-lg tracking-wide text-gray-200"
                    >
                        {game.title}
                    </p>
                    <p
                        className="text-gray-200"
                    >
                        {game.rating}/5
                    </p>
                </div>
                <p className="my-2 text-gray-400">
                    {game.description}
                </p>
            </div>
        </div>
    )
}