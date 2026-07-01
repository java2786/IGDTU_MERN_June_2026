const OpenAI = require('openai');
require("dotenv").config();


const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});


async function testOpenAI(){
    // const response = await openai.responses.create({
    //     model: process.env['OPENAI_CHEAP_MODEL'],
    //     response_format: {type: "json_object"},
    //     instructions: 'You are a coding assistant that has 10 years experience in javascript',
    //     input: 'function add(a,b)return a+b, is this js code correct, what is wrong here',
    // });

    // console.log(response);

    const completion = await openai.chat.completions.create({
        model: process.env['OPENAI_CHEAP_MODEL'],
        response_format: {type: "json_object"},
        messages: [
            { role: 'developer', content: 'You are a coding assistant that has 10 years experience in javascript.' },
            { role: 'user', content: `function add(a,b)return a+b
                is this js code correct, what is wrong here. Generate json response.` },
            ],
        });

        console.log(JSON.parse(completion.choices[0].message.content));
}


testOpenAI()