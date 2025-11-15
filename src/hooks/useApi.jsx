// import { useState } from 'react';

// export const useApi = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const sendMessage = async (message, apiKey) => {
//     if (!apiKey) {
//       throw new Error('Please set your Gemini API key in the settings');
//     }

//     setLoading(true);
//     setError(null);

//     // Try different available models
//     const models = [
//       'gemini-1.5-flash-latest',
//       'gemini-1.5-flash',
//       'gemini-1.0-pro-latest',
//       'gemini-1.0-pro'
//     ];

//     for (const model of models) {
//       try {
//         console.log(`Trying model: ${model}`);
//         const result = await tryModel(model, message, apiKey);
//         console.log(`Success with model: ${model}`);
//         return result;
//       } catch (err) {
//         console.log(`Model ${model} failed:`, err.message);
//         // Continue to next model
//       }
//     }

//     // If all models fail
//     throw new Error('All Gemini models failed. Please check your API key and try again.');
//   };

//   const tryModel = async (model, message, apiKey) => {
//     const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    
//     const response = await fetch(API_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         contents: [
//           {
//             parts: [
//               {
//                 text: message
//               }
//             ]
//           }
//         ],
//         generationConfig: {
//           temperature: 0.7,
//           topP: 0.8,
//           topK: 40,
//           maxOutputTokens: 1000,
//         }
//       })
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error?.message || `Model ${model} failed with status ${response.status}`);
//     }

//     const data = await response.json();
    
//     if (data.candidates && data.candidates[0] && data.candidates[0].content) {
//       const text = data.candidates[0].content.parts[0].text;
//       return text;
//     } else {
//       throw new Error(`Unexpected response format from model ${model}`);
//     }
//   };

//   return {
//     sendMessage,
//     loading,
//     error,
//     setError
//   };
// };





import { useState } from 'react';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (message, apiKey) => {
    if (!apiKey) {
      throw new Error('Please set your Gemini API key in the settings');
    }

    setLoading(true);
    setError(null);

    try {
      // Use the available models from your diagnostic
      const models = [
        'gemini-2.0-flash', // Fast and reliable
        'gemini-2.0-flash-001', 
        'gemini-2.5-flash', // Latest version
        'gemini-2.5-flash-lite',
        'gemini-2.0-flash-lite',
        'gemini-pro-latest', // Fallback
        'gemini-flash-latest' // Another fallback
      ];

      let lastError = null;

      for (const model of models) {
        try {
          console.log(`🔍 Trying model: ${model}`);
          const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
          
          const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: message
                    }
                  ]
                }
              ],
              generationConfig: {
                temperature: 0.7,
                topP: 0.8,
                topK: 40,
                maxOutputTokens: 1000,
              }
            })
          });

          console.log(`🔍 Response status for ${model}:`, response.status);

          if (!response.ok) {
            const errorData = await response.json();
            lastError = new Error(`Model ${model}: ${errorData.error?.message || `HTTP ${response.status}`}`);
            console.log(`❌ ${model} failed:`, errorData.error?.message);
            continue; // Try next model
          }

          const data = await response.json();
          console.log(`🔍 Response data for ${model}:`, data);
          
          if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            const text = data.candidates[0].content.parts[0].text;
            console.log(`✅ Success with model: ${model}`);
            return text;
          } else {
            lastError = new Error(`Model ${model}: Unexpected response format`);
            console.log(`❌ ${model} - unexpected format:`, data);
            continue;
          }
        } catch (err) {
          lastError = err;
          console.log(`❌ ${model} - error:`, err.message);
          continue;
        }
      }

      // If all models failed
      throw lastError || new Error('All models failed. Please check your API key.');

    } catch (err) {
      console.error('Gemini API Error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    sendMessage,
    loading,
    error,
    setError
  };
};