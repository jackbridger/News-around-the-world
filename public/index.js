(() => {
  let countryElements = document.querySelectorAll(".country-select");

  // This event listener is for the drop down selection option

  let search = document.querySelector("#searchbutton");
  search.addEventListener("click", () => {
    let countryCode = document.querySelector("#country").value;
    // let countryCode = elem.dataset.country;
    if (countryCode !== "") {
      apiCall(countryCode);
    } else {
      alert("Please select a country in the dropdown menu");
    }
  });

  // This event listener is for the quick select country buttons
  countryElements.forEach(elem => {
    elem.addEventListener("click", () => {
      let countryCode = elem.dataset.country;
      apiCall(countryCode);
    });
  });
})();
let apiCall = countryCode => {
  let xhr = new XMLHttpRequest();
  xhr.onload = response => {
    let articleElements = document.querySelector(".articles-display");
    articleElements.innerHTML = "";

    if (xhr.status !== 200) {
      let headline = document.createElement("h2");
      headline.textContent = "No data";
      articleElements.appendChild(headline);
    } else {

      var newsObject = {}
      let firstPromise = () => {return new Promise((resolve, reject) => {
        newsObject = JSON.parse(xhr.responseText).body.topThreeArticles;
        if (newsObject) {
          console.log(newsObject);
        }
        else {
          reject(Error("It broke"));
        }
      })}
      let promiseTranslate = () => {return new Promise((resolve, reject) => {
        translateArticlesInObj(newsObject, countryCode);
        if (newsObject) {
          console.log(newsObject);
        }
        else {
          reject(Error("It broke"));
        }
      })}

      let updateElems = () => {newsObject.forEach(elem => {
        console.log(newsObject);
        console.log(elem);
        addDom(elem, countryCode);
      })}
      
      firstPromise().then(promiseTranslate()).then(updateElems())
    }
  };
  xhr.open("GET", `/search?${countryCode}`, true);
  xhr.send();
};

let addDom = (obj, countryCode) => {

  
  let articleElements = document.querySelector(".articles-display");
  let article = document.createElement("article");
  let headline = document.createElement("h2");
  let image = document.createElement("img");
  let text = document.createElement("p");
  let articleURL = document.createElement("a");

  

  image.alt = "Image from external source";
  
  articleURL.href = obj.url;
  articleURL.target = "_blank";
    headline.textContent = obj.title;
    text.textContent = obj.description;
  


  if (obj.urlToImage) {
    image.src = obj.urlToImage;
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

let translateArticle = (objNum,titleDesc, countryCode, objToUpdate) => {
  let textToTranslate = encodeURI(objToUpdate[objNum][titleDesc])
  let xhr = new XMLHttpRequest();
  xhr.onload = response => {
    let translation = JSON.parse(xhr.responseText).text[0]
    objToUpdate[objNum][titleDesc] = translation;

  }
  xhr.open("GET", `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190803T112209Z.efb5a8d3a549a765.302073ca12e12c82eb0d886dab93d379fa79f34f&text=${textToTranslate}&lang=${countryCode}-en`, true);
  xhr.send();
}
// window.onload = translateArticle('hello jack','es' );

let translateArticlesInObj = (originalObj, countryCode) => {
  originalObj.forEach((element, index) => {
    translateArticle(index,'title', countryCode, originalObj);
    translateArticle(index,'description', countryCode, originalObj);
  });
}