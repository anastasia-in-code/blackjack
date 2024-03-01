import axios, { AxiosResponse } from "axios";
import { ICard } from '@/models/card.interface';

const BASE_URL = "https://deckofcardsapi.com/api";

class CardsAPI {
  readonly BASE_URL: string;

  constructor(url: string) {
    this.BASE_URL = url;
  }

  async getNewDeck(): Promise<string> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.BASE_URL}/deck/new/shuffle/?deck_count=1`
      );
      return response.data.deck_id;
    } catch (error) {
      console.error("Error getting new deck:", error);
      throw error;
    }
  }

  async drawCards(deckId: string, count: number): Promise<ICard[]> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.BASE_URL}/deck/${deckId}/draw/?count=${count}`
      );
      return response.data.cards;
    } catch (error) {
      console.error("Error drawing cards:", error);
      throw error;
    }
  }

  async shuffleDeck(deckId: string): Promise<void> {
    try {
      await axios.get(`${this.BASE_URL}/deck/${deckId}/shuffle/`);
    } catch (error) {
      console.error("Error shuffling deck:", error);
      throw error;
    }
  }

  async addToPile(deckId: string, pileName: string, cards: ICard[]): Promise<void> {
    try {
      const cardCodes = cards.map((card) => card.code).join(",");
      await axios.get(
        `${this.BASE_URL}/deck/${deckId}/pile/${pileName}/add/?cards=${cardCodes}`
      );
    } catch (error) {
      console.error("Error adding cards to pile:", error);
      throw error;
    }
  }

  async getPile(deckId: string, pileName: string): Promise<ICard[]> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.BASE_URL}/deck/${deckId}/pile/${pileName}/list`
      );
      return Object.values(response.data.piles[pileName].cards);
    } catch (error) {
      console.error("Error getting pile:", error);
      throw error;
    }
  }
}

export default new CardsAPI(BASE_URL);
