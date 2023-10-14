const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const mysql = require("mysql");

const pool = mysql.createPool({
	connectionLimit: 10,
	host: "localhost",
	user: "root",
	password: "",
	database: "mymen-info",
});

router.get("/:id", (req, res) => {
	pool.getConnection((err, connection) => {
		if (err) throw err;

		console.log("mysqlと接続中");
		const id = req.params.id;
		//データ取得
		connection.query("SELECT * FROM info WHERE ID = ?", id, (err, rows) => {
			connection.release();
			if (!err) {
				res.render("menu", { rows });
			}
		});
	});
});

module.exports = router;
