# ✈️ Flight Booking System (Backend)

A backend for a Flight Booking System built with **Node.js, Express.js, and MySQL**.  
Supports **user registration & login**, **searching flights**, **booking seats**, and **cancelling bookings**, with safeguards to **prevent double-booking**.

---

## Install dependencies
```bash
git clone https://github.com/your-username/flight-booking-system.git
cd flight-booking-system
npm install

mysql -u root -p


DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=flight_booking
JWT_SECRET=your_jwt_secret
PORT=5000


POST /api/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
