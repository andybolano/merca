app.controller('productosController',['$scope','$http', function ($scope,$http){
        $scope.Productos = {};
        $scope.listaProductos = {};
        refrescar();
        function refrescar(){
            document.getElementById("guardar").disabled = false;
            document.getElementById("actualizar").disabled = true;
            
            $http.get(uri+'/api/productos').success(function (respuesta){
                
                    $scope.listaProductos = respuesta;
                    $scope.Productos = "";
            });
        }
        $scope.guardar = function(){
		$http.post(uri+'/api/productos', $scope.Productos).success(function (respuesta){
                    toastr["success"](respuesta.message);
		        refrescar();
		});
        }    
        $scope.limpiar = function(){
		document.getElementById("guardar").disabled = false;
		document.getElementById("actualizar").disabled = true;
		$scope.Productos = "";
	};   
        $scope.cargarModificar = function(item){
		document.getElementById("actualizar").disabled = false;
		document.getElementById("guardar").disabled = true;
                $scope.Productos = item;
	};       
        $scope.modificar = function(){
		$http.put(uri+'/api/productos/'+$scope.Productos.id, $scope.Productos).success(function (respuesta){
			toastr["success"](respuesta.message);
                        
                         refrescar();
			document.getElementById("guardar").disabled = false;
			document.getElementById("actualizar").disabled = true;
		});
	};
        
        $scope.showDescripcion = function(descripcion){
            document.getElementById("descripcion").value=descripcion;
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
		$http.delete(uri+'/api/productos/' + id).success(function (respuesta){
                       swal("Eliminado!", "Este producto ahora no existe.", "success"); 
                            refrescar();
                    });
                });
	};
 
    }]); 

