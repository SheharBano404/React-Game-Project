import { createContext, useContext, useState } from "react";
import { pacmanStartPosition } from "../types/position";
import { GAME_STATUS } from "../types/gameStatus";
import { DIFFICULTY } from "../types/difficulty";

const contextDefaultValues = {
  foodAmount: 0,
  gameStatus: GAME_STATUS.PAUSED,
  pacmanPosition: { top: 0, left: 0 },
  points: 0,
  difficulty: DIFFICULTY.MEDIUM,
  setFoodAmount: () => {},
  setPacmanPosition: () => {},
  setPoints: () => {},
  setGameStatus: () => {},
  restartGame: () => {},
  setDifficulty: () => {},
};

const GameContext = createContext(contextDefaultValues);

export function useGameContext() {
  return useContext(GameContext);
}

export function GameProvider({ children }) {
  const [pacmanPosition, _setPacmanPosition] = useState(contextDefaultValues.pacmanPosition);
  const [points, _setPoints] = useState(contextDefaultValues.points);
  const [foodAmount, _setFoodAmount] = useState(contextDefaultValues.foodAmount);
  const [difficulty, _setDifficulty] = useState(contextDefaultValues.difficulty);
  const [gameStatus, _setGameStatus] = useState(contextDefaultValues.gameStatus);

  const setFoodAmount = (foodAmount) => _setFoodAmount(foodAmount);
  const setGameStatus = (gameStatus) => _setGameStatus(gameStatus);
  const setPacmanPosition = (pacmanPosition) => _setPacmanPosition(pacmanPosition);
  const setPoints = (points) => _setPoints(points);
  const setDifficulty = (difficulty) => _setDifficulty(difficulty);

  const restartGame = () => {
    _setPoints(0);
    _setGameStatus(GAME_STATUS.IN_PROGRESS);
    _setPacmanPosition(pacmanStartPosition);
    document.dispatchEvent(new Event("restart-game"));
  };

  const value = {
    foodAmount,
    gameStatus,
    pacmanPosition,
    points,
    difficulty,
    restartGame,
    setFoodAmount,
    setGameStatus,
    setPacmanPosition,
    setPoints,
    setDifficulty,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
