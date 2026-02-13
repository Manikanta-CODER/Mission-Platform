# **Mission Platform – Full Stack Case Study**

A minimal full-stack web application simulating a **high-altitude payload mission platform** with role-based data visibility.

The system demonstrates how **public users** and **paid customers** access different telemetry views while sharing the same backend.

## **🚀 Core Concept**

Two user categories are supported:

### **Public / Unpaid Users**

* No authentication required
* View limited mission telemetry
* Safe, non-sensitive data only

### **Paid Customers (Authenticated)**

* Secure login via JWT
* Access detailed telemetry & payload metrics
* View historical mission data

---

## **🧩 Features**

### **Public Dashboard**

* Live altitude
* Latitude / Longitude
* Mission status
* Auto-updates every 2 seconds

---

### **Customer Dashboard (Protected)**

* Full telemetry stream
* Velocity, temperature, pressure
* Payload sensor metrics
* Historical telemetry table
* Live updates

---

### **Authentication**

* JWT-based login
* Route protection
* Token persistence (localStorage)

---

### **Telemetry Simulation**

* Backend updates every 2 seconds
* Realistic sensor fluctuations
* In-memory data model

---

## **🏗 Architecture Overview**

```
React Frontend  →  Express API Server  →  Mock Telemetry Engine
```

## **🛠 Tech Stack**

**Frontend**

* React
* React Router
* CSS

**Backend**

* Node.js
* Express
* JWT Authentication

**Data**

* In-memory mock telemetry

---

## **🔐 Security Model**

* Public endpoints expose limited fields only
* Protected endpoints require valid JWT
* Sensitive telemetry never sent to public routes

---

## **📡 API Endpoints**

### **Public**

`GET /api/public/mission`

Returns limited telemetry:

* altitude
* latitude
* longitude
* status

---

### **Authentication**

`POST /api/login`

**Demo Credentials**

```
username: customer
password: password
```

## **⚙ Running the Project**

### **Backend**

```bash
cd server
npm install
npm start
```

Runs on:

```
http://localhost:5000
```

---

### **Frontend**

```bash
cd client
npm install
npm start
```

Runs on:

```
http://localhost:3000
```

---

## **🎯 Engineering Focus**

This project prioritizes:

* Clear role separation
* Secure data exposure strategy
* Demonstrable full-stack architecture
* Clean component structure

---

## **📌 Possible Enhancements**

* Persistent database (MySQL / MongoDB)
* WebSocket telemetry streaming
* User management & password hashing
* Data visualization charts
* Admin control panel

---

---
