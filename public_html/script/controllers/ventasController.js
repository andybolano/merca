app.controller('ventasController',['$scope','$http', function ($scope,$http){
        
        $scope.listaProductos = {};
        $scope.listaCarrito= [];
        $scope.cantidad = 1;
        $scope.total=0;
        $scope.grantotal = 0;
        $scope.cuotas = {};
         $scope.cuotas.numero = 1;
         $scope.cuotas.valor = 0;
         $scope.cuotas.descuento= 0;
         $scope.cuotas.abono = 0;
         $scope.cliente = {};
         
         
          Date.prototype.toDateInputValue = (function() {
                var local = new Date(this);
                local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
                return local.toJSON().slice(0,10);
          });
          
         document.getElementById('fechaCompra').value = new Date().toDateInputValue();  
         
        
         
        $scope.productos = function (){
            $http.get(uri+'/api/productos').success(function (respuesta){
                    $scope.listaProductos = respuesta;
            });
        };
        
        $scope.addCart = function(producto){
     
        for (var i = 0; i < $scope.listaCarrito.length; i++) {
                if (producto.id == $scope.listaCarrito[i].id){
                     toastr["error"]("El producto ya se encuentra en el carrito de compra, por favor verifique.");
                    return;
                }
            };
        var cantidad = 1;
        var subtotal = parseInt(cantidad) * parseInt(producto.precioVenta);
 
        
        $scope.listaCarrito.push({
            id : producto.id,
            nombre : producto.nombre,
            proveedor : producto.proveedor,
            cantidad : cantidad,
            precio : producto.precioVenta,
            subtotal : subtotal
        });
        
         $scope.calcularTotal();
      
        };
        
        $scope.cambiarCantidad = function  (index) {
        var precio = $scope.listaCarrito[index].precio;
        $scope.listaCarrito[index].subtotal = $("#cantidad"+index).val() * precio;  
        $scope.calcularTotal();
        };
        
        $scope.calcularTotal = function (){
            $scope.total=0;
            var i;
            for(i=0;  i<$scope.listaCarrito.length; i++){
            $scope.total += $scope.listaCarrito[i].subtotal;
            $scope.grantotal = $scope.total;
            }
        };
        
        $scope.sacarCarrito = function(index){
             $scope.listaCarrito.splice(index, 1);
             $scope.calcularTotal();
        };
        
        $scope.calcularPago = function(){
            if($scope.cuotas.abono > $scope.total){
                toastr["error"]("El abono ingresado es mayor que el total.");
            }else{
            $scope.cuotas.numero = $scope.cuotas.mes;
            $scope.grantotal =  $scope.total - $scope.cuotas.abono;
            
            
            if($scope.cuotas.mes == 3){
                $scope.cuotas.descuento = 35;
            }else if($scope.cuotas.mes == 6){
                $scope.cuotas.descuento = 25;
            }else{
               $scope.cuotas.descuento = 0;
            }
            
            $scope.cuotas.descuentoValor = $scope.grantotal * $scope.cuotas.descuento / 100;
            
            $scope.cuotas.valor = Math.round((($scope.grantotal- $scope.cuotas.descuentoValor )/parseInt($scope.cuotas.mes))); 
        }
       
        };
        
       $scope.consultarCliente = function(){
           var cedula = $('#cedula').val();
             $http.get(uri+'/api/clientes/'+cedula).success(function (respuesta){
                   if(respuesta==""){
                         toastr["warning"]("El usuario aun no se encuentra registrado en el sistema");
                         $('#registroCliente').modal('show'); 
                   }else{
                       $scope.cliente = respuesta[0];
                   }
            });
        };
        
        $scope.registrarCliente = function(){
             $http.post(uri+'/api/clientes',$scope.cliente).success(function (respuesta){
                 swal("Buen trabajo!", respuesta.message, "success");
                 $('#registroCliente').modal('hide');
                 $scope.cliente = respuesta.request;
            });
            
        };
        
        $scope.registrarVenta = function(){
            var object = {
                cliente: $scope.cliente.id,
                fecha:$('#fechaCompra').val(),
                formaPago : $('#formaPago').val(),
                tiempoPago: $scope.cuotas.mes,
                descuento:$scope.cuotas.descuento,
                descuentoValor:$scope.cuotas.descuentoValor,
                abono:$scope.cuotas.abono,
                subtotal: $scope.grantotal,
                total: $scope.grantotal-$scope.cuotas.descuentoValor,
                numeroCuotas:$scope.cuotas.mes,
                valorCuotas:$scope.cuotas.valor,
                productos: JSON.stringify($scope.listaCarrito)
            };
            
             $http.post(uri+'/api/ventas',object).success(function (respuesta){
                swal({   title: "Buen Trabajo!",   text:respuesta.message,   timer: 3000,   showConfirmButton: false });
                  setTimeout("location.reload()", 3000);
            });
            
          
            
            
            
         };
        
        

       
    }]); 



