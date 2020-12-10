# raptormaps-react

A react application that reads position data from the server and displays it as points on a map. It also shows a notification if two technicians get close to each other. 

# How does it work?

In order to run the server, open the server with command shell or vs code and run yarn start or yarn dev. This will run the server on port 4000. 

In order to run the client, open the client with command shell or vs code and run yarn start. This will run the client server on port 3000. 

There is a settings tab where you can change the technician names and current positions. You can also add and delete technicians in the settings and change the solar farm id. 

There is a randomize positions button which randomizes the positions of the technicians. It will send to the server the new random positions but wont pull instantly. So, the update on the screen will show after some delay time. This is done on purpose to simulate the technicians moving in real life. 

# Technologies Used

On the server side, I used TypeGraphQL and typegoose for the storage, reading, and writing of the data. I used GraphQL mainly because I wanted to be able to switch databases at anytime without requiring too much change in the logic. GraphQL is perfect for this, and, in fact, the switching between "databases" is shown in the program. By default, the in memory database is enabled which loads the sample file provided into memory and performs operations on it. You can comment out that import statement and put in the other import statement to read/write from a mongodb database instead (using typegoose). 

On the client side, I used TypeScript and React for the main code. I also used the material ui package to show the buttons and the modal in the settings. I also used a react notification package for displaying the notifications in a nice way. For the map, I used mapbox GL. 

# What decisions did I make? Why?

The prompt asked to show the most recent data for the technicians at a particular solar farm. I figured, the last inserted data at any point would be the most recent position. So, instead of having to do an expensive query searching all the data for the most recently updated position, I just used the last position added. Then, I would update the position in the application if it's time is greater than the last updated time in the app. This seems to work pretty well. 

I also used polling to keep getting data from the server every 5 seconds. The other way I could have done this is by using web sockets. The reason I decided to use polling over web sockets is because of the prompt. There was a requirement to make a "GET" api but no "POST" api. If I would use web sockets, I would automatically send to all connected clients that the position has changed whenever the POST api for position was called. I will discuss more about this below in the section Socket vs Polling. 

Lastly, I stored all the data for the technicians rather than just the most recent position. I figured this is what was required since the sample data seemed to indicate all the positions were to be stored. I could have, however, only stored the most recent position which is autmatically updated whenever the technicans' positions change.

# Socket vs Polling

I decided to use polling in this application instead of sockets mainly because of the prompt. Normally, for something like this, I would use sockets so that positions could be updated in real time with very little lag in between updates. This would only happen whenever the positions of any technician has changed. Overall, it would lead to less calls to the API and a more effecient system. 

Because I was using polling, I also calculated the distance between the technicians on the client side instead of server side (for notifications). This is so that there would be less server load in a "real life" scenario. However, if there was requirement to, for example, send a push notification to the manager's phone whenever the technicians met, then I would have to change it so that notifications are calculated server side and sent to the manager's phone. 

# Extras

I added a couple extra things that wern't required in the prompt for testing purposes and to simulate, somewhat, a "real" life scenario. These include the settings and randomize positions buttons. To make both of these buttons work properly, I created a POST api that takes an array of technicians and their positions/bearing to determine where they should be on the map. For the sake of this application, all the technician positions are taken all at once rather than seperatly. The reason I did this is so that I wouldn't have to create a "DELETE" api for deleting technicians and also because of the "id" field that was given in the sample output. It seems like the id field increments for every group of technicians. This implied to me that the group is stored together rather than seperatley. 


