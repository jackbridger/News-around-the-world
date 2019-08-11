# TOP NEWS WORLDWIDE 

[![Build Status](https://www.travis-ci.org/fac-17/PFAK-week5.svg?branch=master)](https://www.travis-ci.org/fac-17/PFAK-week5)
![Heroku](https://heroku-badge.herokuapp.com/?app=belo-wk5)

## Installation instructions 

Clone the repo with: 
```
git clone https://github.com/fac-17/PFAK-week5.git
```

Install all dependencies with: 
```
npm install
```
The project requires you to have a file .env in main directory, containing the API key. Our team will provide you with tha content of that file on request. Alternativel, you can get your own API key and add a .env file to the root folder with: 

- https://newsapi.org/docs/endpoints/top-headlines 
- https://tech.yandex.com/translate/doc/dg/reference/translate-docpage/

```
DB_APIKEYNEWS=your_own_APIkey
APIKEYTRANSLATE=your_own_key
```



Once you have all dependencies and the API key, you can run the server with: 

```
npm start
```


## Third-party resources

News API: https://newsapi.org/

## User Journey
Our user is a traveller or language learner wants to find out the trending headlines in a country of interest. The app returns the top three headlines for the selected country. 

The user can use one of the four quick search buttons, or select the country from a drop down menu. 

### Edge Case
If the user, does not select a country before clicking the search button, an alert message will pop up. 

## Design and Architecture
- File structure: all client-side files in public folder, all server-side files in src folder
- All client-side JS in index.js 
- One front-end API call directed to our server
- One back-end API call directed to external news API
 ![](https://i.imgur.com/xudgEuZ.jpg)


- Design intentions: serious, minimal, high-end 
- Mobile first design 
- Design Wireframes: 
![](https://i.imgur.com/tzRoJbF.jpg)


## Workflow 
### Code of Conduct

- code written in ES6
- Always use === 
- Everyone needs to understand each step before moving on 
- Listen to other people
- Everyone pairs with everyone 
- 20/20/20 rule 
- BEM class naming 
- mobile first 
- instant feedback 
- Name branches with feature/... and fix/... 
- Stick to pure functions
- Test first!!! 
- Don't push to master
- Other pair reviews pull request 


### Wednesday
All in mob programming/group discussion: 
- [ ] Set up lint 
- [x] Set up Travis 
- [x] Test Travis
- [x] Code of coduct
- [x] Time for ideation and research
- [x] Decide on idea
- [x] Write up architecture (mob)
- [x] Discuss and set up file structure
- [x] Create a server

### Thursday 
- [x] Create a test for router (pair)
- [x] Create a router (pair)
- [x] Create handlers (pair)
    - [x] Create home handler
    - [x] Create css/js/image etc handler
    - [x] Create API call handler
- [x] Create a Request module for API call (pair)
- [x] Set up eventlistener for button click (mob)
- [x] Create a front end call to backend (mob)
- [x] Add callback functions to front end call (mob)
- [x] Create a back-end call to external API  (mob)
- [x] Create Callback functions in front end API (pair)
    - [x] filter or reduce results 
    - [x] Access information to display 
    - [x] Add DOM manipulation to display information 
- [x] Set up basic html, cs, script.js (pair)
- [x] Add drop down list for country selection (pair)
- [x] Style articles (pair)


### Stretch Goals
- [X] Add alt text to images (> DOM manipulation)
- [X] Change all vars to let
- [ ] Test pure functions
- [X] Modularise Code 
- [ ] Write Readme 
- [X] Add continuous integration and code coverage badges to readme
- [ ] Use CodeCov to track test coverage
- [ ] Create an svg map to select the country 

## What we struggled with :angry: 
- Adding the API key 

## What we learned :satisfied:
- Finally understood how the front-end talks to the back-end
- **Network** tab in Inspect 
- dotenv works better than env2 (we learnt to always look at the weekly downloads - many downloads are a positive sign )
