const { Router } = require('express');
const seguridad = require('../core/seguridad');
const { manejar } = require('../core/utils');
const ReporteIncomodidad = require('../models/ReporteIncomodidad');
const ReporteRepository = require('../repositories/ReporteRepository');

class ReporteController {
  constructor() {
    this.repo = new ReporteRepository();
  }

  listar = manejar(async (req, res) => {
    res.json(await this.repo.obtenerTodos(req.usuario));
  });

  obtener = manejar(async (req, res) => {
    const reporte = await this.repo.obtenerPorId(Number(req.params.id), req.usuario);
    if (!reporte) return res.status(404).json({ detail: 'Reporte no encontrado' });
    res.json(reporte);
  });

  crear = manejar(async (req, res) => {
    const reporte = new ReporteIncomodidad(req.body);
    const errores = reporte.validar();
    if (errores.length) return res.status(422).json({ detail: errores });
    const id = await this.repo.crear(reporte, req.usuario);
    res.status(201).json({ mensaje: 'Reporte registrado exitosamente', id });
  });

  actualizar = manejar(async (req, res) => {
    const reporte = new ReporteIncomodidad(req.body);
    const errores = reporte.validar();
    if (errores.length) return res.status(422).json({ detail: errores });
    const exito = await this.repo.actualizar(Number(req.params.id), reporte, req.usuario);
    if (!exito) return res.status(404).json({ detail: 'Reporte no encontrado o ya no se puede editar' });
    res.json({ mensaje: 'Reporte actualizado correctamente' });
  });

  responder = manejar(async (req, res) => {
    const respuesta = (req.body.respuesta || '').trim();
    const { situacion } = req.body;
    const errores = [];
    if (respuesta.length < 5) errores.push('La respuesta debe tener al menos 5 caracteres');
    if (!['En atención', 'Resuelto'].includes(situacion)) {
      errores.push('situacion debe ser "En atención" o "Resuelto"');
    }
    if (errores.length) return res.status(422).json({ detail: errores });
    const exito = await this.repo.responder(Number(req.params.id), respuesta, situacion, req.usuario);
    if (!exito) return res.status(404).json({ detail: 'Reporte no encontrado' });
    res.json({ mensaje: 'Reporte respondido correctamente' });
  });

  eliminar = manejar(async (req, res) => {
    const exito = await this.repo.eliminar(Number(req.params.id), req.usuario);
    if (!exito) return res.status(404).json({ detail: 'Reporte no encontrado' });
    res.json({ mensaje: 'Reporte eliminado correctamente' });
  });
}

const controlador = new ReporteController();
const router = Router();
router.use(seguridad.verificarToken);

router.get('/', controlador.listar);
router.get('/:id', controlador.obtener);
router.post('/', seguridad.requiereRoles('Docente', 'Administrador'), controlador.crear);
router.put('/:id/responder', seguridad.requiereRoles('Técnico', 'Administrador'), controlador.responder);
router.put('/:id', seguridad.requiereRoles('Docente', 'Administrador'), controlador.actualizar);
router.delete('/:id', seguridad.requiereRoles('Docente', 'Administrador'), controlador.eliminar);

module.exports = router;