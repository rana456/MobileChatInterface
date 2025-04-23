// A simple mock AI response generator
// This simulates responses similar to ChatGPT/Claude

// A set of predefined responses for common queries
const commonResponses = {
  greetings: [
    "Hello! How can I assist you today?",
    "Hi there! What can I help you with?",
    "Greetings! How may I be of service?",
    "Hello! I'm here to help. What do you need?",
  ],
  farewells: [
    "Goodbye! Feel free to chat again whenever you need assistance.",
    "Take care! I'll be here if you need anything else.",
    "Until next time! Have a great day.",
    "Bye for now! Come back anytime you have questions.",
  ],
  thanks: [
    "You're welcome! Is there anything else I can help with?",
    "Happy to help! Let me know if you need anything else.",
    "My pleasure! What else would you like to know?",
    "Glad I could assist! Any other questions?",
  ],
  unknown: [
    "I'm not entirely sure about that. Could you provide more details?",
    "That's an interesting question. Let me think about how to approach it.",
    "I don't have specific information on that topic. Is there something else I can help with?",
    "I'm still learning about many topics. Could you try rephrasing your question?",
  ],
  help: [
    "I can answer questions, provide information, or just chat. What would you like to talk about?",
    "I'm here to assist with information and answers. What are you curious about?",
    "You can ask me about a wide range of topics, and I'll do my best to help!",
    "Need help? Just ask a question and I'll try to provide a useful response.",
  ],
};

// More complex responses for specific topics
const topicResponses = {
  weather: "I don't have access to real-time weather data, but I can suggest checking a weather app or website for the most accurate forecast.",
  time: "I don't have access to your current time zone, but you can check the time on your device.",
  news: "I don't have access to current news. For the latest updates, I'd recommend checking a news website or app.",
  joke: "Why don't scientists trust atoms? Because they make up everything!",
  name: "I'm an AI assistant designed to be helpful, harmless, and honest. You can call me Assistant.",
  capabilities: "I can have conversations on a wide range of topics, answer questions, provide explanations, and assist with various tasks through text. However, I don't have access to the internet or real-time data.",
  created: "I'm an AI assistant created to be helpful, harmless, and honest in conversations with humans.",
  learning: "I learn from a wide range of text data I was trained on, but I don't learn from our current conversation or store your personal information.",
};

// Function to detect topic from user input
const detectTopic = (input) => {
  input = input.toLowerCase();
  
  if (/^(hi|hello|hey|greetings)/i.test(input)) {
    return 'greetings';
  } else if (/^(bye|goodbye|farewell|see you)/i.test(input)) {
    return 'farewells';
  } else if (/^(thanks|thank you|appreciate)/i.test(input)) {
    return 'thanks';
  } else if (/help me|can you help|what can you do/i.test(input)) {
    return 'help';
  } else if (/weather|rain|sunny|forecast/i.test(input)) {
    return 'weather';
  } else if (/time|clock|hour/i.test(input)) {
    return 'time';
  } else if (/news|headline|current events/i.test(input)) {
    return 'news';
  } else if (/joke|funny|make me laugh/i.test(input)) {
    return 'joke';
  } else if (/your name|who are you|what are you/i.test(input)) {
    return 'name';
  } else if (/can you|able to|capabilities/i.test(input)) {
    return 'capabilities';
  } else if (/how were you made|who made you|how created/i.test(input)) {
    return 'created';
  } else if (/how do you learn|training|trained/i.test(input)) {
    return 'learning';
  }
  
  return 'unknown';
};

// Function to generate a contextual response based on user input
const generateContextualResponse = (input) => {
  const topic = detectTopic(input);
  
  // Check if it's a common topic with multiple response options
  if (commonResponses[topic]) {
    const responses = commonResponses[topic];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Check if it's a specific topic with a single response
  if (topicResponses[topic]) {
    return topicResponses[topic];
  }
  
  // If no topic is detected or for 'unknown' topic, generate a generic response
  const genericResponses = [
    "That's an interesting point. Could you tell me more?",
    "I understand. What else would you like to discuss?",
    "Thanks for sharing that with me. How can I help further?",
    "I see what you mean. Is there anything specific you'd like to know about that?",
    "That's good to know. What would you like to explore next?",
  ];
  
  return genericResponses[Math.floor(Math.random() * genericResponses.length)];
};

// Main function to generate AI responses
export const generateResponse = async (userMessage) => {
  try {
    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return generateContextualResponse(userMessage);
  } catch (error) {
    console.error('Error generating response:', error);
    return "I'm sorry, I'm having trouble processing your request right now. Could you try again?";
  }
};
