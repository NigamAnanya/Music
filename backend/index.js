const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();

var mongo = require("mongodb");
var MongoClient = require("mongodb").MongoClient;
// var url = "link";

// MongoClient.connect(url, function(err, db){
//   if(err) throw err;
//   console.log("DATABASE CREATED");
//   db.close();
// })

var url =
  "mongodb+srv://musicplayer:musicplayer@musicplayer.iaewkuk.mongodb.net/musicplayer";

const client = new MongoClient(url);
const database = client.db("musicplayer");
const songs = database.collection("songs");
const users = database.collection("users");

console.log("DATABASE CREATED");
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/getSongs", async (req, res) => {
  const allSongs = await songs.find().toArray();
  res.send(JSON.stringify(allSongs));
});

app.get("/searchSongs", async (req, res) => {
  try {
    if (req.query.songname == null) {
      res.send("Error finding the song");
      res.status(400);
    }
    const songName = req.query.songname;

    const player = {
      //obj
      songName,
    };

    const play = await songs.find(player).toArray();
    res.send(JSON.stringify(play));
    // res.send("Search song");
    res.status(200);
  } catch {
    res.status(400);
    res.send("Error finding the song");
  }
});

app.post("/UploadSongs", async (req, res) => {
  try {
    if (
      req.body.songName == null &&
      req.body.artist == null &&
      req.body.url == null
    ) {
      res.status(400);
      res.send("Error detected in uploading");
    }
    const songName = req.body.songName; // take innput from the users
    const artist = req.body.artist;
    const url = req.body.url;

    const player = {
      // make objects to store things in the dessired things
      songName,
      artist,
      url,
    };

    const play = await songs.insertOne(player); // result
    res.send("Song added”");
    res.status(200);
  } catch {
    res.status(400);
    res.send("Error detected in uploading");
  }
});

app.post("/deleteSongs", async (req, res) => {
  try {
    if (
      req.body.songName == null &&
      req.body.artist == null &&
      req.body.url == null
    ) {
      res.status(400);
      res.send("Error detected in deletion");
    }
    const songName = req.body.songName;
    const artist = req.body.artist;
    const url = req.body.url;

    const player = {
      songName,
      artist,
      url,
    };
    const play = await songs.deleteOne(player);

    res.send("Song Deleted”");
    res.status(200);
  } catch {
    res.status(400);
    res.send("Error detected in deletion");
  }
});

app.post("/signUp", async (req, res) => {
  try {
    const userName = req.body.userName;
    const email = req.body.email;

    const credentials = {
      userName,
      email,
      isAdmin: false,
    };

    const cred = await users.find(credentials).toArray();

    if (cred.length > 0) {
      res.status(400);
      res.send("Already Existing");
    } else {
      const cred = await users.insertOne(credentials);
      res.send("Sign Up Successful");

      let token;
      try {
        token = jwt.sign(
          {
            userName: credentials.userName,
            email: credentials.email,
          },
          "secretkeyappearshere",
          { expiresIn: "1h" },
        );
        res.send({ userName, email, token });
        res.status(200);
      } catch {
        res.status(400);
        res.send("Already existing");
      }
    }
  } catch {
    res.send("Already Existing");
    res.status(400);
  }
});

app.post("/login", async (req, res) => {
  try {
    const userName = req.body.userName;
    const email = req.body.email;

    const credentials = {
      userName,
      email,
    };

    const cred = await users.find(credentials).toArray();

    if (cred.length > 0) {
      res.status(400);
      res.send("Already Existing");
    } else {
      res.send("Sign Up Successful");

      let token;
      try {
        token = jwt.sign(
          {
            userName: credentials.userName,
            email: credentials.email,
          },
          "secretkeyappearshere",
          { expiresIn: "1h" },
        );
        res.send({ userName, email, token });
        res.status(200);
      } catch {
        res.status(400);
        res.send("Already existing");
      }
    }
  } catch {
    res.send("Already Existing");
    res.status(400);
  }
});

app.listen(port, () =>
  console.log(`Hello music player listening on port ${port}!`),
);