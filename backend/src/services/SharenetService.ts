import axios from 'axios';
import { config } from '../config';

export interface Spot {
  code: string;
  fullName: string;
  categoryName: string;
  price: number;
  move: number;
  pmove: number;
  datetime: string;
}

export class SharenetService {
  private static instance: SharenetService;
  private readonly apiUrl: string;

  private constructor() {
    this.apiUrl = config.sharenetApiUrl;
  }

  public static getInstance(): SharenetService {
    if (!SharenetService.instance) {
      SharenetService.instance = new SharenetService();
    }
    return SharenetService.instance;
  }

  public async getSpots(): Promise<Spot[]> {
    try {
      const response = await axios.get(this.apiUrl);
      return response.data.spots;
    } catch (error) {
      console.error('Error fetching spots from Sharenet:', error);
      throw new Error('Failed to fetch spots from Sharenet API');
    }
  }
} 