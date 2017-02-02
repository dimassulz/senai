var app = angular.module('myApp' , []);

app.filter('ativo', function(){
	
	return function(input){
	if(input == 'S')
		return 'Sim';
	else
		return 'Não';	
	};
});

app.controller('myCtrl' , function($scope , $http){

	$scope.empregados = [];
	$scope.empregadoData = {};
	$scope.selected = {};

	$scope.add = function(){
		
		$scope.empregados.push({
			nome : $scope.name,
			email : $scope.email,
			salario : $scope.salario,
			ativo : $scope.ativo
		});
		console.log($scope.empregados);
	};


	$scope.addtoDB = function(){
		
		$scope.empregadoData = {
			nome : $scope.nome,
			email : $scope.email,
			salario : $scope.salario,
			ativo : $scope.ativo
		};
		
		var res = $http.post('pages/ngProcess.php', 
		{
			action : 'addEmpregado',
			data : $scope.empregadoData
		});
		res.success(function(data, status, headers, config) {
			console.debug(data);
			if(data.status == true){
				bootbox.alert('Empregado adicionado com sucesso!!!!');
				$scope.getEmp();
			}
			
		});
		res.error(function(data, status, headers, config) {
			alert('Ocorreu um erro ao adicionar!');
		});
	};

	$scope.getEmp = function(){
		
		var res = $http.post('pages/ngProcess.php', 
		{
			action : 'getEmpregado'
		});
		res.success(function(data, status, headers, config) {
			$scope.empregados = data;
		});
		res.error(function(data, status, headers, config) {
			bootbox.alert('Ocorreu um erro ao retornar dados do Banco de dados!');
		});
	};
	
	$scope.deleteEmp = function(empregado){

		bootbox.confirm('Deseja deletar esse registro?', function(reg){
			if(reg === true){
				var res = $http.post('pages/ngProcess.php', 
				{
					action : 'deleteEmpregado',
					data : empregado
				});
				res.success(function(data, status, headers, config) {
					if(data.status == true){
						$scope.getEmp();
						bootbox.alert('Deletado com sucesso!');
					}
				});
				res.error(function(data, status, headers, config) {
					bootbox.alert('Ocorreu um erro ao deletar os dados!');
				});
			}
		});
	};
	
	
	$scope.getTemplate = function (empregado) {
        if (empregado.id === $scope.selected.id){
			return 'edit';
		}
        else return 'mostrar';
    };
	
	$scope.reset = function () {
        $scope.selected = {};
    };
	
	$scope.editEmp = function (empregado) {
        $scope.selected = angular.copy(empregado);
    };
	
	$scope.updateEmpregado = function(empregado) {
		var res = $http.post('pages/ngProcess.php', 
		{
			action : 'updateEmpregado',
			data : empregado
		});
		res.success(function(data, status, headers, config) {
			if(data.status == true){
				$scope.reset();
				$scope.getEmp();
				bootbox.alert('Atualizado com sucesso!');
			}
			
		});
		res.error(function(data, status, headers, config) {
			bootbox.alert('Ocorreu um erro ao atualizar! ');
			console.log("Error updating");
		});
	};
});