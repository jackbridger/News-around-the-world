(() => {
  let countryElements = document.querySelectorAll(".country-select");

  // This event listener is for the drop down selection option

  let search = document.querySelector("#searchbutton");
  search.addEventListener("click", () => {
    let countryCode = document.querySelector("#country").value;
    if (countryCode !== "") {
      apiCall(countryCode, translateArticlesInObj, addDom );
    } else {
      alert("Please select a country in the dropdown menu");
    }
  });

  // This event listener is for the quick select country buttons
  countryElements.forEach(elem => {
    elem.addEventListener("click", () => {
      let countryCode = elem.dataset.country;
      apiCall(countryCode, translateArticlesInObj, addDom );
    });
  });
})();
let apiCall = (countryCode, translateCallback, elemCallback) => {
  let xhr = new XMLHttpRequest();
  xhr.onload = () => {
    let articleElements = document.querySelector(".articles-display");
    articleElements.innerHTML = "";

    if (xhr.status !== 200) {
      let headline = document.createElement("h2");
      headline.textContent = "No data";
      articleElements.appendChild(headline);
    } else {
        let newsObject = JSON.parse(xhr.responseText).body.topThreeArticles;
        translateCallback(newsObject, countryCode, elemCallback);
    }
  
  };
  xhr.open("GET", `/search?${countryCode}`, true);
  xhr.send();
};

let addDom = (elem, title, description) => {
  let articleElements = document.querySelector(".articles-display");
  let lenArt = articleElements.childElementCount;
  if (lenArt >= 3) {
    articleElements.removeChild(articleElements.firstElementChild)
  }
  
  let article = document.createElement("article");
  let headline = document.createElement("h2");
  let image = document.createElement("img");
  let text = document.createElement("p");
  let articleURL = document.createElement("a");

  

  image.alt = "Image from external source";
  
  articleURL.href = elem.url;
  articleURL.target = "_blank";
    headline.textContent = title;
    text.textContent = description;
  


  if (elem.urlToImage) {
    image.src = elem.urlToImage;
  } else {
    image.src =
      "https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
  }

  articleElements.appendChild(article);
  article.appendChild(articleURL);
  articleURL.appendChild(headline);
  article.appendChild(image);
  article.appendChild(text);
};

let translateArticle = (objNum,titleDesc, countryCode, objToUpdate, elemCallback) => {
  const toLanguage = 'en'
  const fromLanguage = languageFinder[countryCode];
  const textToTranslate = encodeURI(objToUpdate[objNum][titleDesc])
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if  (xhr.readyState == 4 && xhr.status == 200) {
      let translation = JSON.parse(xhr.responseText).text[0];
      objToUpdate[objNum][titleDesc] = translation;
      objToUpdate.forEach(elem => {
        elemCallback(elem, elem.title,elem.description);
      })
    }
}
  xhr.open("GET", `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190803T112209Z.efb5a8d3a549a765.302073ca12e12c82eb0d886dab93d379fa79f34f&text=${textToTranslate}&lang=${fromLanguage}-${toLanguage}`, true);
  xhr.send();
}
// window.onload = translateArticle('hello jack','es' );

let translateArticlesInObj = (originalObj, countryCode, elemCallback) => {
  originalObj.forEach((element, index) => {
    translateArticle(index,'title', countryCode, originalObj, elemCallback);
    translateArticle(index,'description', countryCode, originalObj, elemCallback);
  });
}

const languageFinder = {
  "ae": "ae",
"ar": "es",
"at": "at",
"au": "de",
"be": "fr",
"bg": "bg",
"br": "pt",
"ca": "en",
"ch": "de",
"cn": "zh",
"co": "es",
"cu": "es",
"cz": "cs",
"de": "de",
"eg": "ar",
"fr": "fr",
"gb": "en",
"gr": "el",
"hk": "zh",
"hu": "hu",
"id": "id",
"ie": "en",
"il": "he",
"in": "en",
"it": "it",
"jp": "ja",
"kr": "ko",
"lt": "lt",
"lv": "lv",
"ma": "ma",
"mx": "es",
"my": "ms",
"ng": "en",
"nl": "nl",
"no": "no",
"nz": "en",
"ph": "tl",
"pl": "pl",
"pt": "pt",
"ro": "ro",
"rs": "sr",
"ru": "ru",
"sa": "sa",
"se": "se",
"sg": "en",
"si": "sl",
"sk": "sv",
"th": "th",
"tr": "tr",
"tw": "zh",
"ua": "uk",
"us": "en",
"ve": "es",
"za": "en",
}