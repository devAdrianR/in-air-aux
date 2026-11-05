require('dotenv').config();
const express = require('express');
const cors = require('cors');

class Servidor {
  constructor() {
    this.app = express();
    this.puerto = process.env.PORT || 3000;
    this.configurar();
    this.rutas();
  }

  configurar() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  rutas() {
    this.app.get('/', (req, res) => {
      res.json({ mensaje: 'La API auxiliar se encuentra en línea y funcional' });
    });
    this.app.use('/reportes', require('./src/routes/reportes.routes'));
    this.app.use('/acciones', require('./src/routes/acciones.routes'));
    this.app.use('/mantenimientos', require('./src/routes/mantenimientos.routes'));
  }

  iniciar() {
    this.app.listen(this.puerto, () => console.log(`API auxiliar en el puerto ${this.puerto}`));
  }
}

new Servidor().iniciar();