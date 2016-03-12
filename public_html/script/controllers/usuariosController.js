app.controller('usuariosController',['$scope','$http', function ($scope,$http){
        $scope.Usuario = {};
        $scope.listaUsuarios= {};
        refrescar();
        function refrescar(){
            document.getElementById("guardar").disabled = false;
            document.getElementById("actualizar").disabled = true;
            
            $http.get(uri+'/api/usuarios').success(function (respuesta){
                
                    $scope.listaUsuarios = respuesta;
                    $scope.Usuario = "";
            });
        }
        
        
        $scope.guardar = function(){
            console.log($scope.Usuario)
		$http.post(uri+'/api/usuarios', $scope.Usuario).success(function (respuesta){
                    toastr["success"](respuesta.message);
		        refrescar();
		});
        }    
        $scope.limpiar = function(){
		document.getElementById("guardar").disabled = false;
		document.getElementById("actualizar").disabled = true;
		$scope.Usuario = "";
	};   
        $scope.cargarModificar = function(item){
		document.getElementById("actualizar").disabled = false;
		document.getElementById("guardar").disabled = true;
                $scope.Usuario = item;
	};       
        $scope.modificar = function(){
		$http.put(uri+'/api/usuarios/'+$scope.Usuario.id, $scope.Usuario).success(function (respuesta){
			toastr["success"](respuesta.message);
                        
                         refrescar();
			document.getElementById("guardar").disabled = false;
			document.getElementById("actualizar").disabled = true;
		});
	};
        
        $scope.showDescripcion = function(descripcion){
            document.getElementById("descripcion").value=descripcion;
        };
        
         $scope.eliminar = function(identificacion){
		swal({ 
                    title: "Esta usted seguro(a)?",   
                    text: "No prodrá revertir este cambio, y puede causar daños en otros registros!",  
                    type: "warning",   
                    showCancelButton: true,   
                    confirmButtonColor: "#DD6B55",   
                    confirmButtonText: "Si, eliminar!",   
                    closeOnConfirm: false 
                }, function(){  
		$http.delete(uri+'/api/usuarios/' + identificacion).success(function (respuesta){
                       swal("Eliminado!", "Este proveedor ahora no existe.", "success"); 
                            refrescar();
                    });
                });
	};
 
    }]); 

