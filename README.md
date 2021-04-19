# Guess.jpg

<!-- Image of the project here - Maybe Mockup -->

_by Veerle Prins_

## :black_nib: Description

During the course _Real Time Web_ within the Minor Web Design & Development ([@cmda-minor-web](https://github.com/cmda-minor-web)) we learn to create a real time application using socket.io.

This repository shows a real time web application about **Guess.jpg**: A multiplayer chat game to guess blurred images. This application is made with the [Unsplash API](https://unsplash.com/documentation).

## :globe_with_meridians: Live Link

My web application can be found at the link below:

[Live Demo - Guess.jpg](https://guess-jpg.herokuapp.com/)

## :small_orange_diamond: Features

With **Guess.jpg** you can play against other people to guess what is in the blurred photos. Because the library _socket.io_ is used, it is possible to chat and play in real-time.

As a user you can first create a room. This will give you an ID that you can then forward to your friends so that they can play in the same room. When you are in a room, you can start with Guess.jpg. This way everyone in the room gets to see a blurred photo. Take turns guessing what is shown in the picture. The moment you have guessed the blurred photo, you win a point. When someone from the room has scored x points, you are the winner of the game!

## :pencil2: Ideas & Concept

Before I came to my final concept, I brainstormed to come up with different ideas. This is important so that you have a good idea of where you are going to work and so that you can think about what your application will look like at an early stage.

<details style="margin: 1em 0;">
  <summary style="margin: 1em 0;">First ideas</summary>

My first idea was to create a chat where you can choose from three mini games. For example, I was thinking about the games tic tac toe, snake and air hockey. The tricky thing was that we do have to link an external API. I personally found it very difficult to link an external API to these small games. For this reason, I took a closer look at other possible ideas.

Since I hadn't quite figured it out yet, I started looking from an API. That's how I came up with a whole list of ideas:

- Card game with the Deck of Cards API.
- Photo guesser with the Unsplash / Pexels API.
- Music lyrics quiz with the Musixmatch lyrics / Last FM API.
- Guess the quote with the Famous Quotes API.
- Hangman with random-words API.

Based on this list, I decided to pick three ideas and work them out.

</details>

<details style="margin: 1em 0;">
  <summary style="margin: 1em 0;">Concept 1: AlcoholicMan</summary>

The first idea that I elaborated a bit further is _the hangman_ game. In this game, the idea is normally that you try not to make the person hang himself by guessing the word from letters as quickly as possible. I only slightly adjusted the concept. I thought it would be nicer to have a person drink a glass of beer every time the user gives a wrong letter. Thus, the aim of the game is not to get the person drunk by solving the word. Hence the name: **AlcoholicMan** instead of hangman. I have elaborated this concept in a small sketch:

![image of the sketch: Enter the room.](https://user-images.githubusercontent.com/35265583/114405581-1d660100-9ba7-11eb-99a7-f9b8fd7a07c5.png)![Image of the game sketch: AlcoholicMan ](https://user-images.githubusercontent.com/35265583/114405583-1dfe9780-9ba7-11eb-8f05-131f4986a12e.png)

The idea is that as a user you can first create a 'room' / enter the idea of the room. You then enter the room as a user and you can play AlcoholMan against each other. You try to enter a letter in turn to see if this letter is in the word. If it is done correctly nothing happens, if it is wrong the person has to eat a glass of beer. So the goal: Try not to get the person drunk.

</details>

<details style="margin: 1em 0;">
  <summary style="margin: 1em 0;">Concept 2: Guess.jpg</summary>

The second idea that I developed into a concept is **Guess.jpg**. The idea behind this is that you can go into a room with a number of people and see a blurred image. The person who guesses what is shown in the picture first wins a point. The person who ultimately determined x number of points has won the game. Hence the name: Guess.jpg. I have elaborated this concept in a small sketch:

![Image of the game sketch: Guess.jpg](https://user-images.githubusercontent.com/35265583/114405573-1c34d400-9ba7-11eb-9263-4349057c495c.png)

First, as a user you can create a new room or enter an existing room ID. Then you can start the game Guess.jpg with the people in that room. A blurred image is displayed where you have to guess what is on the image in turn. When you have guessed correctly, you win a point. This continues until an x number of points have been achieved.

Ultimately, this concept was also chosen. The reason for this was that I wanted to make something original and not over complicate it within two weeks.

</details>

<details style="margin: 1em 0;">
  <summary style="margin: 1em 0;">Concept 3: Card game</summary>

The last concept I've outlined is a card game. I myself play quite a lot of card games with friends (sometimes with drinks but sometimes without) and I thought it would be fun to code a card game. I did not really have a specific game in mind for this. I was in doubt between a drinking game and the card game 'pesten' that I often play with other people. I have briefly outlined this concept:

![Image of the game sketch: Card game](https://user-images.githubusercontent.com/35265583/114405548-17702000-9ba7-11eb-98d2-0bb9ccd67aa1.png)

The idea behind this is that you can play a card game together, especially now in corona time since you can't just see everyone. Still, I did not think this concept / idea was the strongest and I did not yet have a clear idea of what exactly I wanted to make.

</details>

## :link: External data source

The API I used is the [Unsplash API](https://unsplash.com/documentation). The reason why I use this API is because for Guess.jpg I need images that provide information about what exactly is shown in the image. This ensures that a guess is made about what is shown in the image.

<details style="margin: 1em 0;">
  <summary style="margin: 1em 0;">Used endpoints</summary>

I used the following endpoints:

`photos/random`  
This endpoint ensures that a random photo is collected. This is important because this random photo can be used in the game to guess what to see.

</details>

<details style="margin: 1em 0;">
  <summary style="margin: 1em 0;">API Response</summary>

After a request (HTTP GET) is made to the API (and if there are no errors) a response is sent back from the server API (HTTP response). This is a JSON object with information about the photo (s) being requested. Below is a response from the Unsplash API with some points of data available to you:

```
{
  "id": ,                 // ID of the photo
  "created_at": ,         // Photo created at date
  "updated_at": ,         // Photo updated at data
  "promoted_at": ,        // Photo promoted at date
  "width": ,              // Width of the photo
  "height": ,             // Height of the photo
  "description": ,        // Description of the photo
  "alt_description": ,    // Alt description of the photo
  "urls": [],             // Array with different sizes of the photo
  "categories": [],       // Array with categories of the photo
  "likes": ,              // Number of times the photo has been liked
  "user": {
    "id": ,               // Photographer's ID
    "username": ,         // Photographer's username
    "name": ,             // Photographer's name
    "location": ,         // Photographer's location name
  },
  "location": [],         // Array with the location where the photo was taken.
  "views": ,              // Number of views
  "downloads": ,          // Number of times the photo has been downloaded
}
```

</details>

## :arrows_counterclockwise: Data Life Cycle

## :bookmark_tabs: Packages

There are a number of packages that have been downloaded for creating this application.

<details style="margin: 1em 0;">
  <summary style="margin: 1em 0;">Dependencies</summary>

#### socket.io

The [**socket.io**](https://www.npmjs.com/package/socket.io) package enables real-time communication between the server (Node.js) and the client (JavaScript). The reason why this package has been downloaded is because it allows a multiplayer game to be played / chat between different users due to a constant connection between clients and the server.

#### express

The [**express**](https://www.npmjs.com/package/express) package is a framework for Nodejs. The reason why this package was downloaded is because express makes it easier to start a routing via the server. In addition, it supports many template engines that make it easier for this project.

#### ejs

The template engine [**ejs**](https://www.npmjs.com/package/ejs) ensures that javascript code can be injected on the client. The reason this package was downloaded is because ejs makes it easier to inject the data sent from the server into the client.

#### express-ejs-layouts

The package [**express-ejs-layouts**](https://www.npmjs.com/package/express-ejs-layouts) is a layout for ejs that works with express. The reason why this package has been downloaded is because it does not create any open tags in the .ejs files at, for example, the body and html tag when coding in the DRY (**D**on't **R**epeat **Y**ourself) way.

#### body-parser

The package [**body-parser**](https://www.npmjs.com/package/body-parser) ensures that the incoming requests can be read in Nodejs under the `req.body`. The reason why this package was downloaded is because it allows the input from the search bar to be read.

#### node-fetch

The package [**node-fetch**](https://www.npmjs.com/package/node-fetch) is a module that actually works exactly like the window.fetch method on the client, but for the server side. The reason why this package was downloaded is because it allowed an API fetch to be made via the server side.

#### dotenv

The package [**dotenv**](https://www.npmjs.com/package/dotenv) is a kind of module that ensures that variables are released from an .env file. The reason this package was downloaded is because dotenv helps to store sensitive data (keys of an API), among other things, without it being visible to everyone when the GitHub repo is downloaded.

</details>

<details style="margin: 1em 0;">
  <summary style="margin: 1em 0;">Dev Dependencies</summary>

#### nodemon

The package [**nodemon**](https://www.npmjs.com/package/nodemon) is installed in the developer dependencies. Nodemon is a tool to ensure that the server is automatically restarted after changes have been made to one of the files. It helps the developer, among other things, by keeping an eye on whether there are changes that could cause possible bugs.

</details>

## :arrow_down: Install

### 1. Install npm :computer:

Before getting started, you need to install nvm. nvm can be installed by typing the following line of code in terminal and pressing enter:

`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh `

If nvm has been successfully installed, you can check the version by typing the following line of code in the terminal and pressing enter:

`nvm --version`

### 2. :open_file_folder: Clone folder

Then you need to download this project and open it with your code editor. To do this, open your terminal with the correct path in which you want this repository. **Example**:

`cd/Desktop/Repos`

Then type the following line of code into your terminal:

`git clone https://github.com/veerleprins/Guess.jpg.git`

With this line of code, you've successfully downloaded the repository to your desired location.

### 3. Install all the packages :bookmark_tabs:

Then type the code below into your terminal:

`npm i`

With this line of code, you download all the packages you need for this repo.

### 4. :white_check_mark: Start and run the code

Go to the repository in the terminal and add the following line of code below:

` npm run start`

Now you can open http://localhost:PORTNAME/ in your browser (with the port that is being given) to view the web application! :raised_hands:

## :pencil: Checklist:

Below I have added a checklist for the application. I used the MoSCoW method to determine which points are more important than others:

<details style="margin: 1em 0;">
  <summary style="margin: 1em 0;">M - Must Haves</summary>

_Requirements:_

- [x] Document all the work in README file.
- [x] Chat function working.
- [x] Create a room system, with an ID.
- [x] Handle users joining & leaving.
- [ ] Fetch Unsplash data.
- [ ] Show random, blurred image.
- [ ] Winning guess gets a point.
- [ ] Point system for every user.
- [x] Deploy Guess.jpg to Heroku.

</details>

<details style="margin: 1em 0;">
  <summary style="margin: 1em 0;">S - Should Haves</summary>

_Wanted, but not necessary:_

- [ ] Add good styling so that Guess.jpeg looks nice to look at.
- [x] Add user names to the chat.
- [ ] Provide a hint option when users cannot guess the image.

</details>

<details style="margin: 1em 0;">
  <summary style="margin: 1em 0;">C - Could Haves</summary>

_If there is enough time left:_

- [ ] See when someone is typing in the chat.
- [x] See when someone is leaving in the chat.

</details>

<details style="margin: 1em 0;">
  <summary style="margin: 1em 0;">W - Would Haves</summary>

_For in the future:_

- [ ] Indicate what level of difficulty you want.
- [ ] Instead of taking turns guessing that the person who gives the correct answer the fastest wins.
- [ ] Create a scoreboard page with all high scores.
- [ ] Look back to see which photos you guessed correctly.

</details>

## :books: Sources

The sources I've used to create this real time web application:

<details style="margin: 1em 0;">
  <summary style="margin: 1em 0;">Packages</summary>

- socket.io (4.0.1). (2021). [Socket.IO enables real-time bidirectional event-based communication.]. npmjs. https://www.npmjs.com/package/socket.io
- nodemon (2.0.7). (2021). [Nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.]. npmjs. https://www.npmjs.com/package/nodemon
- express (4.17.1). (2019). [Fast, unopinionated, minimalist web framework for node.]. npmjs. https://www.npmjs.com/package/express
- ejs (3.1.6). (2021). [Embedded JavaScript template ejs.]. npmjs. https://www.npmjs.com/package/ejs
- express-ejs-layouts (2.5.0). (2018). [Layout support for ejs in express.]. npmjs. https://www.npmjs.com/package/express-ejs-layouts
- dotenv (8.2.0). (2020). [Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.]. npmjs. https://www.npmjs.com/package/dotenv
- node-fetch (2.6.1). (2021). [A light-weight module that brings window.fetch to Node.js]. npmjs. https://www.npmjs.com/package/node-fetch
- body-parser (1.19.0). (2019). [Parse incoming request bodies in a middleware before your handlers, available under the req.body property.]. npmjs. https://www.npmjs.com/package/body-parser

</details>

<details style="margin: 1em 0;">
  <summary style="margin: 1em 0;">Frontend</summary>
</details>

<details style="margin: 1em 0;">
  <summary style="margin: 1em 0;">Backend</summary>
- socket.io. (2021, 11 april). Get started. https://socket.io/get-started/chat
- Unsplash. (z.d.). API Documentation | Free HD Photo API. Unsplash Developers. Retrieved 12 April 2021, from https://unsplash.com/documentation#get-a-random-photo
- Traversy Media. (2020, 24 maart). Realtime Chat With Users & Rooms - Socket.io, Node & Express [Video]. YouTube. https://www.youtube.com/watch?v=jD7FnbI76Hg&t=494s
- Traversy, B. (z.d.). bradtraversy/chatcord. GitHub. Retrieved 14 April 2021, from https://github.com/bradtraversy/chatcord/blob/master/server.js
</details>

## :lock: License

This repo is licensed as [MIT](https://github.com/veerleprins/real-time-web-2021/blob/master/LICENSE) by :copyright: [Veerle Prins](https://github.com/veerleprins), 2021
