<?php
    class Database{

        //Database params:
        private $host = 'localhost';
        private $db_name = 'products';
        private $username = 'root';
        private $password = '';
        private $connection;

        //Conection:
        public function connect(){
            $this->connection = null;
    
            try {
                $this->connection = new PDO(
                    'mysql:host='.$this->host.';dbname='.$this->db_name,
                    $this->username, $this->password
                );
                
                $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch(PDOException $err) {
                echo 'Connection Error: '.$err->getMessage();
            }

            return $this->connection;
        }
    }
?>