const express = require("express");
const router = express.Router();
const app = express();
const path = require('path');
const mysql = require('mysql');
const query = "SELECT * FROM mymen-info";
// const req = 
// const id = req.params.id;

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'mymen-info'
//   });
    const pool = mysql.createPool({
        connectionLimit: 10,
        host: "localhost",
        user: "root",
        password: "",
        database: "mymen-info",
    });



    // connection.query(query, [id], (error, results) => {
    //     if (error) {
    //     console.error('データベースエラー:', error);
    //     res.status(500).send('データベースエラー');
    //     } else {
    //     if (results.length > 0) {
    //         // rows[]を初期化し、新しいデータで上書き
    //         rows.length = 0; // rows[]をクリア
    
    //         // resultsからデータをrows[]に格納
    //         for (let i = 0; i < results.length; i++) {
    //         rows.push(results[i]);
    //         }
    
    //         // データをJSON形式でクライアントに送信
    //         res.json(results[0]);
    //     } else {
    //         res.status(404).send('データが見つかりませんでした');
    //     }
    //     }  
        // データベースからデータを取得するなどの処理
    //     const rows = []; // データを取得または生成する
    //     res.render("menu", { shopNameId, rows }); // `menu.ejs`にデータを渡す
    // });
    


router.get("/:id", (req, res) => {
    pool.getConnection((err, connection) => {
		if (err) throw err;

		console.log("mysqlと接続中");

		//データ取得
		connection.query("SELECT * FROM info", (err, rows) => {
			connection.release();

			console.log(rows);
			if (!err) {
				res.render("menu", { rows });
			}
		});
	});
});

module.exports = router;