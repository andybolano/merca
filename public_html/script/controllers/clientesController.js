app.controller('clientesController',['$scope','$http', function ($scope,$http){
        $scope.Cliente = {};
        $scope.listaClientes = {};
        $scope.proveedores ={};
        refrescar();
        
        
        function refrescar(){
            
            $http.get(uri+'/api/clientes').success(function (respuesta){
                
                    $scope.listaClientes = respuesta;
                    $scope.Cliente = "";
            });
        }
        
        $scope.limpiar = function(){
		document.getElementById("guardar").disabled = false;
		document.getElementById("actualizar").disabled = true;
		$scope.Cliente = "";
	}; 
        
        $scope.cargarModificar = function(item){
		document.getElementById("actualizar").disabled = false;
		document.getElementById("guardar").disabled = true;
                $scope.Cliente = item;
	};       
        
        $scope.modificar = function(){
		$http.put(uri+'/api/clientes/'+$scope.Cliente.id, $scope.Cliente).success(function (respuesta){
			toastr["success"](respuesta.message);
                        
                         refrescar();
			document.getElementById("guardar").disabled = false;
			document.getElementById("actualizar").disabled = true;
		});
	};
        
        
         $scope.eliminar = function(id){
		swal({ 
                    title: "Esta usted seguro(a)?",   
                    text: "No prodrá revertir este cambio, y puede causar daños en otros registros!",  
                    type: "warning",   
                    showCancelButton: true,   
                    confirmButtonColor: "#DD6B55",   
                    confirmButtonText: "Si, eliminar!",   
                    closeOnConfirm: false 
                }, function(){  
		$http.delete(uri+'/api/clientes/' + id).success(function (respuesta){
                       swal("Eliminado!", "Este cliente ahora no existe.", "success"); 
                            refrescar();
                    });
                });
	};
 
    }]); 

