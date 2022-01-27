# Socket Chat API

Socket Chat API its a project that I made using Node.js + Express + MongoDB (Mongoose)

## Installation

You can download the project and install the mongoDB to create a database for testing ou even use mongoDb Atlas


## The project have the following endpoints

```javascript
//ROOMS and MESSAGE functions
//Return all rooms 
GET: /chat/rooms

//Return a room with ID
GET: /chat/rooms/<room_id>

//Used to add a room in the database
POST: /chat/createRoom/

//Delete a room
DELETE: /chat/<room_id>

//Retorna as mensagens de uma sala
GET:  /chat/<room_id>

//Adiciona uma mensagem referenciando uma sala
POST:  /chat/<room_id>
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)