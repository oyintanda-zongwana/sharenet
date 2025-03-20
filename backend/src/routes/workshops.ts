import express from 'express';
import { WorkshopModel } from '../models/Workshop';

const router = express.Router();

// Get all workshops
router.get('/', async (req, res) => {
  try {
    const workshops = await WorkshopModel.findAll();
    res.json(workshops);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workshops' });
  }
});

// Get workshop by ID
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    const workshop = await WorkshopModel.findById(id);
    if (!workshop) {
      return res.status(404).json({ error: 'Workshop not found' });
    }
    res.json(workshop);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workshop' });
  }
});

// Create new workshop
router.post('/', async (req, res) => {
  try {
    const workshop = await WorkshopModel.create(req.body);
    res.status(201).json(workshop);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create workshop' });
  }
});

// Update workshop
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    const workshop = await WorkshopModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!workshop) {
      return res.status(404).json({ error: 'Workshop not found' });
    }
    res.json(workshop);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update workshop' });
  }
});

// Delete workshop
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    const workshop = await WorkshopModel.findByIdAndDelete(id);
    if (!workshop) {
      return res.status(404).json({ error: 'Workshop not found' });
    }
    res.json({ message: 'Workshop deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workshop' });
  }
});

export default router; 