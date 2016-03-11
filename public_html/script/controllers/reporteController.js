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
app.controller('reporteController',['$scope','$http', function ($scope,$http){
        
        $scope.listamovimiento={};
        $scope.movimiento ={};
        
        $scope.movimiento.fechaI;
        $scope.movimiento.fechaF;
        
        $scope.Loadreport = function (){
            var dato ={};
            dato.fechainicio=$scope.movimiento.fechaI;
            dato.fechaF=$scope.movimiento.fechaF;
            
            var fecha= new Date(dato.fechaI);
            var dc = fecha.getDate();
            var mc = fecha.getMonth()+1; //hoy es 0!
            var yc = fecha.getFullYear();

            if(dc<10) {
                dc='0'+dc;
            } 

            if(mc<10) {
                mc='0'+mc;
            } 
           var fec = yc+"/"+mc+"/"+dc;
      
           var fechaf= new Date(dato.fechaF);
            var dcf = fechaf.getDate();
            var mcf = fechaf.getMonth()+1; //hoy es 0!
            var ycf = fechaf.getFullYear();

            if(dcf<10) {
                dcf='0'+dcf;
            } 

            if(mcf<10) {
                mcf='0'+mcf;
            } 
           var fecf = ycf+"/"+mcf+"/"+dcf;
            $http.get(uri+'/api/Reportinventario/'+$scope.movimiento).success(function (respuesta){
                    $scope.listaProductos = respuesta;
                    console.log($scope.listaProductos)
            });
        };
        
        
    }]); 

