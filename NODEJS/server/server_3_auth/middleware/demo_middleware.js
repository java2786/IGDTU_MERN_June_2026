exports.middleware_usage = (req, res, next)=>{
    console.log("in middleware")
    console.log(req.body)
    res.json({data: "123"})
}
