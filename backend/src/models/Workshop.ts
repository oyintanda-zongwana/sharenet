import mysql from 'mysql2/promise';
import config from '../config';

const pool = mysql.createPool(config.db);

export interface Workshop {
  id?: number;
  title: string;
  date: Date;
  venue: string;
  availableSeats: number;
  spotCode: string;
  spotName: string;
  categoryName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class WorkshopModel {
  static async findAll(): Promise<Workshop[]> {
    const [rows] = await pool.query('SELECT * FROM workshops');
    return rows as Workshop[];
  }

  static async findById(id: number): Promise<Workshop | null> {
    const [rows] = await pool.query('SELECT * FROM workshops WHERE id = ?', [id]);
    const workshops = rows as Workshop[];
    return workshops[0] || null;
  }

  static async create(workshop: Workshop): Promise<Workshop> {
    const [result] = await pool.query(
      'INSERT INTO workshops (title, date, venue, availableSeats, spotCode, spotName, categoryName) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [workshop.title, workshop.date, workshop.venue, workshop.availableSeats, workshop.spotCode, workshop.spotName, workshop.categoryName]
    );
    const insertId = (result as any).insertId;
    return this.findById(insertId) as Promise<Workshop>;
  }

  static async findByIdAndUpdate(id: number, workshop: Partial<Workshop>, options: { new: boolean }): Promise<Workshop | null> {
    const updates = Object.entries(workshop)
      .map(([key, value]) => `${key} = ?`)
      .join(', ');
    const values = [...Object.values(workshop), id];

    await pool.query(
      `UPDATE workshops SET ${updates} WHERE id = ?`,
      values
    );

    return options.new ? this.findById(id) : null;
  }

  static async findByIdAndDelete(id: number): Promise<Workshop | null> {
    const workshop = await this.findById(id);
    if (workshop) {
      await pool.query('DELETE FROM workshops WHERE id = ?', [id]);
    }
    return workshop;
  }
}

export const WorkshopSchema = `
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
`; 