import { pool } from "../db.js";

export const getProductos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM productos');
    res.send(rows);
  } catch (error) {
    return res.status(500).json({ message: 'Ha ocurrido un error' });
  }
};

export const getProductoByCodigo = async (req, res) => {
  const codigop = req.params.codigop;
  try {
    const [rows] = await pool.query('SELECT * FROM productos WHERE codigop = ?', [codigop]);
    if (rows.length <= 0) return res.status(404).json({ message: 'Producto no registrado' });
    res.send(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Ha ocurrido un error' });
  }
};

export const createProducto = async (req, res) => {
    console.log(req.body);
    const { nombrep, descripcionp, preciop, cantidad_en_stock } = req.body;
    
    try {
        const [rows] = await pool.query(
            'INSERT INTO productos (nombrep, descripcionp, preciop, cantidad_en_stock) VALUES (?, ?, ?, ?)',
            [nombrep, descripcionp, preciop, cantidad_en_stock]
        );
        
        console.log(rows);
        
        res.send({
            codigop: rows.insertId,
            nombrep,
            descripcionp,
            preciop,
            cantidad_en_stock,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Ha ocurrido un error al intentar crear el producto' });
    }
};


export const updateProducto = async (req, res) => {
    const { codigop } = req.params;
    const { nombrep, descripcionp, preciop, cantidad_en_stock } = req.body;
  
    try {
      const [result] = await pool.query(
        'UPDATE productos SET nombrep=IFNULL(?,nombrep), descripcionp=IFNULL(?,descripcionp), preciop=IFNULL(?,preciop), cantidad_en_stock=IFNULL(?,cantidad_en_stock) WHERE codigop=?',
        [nombrep, descripcionp, preciop, cantidad_en_stock, codigop]
      );
  
      if (result.changedRows <= 0) {
        return res.status(404).json({ message: 'Producto no registrado o sin cambios' });
      }
  
      res.json({
        codigop,
        nombrep,
        descripcionp,
        preciop,
        cantidad_en_stock,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Ha ocurrido un error al actualizar el producto' });
    }
  };
  

export const deleteProducto = async (req, res) => {
  const { codigop } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM productos WHERE codigop=?', [codigop]);
    if (result.affectedRows <= 0)
      return res.status(404).json({ message: 'Producto no registrado' });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: 'Ha ocurrido un error' });
  }
};
