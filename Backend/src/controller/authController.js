import Admin from '../models/adminCollection.js';
import bcrypt from 'bcrypt';
import { ADMIN_CODE, SALT } from '../config.js';


const register = async (req, res) => {
    try {
        const { username, email, password, code } = req.body;

        // Por defecto el role es user
        let role = 'user';
        // Buscamos en base de datos si ya existe un usuario con el rol del admin
        const adminExist = await Admin.findOne({ role : 'admin' });
        // Primero verificamos que code exista luego lo comparamos.
        if (code && code === ADMIN_CODE) {
            // Evitamos que se pueda registrar mas de un admin.
            if (adminExist) {
                return res.status(403).json({ message: "Ya existe un admin" })
            }

            role = 'admin'
        }

        const passwordHashed = await bcrypt.hash(password, Number(SALT));
        const newAdmin = new Admin({ username, email, password : passwordHashed, role });

        const savedAdmin = await newAdmin.save();
        res.status(201).json({ message: "Te registraste correctamente", admin: savedAdmin });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al registrar", error: error.message });
    }
}; 


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Admin.findOne({ email : email })

        if(!user) {
            return res.render('admin/login',{ error: "Usuario no encontrado"});
        }

        const matchPassword = await bcrypt.compare(password, user.password);

        if(!matchPassword) {
            return res.render('admin/login', { error: "Datos invalidos"});
        }

        // Guardamos el ID y el ROLE en la sesion, una vez que se logueo el usuario
        req.session.adminId = user._id;
        req.session.role = user.role;

        // Si inicio correctamente la sesion lo enviamos a ver los pedidos
        res.redirect('/api/orders');
        
    } catch (error) {
        res.status(500).render('admin/login', { error: error.message });
    }
};


const logout = (req, res) => {
    try{
        req.session.destroy((error) => {
            
            if (error) {
                return res.status(500).send("Error al cerrar sesion");
            }

            res.clearCookie('connect.sid');
            res.redirect('/auth/login');
        })

        
    } catch (error) {
        res.status(500).json({ message: "Error al cerrar la sesion", error: error.message });
    }
};

export { register, login, logout }