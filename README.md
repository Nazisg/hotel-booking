# Hotel Booking System

A dynamic hotel booking application built with **React**, **TypeScript**, **Vite**, **TailwindCSS**, and **Redux Toolkit**. The app allows users to select travel destinations, choose hotels, configure meal plans, and calculate total costs across multiple days.

---

## Demo

[Live Demo on Vercel](https://hotel-booking-git-main-nazisgs-projects.vercel.app/)

---

## Features

### 1. Initial Configuration
- Select **citizenship** (country of origin)
- Choose **date range** and number of days for the trip
- Select **destination country**
- Pick a **board type**: Full Board (FB), Half Board (HB), or No Board (NB)

### 2. Daily Configuration
- Dynamic table generated for each day of the trip
- Hotel selection per day
- Meal selection rules:
  - **Full Board (FB)**: Both lunch & dinner selectable
  - **Half Board (HB)**: Either lunch **or** dinner (mutually exclusive)
  - **No Board (NB)**: Meal selection disabled

### 3. Summary & Price Calculation
- Displays selected configuration (citizenship, dates, destination, board type)
- Shows daily selections of hotel and meals
- Calculates **total price**:
  - Total = Σ(Hotel price + selected meal prices) for all days
  - Provides per-day breakdown and grand total

### 4. Extra Features
- Responsive design for desktop and mobile
- Tooltips for better UX
- State management with Redux Toolkit
- TypeScript interfaces for strong typing
- Optionally export booking summary as PDF

---

## Technology Stack

- **Frontend Framework:** React.js with TypeScript  
- **State Management:** Redux Toolkit  
- **Styling:** Tailwind CSS  
- **Build Tool:** Vite  
- **PDF Export (Optional):** jsPDF / dom-to-image-more  
- **Tooltips:** React Tooltip  

---

## Project Structure

