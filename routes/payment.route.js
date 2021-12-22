const express=require(`express`),
    router=express.Router(),
    payment=require(`../controllers/payment.controller.js`)

router.post(`/crear`,payment.crearOrden)
    .get(`/capturar`,payment.capturarOrden)
    .get(`/cancelar`,payment.cancelarOrden)

module.exports=router