import bot from './bot';
import fetch from 'node-fetch';
import moment from 'moment-timezone';

const zipToLatLng = zipcode =>
  `https://www.zipcodeapi.com/rest/P3wu7WepGeW6raaitPlMXF7jrZW9xz4SbAznLjhmie46lYvVpSso77YZevsxJ8oq/info.json/${zipcode}/degrees`;

const latLngToSunset = (lat, lng) =>
  `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today&formatted=0`;

const fetchSunset = (lat, lng) =>
  fetch(latLngToSunset(lat, lng)).then(res => res.json());

fetch(zipToLatLng(74014))
  .then(res => res.json())
  .then(({ lat, lng, timezone: { timezone_identifier } }) => {
    fetchSunset(lat, lng).then(res => {
      bot.postMessageToChannel(
        'bot_testing',
        moment(res.results.sunset)
          .tz(timezone_identifier)
          .format('h:mm a z'),
        {}
      );
    });
  });

bot.on('start', () => {});

bot.on('message', function(data) {});
