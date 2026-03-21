import Admin from "../models/adminCollection.js";

const sessionVerify = async (req, res, next) => {
    
    try {
        if(!req.session || !req.session.adminId) {
            return res.status(401).json({ message: "Acceso denegado, inicia sesion" });
        }

        // Buscamos al usuario para estar seguros y tener su rol.
        const user = await Admin.findById(req.session.adminId);

        if(!user) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }

        // Guardamos al usuario en la peticion con todos sus datos para que el siguiente middleware lo use.
        req.user = user;
        next();
    
    } catch (error) {
        res.status(500).json({ message: "Error al verificar la session del usuario", error: error.message });
    }

};

export { sessionVerify };