# 📊 Sales Tracker (Web POS)

A simple **Web-based Point of Sale (POS)** and **Sales Analytics** application built with **React** and **Vite**.  
This project allows users to record sales transactions, manage sales categories, and analyze sales performance using charts — all stored locally using **LocalStorage** (no backend).

---

## 👥 Team Members

- **Aung Myat Oo Gyaw**
- **Su Eain Dray Myint**
- **Mi Hsu Myat Win Myint**

--

## 🎯 Project Overview

This project was developed as part of a **University coursework assignment**.  
The goal is to build a **2-page React application** that includes:

- A **Sales Dashboard** for analytics and visualization
- A **Sales Journal** for recording and managing sales transactions
- LocalStorage for data persistence
- No backend services

---

## 🌟 Application Features

## 📄 Page 1: Dashboard

The **Dashboard** provides an overview of overall sales performance.

### Features:
- **Total Sales (All Time)**
- **Sales Summary by Period**
  - Daily
  - Weekly
  - Monthly
- **Sales Trend Line Chart**
  - Visualizes sales over time
- **Sales by Category (Pie Chart)**
  - Shows the proportion of sales per category
- **Top 5 Selling Products**
  - Based on total sales value

📸 Screenshots:

![Dashboard](Screenshots/Dashboard.png)

![Sales Charts](Screenshots/Sales%20Visualization.png)

---

## 📄 Page 2: Sales Journal

The **Sales Journal** is used to record and manage all sales transactions.

### Features:
- **Record New Sale**
  - Select product from predefined product list
  - Category is auto-filled from product
  - Quantity input
  - Date selection
  - Total price calculated automatically
- **Add New Sales Category**
  - Users can add custom categories
  - Duplicate categories are prevented with alert messages
- **Transaction Table**
  - Displays all sales records
  - Sortable columns (ascending / descending)
  - Delete individual transactions
- **LocalStorage Persistence**
  - Data remains after page refresh

📸 Screenshots:

![Sales Journal](Screenshots/Record%20New%20Sale.png)

![Transactions Table](Screenshots/All%20Transactions.png)

---

## 🛠️ Technology Stack

- **Frontend Framework:** React 19.2.0
- **Build Tool:** Vite 7.2.4
- **Routing:** React Router DOM 7.13.0
- **Charts:** Recharts 3.7.0
- **Language:** JavaScript (ES6+)
- **Storage:** Browser LocalStorage
- **Backend:** None

---

## 📋 Prerequisites

Before running the project, make sure you have:

- Node.js (version 14 or higher)
- npm or pnpm package manager

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Kizut0/Basic_POS_Project.git
cd Basic_POS_Project

