const app = require(`./app.js`)

app.listen(app.get(`port`),()=>{
    console.log(`App listening on http://127.0.0.1:${app.get(`port`)}`)
})