class Mantenimiento {
  static TIPOS = ['Calibración', 'Revisión', 'Limpieza', 'Reemplazo'];

  constructor(datos = {}) {
    this.id_dispositivo = datos.id_dispositivo;
    this.tipo = datos.tipo;
    this.descripcion = (datos.descripcion || '').trim();
    this.fecha_mantenimiento = datos.fecha_mantenimiento;
    this.proximo_mantenimiento = datos.proximo_mantenimiento || null;
  }

  validar() {
    const errores = [];
    const fecha = /^\d{4}-\d{2}-\d{2}$/;
    if (!Number.isInteger(this.id_dispositivo)) errores.push('id_dispositivo debe ser un número entero');
    if (!Mantenimiento.TIPOS.includes(this.tipo)) {
      errores.push(`tipo debe ser uno de: ${Mantenimiento.TIPOS.join(', ')}`);
    }
    if (this.descripcion.length < 10) errores.push('La descripción debe tener al menos 10 caracteres');
    if (!fecha.test(this.fecha_mantenimiento || '')) errores.push('fecha_mantenimiento debe tener formato AAAA-MM-DD');
    if (this.proximo_mantenimiento && !fecha.test(this.proximo_mantenimiento)) {
      errores.push('proximo_mantenimiento debe tener formato AAAA-MM-DD');
    }
    return errores;
  }
}

module.exports = Mantenimiento;