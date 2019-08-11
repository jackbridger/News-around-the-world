const requestModule = require("./request");
const countryCodes = require("./countryCodes");

require("dotenv").config();

let translateAllArticles = (object, countryCode, callback) => {
  let counter = (object.length)*2;
  const checkIfFinished=()=>{
    counter--;
    if(counter === 0){
      callback();
    }
  }

  object.forEach((element) => {
    translateOneThing(element, countryCode,'title',checkIfFinished);
    translateOneThing(element, countryCode,'description',checkIfFinished);
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
      }
      callback();
    });
  }
 module.exports = translateAllArticles;