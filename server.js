'use strict';

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/usernamedb';
const jsonParser = bodyParser.json();

app.use(express.static(path.join(__dirname, 'public')));

app.post('/hello', jsonParser, (req, res) => {
  if (!req.body) {
    return res.sendStatus(400);
  };

  MongoClient.connect(url, (error, db) => {
    if (error) {
      return console.error(error);
    }

    const database = db.collection('usersnamedb');

    database.insert(req.body, (error, result) => {

      if (error) {
        console.error(error);
        return res.sendStatus(500);
      }

      database.findOne({name: req.body.name}, (error, document) => {
        if (error) {
          console.error(error);
          return res.sendStatus(500);
        }
        res.json(`${document.name}`);
        db.close();
      });
    });
  });
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send('Something broke!');
});

app.listen(6289, () => console.log('Server successfully started on http://localhost:6289/'));
