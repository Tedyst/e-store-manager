<?php
//Headers:
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

//Import files:
require_once './config/Database.php';
require_once './config/RequestHandler.php';
require_once './config/Product.php';

//Decode parsed data:
$data = json_decode(file_get_contents("php://input"));

//Instantiate database:
$database = new Database();
$db = $database->connect();

//Instantiate request handler:
$requestHandler = new RequestHandler($db);

//Instantiate product:
$product = new Product($data->method ?? null, $data->sku ?? null, $data->name ?? null, $data->price ?? null, $data->attributes ?? null);

//Handle request:
$response = $requestHandler->handleProduct($product);

//Response:
echo json_encode($response);
?>
