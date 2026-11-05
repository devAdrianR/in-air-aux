const { Router } = require('express');
const seguridad = require('../core/seguridad');
const { manejar } = require('../core/utils');
const AccionVentilacion = require('../models/AccionVentilacion');
const AccionRepository = require('../repositories/AccionRepository');

class AccionController {
  constructor() {
    this.repo = new AccionRepository();
  }

  listar = manejar(async (req, res) => {
    res.json(await this.repo.obtenerTodos());
  });

  obtener = manejar(async (req, res) => {
    const accion = await this.repo.obtenerPorId(Number(req.params.id));
    if (!accion) return res.status(404).json({ detail: 'Acción no encontrada' });
    res.json(accion);
  });

  crear = manejar(async (req, res) => {
    const accion = new AccionVentilacion(req.body);
    const errores = accion.validar();
    if (errores.length) return res.status(422).json({ detail: errores });
    const id = await this.repo.crear(accion, req.usuario);
    res.status(201).json({ mensaje: 'Acción registrada exitosamente', id });
  });

  actualizar = manejar(async (req, res) => {
    const accion = new AccionVentilacion(req.body);
    const errores = accion.validar();
    if (errores.length) return res.status(422).json({ detail: errores });
    const exito = await this.repo.actualizar(Number(req.params.id), accion);
    if (!exito) return res.status(404).json({ detail: 'Acción no encontrada' });
    res.json({ mensaje: 'Acción actualizada correctamente' });
  });

  eliminar = manejar(async (req, res) => {
    const exito = await this.repo.eliminar(Number(req.params.id));
    if (!exito) return res.status(404).json({ detail: 'Acción no encontrada' });
    res.json({ mensaje: 'Acción eliminada correctamente' });
  });
}

const controlador = new AccionController();
const router = Router();
router.use(seguridad.verificarToken, seguridad.requiereRoles('Técnico', 'Administrador'));

router.get('/', controlador.listar);
router.get('/:id', controlador.obtener);
router.post('/', controlador.crear);
router.put('/:id', controlador.actualizar);
router.delete('/:id', controlador.eliminar);

module.exports = router;