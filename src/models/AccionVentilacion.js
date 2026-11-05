class AccionVentilacion {
  static TIPOS = [
    'Apertura de puertas y ventanas', 'Encendido de extractor', 'Ventilación cruzada',
    'Cambio de filtro', 'Reubicación temporal del grupo',
  ];

  constructor(datos = {}) {
    this.id_alerta = datos.id_alerta ?? null;
    this.id_reporte = datos.id_reporte ?? null;
    this.id_salon = datos.id_salon;
    this.tipo_accion = datos.tipo_accion;
    this.descripcion = (datos.descripcion || '').trim();
    this.resultado = datos.resultado || null;
  }

  validar() {
    const errores = [];
    if (!Number.isInteger(this.id_salon)) errores.push('id_salon debe ser un número entero');
    if (this.id_alerta === null && this.id_reporte === null) {
      errores.push('La acción debe estar asociada a una alerta o a un reporte');
    }
    if (!AccionVentilacion.TIPOS.includes(this.tipo_accion)) {
      errores.push(`tipo_accion debe ser uno de: ${AccionVentilacion.TIPOS.join(', ')}`);
    }
    if (this.descripcion.length < 10) errores.push('La descripción debe tener al menos 10 caracteres');
    return errores;
  }
}

module.exports = AccionVentilacion;