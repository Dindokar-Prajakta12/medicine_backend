#  Medicine Order API – Node.js Practical Task
##  Features
### 1. User Module
- User Registration (name, email, password)
- User Login (email, password) → Returns JWT Token
- Passwords are securely hashed using `bcrypt`

### 2. Medicine Module
- **CRUD operations** on medicines
  - Fields: `name`, `brand`, `price`, `stock`
- Only admin users can create, update, or delete medicines (using `is_admin` flag)

### 3. Order Module
- Place order (medicine ID + quantity)
  - Checks for stock availability
  - Deducts stock on successful order
- View all orders by a user
- Each order contains:
  - `userId`, list of `medicines`, their `quantities`, `totalPrice`, `orderDate`

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **MySQL**
- **JWT** – Authentication
- **bcrypt** – Password Hashing
- **Postman** – (Optional: API testing)

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Dindokar-Prajakta12/medicine_backend.git
cd backend
npm install --install the dependencies

setup a database 
mysql -u root -p  < query.sql

nodemon server.js    --to run locally 
