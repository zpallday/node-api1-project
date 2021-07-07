// implement your API here
const express = require("express");
const DataBase = require("./data/db.js");
const server = express();
server.use(express.json());



server.get("/", (req, res) => {
    res.send("Project one");
  });



  server.get("/api/users", (req,res) => {
    DataBase
    .find()
    .then(users => res.status(200).json(users))
    .catch(error => {
        console.log(error);
        res.status(500).json({message: "The users information could not be retrived"})
    })
})

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body
    if ( !name|| !bio) {
        res.status(400)
        .json({ error: 'Please provide name and bio for the user.'})
    } else {
    DataBase.insert(req.body)
    .then(obj => DataBase.findById(obj.id))
    .then(user => {
        res.status(201).json(user)
    })
    .catch(()=> {
        res.status(500).json({error: "There was an error while saving the user to the database"})
    })
}
})







  server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
  DataBase.findById(id)
  .then(user => {
      console.log("user", user);
      if (user) {
          res.status(200).json(user);
      } else {
          res.status(404).json({message: " The user with the specified ID does not exist"})
      }
      })
      .catch(error => {
          console.log(error);
          res.status(500).json({error: "The user information could not be retrived"})
      })
  })





server.delete('/api/users/:id', (req,res) => {
    const id = req.params.id
    DataBase.remove(id)
    .then(count => {
        if(count && count > 0) {
            res.status(200).json({message: 'the user was deleted'})
} else {
    res
    .status(404)
    .json({message: "The user with the specified ID does not exist."})
}
})
.catch(() => {
    res.status(500).json({error: 'The user could not be removed'});
})
})




server.put('/api/users/:id', (req, res) => {
    const { name, bio } = req.body;
if (!name || !bio ) {
    res
    .status(400)
    .json({message: 'Please provide name and bio for user'})
    } else {
        DataBase.update(req.params.id, req.body)
        .then(user => {
            if(user) {
                res.status(200).json(user)
            } else {
                res
                .status(404)
                .json({message: 'The user with the specified ID does not exist'});
        }
    })

    .catch(() => {
    res.status(500).json({message: 'The user information could not be modified.',});
        });
     }
    });
 


const port = 7000;
server.listen(port, () => console.log(`\n** API on port ${port} **\n`));