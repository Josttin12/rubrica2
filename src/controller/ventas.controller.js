import { pool } from "../db.js";

export const getVentas = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM ventas');
    res.send(rows);
  } catch (error) {
    return res.status(500).json({ message: 'Ha ocurrido un error al obtener las ventas' });
  }
};

export const getVentaByCodigo = async (req, res) => {
  const codigov = req.params.codigov;
  try {
    const [rows] = await pool.query('SELECT * FROM ventas WHERE Codigov = ?', [codigov]);
    if (rows.length <= 0) return res.status(404).json({ message: 'Venta no registrada' });
    res.send(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Ha ocurrido un error' });
  }
};

export const createVenta = async (req, res) => {
  const { Codigo_producto, Nombre_cliente, Telefono_cliente, Fecha_venta, Cantidad_vendida, Total_venta } = req.body;

  try {
    const [rows] = await pool.query(
      'INSERT INTO ventas (Codigo_producto, Nombre_cliente, Telefono_cliente, Fecha_venta, Cantidad_vendida, Total_venta) VALUES (?, ?, ?, ?, ?, ?)',
      [Codigo_producto, Nombre_cliente, Telefono_cliente, Fecha_venta, Cantidad_vendida, Total_venta]
    );

    res.send({
      Codigov: rows.insertId,
      Codigo_producto,
      Nombre_cliente,
      Telefono_cliente,
      Fecha_venta,
      Cantidad_vendida,
      Total_venta,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ha ocurrido un error al crear la venta' });
  }
};

export const updateVenta = async (req, res) => {
  const { codigov } = req.params;
  const { Codigo_producto, Nombre_cliente, Telefono_cliente, Fecha_venta, Cantidad_vendida, Total_venta } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE ventas SET Codigo_producto=IFNULL(?,Codigo_producto), Nombre_cliente=IFNULL(?,Nombre_cliente), Telefono_cliente=IFNULL(?,Telefono_cliente), Fecha_venta=IFNULL(?,Fecha_venta), Cantidad_vendida=IFNULL(?,Cantidad_vendida), Total_venta=IFNULL(?,Total_venta) WHERE Codigov=?',
      [Codigo_producto, Nombre_cliente, Telefono_cliente, Fecha_venta, Cantidad_vendida, Total_venta, codigov]
    );

    if (result.changedRows <= 0) {
      return res.status(404).json({ message: 'Venta no registrada o sin cambios' });
    }

    res.json({
      Codigov: codigov,
      Codigo_producto,
      Nombre_cliente,
      Telefono_cliente,
      Fecha_venta,
      Cantidad_vendida,
      Total_venta,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ha ocurrido un error al actualizar la venta' });
  }
};

export const deleteVenta = async (req, res) => {
  const { codigov } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM ventas WHERE Codigov=?', [codigov]);
    if (result.affectedRows <= 0)
      return res.status(404).json({ message: 'Venta no registrada' });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: 'Ha ocurrido un error al eliminar la venta' });
  }
};
