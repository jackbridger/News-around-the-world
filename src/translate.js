const requestModule = require("./request");
const countryCodes = require("./countryCodes");

require("dotenv").config();

let translateAllArticles = (object, countryCode, callback) => {
  object.forEach((element, index) => {
    translateOneThing(element, countryCode,'title', false);
    if (index === 2) {
    translateOneThing(element, countryCode,'description',callback);
    }
    else {
      translateOneThing(element, countryCode,'description',false)
    }
  });
}

let translateOneThing = (object, countryCode, titleDesc, callback ) => {
    let langFrom = countryCodes[countryCode];
    let langTo = "en";
    
    let textToTranslate = encodeURI(object[titleDesc]);
    let translateKey = process.env.APIKEYTRANSLATE;
    const urlYandex = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${translateKey}&text=${textToTranslate}&lang=${langFrom}-${langTo}`;

    requestModule(urlYandex, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        object[titleDesc] = data.body.text[0];
        if (callback) {
          setTimeout(() => {
            callback();
          }, 500);
        }
      }
    });
  }




  module.exports = translateAllArticles;