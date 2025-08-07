const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const { addMedicine ,getMedicines, updateMedicine, deleteMedicine} = require('../controllers/medicineController');


router.post('/' ,authenticate , addMedicine);   
router.get('/' , getMedicines);
router.put('/:id', authenticate, updateMedicine); 
router.delete('/:id', authenticate, deleteMedicine);
module.exports = router;