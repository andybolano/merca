app.controller('ventasController',['$scope','$http', function ($scope,$http){
        $("#factura").hide();
        var TOTAL_BODEGA=0;
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
         $scope.listamovimiento = {};
         
          Date.prototype.toDateInputValue = (function() {
                var local = new Date(this);
                local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
                return local.toJSON().slice(0,10);
          });
          
         document.getElementById('fechaCompra').value = new Date().toDateInputValue();  
         
        
         
        $scope.productos = function (){
            var DESCUENTOS=0;
            $http.get(uri+'/api/Reportinventario/existencia/get').success(function (respuesta){
                    $scope.listaProductos = respuesta;
                    angular.forEach($scope.listaProductos,function (item,i){
                    console.log('existencia'+item.EXISTENTE);
                    
                    if (item.EXISTENTE==null) {item.EXISTENTE=0;}
                    if (item.ENTRADA_C==null) {item.ENTRADA_C=0;}
                    if (item.TOTAL_T==null) {item.TOTAL_T=0;}
                    if (item.TOTAL_DV==null) {item.TOTAL_DV=0;}
                    if (item.TOTAL_TA==null) {item.TOTAL_TA=0;}
                    if (item. TOTAL_VB==null) {item. TOTAL_VB=0;}
                    
                    
                    
                    DESCUENTOS = parseInt(item.TOTAL_T) + parseInt(item.TOTAL_TA) + parseInt(item. TOTAL_VB);
                    
                    console.log('descuentos'+DESCUENTOS+''+item.nombre)
                    
                    TOTAL_BODEGA =parseInt(item.EXISTENTE) + parseInt(item.ENTRADA_C) + parseInt(item.TOTAL_DV) - parseInt(DESCUENTOS);
                    
                    
                    console.log('TOTAL BODEGA'+TOTAL_BODEGA+''+item.nombre);
                    item.EXISTENTE = TOTAL_BODEGA;
                    
                    });
                    console.log($scope.listaProductos);
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
      
        $scope.cambiarValor = function  (index) {
        var cantidad = $scope.listaCarrito[index].cantidad;
        $scope.listaCarrito[index].subtotal = $("#valor"+index).val() * cantidad; 
        $scope.listaCarrito[index].precio= $("#valor"+index).val(); 
        $scope.calcularTotal();
        };
        
        
        $scope.cambiarCantidad = function  (index) {
        var precio = $scope.listaCarrito[index].precio;
        $scope.listaCarrito[index].subtotal = $("#cantidad"+index).val() * precio; 
        $scope.listaCarrito[index].cantidad= $("#cantidad"+index).val(); 
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
                $scope.cuotas.descuento = 0;
            }else if($scope.cuotas.mes == 6){
                $scope.cuotas.descuento =0;
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
            
            $scope.fechasPago = [];
             var fecha;
           
                
           if($scope.cliente.id == undefined){
               toastr["warning"]("A que cliente le realizara la venta?");
           }else{   
                
           for(i=1; i<=$scope.cuotas.mes; i++){
                fecha = sumaFecha(30*i,$('#fechaCompra').val());
                $scope.fechasPago.push({id:i,fecha:fecha})
           }
      
      
     
            var object = {
                cliente: $scope.cliente.id,
                fecha:$('#fechaCompra').val(),
                formaPago : $('#formaPago').val(),
                movimiento : $('#movimiento').val(),
                tiempoPago: $scope.cuotas.mes,
                descuento:$scope.cuotas.descuento,
                descuentoValor:$scope.cuotas.descuentoValor,
                abono:$scope.cuotas.abono,
                subtotal: $scope.grantotal,
                total: $scope.grantotal-$scope.cuotas.descuentoValor,
                numeroCuotas:$scope.cuotas.mes,
                valorCuotas:$scope.cuotas.valor,
                productos: JSON.stringify($scope.listaCarrito),
                fechasPagos:JSON.stringify($scope.fechasPago)
            };
            console.log(object);
           /******PRINT**********************/
            $('#fechaCompra_r').html($('#fechaCompra').val());
            $('#cliente_r').html($scope.cliente.nombre+" "+$scope.cliente.apellidos);
            $('#cedula_r').html($scope.cliente.cedula);
            $('#telefono_r').html($scope.cliente.telefono);
            $('#direccion_r').html($scope.cliente.direccion);
            
            $http.post(uri+'/api/ventas',object).success(function (respuesta){
              $('#codigo_r').html(respuesta.request);
              console.log(respuesta.request);
              imprimir();
              swal({   title: "Buen Trabajo!",   text:respuesta.message,   timer: 2000,   showConfirmButton: false });
              setTimeout("location.reload()", 2000);
            });
            
          
            
           }
            
         };
         
         sumaFecha = function(d, fecha)
                {    
                 fecha = new Date(fecha);
                 fecha.setDate(fecha.getDate()+parseInt(d));
                 var anno=fecha.getFullYear();
                 var mes= fecha.getMonth()+1;
                 var dia= fecha.getDate();
                 mes = (mes < 10) ? ("0" + mes) : mes;
                 dia = (dia < 10) ? ("0" + dia) : dia;
                 var fechaFinal = anno+"-"+mes+"-"+dia;
                 return (fechaFinal);
                 }
        
         function imprimir() {
      
        var data = jQuery('#factura').html();
        var mywindow = window.open('', 'Factura de Compra Credimar');
        mywindow.document.write('<html><head><title>Factura de Compra Credimar</title>');
        mywindow.document.write(' <link href="../css/impresion.css" rel="stylesheet" type="text/css" media="print"/>');
        mywindow.document.write(data);
        mywindow.document.write('</body></html>');
        setTimeout(function() {
            mywindow.print();

            mywindow.close();


            location.reload();
        }, 250);

    }
    
    
        $scope.reporfecha = function (){
           $scope.movimiento.consulta = 4;
           var  dato={}
            dato.inicial=$scope.movimiento.inicial;
            dato.final=$scope.movimiento.final;
            
            var inic= new Date(dato.inicial);
            var dc = inic.getDate();
            var mc = inic.getMonth()+1; //hoy es 0!
            var yc = inic.getFullYear();

            if(dc<10) {
                dc='0'+dc;
            } 

            if(mc<10) {
                mc='0'+mc;
            } 
           var inicial = yc+'-'+mc+'-'+dc;
      
           var fin= new Date(dato.final);
            var dcf = fin.getDate();
            var mcf = fin.getMonth()+1; //hoy es 0!
            var ycf = fin.getFullYear();

            if(dcf<10) {
                dcf='0'+dcf;
            } 

            if(mcf<10) {
                mcf='0'+mcf;
            } 
           var final = ycf+'-'+mcf+'-'+dcf;
           
          
            $http.get(uri + '/api/ventas/ventastot/'+inicial+'/'+final).success(function(respuesta) {
                $scope.listamovimiento = respuesta;
                console.log($scope.listamovimiento);
                $scope.bodega=true;
                $scope.almacen=false;
                $scope.camioneta=false;
        
                angular.forEach($scope.listamovimiento, function(item, i) {

                });
              
            });
        };

       
    }]); 



