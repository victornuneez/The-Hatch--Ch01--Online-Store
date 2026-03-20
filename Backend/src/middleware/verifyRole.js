
const verifyRole = (req, res, next) => {

    if(req.user && req.user.role === 'admin') {
        return next();
    }

    res.status(403).json({ message: "No tenes permisos de administrador"});
};

export { verifyRole };