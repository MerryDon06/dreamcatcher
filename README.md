# Dream Catcher

A full-stack web application that allows users to record their dreams and receive AI-powered interpretations using Gemini.

## Features

- Record dreams with timestamp
- Get AI interpretations of your dreams
- View all past dreams and their interpretations
- Delete dreams
- SQLite database for persistent storage
- Vanilla JavaScript frontend
- Express backend with RESTful API

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: SQLite
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

1. Push the project to a GitHub repository.
2. In the [Render Dashboard](https://dashboard.render.com/), choose **New → Blueprint** and connect the repository.
3. Render reads `render.yaml` and creates the web service and its persistent disk. The Blueprint uses a Starter web service because SQLite needs persistent storage.
4. When prompted, enter `GEMINI_API_KEY`. You can optionally set `GEMINI_MODEL`; it defaults to `gemini-2.5-flash`.
5. Deploy the Blueprint. Render builds with `npm ci` and starts the app with `npm start`.

The database is stored at `/var/data/dreams.db` on the attached 1 GB persistent disk, so dream entries survive redeployments. The disk starts with a new database; existing local `dreams.db` data is not copied to Render. Keep the disk mounted at `/var/data` if you change the database path.

## Usage

1. Enter your dream in the text area
2. Click "Get Interpretation" to save the dream and receive an AI interpretation
3. View all your dreams below, sorted by most recent
4. Click "Delete" to remove a dream

## License

MIT