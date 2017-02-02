<?php

define("DB_SERVER", "localhost");
define("DB_USER", "root");
define("DB_PASS", "");
define("DB_NAME", "crud");

define("USER_TIMEOUT", 10);
define("GUEST_TIMEOUT", 5);

class Database {
	public $conn;
	
	public function Database() {
		try {
			$this->conn = new PDO("mysql:host=".DB_SERVER.";dbname=".DB_NAME, DB_USER, DB_PASS);
		}
		catch(Exception $e) {
			die("ERROR: " . $e->getMessage());
		}
	}
}

$database = new Database();
?>