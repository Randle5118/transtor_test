import React, { useState } from 'react';
import axios from 'axios';

const TextTranslator = () => {
  const [text, setText] = useState('');
  const [frenchTranslation, setFrenchTranslation] = useState('');
  const [spanishTranslation, setSpanishTranslation] = useState('');

  const handleTranslate = async () => {
    if (!text) {
      alert('Please enter some text to translate.');
      return;
    }

    const sessionId = 'translation-session-1234';

    try {
      // Translate to French
      const frenchPrompt = `Translate '${text}' into French.`;
      const { data: frenchData } = await axios.post('/api/translate', {
        prompt: frenchPrompt,
        sessionId: sessionId,
      });
      setFrenchTranslation(frenchData.text);

      // Translate the French text to Spanish
      const spanishPrompt = `Now translate that into Spanish.`;
      const { data: spanishData } = await axios.post('/api/translate', {
        prompt: spanishPrompt,
        sessionId: sessionId,
      });
      setSpanishTranslation(spanishData.text);
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate"
      />
      <button onClick={handleTranslate}>Translate</button>

      {frenchTranslation && <p>French translation: {frenchTranslation}</p>}
      {spanishTranslation && <p>Spanish translation: {spanishTranslation}</p>}
    </div>
  );
};

export default TextTranslator;
