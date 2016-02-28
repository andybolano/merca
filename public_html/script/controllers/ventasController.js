app.controller('ventasController',['$scope','$http', function ($scope,$http){
         var productos = new Array();
        $scope.listaProductos = {};
        $scope.listaCarrito= {};
        
        $scope.productos = function (){
            $http.get(uri+'/api/productos').success(function (respuesta){
                    $scope.listaProductos = respuesta;
            });
        }
        
        $scope.addCart = function(producto){
          productos.push(producto);
          $scope.listaCarrito = productos;
        }
       
    }]); 



