# MohallaMart - Hyperlocal Business Discovery

MohallaMart is a platform designed to help users discover and support local businesses in their neighborhood. It provides features like business search, deals, reviews, and more.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Discover local businesses by category, location, or deals.
- View business details, including reviews, ratings, and active deals.
- User authentication and role-based access (e.g., admin, business owner, user).
- Add and manage businesses, reviews, and deals.
- Responsive design for seamless usage across devices.

---

## Tech Stack

### Frontend
- **React** (with Vite)
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **React Router** for navigation

### Backend
- **Node.js** with **Express.js**
- **MongoDB** for database
- **Mongoose** for object modeling
- **JWT** for authentication
- **Cloudinary** for media storage

---

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/mohallamart.git
   cd mohallamart

2. Install dependencies for both    client and server:

    cd client
    npm install
    cd ../server
    npm install

Set up environment variables:

3. Create a .env file in the server directory with the following:

    PORT=5000
    _connectionMONGODB_URI="your_mongodb_string"
    JWT_SECRET="your_jwt_secret"
    NODE_ENV=development

4. Start the development servers:

    Backend:

    cd server
    npm run dev

    Frontend:

    cd client
    npm run dev

5. Open the app in your browser at http://localhost:5173.

## Usage

Home Page: Browse businesses by category, trending, or deals.

Business Details: View detailed information about a business, including reviews and deals.

Authentication: Register or log in to access personalized features.

Admin Features: Manage businesses, deals, and reviews.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push to your fork.
4. Submit a pull request.

