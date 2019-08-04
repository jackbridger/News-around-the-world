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

    // const newsObject = JSON.parse(xhr.responseText);
    // let topThree = newsObject.splice(0, 3);
    // topThree.forEach(elem => addDom(elem));

    if (xhr.status !== 200) {
      let headline = document.createElement("h2");
      headline.textContent = "No data";
      articleElements.appendChild(headline);
    } else {
      let topThree = JSON.parse(xhr.responseText).body.topThreeArticles;
      topThree.forEach(elem => addDom(elem));
    }
  };
  xhr.open("GET", `/search?${countryCode}`, true);
  xhr.send();
};

let addDom = obj => {
  let articleElements = document.querySelector(".articles-display");
  let article = document.createElement("article");
  let headline = document.createElement("h2");
  let image = document.createElement("img");
  let text = document.createElement("p");
  let articleURL = document.createElement("a");

  headline.textContent = obj.title;

  image.alt = "Image from external source";
  text.textContent = obj.description;
  articleURL.href = obj.url;
  articleURL.target = "_blank";

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