const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
class App {
    constructor() {
        this.express = express()
        this.isDev = process.env.NODE_ENV || 'production'

        this.middlewares()
        this.views()
        this.routes()
    }

    middlewares() {
        this.express.use(express.urlencoded({ extended: false }))
        this.express.use(session({
            secret: 'MyAppSecret',
            resave: true,
            store: new FileStore({
                path: path.resolve(__dirname, '..', 'tmp', 'sessions')
            }),
            saveUninitialized: true
        }))
    }

    views() {
        
        nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
            watch: true,
            express: this.express,
            autoescape: true
          })

        this.express.set('view engine', 'njk')
    }

    routes() {
        this.express.use(require('./routes'))
    }
}

module.exports = new App().express