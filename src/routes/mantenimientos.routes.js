const { Router } = require('express');
const seguridad = require('../core/seguridad');
const { manejar } = require('../core/utils');
const Mantenimiento = require('../models/Mantenimiento');
const MantenimientoRepository = require('../repositories/MantenimientoRepository');

class MantenimientoController {
  constructor() {
    this.repo = new MantenimientoRepository();
  }

  listar = manejar(async (req, res) => {
    res.json(await this.repo.obtenerTodos());
  });

  obtener = manejar(async (req, res) => {
    const m = await this.repo.obtenerPorId(Number(req.params.id));
    if (!m) return res.status(404).json({ detail: 'Mantenimiento no encontrado' });
    res.json(m);
  });

  crear = manejar(async (req, res) => {
    const m = new Mantenimiento(req.body);
    const errores = m.validar();
    if (errores.length) return res.status(422).json({ detail: errores });
    const id = await this.repo.crear(m, req.usuario);
    res.status(201).json({ mensaje: 'Mantenimiento registrado exitosamente', id });
  });

  actualizar = manejar(async (req, res) => {
    const m = new Mantenimiento(req.body);
    const errores = m.validar();
    if (errores.length) return res.status(422).json({ detail: errores });
    const exito = await this.repo.actualizar(Number(req.params.id), m);
    if (!exito) return res.status(404).json({ detail: 'Mantenimiento no encontrado' });
    res.json({ mensaje: 'Mantenimiento actualizado correctamente' });
  });

  eliminar = manejar(async (req, res) => {
    const exito = await this.repo.eliminar(Number(req.params.id));
    if (!exito) return res.status(404).json({ detail: 'Mantenimiento no encontrado' });
    res.json({ mensaje: 'Mantenimiento eliminado correctamente' });
  });
}

const controlador = new MantenimientoController();
const router = Router();
router.use(seguridad.verificarToken, seguridad.requiereRoles('Técnico', 'Administrador'));

router.get('/', controlador.listar);
router.get('/:id', controlador.obtener);
router.post('/', controlador.crear);
router.put('/:id', controlador.actualizar);
router.delete('/:id', controlador.eliminar);

module.exports = router;