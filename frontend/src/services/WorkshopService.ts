import axios from 'axios';
import { Workshop } from '../types/Workshop';

const API_URL = 'https://sharenet-4tad.onrender.com/api';

export class WorkshopService {
  static async getAllWorkshops(): Promise<Workshop[]> {
    try {
      const response = await axios.get(`${API_URL}/workshops`);
      return response.data;
    } catch (error) {
      console.error('Error fetching workshops:', error);
      throw error;
    }
  }

  static async bookWorkshop(workshopId: string): Promise<Workshop> {
    try {
      const response = await axios.post(`${API_URL}/workshops/${workshopId}/book`);
      return response.data;
    } catch (error) {
      console.error('Error booking workshop:', error);
      throw error;
    }
  }
} 