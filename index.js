// implement your API here
const express = require("express");
const DataBase = require("./data/db.js");
const server = express();
server.use(express.json());



server.get("/", (req, res) => {
    res.send("Project one");
  });

server.post("/api/users", (req,res) => {
    DataBase
    .find()
    .then(users => res.status(200).json(users))
    .catch(error => {
        console.log(error);
        res.status(500).json({message: "The users information could not be retrived"})
    })
})












  server.get("/api/users/:id", (req, res) => {
      const id = req.params.id;
    DataBase.findById(id)
    .then(user => {
        console.log("user", user);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({error: " The user with the specified ID does not exist"})
        }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: "The user information could not be retrived"})
        })
    })



const port = 7000;
server.listen(port, () => console.log(`\n** API on port ${port} **\n`));