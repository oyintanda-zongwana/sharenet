import mysql from 'mysql2/promise';
import config from '../config';
import { Workshop } from '../models/Workshop';
import { SharenetService, Spot } from './SharenetService';

export class WorkshopService {
  private static instance: WorkshopService;
  private sharenetService: SharenetService;
  private pool: mysql.Pool;

  private constructor() {
    this.sharenetService = SharenetService.getInstance();
    this.pool = mysql.createPool(config.db);
    this.initializeDatabase();
  }

  private async initializeDatabase() {
    const connection = await this.pool.getConnection();
    try {
      await connection.query(`
        CREATE TABLE IF NOT EXISTS workshops (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          date DATETIME NOT NULL,
          venue VARCHAR(255) NOT NULL,
          availableSeats INT NOT NULL,
          spotCode VARCHAR(50) NOT NULL,
          spotName VARCHAR(255) NOT NULL,
          categoryName VARCHAR(100) NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
    } finally {
      connection.release();
    }
  }

  public static getInstance(): WorkshopService {
    if (!WorkshopService.instance) {
      WorkshopService.instance = new WorkshopService();
    }
    return WorkshopService.instance;
  }

  public async createWorkshopsFromSpots(): Promise<Workshop[]> {
    try {
      const spots = await this.sharenetService.getSpots();
      const workshops: Workshop[] = [];

      for (const spot of spots) {
        const workshop = await this.createWorkshopFromSpot(spot);
        workshops.push(workshop);
      }

      return workshops;
    } catch (error) {
      console.error('Error creating workshops from spots:', error);
      throw new Error('Failed to create workshops from spots');
    }
  }

  private async createWorkshopFromSpot(spot: Spot): Promise<Workshop> {
    const date = new Date(spot.datetime);
    date.setDate(date.getDate() + 1); // Workshop is scheduled for the next day

    const workshop: Workshop = {
      title: `${spot.fullName} Trading Workshop`,
      date,
      venue: 'Sharenet Training Room',
      availableSeats: Math.floor(Math.random() * 10) + 1, // Random seats between 1-10
      spotCode: spot.code,
      spotName: spot.fullName,
      categoryName: spot.categoryName
    };

    const [result] = await this.pool.execute(
      'INSERT INTO workshops (title, date, venue, availableSeats, spotCode, spotName, categoryName) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [workshop.title, workshop.date, workshop.venue, workshop.availableSeats, workshop.spotCode, workshop.spotName, workshop.categoryName]
    );

    const insertResult = result as mysql.InsertResult;
    return { ...workshop, id: insertResult.insertId };
  }

  public async getAllWorkshops(): Promise<Workshop[]> {
    try {
      const [rows] = await this.pool.query('SELECT * FROM workshops ORDER BY date ASC');
      return rows as Workshop[];
    } catch (error) {
      console.error('Error fetching workshops:', error);
      throw new Error('Failed to fetch workshops');
    }
  }

  public async bookWorkshop(workshopId: string): Promise<Workshop> {
    try {
      const [rows] = await this.pool.query('SELECT * FROM workshops WHERE id = ?', [workshopId]);
      const workshops = rows as Workshop[];

      if (workshops.length === 0) {
        throw new Error('Workshop not found');
      }

      const workshop = workshops[0];
      if (workshop.availableSeats <= 0) {
        throw new Error('No available seats');
      }

      await this.pool.execute(
        'UPDATE workshops SET availableSeats = availableSeats - 1 WHERE id = ?',
        [workshopId]
      );

      const [updatedRows] = await this.pool.query('SELECT * FROM workshops WHERE id = ?', [workshopId]);
      return (updatedRows as Workshop[])[0];
    } catch (error) {
      console.error('Error booking workshop:', error);
      throw new Error('Failed to book workshop');
    }
  }

  async findAll(): Promise<Workshop[]> {
    const [rows] = await this.pool.query('SELECT * FROM workshops');
    return rows as Workshop[];
  }

  async findById(id: number): Promise<Workshop | null> {
    const [rows] = await this.pool.query('SELECT * FROM workshops WHERE id = ?', [id]);
    const workshops = rows as Workshop[];
    return workshops[0] || null;
  }

  async create(workshop: Workshop): Promise<Workshop> {
    const [result] = await this.pool.query(
      'INSERT INTO workshops (title, date, venue, availableSeats, spotCode, spotName, categoryName) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [workshop.title, workshop.date, workshop.venue, workshop.availableSeats, workshop.spotCode, workshop.spotName, workshop.categoryName]
    );
    const insertId = (result as any).insertId;
    return this.findById(insertId) as Promise<Workshop>;
  }

  async update(id: number, workshop: Partial<Workshop>): Promise<Workshop | null> {
    const updates = Object.entries(workshop)
      .map(([key, value]) => `${key} = ?`)
      .join(', ');
    const values = [...Object.values(workshop), id];

    await this.pool.query(
      `UPDATE workshops SET ${updates} WHERE id = ?`,
      values
    );

    return this.findById(id);
  }

  async delete(id: number): Promise<Workshop | null> {
    const workshop = await this.findById(id);
    if (workshop) {
      await this.pool.query('DELETE FROM workshops WHERE id = ?', [id]);
    }
    return workshop;
  }
} 