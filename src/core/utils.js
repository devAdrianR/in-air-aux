const manejar = (funcion) => async (req, res) => {
  try {
    await funcion(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ detail: 'Error interno del servidor' });
  }
};

module.exports = { manejar };