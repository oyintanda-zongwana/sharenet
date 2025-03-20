import { Request, Response } from 'express';
import { WorkshopService } from '../services/WorkshopService';

export class WorkshopController {
  private static instance: WorkshopController;
  private workshopService: WorkshopService;

  private constructor() {
    this.workshopService = WorkshopService.getInstance();
  }

  public static getInstance(): WorkshopController {
    if (!WorkshopController.instance) {
      WorkshopController.instance = new WorkshopController();
    }
    return WorkshopController.instance;
  }

  public async getAllWorkshops(req: Request, res: Response): Promise<void> {
    try {
      const workshops = await this.workshopService.getAllWorkshops();
      res.json(workshops);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch workshops' });
    }
  }

  public async createWorkshopsFromSpots(req: Request, res: Response): Promise<void> {
    try {
      const workshops = await this.workshopService.createWorkshopsFromSpots();
      res.json(workshops);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create workshops from spots' });
    }
  }

  public async bookWorkshop(req: Request, res: Response): Promise<void> {
    try {
      const { workshopId } = req.params;
      const workshop = await this.workshopService.bookWorkshop(workshopId);
      res.json(workshop);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Workshop not found') {
          res.status(404).json({ error: 'Workshop not found' });
        } else if (error.message === 'No available seats') {
          res.status(400).json({ error: 'No available seats' });
        } else {
          res.status(500).json({ error: 'Failed to book workshop' });
        }
      } else {
        res.status(500).json({ error: 'An unexpected error occurred' });
      }
    }
  }
} 