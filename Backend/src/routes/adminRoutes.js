import { Router } from 'express';
import { register, login, logout } from '../controller/authController.js';

const router = Router();

// Esta es la que te falta para que funcione la URL en el navegador
router.get('/login', (req, res) => {
    res.render('admin/login'); // Esto dibuja tu archivo views/admin/login.pug
});

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout); 

export default router; 