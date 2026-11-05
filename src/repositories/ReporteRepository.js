const db = require('../core/database');

class ReporteRepository {
  static COLUMNAS = `id, codigo, id_usuario, autor, id_salon, tipo, descripcion, situacion,
    respuesta, respondido_por, fecha_respuesta, estado, creado, actualizado`;

  // El Docente solo ve y modifica sus propios reportes
  async obtenerTodos(usuario) {
    let sql = `SELECT ${ReporteRepository.COLUMNAS} FROM reporte_incomodidad WHERE estado = 1`;
    const params = [];
    if (usuario.rol === 'Docente') {
      sql += ' AND id_usuario = ?';
      params.push(usuario.id_usuario);
    }
    return db.query(`${sql} ORDER BY id DESC`, params);
  }

  async obtenerPorId(id, usuario) {
    let sql = `SELECT ${ReporteRepository.COLUMNAS} FROM reporte_incomodidad WHERE id = ? AND estado = 1`;
    const params = [id];
    if (usuario.rol === 'Docente') {
      sql += ' AND id_usuario = ?';
      params.push(usuario.id_usuario);
    }
    const filas = await db.query(sql, params);
    return filas[0] || null;
  }

  async crear(reporte, usuario) {
    const resultado = await db.query(
      `INSERT INTO reporte_incomodidad (id_usuario, autor, id_salon, tipo, descripcion)
       VALUES (?, ?, ?, ?, ?)`,
      [usuario.id_usuario, usuario.nombre || 'Sin nombre', reporte.id_salon, reporte.tipo, reporte.descripcion]
    );
    const id = resultado.insertId;
    // "actualizado = actualizado" evita que este UPDATE cambie la fecha de actualización
    await db.query(
      `UPDATE reporte_incomodidad
       SET codigo = CONCAT('REP-', LPAD(id, 5, '0')), actualizado = actualizado WHERE id = ?`,
      [id]
    );
    return id;
  }

  async actualizar(id, reporte, usuario) {
    let sql = `UPDATE reporte_incomodidad SET id_salon = ?, tipo = ?, descripcion = ?
               WHERE id = ? AND estado = 1`;
    const params = [reporte.id_salon, reporte.tipo, reporte.descripcion, id];
    if (usuario.rol === 'Docente') {
      sql += " AND id_usuario = ? AND situacion = 'Pendiente'";
      params.push(usuario.id_usuario);
    }
    const resultado = await db.query(sql, params);
    return resultado.affectedRows > 0;
  }

  async responder(id, respuesta, situacion, usuario) {
    const resultado = await db.query(
      `UPDATE reporte_incomodidad
       SET respuesta = ?, situacion = ?, respondido_por = ?, fecha_respuesta = NOW()
       WHERE id = ? AND estado = 1`,
      [respuesta, situacion, usuario.nombre || 'Sin nombre', id]
    );
    return resultado.affectedRows > 0;
  }

  async eliminar(id, usuario) {
    let sql = 'UPDATE reporte_incomodidad SET estado = 0 WHERE id = ? AND estado = 1';
    const params = [id];
    if (usuario.rol === 'Docente') {
      sql += ' AND id_usuario = ?';
      params.push(usuario.id_usuario);
    }
    const resultado = await db.query(sql, params);
    return resultado.affectedRows > 0;
  }
}

module.exports = ReporteRepository;