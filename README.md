# InstaVibe
# InstaVibe

InstaVibe is a modern Instagram clone built using React.js, Tailwind CSS, React Router, and Supabase for backend services.

## Features
- User authentication with Supabase
- View and post stories
- Create, like, and comment on posts
- Responsive design

## Tech Stack
- **Frontend:** React.js, Tailwind CSS, React Router
- **Backend:** Supabase (PostgreSQL, Authentication, Storage)

## Installation

### Prerequisites
- Node.js & npm/yarn installed
- Supabase account set up with project keys

### Steps
1. Clone the repository:
   ```sh
   git clone :- 
   cd instavibe
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory and add:
     ```env
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Project Structure
```
instavibe/
│── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Stories.jsx
│   │   ├── Post.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│── .env
│── package.json
│── README.md
```

## Contributing
Pull requests are welcome! Feel free to open an issue for any bugs or feature requests.

