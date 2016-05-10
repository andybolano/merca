/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.controller('FechasventasController',['$scope','$http', function ($scope,$http){
       $("#load").hide();
       $scope.config={};
       $scope.credito=0;
       $scope.contado=0;
       $scope.credi_con=0;
       $scope.listapagos={}
        $scope.reporfecha = function (){
           $scope.movimiento.consulta = 4;
           var  dato={};
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
                var contado = 0;
                var credito = 0;
                var credi_con = 0;
                $scope.listamovimiento = respuesta;
                console.log($scope.listamovimiento);
                $scope.bodega=true;
                $scope.almacen=false;
                $scope.camioneta=false;
        
                angular.forEach($scope.listamovimiento, function(item, i) {
                    if (item.formaPago=="CREDITO") {
                        credito = parseFloat(credito) + parseFloat(item.total);
                    }
                    if (item.formaPago=="CONTADO") {
                        item.total = item.abono;
                        contado = parseFloat(contado) + parseFloat(item.total);
                        
                    }
                    if (item.formaPago=="CREDI-CONTADO") {
                        credi_con = parseFloat(credi_con) + parseFloat(item.total);
                    }
                    setTimeout(function (){ $http.get(uri + '/api/ventas/getdetalle/ventas/'+item.id)
                    .success(function(respuesta) {
                        console.log('detalle'+item.nombre + JSON.stringify(respuesta));
                    });},1200);
                });
                  $scope.credito = credito;
                  $scope.contado = contado;
                  $scope.credi_con = credi_con;
            });
        };
        
        
         $scope.Pagosvencidos = function (){
           $scope.movimiento.consulta = 4;
           var  dato={};
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
            $http.get(uri + '/api/ventas/pagosvencidos/clientes/'+inicial+'/'+final).success(function(respuesta) {
                $scope.listapagos = respuesta;
                console.log($scope.listapagos);   
            });
        };

       
    }]); 



