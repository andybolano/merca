/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Creado el 03/03/2016
 * por: Yeiner Meriño Restrepo
 * Controlador para los movimientos realizados en inventario
 */
app.controller('inventarioController',['$scope','$http', function ($scope,$http){
        var lugar;
        $scope.listamovimiento={};
        var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth()+1; //hoy es 0!
        var yyyy = hoy.getFullYear();
        var dato="";
        
        if(dd<10) {
            dd='0'+dd;
        } 

        if(mm<10) {
            mm='0'+mm;
        } 

        hoy = mm+'/'+dd+'/'+yyyy;
        
        var productos = new Array();
        $scope.listaProductos = {};
        $scope.listaCarrito= {};
        
        $scope.Proveedor = {};
        $scope.listaProveedores = [];
        iniciar();
        proveedores();
        
        $scope.movimiento ={};
        $scope.detalle={};
        $scope.movimiento.id_movimiento=""
        
        $scope.listaCarrito.movimiento;
        refrescar();
        
        function refrescar(){
            $http.get(uri+'/api/movimientos').success(function (respuesta){
                
                    $scope.listamovimiento = respuesta;
            });
        }
        
        function  iniciar (){
         $scope.movimiento ={};
        };
        
        $scope.CurrentDate = new Date();//Fecha actual


        $scope.productos = function (){
            $http.get(uri+'/api/productos').success(function (respuesta){
                    $scope.listaProductos = respuesta;
            });
        };
       
        function proveedores (){
           $http.get(uri+'/api/proveedores').success(function (respuesta){
                
                    $scope.listaProveedores = respuesta;
                    $scope.Proveedor = "";
            });  
        };
        
        $scope.addCart = function(producto){
          var cantidad = prompt("Ingrese una cantidad");
          productos.push(
                  {
                      'producto':producto.id,
                      'movimiento':"",
                      'nombre':producto.nombre,
                      'cantidad':cantidad,
                });
          
          $scope.listaCarrito = productos;
          console.log($scope.listaCarrito);
        };
        
        $scope.tipomoviento = function (){
            var tipo = $("#movimiento").val();
            switch (tipo) {
                case "ENTRADA (COMPRA)":
                     dato="E"; 
                     $("#traslado").attr('disabled',true);
                     $("#bodega").attr('disabled',false);
                     $("#proveedor").attr('disabled',false);
                    break;
                    case"ENTRADA (DEVOLUCION)":
                     dato="E";
                     $("#traslado").attr('disabled',true);
                     $("#proveedor").attr('disabled',true);
                    break;
                    case"ENTRADA (CAMIONETA)":
                      dato="E";
                     $("#traslado").attr('disabled',true);
                     $("#proveedor").attr('disabled',true);
                    break;
                    case"TRASLADO  (ALMACEN)":
                        dato="T";
                        $("#traslado").attr('disabled',false);
                     $("#bodega").attr('disabled',true);
                     $("#proveedor").attr('disabled',true);
                    break;
                    case"TRASLADO  (CAMIONETA)":
                        dato="T";
                     $("#bodega").attr('disabled',true);
                     $("#proveedor").attr('disabled',true);
                    break;
            }
        };
       
        $scope.guardar = function(){
            var hoy = new Date();
            var cad=hoy.getHours()+""+hoy.getMinutes()+""+hoy.getSeconds(); 
            $scope.movimiento.id_movimiento=dd+""+mm+""+yyyy+""+cad;
            //$("#guardar").attr("disabled",true);
            console.log($scope.movimiento);
            switch (dato) {
                case "E":
                    $http.post(uri+'/api/movimientos', $scope.movimiento).success(function (respuesta){
                    if (respuesta.message=="Movimiento Guardado Correctamente")
                   {
                        angular.forEach(productos, function(item, key) {
                            item.movimiento = item.movimiento=$scope.movimiento.id_movimiento;
                          });
                          $scope.listaCarrito=productos;
                       $http.post(uri+'/api/movimientosE', $scope.listaCarrito).success(function (respuesta){
                        if (respuesta.message=="Movimiento Guardado Correctamente")
                        {
                          toastr["success"](respuesta.message);      
                          $("#guardar").attr("disabled",false);
                          $scope.movimiento="";
                          $scope.listaCarrito="";
                          productos=[];
                          refrescar()
                        }
                    });         
                   }
                   else
                   {
                      toastr["error"](respuesta.message);
                   }
                    
                    
		});
                    break;
                case "T":
                    alert('Traslado')
                    break;
            }
        }    
    }]); 

