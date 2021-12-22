const express=require(`express`),
    port=(process.env.PORT || 3000),
    app=express(),
    morgan=require(`morgan`),
    payment_route=require(`./routes/payment.route.js`),
    public_dir=express.static(`${__dirname}/public`)

app.set(`port`,port)
    .use(morgan(`dev`))
    .use(public_dir)
    .use(payment_route)

module.exports=app