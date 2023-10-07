const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("登録したメニュー");
});

router.get("/:id",(req,res)=>{
    res.send(`
        <html>
            <head>
                <title>${req.params.id}の情報</title>
            </head>
            <body>
                <h1>${req.params.id}の詳細情報</h1>
                <p>写真</p>
            </body>
        </html>
    `);
});

module.exports = router;