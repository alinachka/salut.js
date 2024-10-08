import express from "express";
import { createIntents, createSystemScenario, createUserScenario, createMatchers } from '@salutejs/scenario';
import { SmartAppBrainRecognizer } from '@salutejs/recognizer-smartapp-brain';
import { SaluteMemoryStorage } from '@salutejs/storage-adapter-memory';

import { saluteExpressMiddleware } from './middleware.js';
import * as dictionary from './mainPage.i18n/index.js';
import {model} from './intents.js';
import 'dotenv/config.js'

const port = process.env.PORT || 3000;
const index = express();
index.use(express.json());

index.listen(port);

const {intent } = createMatchers();


const intents = createIntents(model);
index.post('/app-connector',saluteExpressMiddleware({
    intents,
    recognizer: new SmartAppBrainRecognizer(),
    systemScenario: createSystemScenario({
        RUN_APP: ({req,res}) =>{
            const keyset = req.i18n(dictionary);
            res.setPronounceText(keyset('Привет'));
        },
        NO_MATCH: ({req,res}) =>{
            const keyset = req.i18n(dictionary);
            res.setPronounceText(keyset('404'));
        },
    }),
    userScenario: createUserScenario({
        calc: {
            match: intent('/sum'),
            handle: ({ req, res }) => {
                const { num1, num2 } = req.variables;
                const result = Number(num1) + Number(num2);
                console.log(result);
                res.appendBubble("Я тебе не калькулятор вообще-то. Ладно. " + result + "\nНо больше не дергай меня, по-братски");
            },
        },
    }),
    storage: new SaluteMemoryStorage()
    }));


