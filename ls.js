
// Chatbot localStorage handler
const ChatbotStorage = {
    setItem: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value)); // Store as JSON
    },

    getItem: (key) => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null; // Parse JSON if exists
    },

    removeItem: (key) => {
        localStorage.removeItem(key);
    },

    clearStorage: () => {
        localStorage.clear();
    }
};
