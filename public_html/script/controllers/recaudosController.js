app.controller('recaudosController',['$scope','$rootScope','$http', function ($scope,$rootScope,$http){
        $scope.Ventas = {};
        $scope.detalleVenta = {};
        $scope.Productos = {};
        $scope.Recaudos = {};
        $scope.Pago = {};
        $scope.recaudo_total = 0;
        $rootScope.listaPagos = {};
        $rootScope.fechaPagos = {};
        $scope.sapo = 1;
        
                  Date.prototype.toDateInputValue = (function() {
                var local = new Date(this);
                local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
                return local.toJSON().slice(0,10);
          });
          
         
         
       $scope.getVentas = function(){
        document.getElementById('fechaPago').value = new Date().toDateInputValue();
            $http.get(uri+'/api/ventas').success(function (respuesta){
                    $scope.Ventas= respuesta;  
                   
            });
        }
        
        $scope.getByFechas = function(){
            $('#fechaInicial').html($('#fechaInicio').val());
            $('#fechaFinal').html($('#fechaFin').val());
           $http.get(uri+'/api/pagos/Byfecha/'+$('#fechaInicio').val()+'/'+$('#fechaFin').val()).success(function (respuesta){
                    $scope.Recaudos= respuesta;  
                   for(i=0; i< $scope.Recaudos.length; i++){
                      $scope.recaudo_total += parseInt($scope.Recaudos[i].valor);
                   }
               
                   
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
            
             $http.get(uri+'/api/pagosventa/fecha/'+item.idventa).success(function (respuesta){
                    $rootScope.fechaPagos = respuesta;  
            });
          
        }
        
        $scope.deleteVenta = function(item){
            swal({ 
                    title: "Esta usted seguro(a)?",   
                    text: "No prodrá revertir este cambio, Quedara la venta anulada!",  
                    type: "warning",   
                    showCancelButton: true,   
                    confirmButtonColor: "#DD6B55",   
                    confirmButtonText: "Si, eliminar!",   
                    closeOnConfirm: false 
                }, function(){ 
           $http.delete(uri+'/api/ventas/'+item.idventa).success(function (respuesta){
            
                   if(respuesta.request ="true"){
                       swal("Eliminada!", respuesta.message, "success");
                       $scope.getVentas();
                   }       
                });
            });
        };
        
        $scope.registroPago = function(saldo){
            $scope.sapo = 0;
          if( saldo <= 0){
               toastr["error"]("La deduda ya ha sido cancelada, por favor verifique.");
          }else{
              $("#fechaPagoFactura").html($('#fechaPago').val());
            $scope.Pago.fecha = $('#fechaPago').val();
            
            
            
             $scope.Pago.fechaLimite = $('#fechaLimite').val();
               $scope.Pago.id_fechaLimite = $('#id_fechaLimite').val();
            $scope.Pago.saldo = saldo-$scope.Pago.valor;
            $scope.Pago.venta =$scope.detalleVenta.idventa;
         
            $http.post(uri+'/api/pagos',$scope.Pago).success(function (respuesta){
                $scope.imprimirAbono();
                  swal({   title: "Buen Trabajo!",   text:respuesta.message,   timer: 1000,   showConfirmButton: false });
                  setTimeout("location.reload()", 1000);
                 
            });
        }
        }
        
        $scope.deletePago = function(item){
          
            swal({ 
                    title: "Esta usted seguro(a)?",   
                    text: "No prodrá revertir este cambio, Quedara el pago anulada!",  
                    type: "warning",   
                    showCancelButton: true,   
                    confirmButtonColor: "#DD6B55",   
                    confirmButtonText: "Si, eliminar!",   
                    closeOnConfirm: false 
                }, function(){ 
                    
                   var object = {
                        saldo:$scope.detalleVenta.saldo + item.valor,
                        id:item.id,
                        idVenta:item.idVenta,
                        fecha:item.fechaLimite
                    };
               
           $http.post(uri+'/api/pagos/eliminar', object).success(function (respuesta){
            
                   if(respuesta.request ="true"){
                       swal({   title: "Eliminado!",   text:respuesta.message,   timer: 1000,   showConfirmButton: false });
                       setTimeout("location.reload()", 1000);
                       
                   }       
                });
            });
        }
        
        function cargarPagos(idventa){
            $http.get(uri+'/api/pagosventa/'+idventa).success(function (respuesta){
                    $rootScope.listaPagos = respuesta;  
            });
        }
        
        $scope.addFechaLimite = function(value){
            var res = value.split("/");
            if(document.getElementById(res[0]).checked ) {
                    $('#fechaLimite').val(res[1]);
                    $('#id_fechaLimite').val(res[0]);
                }else{
                  
                }
        };
       
       $scope.getVentasD = function (item){
     
           $("#Venta").modal("show");
           $("#fechaCompra").val(item.fecha);
           $("#formaPago").val(item.formaPago);
           $("#movimiento").val(item.tipo_movimiento);
           $("#Factura").val(item.idventa);
       }
       
       $scope.modificqrventa = function ()
       {
           var datos =  
           {  
            'fecha': $("#fechaCompra").val(),
            'formaPago':$("#formaPago").val(),
            'tipo_movimiento':$("#movimiento").val(),
            'id':$("#Factura").val()
           };
           
           console.log(datos);
        $http.put(uri+'/api/ventas/updateventas/venta',datos).success(
          function (respuesta){
                    toastr["success"](respuesta.message);
                });
        };    
 
 $scope.imprimir = function(){
      var data = jQuery('#reporte').html();
        var mywindow = window.open('', 'Reporte De reacaudo Credimar');
        mywindow.document.write('<html><head><title>Reporte de recaudo</title>');
        mywindow.document.write(' <link href="../css/impresion.css" rel="stylesheet" type="text/css" media="print"/>');
        mywindow.document.write(data);
        mywindow.document.write('</body></html>');
        setTimeout(function() {
            mywindow.print();

            mywindow.close();


            location.reload();
        }, 250);
 }
  $scope.printFacturaVenta = function(){
      var data = jQuery('#facturaVenta').html();
        var mywindow = window.open('', 'Reporte De reacaudo Credimar');
        mywindow.document.write('<html><head><title>Reporte de recaudo</title>');
        mywindow.document.write(' <link href="../css/impresion.css" rel="stylesheet" type="text/css" media="print"/>');
        mywindow.document.write(data);
        mywindow.document.write('</body></html>');
        setTimeout(function() {
            mywindow.print();

            mywindow.close();


            location.reload();
        }, 250);
 }
 $scope.preImprimirAbono = function(item){
     $scope.sapo = 1;
     $scope.Pago.valor = item.valor;
     $scope.detalleVenta.saldo = item.saldo;
     $("#fechaPagoFactura").html(item.fecha);
     setTimeout(function(){ $scope.imprimirAbono(); }, 1000);
   
    
     
 }

  $scope.imprimirAbono = function(){
      var data = jQuery('#facturaAbono').html();
        var mywindow = window.open('', 'Factura de Abono Credimar');
        mywindow.document.write('<html><head><title>Factura de Abono Credimar</title>');
        mywindow.document.write(' <link href="../css/impresion.css" rel="stylesheet" type="text/css" media="print"/>');
        mywindow.document.write(data);
        mywindow.document.write('</body></html>');
        setTimeout(function() {
            mywindow.print();

            mywindow.close();


            location.reload();
        }, 250);
 }
    }]); 





