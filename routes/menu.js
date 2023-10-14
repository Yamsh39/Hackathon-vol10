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

router.delete("/:id", (req, res) => {
	const idToDelete = req.params.id;

	pool.getConnection((err, connection) => {
		if (err) {
			throw err;
		}

		connection.query("DELETE FROM info WHERE ID = ?", idToDelete, (err, result) => {
			connection.release();

			if (err) {
				console.error("データの削除中にエラーが発生しました: " + err);
				res.status(500).json({ error: "データの削除に失敗しました。" });
			} else {
				console.log("削除された行数: " + result.affectedRows);
				res.status(200).json({ message: "データが削除されました。" });
			}
		});
	});
});

module.exports = router;
