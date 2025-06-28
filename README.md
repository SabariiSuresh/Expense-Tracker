# 💰 Personal Expense Tracker

A full-featured Personal Expense Tracker web application built using the **MEAN stack** (MongoDB, Express.js, Angular, and Node.js). Track daily expenses, visualize spending patterns, and manage your profile with authentication and secure access.


## 🧠 Features

### ✅ Authentication
- Register/Login with JWT
- Auto logout after inactivity
- Route protection using AuthGuard

### ✅ Dashboard
- First & last expense date
- Total number of expenses
- Total amount spent
- Bar and pie charts for visual summary

### ✅ Expense Management
- Add, edit, delete individual expenses
- View all expenses in a responsive table
- Filter by date and category

### ✅ Profile
- View and update user profile
- Profile popup dialog with edit functionality

### ✅ CSV Import
- Upload `.csv` files to bulk import expenses

### ✅ Responsive Design
- Fully responsive UI using Angular Material
- Clean and modern dashboard layout

---

## 🛠️ Tech Stack

| Layer        | Tech                                |
|--------------|-------------------------------------|
| Frontend     | Angular, Angular Material, Charts.js |
| Backend      | Node.js, Express.js                 |
| Database     | MongoDB (Native Driver)             |
| Auth         | JWT (JSON Web Token)                |
| Deployment   | Render (backend), Vercel (frontend) |

---

## 📂 Folder Structure

```
expense-tracker/
├── backend/                 # Node.js + Express + MongoDB (Native)
│   ├── routes/
|   |── security/
│   ├── controllers/
│   ├── db/
│   └── index.js
├── frontend/                # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── guards/
│   │   │   └── app.module.ts
│   └── angular.json
├── README.md
```

---

## 📦 Getting Started

### 🔧 Prerequisites
- Node.js
- Angular CLI
- MongoDB Atlas (or local MongoDB)

---

### ▶️ Run Backend

```bash
cd backend
npm install
node index.js
```

### ▶️ Run Frontend

```bash
cd frontend
npm install
ng serve
```

Visit: [http://localhost:4200](http://localhost:4200)

---

## 🛡️ Environment Variables

Create `.env` in `backend/` folder with the following:

```env
PORT=3000
MONGODB_URI=your_mongo_connection_strin
JWT_SECRET=your_secret_key
```

---

## 📈 Charts

- Bar Chart: Monthly spending trends
- Pie Chart: Category-wise distribution

---


---

## 🙋‍♂️ Author

Built with  by **[Sabari Suresh]**  
🔗 [GitHub](https://github.com/sabari-suresh1)
