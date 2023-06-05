import express from 'express';
import axios, { AxiosRequestConfig } from 'axios';
import bodyParser from 'body-parser';

import logger from './logging';
import * as dotenv from 'dotenv';
import { keyboardMenu } from './keyboard';
import { welcomeMsg } from './messages';

dotenv.config();
const config = process.env;

const viberURL = 'https://chatapi.viber.com/pa/';
const app = express();

const headers: AxiosRequestConfig['headers'] = {
  'X-Viber-Auth-Token': config.authToken
};

const webhookBody =
  '{"url":"' +
  config.url +
  '","event_types":["delivered","seen","failed","subscribed","unsubscribed","conversation_started"]' +
  ',"send_name": true' +
  ',"send_photo": true}';

app.use(bodyParser.json());

app.listen(config.port, () => {
  logger.info(`Listening on port ${config.port}`);
});

setWebhook();

async function setWebhook() {
  try {
    const response = await axios.post(viberURL + 'set_webhook', webhookBody, {
      headers
    });
    logger.debug('Response from webhook call: ', response.data);
    logger.info('Webhook Setting done!');
  } catch (error) {
    logger.error(error);
  }
}

app.post('/', async (req, res) => {
  // logger.info('Request received: ', req.body);
  console.log(req.body);

  if (
    req.body.event == 'conversation_started' ||
    req.body.event == 'subscribed'
  ) {
    try {
      const id = req.body.user.id;
      const welcomeBody =
        '{"receiver":"' +
        id +
        '","min_api_version":7' +
        ',"type":"text"' +
        ',"text":"' +
        welcomeMsg +
        '","keyboard":' +
        JSON.stringify(keyboardMenu) +
        '}';

      console.log(welcomeBody);
      const response = await axios.post(
        viberURL + 'send_message',
        welcomeBody,
        {
          headers
        }
      );
      console.log(response.data);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
      logger.error(error);
    }
  }

  if (req.body.event == 'message') {
    try {
      const id = req.body.sender.id;

      const diceMsg =
        '{"receiver":"' +
        id +
        '","min_api_version":7' +
        ',"type":"text"' +
        ',"text":"' +
        Math.floor(Math.random() * 6 + 1) +
        '","keyboard":' +
        JSON.stringify(keyboardMenu) +
        '}';

      const coinMsg =
        '{"receiver":"' +
        id +
        '","min_api_version":7' +
        ',"type":"text"' +
        ',"text":"' +
        (Math.floor(Math.random() * 2) ? 'Heads' : 'Tails') +
        '","keyboard":' +
        JSON.stringify(keyboardMenu) +
        '}';

      const locMsg =
        '{"receiver":"' +
        id +
        '","min_api_version":7' +
        ',"type":"location"' +
        ',"location": { "lat": "' +
        (Math.random() * 180 - 90) +
        '", "lon": "' +
        (Math.random() * 360 - 180) +
        '"},"keyboard":' +
        JSON.stringify(keyboardMenu) +
        '}';

      if (req.body.message.text == '1') {
        const response = await axios.post(viberURL + 'send_message', diceMsg, {
          headers
        });
        console.log(response.data);
        res.json(response.data);
      } else if (req.body.message.text == '2') {
        const response = await axios.post(viberURL + 'send_message', coinMsg, {
          headers
        });
        console.log(response.data);
        res.json(response.data);
      } else if (req.body.message.text == '3') {
        const response = await axios.post(viberURL + 'send_message', locMsg, {
          headers
        });
        console.log(response.data);
        res.json(response.data);
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
      logger.error(error);
    }
  }

  res.status(200).end();
});

app.get('/', (req, res) => {
  res.send('Hey there, I am up!');
});

export default app;
