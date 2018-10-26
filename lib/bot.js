import SlackBot from 'slackbots';
import dotenv from 'dotenv';

dotenv.config();

export default new SlackBot({
  token: process.env.API_TOKEN,
  name: 'NightFall Bot'
});
