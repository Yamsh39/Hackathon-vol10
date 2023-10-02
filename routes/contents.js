const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();

router.use(mylogger)

router.get("/", (req, res)=>{
    res.send("ユーザー");
});

router.get("/info", (req, res) => {
    res.send("ユーザー情報");
});

router.get("/:id", (req, res) => {
    res.send(`${req.params.id}のユーザー情報を取得しました`)
})

router.post("/:id", (req, res) => {
    res.send(`${req.params.id}のユーザー情報を取得しました`)
})

router.delete("/:id", (req, res) => {
    res.send(`${req.params.id}のユーザー情報を取得しました`)
})

//ミドルウェア
function mylogger(req, res, next) {
    console.log(req.originalUrl);
    next();
};

module.exports = router;