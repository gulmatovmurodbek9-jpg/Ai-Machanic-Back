const key = 'your_groq_api_key';
const data = {
  model: 'llama-3.2-11b-vision-preview',
  messages: [
    {
      role: 'user',
      content: [
        { type: 'text', text: 'Analyze this image.' },
        { type: 'image_url', image_url: { url: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAAoHBwkHBgoJCAkLCwoMDxkQDw4ODx4WFxIZJCAmJSMgIyIoLTkwKCo2KyIjNDQyNjc4PDxAKD88PTs6PT48PDz/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJV//9k=' } }
      ]
    }
  ]
};

fetch('https://api.groq.com/openai/v1/chat/completions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
  body: JSON.stringify(data)
}).then(r => r.json()).then(r => console.log(JSON.stringify(r, null, 2))).catch(console.error);
