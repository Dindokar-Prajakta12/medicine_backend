const db = require('../db');
const becrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const { name,email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    try {
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await becrypt.hash(password, 10);

        await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {   

        console.error('Error registering user:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
}
}
module.exports = {registerUser};