# Google-Auth-With-Nodejs

This is a web application that can be used to call/get users data in a json format with their permission from their Google account with the help of Google's API **People API**.

- Get all dependencies/Package modules but running **npm install** just before use.

- To start the server run **node index.js**, also we're running on **localhost:3000**.

**Steps to implement Google authentication**

1. Create / Send authentication request from this NodeJS API.
2. Access user data from Google.

# **How To Get Yours Working (Prerequisites)**

- Create a new project and get the corresponding OAuth credentials using Google developer console page. https://console.developers.google.com/ (make sure you have a gmail account).

- Select APIS & AUTH –> APIs from Google project dashboard and enable **People's API**.

- Select APIS & AUTH –> credentials from the left menu.

- Click Create new Client ID button and complete data on this wizard (make sure to use http://locahost:3000 as authorized origin's URL and **/auth/google/callback** as authorized redirect's URL since we are still running our NodeJS server locally on port **3000**, you could just use anything you want but make sure it corresponding with the URL you will be making the request with). 

- After submitting this form, we can get the client Id, secret key and etc as below,

- Click Create New Key to create server key as Google project’s developer key. We should keep this key secure.

- Finally, we have to design consent screen that will be shown on requesting user data.

- All the credentials we got from this step will be used later in our code for creating client request.

# One Major Change Needed

- You need to make an edit to the file **google_api.json**.

- Replace **REPLACE_ME_WITH_YOUR_CLIENT_ID** with your credential's ID gotten from the final stage above.

- Replace **REPLACE_ME_WITH_YOUR_CLIENT_SECERET** with your credential's Secret gotten from the final stage above.
