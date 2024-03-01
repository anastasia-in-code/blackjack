"use client";
import React, { createContext, useContext, useReducer } from "react";
import { ICard } from "@/models/card.interface";

export interface ICardsState {
  deckId: string;
  houseScore: number;
  playerScore: number;
  houseCards: ICard[];
  playerCards: ICard[];
  gameStatus: GameStatusType;
}

export type GameStatusType = "in progress" | "victory" | "loss" | "not started";

export enum StateActions {
  SET_DECK_ID = "SET_DECK_ID",
  SET_HOUSE_SCORE = "SET_HOUSE_SCORE",
  SET_PLAYER_SCORE = "SET_PLAYER_SCORE",
  ADD_HOUSE_CARDS = "ADD_HOUSE_CARDS",
  ADD_PLAYER_CARDS = "ADD_PLAYER_CARDS",
  UPDATE_HOUSE_CARDS = "UPDATE_HOUSE_CARDS",
  UPDATE_PLAYER_CARDS = "UPDATE_PLAYER_CARDS",
  CHANGE_GAME_STATUS = "CHANGE_GAME_STATUS",
}

type ActionType =
  | { type: StateActions.SET_DECK_ID; payload: string }
  | { type: StateActions.SET_HOUSE_SCORE; payload: number }
  | { type: StateActions.SET_PLAYER_SCORE; payload: number }
  | { type: StateActions.ADD_HOUSE_CARDS; payload: ICard[] }
  | { type: StateActions.ADD_PLAYER_CARDS; payload: ICard[] }
  | { type: StateActions.UPDATE_HOUSE_CARDS; payload: ICard[] }
  | { type: StateActions.UPDATE_PLAYER_CARDS; payload: ICard[] }
  | { type: StateActions.CHANGE_GAME_STATUS; payload: GameStatusType };

const initialState: ICardsState = {
  deckId: "",
  houseScore: 0,
  playerScore: 0,
  houseCards: [],
  playerCards: [],
  gameStatus: "not started",
};

export const CardsContext = createContext<ICardsState | null>(null);
export const CardsDispatchContext =
  createContext<React.Dispatch<ActionType> | null>(null);

const appReducer = (state: ICardsState, action: ActionType): ICardsState => {
  switch (action.type) {
    case StateActions.SET_DECK_ID:
      return { ...state, deckId: action.payload };
    case StateActions.SET_HOUSE_SCORE:
      return { ...state, houseScore: action.payload };
    case StateActions.SET_PLAYER_SCORE:
      return { ...state, playerScore: action.payload };
    case StateActions.ADD_HOUSE_CARDS:
      return { ...state, houseCards: [...state.houseCards, ...action.payload] };
    case StateActions.ADD_PLAYER_CARDS:
      return {
        ...state,
        playerCards: [...state.playerCards, ...action.payload],
      };
    case StateActions.UPDATE_HOUSE_CARDS:
      return { ...state, houseCards: [...action.payload] };
    case StateActions.UPDATE_PLAYER_CARDS:
      return {
        ...state,
        playerCards: [...action.payload],
      };
    case StateActions.CHANGE_GAME_STATUS:
      return {
        ...state,
        gameStatus: action.payload,
      };
    default:
      throw new Error("Unhandled action type");
  }
};

type Props = {
  children?: React.ReactNode;
};

export const CardsProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <CardsContext.Provider value={state}>
      <CardsDispatchContext.Provider value={dispatch}>
        {children}
      </CardsDispatchContext.Provider>
    </CardsContext.Provider>
  );
};

export const useCardsState = (): ICardsState => {
  const context = useContext(CardsContext);
  if (!context) {
    throw new Error("useCardsState must be used within an CardsProvider");
  }
  return context;
};

export const useCardsDispatch = (): React.Dispatch<ActionType> => {
  const context = useContext(CardsDispatchContext);
  if (!context) {
    throw new Error("useCardsDispatch must be used within an CardsProvider");
  }
  return context;
};
