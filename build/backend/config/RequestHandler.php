<?php
    Class RequestHandler{

        //Connection to the database:
        private $connection = null;
        
        public function __construct($database){
            $this->connection = $database;
        }

        public function handleProduct($product){
            
            $query = null;

            $currentSKU = $product->getSKU();
            $currentName = $product->getName();
            $currentPrice = $product->getPrice();
            $currentAttributes = $product->getAttributes();

            //Get products:
            if($product->getQueryType() == 'get')   $query = "SELECT * FROM products";
            
            //Get a single product:
            else if($product->getQueryType() == 'get-single')   $query = "SELECT * FROM products WHERE sku='$currentSKU'";
            
            //Insert products:
            else if($product->getQueryType() == 'insert')   $query = "INSERT INTO products (sku, name, price, attributes) VALUES ('$currentSKU', '$currentName', '$currentPrice', '$currentAttributes')";

            //Delete products:
            else if($product->getQueryType() == 'delete')   $query = "DELETE FROM products WHERE sku = '$currentSKU'";

            if($query){
                $queryDB = $this->connection->prepare($query);
                $queryDB->execute();

                if($product->getQueryType() == 'get' || $product->getQueryType() == 'get-single'){
                    $response = $queryDB->fetchAll(PDO::FETCH_ASSOC);
                    return $response;
                }
            }

            return null;
        }
    }
?>