# Dream Catcher

A full-stack web application that allows users to record their dreams and receive AI-powered interpretations using Gemini.

## Features

- Record dreams with timestamp
- Get AI interpretations of your dreams
- View all past dreams and their interpretations
- Delete dreams
- SQLite for local development and PostgreSQL for hosted deployments
- Vanilla JavaScript frontend
- Express backend with RESTful API

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: SQLite locally; PostgreSQL when `DATABASE_URL` is set
- **Frontend**: HTML, CSS, Vanilla JavaScript
- **AI**: Google Gemini API

## Project Structure

```
dream-journal/
├── server.js           # Express server and API routes
├── package.json        # Dependencies and scripts
├── .env               # Environment variables (create this)
├── .env.example       # Example env file
├── dreams.db          # SQLite database (auto-created)
└── public/
    ├── index.html     # Frontend HTML
    ├── styles.css     # Styles
    └── app.js         # Frontend JavaScript
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory from the example:

```bash
copy .env.example .env
```

Edit `.env` and add your Gemini API key:

```
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-2.5-flash
PORT=3001
# Optional: use PostgreSQL instead of local SQLite
# DATABASE_URL=postgresql://user:password@host/database?sslmode=require
```

Get your API key from [Google AI Studio](https://aistudio.google.com/apikey).

### 3. Run the Application

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The app will be available at `http://localhost:3001`

## API Endpoints

- `GET /api/dreams` - Get all dreams
- `GET /api/dreams/:id` - Get a specific dream
- `POST /api/dreams` - Create a new dream (requires `dream_text` in body)
- `DELETE /api/dreams/:id` - Delete a dream

## Deploy to Render

1. Create a PostgreSQL database with a provider that offers a free tier, such as Neon, and copy its connection URL. Use the provider's SSL-enabled URL.
2. Push this project to GitHub.
3. In the [Render Dashboard](https://dashboard.render.com/), choose **New → Blueprint** and connect the repository.
4. When prompted, enter `GEMINI_API_KEY` and the PostgreSQL connection URL as `DATABASE_URL`. You can optionally set `GEMINI_MODEL`; it defaults to `gemini-2.5-flash`.
5. Deploy the Blueprint. It creates a Free web service, builds with `npm ci`, and starts with `npm start`.

The app automatically creates its PostgreSQL table at startup. Local runs use SQLite unless `DATABASE_URL` is set. The hosted database starts empty; local SQLite data is not copied over. Render's Free web service may spin down while idle, but the external database stores dreams separately.

## Usage

1. Enter your dream in the text area
2. Click "Get Interpretation" to save the dream and receive an AI interpretation
3. View all your dreams below, sorted by most recent
4. Click "Delete" to remove a dream

## License

MIT