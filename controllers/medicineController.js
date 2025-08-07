const db = require('../db');


const isAdmin = (req) => req.user.email === 'admin123@gmail.com';
// const isAdmin = (req) => req.user?.is_admin === true;



exports.addMedicine = async (req, res) => {
    if(!isAdmin(req))
        return res.status(403).json({ success: false, message: 'Access denied' });


        const { name, brand, price,stock_quantity } = req.body;

        if (!name || !brand || !price || !stock_quantity) {
            return res.status(400).json({ success: false, message: 'Name, description, and price are required' });
        }

        try {
            await db.query('INSERT INTO medicine (name, brand, price,stock_quantity) VALUES (?, ?, ?,?)', [name, brand, price,stock_quantity]);
            res.status(201).json({ success: true, message: 'Medicine added successfully' });
        }catch (error) {
            console.error('Error adding medicine:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
};




exports.getMedicines = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM medicine');
        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        console.error('Error fetching medicines:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


exports.updateMedicine = async (req, res) => {
    if(!isAdmin(req))
        return res.status(403).json({ success: false, message: 'Access denied' });

    const { id } = req.params;
    const { name, brand, price, stock_quantity } = req.body;

  try{
    await db.query('UPDATE medicine SET name = ?, brand = ?, price = ?, stock_quantity = ? WHERE id = ?', [name, brand, price, stock_quantity, id]);
    res.status(200).json({ success: true, message: 'Medicine updated successfully' });
  }catch (error) {
    console.error('Error updating medicine:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }  
};


exports.deleteMedicine = async (req, res) => {
    if(!isAdmin(req))
        return res.status(403).json({ success: false, message: 'Access denied' });

    const { id } = req.params;

    try {
        await db.query('DELETE FROM medicine WHERE id = ?', [id]);
        res.status(200).json({ success: true, message: 'Medicine deleted successfully' });
    } catch (error) {
        console.error('Error deleting medicine:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}