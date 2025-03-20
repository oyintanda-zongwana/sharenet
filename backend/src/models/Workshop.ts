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