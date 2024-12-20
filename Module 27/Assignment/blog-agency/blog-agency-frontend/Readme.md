# Frontend Dashboard

This is the frontend of the project, built with React, which provides an intuitive and responsive user interface for managing blogs, teams, and services.

## Features

- **Dashboard View**: Displays stats and lists for blogs, teams, and services.
- **CRUD Operations**: Create, read, update, and delete blogs, teams, and services.
- **Search and Filter**: Easily find and manage items.
- **Responsive Design**: Optimized for desktops and mobile devices.

## Prerequisites

Ensure you have the following installed:
- Node.js
- npm or yarn
- A browser (Chrome, Firefox, etc.)

## Installation and Setup

1. Clone the frontend repository:
   git clone <frontend-repo-url>

2. Navigate to the frontend directory:
   cd frontend

3. Install dependencies:
   npm install

4. Create a `.env` file in the root directory and add the following:
   REACT_APP_API_URL=http://localhost:5000

5. Start the development server:
   npm start

6. Access the app in your browser at `http://localhost:3000`.

## Deployment

To deploy the frontend:

1. Build the app:
   npm run build

2. Host the `build/` directory on [Netlify](https://www.netlify.com/) or any static hosting platform.

## Dependencies

The frontend uses the following libraries and frameworks:
- **React**: For building the UI.
- **Axios**: For HTTP requests.
- **React Router**: For routing.
- **Material-UI**: For styling and components.
