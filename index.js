const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const todosRouter = require('./routes/todos');
const processEnv = require('dotenv').config({ path: __dirname + '/.env'});

const PORT = processEnv.parsed.PORT ?? 3000;

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(todosRouter)

async function start () {
    try {
    await mongoose.connect(`mongodb+srv://${processEnv.parsed.USER_NAME_DATABASE}:${processEnv.parsed.PASSWORD_DATABASE}@cluster0.vvlmx.mongodb.net/todos`, {
        useNewUrlParser: true,
        useFindAndModify: false
    })
        app.listen(PORT, () => {
            console.log(`Server has been started on ${PORT}`)
        })
    } catch (err) {
        console.log(err, 'ERROR')
    }
}


start()
