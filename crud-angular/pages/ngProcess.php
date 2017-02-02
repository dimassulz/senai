<?php
include "connection.php";

$postdata = file_get_contents("php://input");
$postdata = json_decode($postdata);
$action = $postdata->action;

if(property_exists($postdata,'data')){
	$data = $postdata->data;
}else{
	$data = null;
}





if($action == "getEmpregado"){
		$com = $database->conn->prepare("SELECT * from empregados");
		$com->execute(array("%$data%"));
		print_r(json_encode($com->fetchAll(PDO::FETCH_ASSOC)));
}

if($action == "addEmpregado"){
		$cmd = "INSERT into empregados (nome, email, salario, ativo) values ('$data->nome', '$data->email' , '$data->salario', '$data->ativo')";
		$com = $database->conn->prepare($cmd);
     	echo json_encode(array('status'=>$com->execute()));
}

if($action == "updateEmpregado"){
		$cmd = "UPDATE empregados set nome = '$data->nome' , email = '$data->email', salario = '$data->salario' , ativo = '$data->ativo' where id = '$data->id'";
		$com = $database->conn->prepare($cmd);
		echo json_encode(array('status'=>$com->execute()));
}

if($action == "deleteEmpregado"){
		$cmd = "DELETE from empregados where id = '$data->id'";
		$com = $database->conn->prepare($cmd);
		echo json_encode(array('status'=>$com->execute()));
}

?>