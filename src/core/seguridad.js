require('dotenv').config();
const jwt = require('jsonwebtoken');

class Seguridad {
  constructor() {
    this.secreto = process.env.JWT_SECRET;
    this.algoritmo = process.env.JWT_ALGORITHM || 'HS256';
  }

  verificarToken = (req, res, next) => {
    const [tipo, token] = (req.headers.authorization || '').split(' ');
    if (tipo !== 'Bearer' || !token) {
      return res.status(401).json({ detail: 'Falta el token de autenticación' });
    }
    try {
      req.usuario = jwt.verify(token, this.secreto, { algorithms: [this.algoritmo] });
      next();
    } catch (error) {
      const detail = error.name === 'TokenExpiredError' ? 'El token expiró' : 'Token inválido';
      res.status(401).json({ detail });
    }
  };

  requiereRoles = (...roles) => (req, res, next) => {
    if (!roles.includes(req.usuario.rol)) {
      return res.status(403).json({ detail: 'No tienes permiso para esta acción' });
    }
    next();
  };
}

module.exports = new Seguridad();