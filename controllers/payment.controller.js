const axios=require(`axios`),
    paypal=require(`../config.js`)

function Payment(){}
Payment.prototype.crearOrden= async(req,res)=>{
    try {
        const orden={
            intent:"CAPTURE",
            purchase_units:[
                {
                    amount:{
                        currency_code:"USD",
                        value:"99.99"
                    },
                    description:"desarrollo de e-commerce",
                },
            ],
            application_context:{
                brand_name:"e-commerce_name.com",
                landing_page:"LOGIN",
                user_action:"PAY_NOW",
                return_url:"http://127.0.0.1:3000/capturar",
                cancel_url:"http://127.0.0.1:3000/cancelar",
            }
        }
        //-CREAR UN OBJETO URL
        const parametros=new URLSearchParams()
        parametros.append(`grant_type`,`client_credentials`)
        
        //-GENERAR UN TOKEN MEDIANTE AJAX
        const obtener_token=await axios.post(`https://api-m.sandbox.paypal.com/v1/oauth2/token`,parametros,{
           headers:{
               "Content-Type":"application/x-www-form-urlencoded",
           },
           auth:{
               username: paypal.CLIENT_ID,
               password: paypal.SECRET,
           }
        })
        let access_token=obtener_token.data.access_token
    
        //-OBTENER LOS ENLACES PAYMENTS CON EL TOKEN GENERADO
        const obtener_enlaces=await axios.post(`${paypal.SANDBOX}/v2/checkout/orders`,orden,{
           headers:{
               Authorization:`Bearer ${access_token}`,
           }
        })
        res.json(obtener_enlaces.data)
    } catch (error) {
        res.status(500).send(`no fue posible conectar con la API de PAYPAL`)
    }
}
Payment.prototype.capturarOrden=async(req,res)=>{
    const the_token=req.query.token
    const detalle_pago=await axios.post(`${paypal.SANDBOX}/v2/checkout/orders/${the_token}/capture`,{},{
        auth:{
            username:paypal.CLIENT_ID,
            password:paypal.SECRET,
        }
    })
    console.log(detalle_pago)
    res.redirect(`/payed.html`)
}
Payment.prototype.cancelarOrden=(req,res)=>{
    res.redirect(`/`)
}
module.exports=new Payment()