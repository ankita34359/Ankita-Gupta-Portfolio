# 🚀 Full-Stack Personal Portfolio & CMS Dashboard

A professional, high-performance **MERN Stack** web application designed to showcase projects through a dynamic portfolio powered by a **custom-built Content Management System (CMS)**.
The platform allows real-time updates, secure authentication, scalable media handling, and automated communication workflows.

---

## 📌 Features

### 🔐 Dynamic Content Management

* Secure **Admin Dashboard** with **JWT-based authentication**
* Perform real-time **CRUD operations** on:

  * Projects
  * Certificates
  * Resume
* No manual code changes required for updates.

### ☁️ Scalable Media Integration

* Integrated **Cloudinary API** + **Multer** for efficient file uploads.
* Optimized storage and delivery of:

  * High-resolution images
  * Resume PDFs
* Ensures **fast loading, high availability, and scalability**.

### 📩 Automated Communication Pipeline

* Lead capture system with modern UI using **Tailwind CSS + Framer Motion**.
* Backend powered by **Nodemailer / Resend API** for:

  * Instant email notifications
  * Inquiry management
  * Seamless communication workflow.

---

## 🛠️ Tech Stack

### Frontend

* **React 19**
* **Vite**
* **Tailwind CSS**
* **Framer Motion**
* **Lucide Icons**

### Backend

* **Node.js**
* **Express.js**
* **JWT Authentication**
* **Bcrypt.js**

### Database & Storage

* **MongoDB (Mongoose)**
* **Cloudinary**

### Communication

* **Nodemailer**
* **Resend API**

---

## 📂 Project Structure

```
portfolio-cms/
│
├── client/                 # React Frontend
│   ├── components/
│   ├── pages/
│   └── services/
│
├── server/                 # Node + Express Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
│
├── uploads/                # Temp storage (Multer)
└── README.md
```

---

## 🔐 Admin Access

Admin authentication is secured using **JWT tokens** and encrypted passwords via **Bcrypt.js**.

You can:

* Add / Edit / Delete Projects
* Upload Certificates
* Upload Resume
* Handle Contact Requests

---

## 📈 Key Highlights

✔ Real-time portfolio updates without redeployment

✔ Production-ready authentication & API architecture

✔ Optimized media delivery using Cloudinary CDN

✔ Clean, responsive UI with modern animations

✔ Scalable structure suitable for freelancers, developers, or agencies

---

## 🚀 Future Improvements

* Role-based access control (RBAC)
* Analytics dashboard for visitor insights
* Blog module with Markdown editor
* Docker-based deployment

---

## 👨‍💻 Author

**Ankita Gupta**

Full Stack Developer | Cloud & AI Enthusiast
