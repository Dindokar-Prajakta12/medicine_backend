const db = require('../db');

exports.placeOrder = async (req, res) => {
    const userId = req.user.id;
    const {items} = req.body;
    
    if(!Array.isArray(items) || items.length === 0) {

 return res.status(400).json({ success: false, message: 'Items are required' });
    }
        try {
            let totalPrice = 0;
            const stockCheckPromises = items.map(item => 
                db.query('select * from medicine where id = ?', [item.medicine_id])
            );
            const stockResults = await Promise.all(stockCheckPromises);

            for (let i = 0; i < items.length; i++) {
                const medicine = stockResults[i][0][0];
                const orderQty = items[i].quantity;
                if (!medicine) {
                    return res.status(400).json({ success: false, message: 'medicine id ${items[i].medicine_id} not found' });
                }

                if (medicine.stock_quantity < orderQty) {
                    return res.status(400).json({ success: false, message: 'Insufficient stock for ' + medicine.name });
                }

                totalPrice += medicine.price * orderQty;

            }

            const [orderResult] = await db.query('INSERT INTO orders (user_id, total_price) VALUES (?, ?)', [userId, totalPrice]);
            const orderId = orderResult.insertId;


            const itemInsertPromises = items.map( async item => {
                const medicineRow = stockResults.find(r => r[0][0].id === item.medicine_id)[0][0];
                await db.query('INSERT INTO order_items (order_id, medicine_id, quantity, price) VALUES (?, ?, ?, ?)', 
                    [orderId, item.medicine_id, item.quantity, medicineRow.price]
                );

                await db.query('UPDATE medicine SET stock_quantity = stock_quantity - ? WHERE id = ?', 
                    [item.quantity, item.medicine_id]
                );
            }
            );

            await Promise.all(itemInsertPromises);
            res.status(201).json({ success: true, message: 'Order placed successfully', order_id : orderId });

        } catch (error) {
            console.error('Error placing order:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        };


    };



    //get all orders with user details

    exports.getUserOrders = async (req, res) => {
        const userId = req.user.id;

        try {
            const [orders] = await db.query('select * from orders where user_id = ?', [userId]);

            const detailOrders = await Promise.all(orders.map(async order => {
                const [items] = await db.query('select oi.medicine_id, m.name, m.brand , oi.quantity, oi.price from order_items oi join medicine m on oi.medicine_id = m.id where oi.order_id = ?', [order.id]);
                return {
                    ...order,
                    items
                };
            })
            );
            res.status(200).json({ success: true, data: detailOrders })
        } catch (error) {
            console.error('Error fetching user orders:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }