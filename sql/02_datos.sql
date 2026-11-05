INSERT INTO reporte_incomodidad
(codigo, id_usuario, autor, id_salon, tipo, descripcion, situacion, respuesta, respondido_por, fecha_respuesta) VALUES
('REP-00001', 8, 'Sandra Milena Herrera Vega', 1, 'Aire pesado', 'Al terminar la segunda hora el salón se siente cargado y varios estudiantes manifiestan somnolencia.', 'Resuelto', 'Se abrió ventilación cruzada y se verificó que el nivel de eCO2 volvió al rango normal.', 'Julián Camilo Ortega Salas', '2026-11-02 09:40:00'),
('REP-00002', 9, 'Jorge Luis Vargas Peña', 3, 'Calor', 'La temperatura del aula supera los 29 grados desde las 10 de la mañana y los estudiantes pierden concentración.', 'Resuelto', 'Se encendió el extractor y se reubicó el ventilador del fondo del salón.', 'Marcela Torres Gómez', '2026-11-02 11:05:00'),
('REP-00003', 10, 'Paola Andrea Castro Silva', 5, 'Olor', 'Se percibe un olor fuerte a químicos proveniente del laboratorio contiguo durante las prácticas.', 'Resuelto', 'Se revisó el extractor del laboratorio y se ajustó el horario de las prácticas.', 'Andrés Felipe Cabarcas Lara', '2026-11-02 14:20:00'),
('REP-00004', 11, 'Ricardo Salcedo Núñez', 7, 'Aire pesado', 'Con el grupo completo el aire se siente pesado y las ventanas no abren del todo.', 'En atención', 'Un técnico revisará el salón en la próxima jornada.', 'Daniela Barrios Ruiz', '2026-11-03 08:15:00'),
('REP-00005', 12, 'Natalia Fontalvo Arias', 9, 'Humedad', 'Se nota humedad en las paredes y el ambiente se siente muy húmedo por las tardes.', 'Pendiente', NULL, NULL, NULL),
('REP-00006', 13, 'Héctor Manuel Polo Cardona', 12, 'Calor', 'La sala de estudio se calienta mucho después del mediodía y el aire acondicionado no alcanza.', 'Pendiente', NULL, NULL, NULL),
('REP-00007', 14, 'Mónica Patricia Ruiz Escobar', 14, 'Aire pesado', 'En la sala de cómputo el aire se siente cargado cuando están todos los equipos encendidos.', 'Pendiente', NULL, NULL, NULL),
('REP-00008', 15, 'Luis Fernando Charris Mora', 16, 'Olor', 'Persiste un olor a solvente después de las prácticas del laboratorio de química.', 'Pendiente', NULL, NULL, NULL),
('REP-00009', 16, 'Adriana Lucía Beltrán Ríos', 18, 'Calor', 'Durante los eventos en el auditorio la temperatura sube y la ventilación es insuficiente.', 'Pendiente', NULL, NULL, NULL),
('REP-00010', 17, 'Óscar David Montoya Paz', 20, 'Aire pesado', 'En reuniones largas el aire de la sala se siente viciado y causa dolor de cabeza.', 'Pendiente', NULL, NULL, NULL);

INSERT INTO accion_ventilacion
(codigo, id_alerta, id_reporte, id_usuario, tecnico, id_salon, tipo_accion, descripcion, resultado, fecha_accion) VALUES
('ACC-00001', 1, NULL, 3, 'Julián Camilo Ortega Salas', 2, 'Apertura de puertas y ventanas', 'Se abrieron puertas y ventanas durante 15 minutos tras la alerta de eCO2 en precaución.', 'Nivel de eCO2 normalizado', '2026-11-02 07:40:00'),
('ACC-00002', 2, NULL, 4, 'Marcela Torres Gómez', 3, 'Encendido de extractor', 'Se encendió el extractor del aula por la alerta crítica de eCO2.', 'Normalizado en 20 minutos', '2026-11-02 07:45:00'),
('ACC-00003', 3, NULL, 5, 'Andrés Felipe Cabarcas Lara', 5, 'Ventilación cruzada', 'Se abrieron puertas y ventanas opuestas por alerta crítica de eCO2.', 'Nivel bajó a rango de precaución', '2026-11-02 08:00:00'),
('ACC-00004', 4, NULL, 6, 'Daniela Barrios Ruiz', 7, 'Apertura de puertas y ventanas', 'Se ventiló el salón antes de la siguiente clase.', 'Nivel de eCO2 normalizado', '2026-11-02 08:10:00'),
('ACC-00005', 5, NULL, 7, 'Santiago Pacheco Mejía', 9, 'Encendido de extractor', 'Se activó el extractor y se redujo el aforo del salón.', 'Normalizado en 30 minutos', '2026-11-02 08:30:00'),
('ACC-00006', 6, NULL, 3, 'Julián Camilo Ortega Salas', 2, 'Ventilación cruzada', 'Se ventiló el salón por alerta de TVOC en precaución.', 'TVOC dentro del rango normal', '2026-11-02 09:00:00'),
('ACC-00007', 8, NULL, 5, 'Andrés Felipe Cabarcas Lara', 5, 'Cambio de filtro', 'Se cambió el filtro del extractor por alerta de TVOC en precaución.', 'TVOC dentro del rango normal', '2026-11-02 09:30:00'),
('ACC-00008', NULL, 1, 3, 'Julián Camilo Ortega Salas', 1, 'Ventilación cruzada', 'Atención del reporte REP-00001: se ventiló el salón y se revisó la rejilla de aire.', 'Reporte resuelto', '2026-11-02 09:30:00'),
('ACC-00009', NULL, 2, 4, 'Marcela Torres Gómez', 3, 'Encendido de extractor', 'Atención del reporte REP-00002: se encendió el extractor y se reubicó el ventilador.', 'Reporte resuelto', '2026-11-02 10:50:00'),
('ACC-00010', NULL, 3, 5, 'Andrés Felipe Cabarcas Lara', 5, 'Cambio de filtro', 'Atención del reporte REP-00003: se revisó el extractor del laboratorio contiguo.', 'Reporte resuelto', '2026-11-02 14:00:00');

INSERT INTO mantenimiento
(codigo, id_usuario, tecnico, id_dispositivo, tipo, descripcion, fecha_mantenimiento, proximo_mantenimiento) VALUES
('MAN-00001', 3, 'Julián Camilo Ortega Salas', 1, 'Calibración', 'Calibración del sensor ENS160 con aire limpio de referencia.', '2026-10-20', '2027-01-20'),
('MAN-00002', 4, 'Marcela Torres Gómez', 2, 'Revisión', 'Revisión de conexiones del AHT21 y de la alimentación de la ESP32.', '2026-10-21', '2027-01-21'),
('MAN-00003', 5, 'Andrés Felipe Cabarcas Lara', 3, 'Limpieza', 'Limpieza del módulo BMP280 y de la carcasa del dispositivo.', '2026-10-22', '2027-01-22'),
('MAN-00004', 6, 'Daniela Barrios Ruiz', 4, 'Calibración', 'Calibración del sensor ENS160 tras variaciones en las lecturas de eCO2.', '2026-10-23', '2027-01-23'),
('MAN-00005', 7, 'Santiago Pacheco Mejía', 5, 'Revisión', 'Revisión general del dispositivo y verificación del envío de datos.', '2026-10-26', '2027-01-26'),
('MAN-00006', 3, 'Julián Camilo Ortega Salas', 6, 'Reemplazo', 'Reemplazo del módulo AHT21 por lecturas de humedad inconsistentes.', '2026-10-27', NULL),
('MAN-00007', 4, 'Marcela Torres Gómez', 7, 'Calibración', 'Calibración del sensor ENS160 con aire limpio de referencia.', '2026-10-28', '2027-01-28'),
('MAN-00008', 5, 'Andrés Felipe Cabarcas Lara', 8, 'Revisión', 'Revisión de conexiones del AHT21 y de la fuente de alimentación.', '2026-10-29', '2027-01-29'),
('MAN-00009', 6, 'Daniela Barrios Ruiz', 9, 'Limpieza', 'Limpieza del módulo BMP280 y de la carcasa del dispositivo.', '2026-10-30', '2027-01-30'),
('MAN-00010', 7, 'Santiago Pacheco Mejía', 10, 'Calibración', 'Calibración del sensor ENS160 y verificación del BMP280.', '2026-10-30', '2027-01-30');