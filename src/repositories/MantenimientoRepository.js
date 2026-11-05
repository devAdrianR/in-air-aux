const db = require('../core/database');

class MantenimientoRepository {
  static COLUMNAS = `id, codigo, id_usuario, tecnico, id_dispositivo, tipo, descripcion,
    fecha_mantenimiento, proximo_mantenimiento, estado, creado, actualizado`;

  async obtenerTodos() {
    return db.query(
      `SELECT ${MantenimientoRepository.COLUMNAS} FROM mantenimiento WHERE estado = 1 ORDER BY id DESC`
    );
  }

  async obtenerPorId(id) {
    const filas = await db.query(
      `SELECT ${MantenimientoRepository.COLUMNAS} FROM mantenimiento WHERE id = ? AND estado = 1`, [id]
    );
    return filas[0] || null;
  }

  async crear(m, usuario) {
    const resultado = await db.query(
      `INSERT INTO mantenimiento
       (id_usuario, tecnico, id_dispositivo, tipo, descripcion, fecha_mantenimiento, proximo_mantenimiento)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [usuario.id_usuario, usuario.nombre || 'Sin nombre', m.id_dispositivo, m.tipo,
       m.descripcion, m.fecha_mantenimiento, m.proximo_mantenimiento]
    );
    const id = resultado.insertId;
    await db.query(
      `UPDATE mantenimiento
       SET codigo = CONCAT('MAN-', LPAD(id, 5, '0')), actualizado = actualizado WHERE id = ?`,
      [id]
    );
    return id;
  }

  async actualizar(id, m) {
    const resultado = await db.query(
      `UPDATE mantenimiento
       SET id_dispositivo = ?, tipo = ?, descripcion = ?, fecha_mantenimiento = ?, proximo_mantenimiento = ?
       WHERE id = ? AND estado = 1`,
      [m.id_dispositivo, m.tipo, m.descripcion, m.fecha_mantenimiento, m.proximo_mantenimiento, id]
    );
    return resultado.affectedRows > 0;
  }

  async eliminar(id) {
    const resultado = await db.query(
      'UPDATE mantenimiento SET estado = 0 WHERE id = ? AND estado = 1', [id]
    );
    return resultado.affectedRows > 0;
  }
}

module.exports = MantenimientoRepository;