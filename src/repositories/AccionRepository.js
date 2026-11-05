const db = require('../core/database');

class AccionRepository {
  static COLUMNAS = `id, codigo, id_alerta, id_reporte, id_usuario, tecnico, id_salon,
    tipo_accion, descripcion, resultado, fecha_accion, estado, creado, actualizado`;

  async obtenerTodos() {
    return db.query(
      `SELECT ${AccionRepository.COLUMNAS} FROM accion_ventilacion WHERE estado = 1 ORDER BY id DESC`
    );
  }

  async obtenerPorId(id) {
    const filas = await db.query(
      `SELECT ${AccionRepository.COLUMNAS} FROM accion_ventilacion WHERE id = ? AND estado = 1`, [id]
    );
    return filas[0] || null;
  }

  async crear(accion, usuario) {
    const resultado = await db.query(
      `INSERT INTO accion_ventilacion
       (id_alerta, id_reporte, id_usuario, tecnico, id_salon, tipo_accion, descripcion, resultado)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [accion.id_alerta, accion.id_reporte, usuario.id_usuario, usuario.nombre || 'Sin nombre',
       accion.id_salon, accion.tipo_accion, accion.descripcion, accion.resultado]
    );
    const id = resultado.insertId;
    await db.query(
      `UPDATE accion_ventilacion
       SET codigo = CONCAT('ACC-', LPAD(id, 5, '0')), actualizado = actualizado WHERE id = ?`,
      [id]
    );
    // Si la acción atiende un reporte pendiente, el reporte pasa a "En atención"
    if (accion.id_reporte) {
      await db.query(
        `UPDATE reporte_incomodidad SET situacion = 'En atención'
         WHERE id = ? AND situacion = 'Pendiente' AND estado = 1`,
        [accion.id_reporte]
      );
    }
    return id;
  }

  async actualizar(id, accion) {
    const resultado = await db.query(
      `UPDATE accion_ventilacion
       SET id_alerta = ?, id_reporte = ?, id_salon = ?, tipo_accion = ?, descripcion = ?, resultado = ?
       WHERE id = ? AND estado = 1`,
      [accion.id_alerta, accion.id_reporte, accion.id_salon, accion.tipo_accion,
       accion.descripcion, accion.resultado, id]
    );
    return resultado.affectedRows > 0;
  }

  async eliminar(id) {
    const resultado = await db.query(
      'UPDATE accion_ventilacion SET estado = 0 WHERE id = ? AND estado = 1', [id]
    );
    return resultado.affectedRows > 0;
  }
}

module.exports = AccionRepository;