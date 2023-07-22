# ArduinoProject-irrigationSystem-manipulation
A Circuit used to manipulate the irrigation system and show some information like speed of irrigiation , humidity of soil , irrigation status ... etc in real time we use for this Websocket protocole to make it smooth with redis server and django (django-channels) and react for the app 
# to run the project follow this steps : 
1- build your circuits ( pototionmeter in A0 pin , soil sensor in A1 sensor in arduino with two button in 8 , 9 digital pins ) <br>
2- clone the repo (make some changes in the port used in our case we use the COM9 port you can change it in consumer.py file in agric app)<br>
3- run the redis server or install it from here : https://github.com/tporadowski/redis/releases ( you will need verion 5.0 or more)<br>
4- install pyseriel and daphne , channels  packages in the django app run this : pip install pyserial  daphne  channels<br>
5- install the websocket pacckage for react app using : npm i wbesocket<br>
6- run django app using : daphne artuino.asgi:application<br>
7- run react app and congrats <br>
