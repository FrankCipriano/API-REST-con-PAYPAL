const dotenv=require(`dotenv`).config

dotenv()
const PAYPAL={
    CLIENT_ID:process.env.CLIENT_ID,
    SECRET:process.env.SECRET,
    SANDBOX:process.env.SANDBOX
}

module.exports=PAYPAL