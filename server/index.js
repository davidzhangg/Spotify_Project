const express = require("express")
const db = require('./config/database')
const app = express()
const cors = require('cors')


app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello")
})

app.post('/api/create', (req, res) => {

    const song = req.body.name
    const id = req.body.id
    const artists = req.body.artists
    const duration = req.body.duration_ms
    const date = req.body.date
    const image = req.body.image
    const link = req.body.link
    const type = req.body.type

    db.query("INSERT INTO songinfo (id, Song, Artists, Duration, date, imageURL, link, type) VALUES(?,?,?,?,?,?,?,?)", [id, song, artists, duration, date, image, link, type],
        (err, result) => {
            if (err) {
                console.log(err)
            }
            res.send(result)
    })
})

app.post('/api/register', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    db.query("INSERT INTO logininfo (username, password) VALUES (?,?)", [username, password],
        (err, result) => {
            if (err) {
                console.log(err)
            }
            res.send(result)
    })
})

app.post('/api/login', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM logininfo WHERE username = ? AND password = ?", [username, password],
        (err, result) => {
            if (err) {
               res.send({err: err});
            } 
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({message: "Wrong username/password combination!"});
            }
           
    });
});

app.get('/api/songs', (req, res) => {
    db.query("SELECT * FROM songinfo", (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
})

app.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id

    db.query("DELETE FROM songinfo WHERE id = ?", id,
        (err, result) => {
            if (err) {
                console.log(err)
            }
            res.send(result)
    })
})


app.listen(3001, () => {
    console.log("server running")
})