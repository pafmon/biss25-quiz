const axios = require('axios');

           async function queryOpenai(model,prompt) {
            
        
}

module.exports.getQuiz = function getQuiz(req, res) {
    const prompt = "Create an array with 5 questions about hard facts about italian culture, each question should be a json object with only three fields, a first field “question” with a, a second field “answers” with an array of 4 possible answers, and a third field “correct” with the index of the correct answer. You should only response with the json code."
    const model = "gpt-4o";
    const apiKey =  process.env.APIKEY;

    if(!process.env.APIKEY){
        console.error("No API provided");
        res.sendStatus(500);
    }else{

        const apiUrl = 'https://api.openai.com/v1/chat/completions';

        axios.post(
            apiUrl,
                {
                    model: model,
                    messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: prompt },
                    ],
                    max_tokens: 2048,
                    temperature: 0.7
                },
                {
                    headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                    },
                }
                ).then((response)=>{

                        const fullText = response.data.choices[0].message.content;

                        // Split into lines
                        const lines = fullText.split('\n');

                        // Remove first and last lines
                        const trimmedLines = lines.slice(1, -1);

                        // Join back into a string
                        const cleanedText = trimmedLines.join('\n');
                        let jsonArrayString = `[${cleanedText}]`;

                        // 2. Parse the string as JSON
                        let questions;
                        try {
                            questions = JSON.parse(jsonArrayString);
                            
                            res.send(questions);
                        } catch (e) {
                            console.error('Invalid JSON:', e);
                        }
                        
                }).catch((error) => {
                        console.error('OpenAI Request Error:', error);
                });        
    }

}

