<!-- @format -->

This Project is Created with Vite.
Version of Node.js using in this project while creating this Project is 20.9.0.
For designing I'm using MUI.

# How to run this Project?

- Your Node.js version will be 20.9.0
- To run this project first you have to run command "npm i" to install dependencies
- Run command npm run dev

# Searching

As searching is made from Frontend side so, I'm searching on the basis of name(which includes title, first and last name) and with Email.

# Pages and Components
- This project have two main pages one for listing of Users and other is for details of perticular user
- I have made componets for Pagination, Search, Profile Card and User Listing.

# Map 
For address of the User I'm showing Google Map and the Api key I'm directly provide in the code. It should be in the ENV file but we don't push Env files so therefore I'm just writing Api key in the code.

# Country Flag
In the provided Api response we have the nationality code so for showing the Flag I'm using another Api to which I provide the nationlaity code which gives the data of that perticular country form where I'm showing the Flag.


- I'm not using axios for Api calling, just use the fetch method to call the Api's. I tried not to use packages and make this project simple.
Generally we are using React Query for Api calling but in this project I'm keeping it simple with calling Api's with Use Effect hook.