const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Event = require('./models/Event')

const PORT = 4000

const app = express()

// middle ware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

// db connection
mongoose.connect('mongodb://localhost:27017/EventSignUP')
    .then(() => console.log('mongodb connected'))
    .catch((e) => console.log('error : ' + e))


// Routes
// Home Page: Display all events
app.get('/', async (req, res) => {
    const events = await Event.find({});
    res.render('events', { events });
});

// Create a new event (For Testing)
app.post('/events', async (req, res) => {
    const { title, date, location } = req.body;
    await Event.create({ title, date, location });
    res.redirect('/');
});

// Sign up for an event
app.post('/events/:id/signup', async (req, res) => {
    const { id } = req.params;
    await Event.findByIdAndUpdate(id, { $inc: { signupCount: 1 } });
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`)
})

