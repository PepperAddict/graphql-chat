# Welcome to GraphQL Chat

Hello! If you're reading this, you're probably an awesome member of the team! 

This app was created with React and Node with the focus on GraphQL/Apollo for the front and back-end. Which end is clearly within their respective folder. Such as the front-end (ReactJS) is in the `frontend` folder where as the back-end (Node/ExpressJs) is in the `backend` folder. 

## Table of Contents 
* [GraphQL](#GraphQL)
* [The Presentation](#The-presentation)
* [See it in Action](#See-it-in-action)
* [What the App Does](#What-the-App-Does)
* [Some things to note](#Notes)
* [Problems](#Problems)

## GraphQL 

* Backend - The GraphQL setup is a middleware so you'll find it in `backend>middleware>graphql`. All the setup was created within that folder. There are two different schema folders that achieve the same purpose but was created to show the different ways to write it. 
* Frontend - The GraphQL queries were saved in `frontend>helpers>graphql.js`


## The presentation 

A presentation was created to go with this project, to access it, click [here](https://docs.google.com/presentation/d/1vaq3VCaOYX4slT3khjKx212wMpilsHATN5NNvB6ynXA/edit?usp=sharing)

## See it in action

During the presentation I should have a tunnelled server running that others could access, but if you would like to run it yourself, there are a couple of steps you need to do: 

* install all the packages `npm i` or `yarn i`
* Build the app `npm run build` or `yarn run build`
* start the app `npm start` or `yarn start`
* You should see the server running at `http://localhost:8080` and the **GraphQL** playground running at `http://localhost:8080/graphql`

## What the App Does

* Choose a nickname
* Toggle between chat or upload for the type of message you want shared with others
* Chat will let you send a message
* Upload will let you send an image. Dragging an image over also works. 
* Nicknames that match the message's name are deletable.

## Notes

* If you are running this app locally, the "database" is [neDB](https://github.com/louischatriot/nedb). You can find the file `database.db` of any data that was stored on your end. This file is not shared. 

* Images uploaded from the front-end are stored in `public>images` and are not shared... But will be stored on my local machine.... so.... yeah....

## Problems 

* The upload feature is executed with a standard POST request handled by multer rather than GraphQL because [apollo-upload-client](https://github.com/jaydenseric/apollo-upload-client) doesn't work alongside [Subscription link](https://www.apollographql.com/docs/react/data/subscriptions/#4-provide-the-link-chain-to-apollo-client) and I was too lazy to research a better client-side graphql upload tool.

* This app had little to no thought when it comes to security, UI, responsiveness, and other stuff...
