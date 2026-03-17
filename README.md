# Movie_Ticket_Booking_System

This repository contains two applications:

| App | Description |
|-----|-------------|
| 🎬 **CineBook** | Python CLI — select a movie, pick seats, get a printed receipt |
| 🍽️ **FoodieExpress** | Browser website — browse a menu, add items to a cart, and place an order |

---

## 🚀 How to Run

> **Requirement:** Python 3.8 or newer

### Option A — Use the launcher (recommended)

```bash
# Start the FoodieExpress food ordering website (opens in your browser automatically)
python run.py

# Run the CineBook movie ticket booking CLI
python run.py cinema
```

### Option B — Run each app directly

**FoodieExpress food ordering website**

```bash
cd food_ordering
python -m http.server 8080
# Then open http://localhost:8080 in your browser
```

**CineBook movie ticket booking CLI**

```bash
python src/CINEBOOK.py
```

---

## 📌 Project Overview

### 🎬 CineBook — Movie Ticket Booking System

CineBook is a Python CLI application that lets users:
- Browse available movies and their prices
- View a 5 × 5 seat layout (A1–E5)
- Book one or more seats in a single step
- Cancel a booking
- Print a full receipt with customer name and total cost

The system makes ticket reservation easy, fast, and error-free compared to manual booking.

### 🍽️ FoodieExpress — Food Ordering Website

FoodieExpress is a pure HTML / CSS / JavaScript single-page application that lets users:
- Browse 23 dishes across 6 categories (Starters, Main Course, Pizza, Burgers, Desserts, Drinks)
- Filter the menu by category
- Add/remove items and adjust quantities via an instant cart sidebar
- Check out by entering their name, phone, address and payment method
- Receive an on-screen order confirmation with a unique order ID
