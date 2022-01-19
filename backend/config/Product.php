<?php
    class Product{
        //Query type:
        private $queryType;

        //Data:
        private $sku;
        private $name;
        private $price;
        private $attributes;

        public function __construct($thisQueryType = null, $thisSku = null, $thisName = null, $thisPrice = null, $thisAttributes = null){
            $this->queryType = $thisQueryType;

            $this->sku = $thisSku;
            $this->name = $thisName;
            $this->price = $thisPrice;
            $this->attributes = $thisAttributes;
        }

        //Getters:
        public function getQueryType(){
            return $this->queryType;
        }

        public function getSKU(){
            return $this->sku;
        }

        public function getName(){
            return $this->name;
        }

        public function getPrice(){
            return $this->price;
        }

        public function getAttributes(){
            return $this->attributes;
        }
    }
?>