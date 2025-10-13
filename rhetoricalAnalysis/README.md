# 📚 Vocabulary Review Website

A simple, beautiful vocabulary learning website that helps you store and review English words from any device.

## Features

- ✅ **Word Management**: Store words with definitions and related words
- ✅ **Categories**: Organize words by topics (Academic Writing, Business English, etc.)
- ✅ **Search Function**: Search through words, definitions, and related words
- ✅ **Custom Notes**: Add personal notes to each word (stored in browser cookies)
- ✅ **Related Words**: View synonyms and related terms for each vocabulary word
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile devices
- ✅ **Offline Support**: All data stored locally - no internet needed after initial load

## Getting Started

### Option 1: Open Directly (Simplest)
1. Simply double-click `index.html` to open it in your browser
2. Start reviewing your vocabulary!

### Option 2: Local Server (Recommended)
If you encounter issues with loading `vocabulary.json`, use a local server:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js (http-server):**
```bash
npx http-server -p 8000
```

Then open your browser and go to: `http://localhost:8000`

## File Structure

```
.
├── index.html          # Main HTML file
├── styles.css          # Styling and layout
├── script.js           # Application logic
├── vocabulary.json     # Your vocabulary data (editable)
└── README.md          # This file
```

## How to Add Your Own Vocabulary

### Editing `vocabulary.json`

The `vocabulary.json` file contains all your vocabulary data. Here's the structure:

```json
{
  "categories": [
    {
      "id": "cat1",
      "name": "Academic Writing",
      "description": "Words related to academic and formal writing"
    }
  ],
  "words": [
    {
      "id": "word1",
      "word": "meticulous",
      "definition": "Showing great attention to detail; very careful and precise",
      "category": "cat1",
      "relatedWords": ["careful", "thorough", "precise", "scrupulous"]
    }
  ]
}
```

### Adding a New Category

1. Open `vocabulary.json`
2. Add a new object to the `categories` array:

```json
{
  "id": "cat4",
  "name": "Your Category Name",
  "description": "Category description"
}
```

### Adding a New Word

1. Open `vocabulary.json`
2. Add a new object to the `words` array:

```json
{
  "id": "word7",
  "word": "your-word",
  "definition": "Definition of the word",
  "category": "cat1",
  "relatedWords": ["synonym1", "synonym2", "related1"]
}
```

**Important:**
- Each `id` must be unique
- The `category` field should match an existing category's `id`
- `relatedWords` is an array of related terms or synonyms

## Features Explained

### Custom Notes
- Click "Add Note" or "Edit" next to any word
- Type your personal notes, examples, or mnemonics
- Notes are saved automatically in browser cookies
- Notes persist across sessions and page refreshes

### Search
- Type in the search box to filter words
- Searches through word names, definitions, and related words
- Results update in real-time

### Category Filter
- Use the dropdown to filter by specific categories
- Combine with search for more precise filtering

## Browser Compatibility

Works on all modern browsers:
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

## Tips for Best Experience

1. **Regular Backups**: Keep a backup copy of your `vocabulary.json` file
2. **Organize by Topics**: Use categories to group related vocabulary
3. **Add Context**: Use custom notes to add example sentences or personal associations
4. **Mobile Access**: Bookmark the page on your phone for quick access
5. **Browser Notes**: Notes are stored per browser, so they won't sync across devices

## Troubleshooting

### Words not showing up?
- Make sure `vocabulary.json` is in the same folder as `index.html`
- Check that the JSON syntax is valid (use a JSON validator online)
- Try using a local server instead of opening the file directly

### Notes not saving?
- Make sure cookies are enabled in your browser
- Check that you're not in incognito/private mode

### File not loading on some browsers?
- Use a local server (see "Getting Started" section)
- Some browsers restrict local file access for security

## Future Enhancements (Coming Soon)

- 🎯 Study mode with quiz functionality
- 🧠 AI-powered semantic similarity scoring
- 📊 Progress tracking and statistics
- 🔊 Audio pronunciation support
- 📱 Export/import functionality
- 🌐 Multi-language support

## License

Free to use and modify for personal and educational purposes.

---

**Enjoy learning! 📖✨**


