class ReporteIncomodidad {
  static TIPOS = ['Calor', 'Aire pesado', 'Olor', 'Humedad', 'Otro'];

  constructor(datos = {}) {
    this.id_salon = datos.id_salon;
    this.tipo = datos.tipo;
    this.descripcion = (datos.descripcion || '').trim();
  }

  validar() {
    const errores = [];
    if (!Number.isInteger(this.id_salon)) errores.push('id_salon debe ser un número entero');
    if (!ReporteIncomodidad.TIPOS.includes(this.tipo)) {
      errores.push(`tipo debe ser uno de: ${ReporteIncomodidad.TIPOS.join(', ')}`);
    }
    if (this.descripcion.length < 10) errores.push('La descripción debe tener al menos 10 caracteres');
    return errores;
  }
}

module.exports = ReporteIncomodidad;