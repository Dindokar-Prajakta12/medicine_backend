const db = require('../db');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    try {
        const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (user.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user[0].id ,email:user[0].email, is_admin: user[0].is_admin } ,process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ success: true, message:'login successfully', token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
module.exports = { loginUser };