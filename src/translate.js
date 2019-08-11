const countryCodes = require("./countryCodes");
const fetch = require('node-fetch');

require("dotenv").config();

const translateOneThing = async (object, countryCode, titleDesc, callback) => {
  const langFrom = countryCodes[countryCode];
  const langTo = "en";
  const textToTranslate = encodeURI(object[titleDesc]);
  const translateKey = process.env.APIKEYTRANSLATE;
  const urlYandex = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${translateKey}&text=${textToTranslate}&lang=${langFrom}-${langTo}`;

  await fetch(urlYandex)
    .then(res => res.json())
    .then(json => {
      return object[titleDesc] = json.text[0];
    }).then(() => {
      if (callback) {
        callback();
      }   
    });
}

const translateAllArticles = (articles, countryCode, callback) => {
  articles.forEach((article, index) => { 
    if (index === articles.length - 1) {
      translateOneThing(article, countryCode, 'description', false).then(() => {
        translateOneThing(article, countryCode, 'title', callback);
      });
    } else {
      translateOneThing(article, countryCode, 'description', false)
      translateOneThing(article, countryCode, 'title', false);
    }
  });

}

module.exports = translateAllArticles;