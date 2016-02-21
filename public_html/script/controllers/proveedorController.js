app.controller('proveedoresController',['$scope','$http', function ($scope,$http){
        $scope.Proveedor = {};
        $scope.listaProveedores = {};
        refrescar();
        function refrescar(){
            document.getElementById("guardar").disabled = false;
            document.getElementById("actualizar").disabled = true;
            
            $http.get(uri+'/api/proveedores').success(function (respuesta){
                
                    $scope.listaProveedores = respuesta;
                    $scope.Proveedor = "";
            });
        }
        $scope.guardar = function(){
            console.log($scope.Proveedor)
		$http.post(uri+'/api/proveedores', $scope.Proveedor).success(function (respuesta){
                    toastr["success"](respuesta.message);
		        refrescar();
		});
        }    
        $scope.limpiar = function(){
		document.getElementById("guardar").disabled = false;
		document.getElementById("actualizar").disabled = true;
		$scope.Proveedor = "";
	};   
        $scope.cargarModificar = function(item){
		document.getElementById("actualizar").disabled = false;
		document.getElementById("guardar").disabled = true;
                $scope.Proveedor = item;
	};       
        $scope.modificar = function(){
		$http.put(uri+'/api/proveedores/'+$scope.Proveedor.id, $scope.Proveedor).success(function (respuesta){
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
		$http.delete(uri+'/api/proveedores/' + identificacion).success(function (respuesta){
                       swal("Eliminado!", "Este proveedor ahora no existe.", "success"); 
                            refrescar();
                    });
                });
	};
 
    }]); 

