app.controller('recaudosController',['$scope','$rootScope','$http', function ($scope,$rootScope,$http){
        $scope.Ventas = {};
        $scope.detalleVenta = {};
        $scope.Productos = {};
        $scope.Pago = {};
        $rootScope.listaPagos = {};
        
        
       $scope.getVentas = function(){
        
            $http.get(uri+'/api/ventas').success(function (respuesta){
                    $scope.Ventas= respuesta;  
                   
            });
        }
        
        $scope.showVenta = function(item){
             $('#detalleVenta').modal('show'); 
            $scope.detalleVenta = item;
            $http.get(uri+'/api/ventasproducto/'+item.idventa).success(function (respuesta){
                    $scope.Productos = respuesta;  
                    
            });
          
             $http.get(uri+'/api/pagosventa/'+item.idventa).success(function (respuesta){
                    $rootScope.listaPagos = respuesta;  
            });
          
        }
        
        $scope.registroPago = function(saldo){
          if( saldo <= 0){
               toastr["error"]("La deduda ya ha sido cancelada, por favor verifique.");
          }else{
            $scope.Pago.fecha = $('#fechaPago').val();
            $scope.Pago.saldo = saldo-$scope.Pago.valor;
            $scope.Pago.venta =$scope.detalleVenta.idventa;
            $http.post(uri+'/api/pagos',$scope.Pago).success(function (respuesta){
                   swal("Buen Trabajo!", respuesta.message, "success");
                   cargarPagos($scope.detalleVenta.idventa);
            });
        }
        }
        
        function cargarPagos(idventa){
            $http.get(uri+'/api/pagosventa/'+idventa).success(function (respuesta){
                    $rootScope.listaPagos = respuesta;  
            });
        }
       
 
    }]); 



