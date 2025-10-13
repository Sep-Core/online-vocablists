// Global variables
let vocabularyData = null;
let allWords = [];
let allCategories = [];
let filteredWords = [];

// Cookie helper functions
function setCookie(name, value, days = 365) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
    }
    return null;
}

function getAllNotes() {
    const notesJSON = getCookie('vocabularyNotes');
    return notesJSON ? JSON.parse(notesJSON) : {};
}

function saveNote(wordId, note) {
    const allNotes = getAllNotes();
    allNotes[wordId] = note;
    setCookie('vocabularyNotes', JSON.stringify(allNotes));
}

function getNote(wordId) {
    const allNotes = getAllNotes();
    return allNotes[wordId] || '';
}

// Load vocabulary data from JSON
async function loadVocabulary() {
    try {
        const response = await fetch('vocabulary.json');
        vocabularyData = await response.json();
        allCategories = vocabularyData.categories;
        allWords = vocabularyData.words;
        filteredWords = [...allWords];
        
        initializeApp();
    } catch (error) {
        console.error('Error loading vocabulary:', error);
        document.getElementById('wordsContainer').innerHTML = 
            '<p style="color: white; text-align: center;">Error loading vocabulary data. Please make sure vocabulary.json exists.</p>';
    }
}

// Initialize the application
function initializeApp() {
    populateCategoryFilter();
    renderWords(filteredWords);
    updateStats();
    
    // Add event listeners
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    document.getElementById('categoryFilter').addEventListener('change', handleCategoryFilter);
}

// Populate category filter dropdown
function populateCategoryFilter() {
    const select = document.getElementById('categoryFilter');
    allCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        select.appendChild(option);
    });
}

// Handle search input
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    filterWords(searchTerm, categoryFilter);
}

// Handle category filter
function handleCategoryFilter(e) {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const categoryFilter = e.target.value;
    
    filterWords(searchTerm, categoryFilter);
}

// Filter words based on search and category
function filterWords(searchTerm, categoryFilter) {
    filteredWords = allWords.filter(word => {
        // Category filter
        const matchesCategory = categoryFilter === 'all' || word.category === categoryFilter;
        
        // Search filter
        const matchesSearch = !searchTerm || 
            word.word.toLowerCase().includes(searchTerm) ||
            word.definition.toLowerCase().includes(searchTerm) ||
            word.relatedWords.some(rw => rw.toLowerCase().includes(searchTerm));
        
        return matchesCategory && matchesSearch;
    });
    
    renderWords(filteredWords);
    updateStats();
}

// Render word cards
function renderWords(words) {
    const container = document.getElementById('wordsContainer');
    const emptyState = document.getElementById('emptyState');
    
    if (words.length === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    container.style.display = 'grid';
    emptyState.style.display = 'none';
    
    container.innerHTML = words.map(word => createWordCard(word)).join('');
}

// Create HTML for a word card
function createWordCard(word) {
    const category = allCategories.find(cat => cat.id === word.category);
    const categoryName = category ? category.name : 'Unknown';
    const note = getNote(word.id);
    
    const relatedWordsHTML = word.relatedWords.map(rw => 
        `<span class="related-word-tag">${rw}</span>`
    ).join('');
    
    return `
        <div class="word-card" data-word-id="${word.id}">
            <div class="word-header">
                <div>
                    <h2 class="word-title">${word.word}</h2>
                </div>
                <span class="category-badge">${categoryName}</span>
            </div>
            
            <p class="word-definition">${word.definition}</p>
            
            <div class="related-words">
                <div class="related-words-title">Related Strong Verbs:</div>
                <div class="related-words-list">
                    ${relatedWordsHTML}
                </div>
            </div>
            
            <div class="custom-notes">
                <div class="notes-header">
                    <span class="notes-title">My Notes:</span>
                </div>
                <div class="note-display" id="note-display-${word.id}" onclick="toggleNoteEdit('${word.id}')">
                    <p class="note-content ${note ? '' : 'empty'}" id="note-content-${word.id}">
                        ${note || 'Click here to add your custom notes...'}
                    </p>
                </div>
                <div class="note-edit" id="note-edit-${word.id}" style="display: none;">
                    <textarea class="note-textarea" id="note-textarea-${word.id}">${note}</textarea>
                    <div class="note-actions">
                        <button class="cancel-note-btn" onclick="cancelNoteEdit('${word.id}')">Cancel</button>
                        <button class="save-note-btn" onclick="saveNoteEdit('${word.id}')">Save</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Toggle note editing mode
function toggleNoteEdit(wordId) {
    const display = document.getElementById(`note-display-${wordId}`);
    const edit = document.getElementById(`note-edit-${wordId}`);
    
    display.style.display = 'none';
    edit.style.display = 'block';
    
    // Focus on textarea
    const textarea = document.getElementById(`note-textarea-${wordId}`);
    textarea.focus();
}

// Save note edit
function saveNoteEdit(wordId) {
    const textarea = document.getElementById(`note-textarea-${wordId}`);
    const note = textarea.value.trim();
    
    saveNote(wordId, note);
    
    // Update display
    const noteContent = document.getElementById(`note-content-${wordId}`);
    
    if (note) {
        noteContent.textContent = note;
        noteContent.classList.remove('empty');
    } else {
        noteContent.textContent = 'Click here to add your custom notes...';
        noteContent.classList.add('empty');
    }
    
    // Hide edit mode
    const display = document.getElementById(`note-display-${wordId}`);
    const edit = document.getElementById(`note-edit-${wordId}`);
    display.style.display = 'block';
    edit.style.display = 'none';
}

// Cancel note edit
function cancelNoteEdit(wordId) {
    const display = document.getElementById(`note-display-${wordId}`);
    const edit = document.getElementById(`note-edit-${wordId}`);
    const textarea = document.getElementById(`note-textarea-${wordId}`);
    
    // Reset textarea to saved note
    textarea.value = getNote(wordId);
    
    // Show display mode
    display.style.display = 'block';
    edit.style.display = 'none';
}

// Update statistics
function updateStats() {
    const wordCount = document.getElementById('wordCount');
    const count = filteredWords.length;
    wordCount.textContent = `${count} word${count !== 1 ? 's' : ''}`;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadVocabulary);


