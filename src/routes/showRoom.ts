import express from 'express';
import { createMovies, deleteMovies, getMovies, updateMovies } from '../controller/showRoom'; 
import { auth } from '../middlewares/auth'


const router = express.Router();

/* GET users listing. */
router.post('/create',auth, createMovies);
router.get('/get_movies', getMovies);
router.patch('/update_movies/:id', updateMovies);
router.delete('/delete_movies/:id', deleteMovies);

export default router;
