# ARCANA ORACLE APP
React Native Course Project

---

## Link to APK
[Download APK](https://drive.google.com/file/d/1I6CkaIb7czv9vQ6O6Rc2CtbQgL6eYj6p/view?usp=drive_link)

---

## Typical User Flow
1. User installs the app
2. Browses Store as Guest
3. Registers account
4. Performs Tarot Readings
5. Saves readings
6. Edits profile
7. Makes purchase

---

## Installation Guide
1. Install and open the app
2. You will land on the Home screen
3. As a Guest, browse products and basic tarot information
4. To access readings and save content, tap Login / Register

---

## Functional Guide

### 1. Project Overview
- **Application Name:** Arcana Oracle  
- **Category / Topic:** Entertainment, Self-development, Small Commercial  
- **Main Purpose:** Tarot Readings  

---

### 2. User Access & Permissions

#### Guest (Not Authenticated)

**Basic Access:**
- Bottom tabs: browse informational sections  
- Shop screen: browse tarot decks and books, add/remove items from cart, adjust quantity, proceed to checkout

**Restricted Access:**  
- Attempting to access readings or profile editing redirects to Login/Register screen

#### Authenticated User

**Basic Access:**
- Bottom tabs: browse informational sections  
- Shop screen: browse tarot decks and books, add/remove items from cart, adjust quantity, proceed to checkout

**Full Access:**
- **Daily Card Screen:** choose 1 card from 22 Major Arcana, view description, save reading, draw another card  
- **Three Cards Screen:** choose 3 cards (Past – Present – Future), view descriptions, save reading, draw again  
- **My Journal Screen:** view saved readings and track past insights  
- **Profile Screen:** edit avatar (Image Picker), add address & phone, switch Dark/Light theme, change password, logout  

---

### 3. Authentication & Session Handling
- On app start, Firebase checks current user session
- If token exists → auto-login
- If not → user remains Guest
- On Login/Register → user state updates
- On Logout → session cleared and user redirected

**Session Persistence:**
- Firebase Authentication stores session securely
- User remains logged in after app restart
- AsyncStorage used for local state persistence if needed

---

### 4. Navigation Structure

**Root Navigation Logic:**
- `user == null` → Guest Bottom Tabs + Arcana Store
- `user != null` → Authenticated Stack Navigator

**Nested Navigation:**
- Stack Navigator inside Store (List → Details)
- Stack inside Profile (Edit screens)
- Reading result screens nested inside reading flow

---

### 5. List → Details Flow
- Products displayed from Firebase DB  
- User scrolls and taps an item to view details  
- Details screen shows image, description, and price  

---

### 6. Data Source & Backend
- Firebase Authentication  
- Firebase Realtime Database  
- Firebase Storage  

---

### 7. Data Operations (CRUD)

**Read (GET):**
- Products fetched from Firebase DB  
- Readings retrieved from user-readings node  

**Create (POST):**
- Save reading to journal  
- Register new user  
- Add address, phone, profile image  

**Update (PUT/PATCH):**
- Edit profile info  
- Update avatar image  
- Update cart quantities  

**Delete (DELETE):**
- Remove saved reading  
- Remove product from cart  
- Remove profile photo  

*UI updates automatically via Firebase listeners (real-time updates)*

---

### 8. Forms & Validation
- Login Form  
- Register Form  
- Profile Edit Form  

---

### 9. Validation Rules
- **UserName:** Required, minimum 2 characters  
- **Email:** Required, must match email format  
- **Password:** Required, minimum 6 characters  

---

### 10. Native Device Features

**Image Picker:**
- Used in Profile Screen  
- Allows user to select avatar image from camera or gallery  

**ViewShot:**
- Used in Product Details Screen and Reading Results  
- Captures UI component as an image  
- Allows sharing or saving reading results  

---

### 11. Error & Edge Case Handling

**Authentication Errors:**
- Invalid email/password → error message  
- Email already exists → Firebase error handled  

**Network Errors:**
- Loading indicators shown  
- Error alerts displayed  

**Empty States:**
- No saved readings → placeholder message  
- Empty cart → “Your cart is empty” message  

---

## Markdown CheatSheet
[Link to cheatsheet](https://github.com/adam-p/markdown-here/wiki/markdown-cheatsheet)