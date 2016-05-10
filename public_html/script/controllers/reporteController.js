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
        var TOTAL_BODEGA = 0;
        
        $scope.listamovimiento={
            'EXISTENTE':"",
            'ENTRADA_C':"",
            'TOTAL_T':"",
            'TOTAL_DV':"",
            'TOTAL_TA':"",
            'TOTAL_VB':"",
            'NOMBRE':"",
            'TOTAL_BODEGA':""
        };
        
        $scope.listamovimientoalm={
            'TOTAL_BA':"",
            'ENTRADA_CAM':"",
            'TOTAL_TA':"",
            'TOTAL_VA':"",
            'EXISTENCIA_A':"",
            'NOMBRE':""
        };
        
        $scope.listamovimientocami={
            'TOTAL_T':"",
            'TOTAL_VCA':"",
            'TOTAL_CAMIONETA':"",
            'ENTRADA_C':"",
            'NOMBRE':""
        };
        
        $scope.movimiento ={};
        
        $scope.bodega=true;
        $scope.almacen=false;
        $scope.camioneta=false;
        
        $scope.movimiento.inicial;
        $scope.movimiento.final;
        $scope.movimiento.consulta;
        
        Loadreport();
        
        
        
        
        function  Loadreport (){
            var DESCUENTOS = 0;
            $http.get(uri + '/api/Reportinventario/existencia/get').success(function(respuesta) {
                $scope.listamovimiento = respuesta;
                angular.forEach($scope.listamovimiento, function(item, i) {

                    if (item.EXISTENTE == null) {
                        item.EXISTENTE = 0;
                    }
                    if (item.ENTRADA_C == null) {
                        item.ENTRADA_C = 0;
                    }
                    if (item.TOTAL_T == null) {
                        item.TOTAL_T = 0;
                    }
                    if (item.TOTAL_DV == null) {
                        item.TOTAL_DV = 0;
                    }
                    if (item.TOTAL_TA == null) {
                        item.TOTAL_TA = 0;
                    }
                    if (item.TOTAL_VB == null) {
                        item.TOTAL_VB = 0;
                    }
                    if (item.TOTAL_BODEGA == null) {
                    item.TOTAL_BODEGA = 0;
                    }
                     if (item.TOTAL_BA == null) {
                        item.TOTAL_BA = 0;
                    }

                    DESCUENTOS = parseInt(item.TOTAL_T) + parseInt(item.TOTAL_TA) + parseInt(item.TOTAL_VB);

                    //console.log('descuentos' + DESCUENTOS + '' + item.nombre)

                    TOTAL_BODEGA = parseInt(item.EXISTENTE) + parseInt(item.ENTRADA_C) + parseInt(item.TOTAL_DV) - parseInt(DESCUENTOS);


                    //console.log('TOTAL BODEGA' + TOTAL_BODEGA + '' + item.nombre);
                    item.TOTAL_BODEGA = TOTAL_BODEGA + parseInt(item.TOTAL_BA);

                });
              
            });
        };
        
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
           
          
            $http.get(uri + '/api/Reportinventario/existencia/fechas/'+inicial+'/'+final).success(function(respuesta) {
                $scope.listamovimiento = respuesta;
                console.log($scope.listamovimiento);
                $scope.bodega=true;
                $scope.almacen=false;
                $scope.camioneta=false;
        
                angular.forEach($scope.listamovimiento, function(item, i) {

                    if (item.EXISTENTE == null) {
                        item.EXISTENTE = 0;
                    }
                    if (item.ENTRADA_C == null) {
                        item.ENTRADA_C = 0;
                    }
                    if (item.TOTAL_T == null) {
                        item.TOTAL_T = 0;
                    }
                    if (item.TOTAL_DV == null) {
                        item.TOTAL_DV = 0;
                    }
                    if (item.TOTAL_TA == null) {
                        item.TOTAL_TA = 0;
                    }
                    if (item.TOTAL_VB == null) {
                        item.TOTAL_VB = 0;
                    }
                    if (item.TOTAL_BODEGA == null) {
                    item.TOTAL_BODEGA = 0;
                    }


                    DESCUENTOS = parseInt(item.TOTAL_T) + parseInt(item.TOTAL_TA) + parseInt(item.TOTAL_VB);

                    //console.log('descuentos' + DESCUENTOS + '' + item.nombre)

                    TOTAL_BODEGA = parseInt(item.EXISTENTE) + parseInt(item.ENTRADA_C) + parseInt(item.TOTAL_DV) - parseInt(DESCUENTOS);


                    //console.log('TOTAL BODEGA' + TOTAL_BODEGA + '' + item.nombre);
                    item.TOTAL_BODEGA = TOTAL_BODEGA;

                });
              
            });
        };
        
        
        function  Loadreportalmacen (){
            var TOTAL_ALMACEN=0;
            $http.get(uri + '/api/Reportinventario/existencia/almacen').success(function(respuesta) {
                $scope.listamovimiento = respuesta;
                $scope.listamovimientoalm = respuesta;
                console.log('mov'+JSON.stringify($scope.listamovimientoalm))
                angular.forEach($scope.listamovimientoalm, function(item, i) {

                    if (item.TOTAL_TA == null) {
                        item.TOTAL_TA = 0;
                    }
                    if (item.TOTAL_VA == null) {
                        item.TOTAL_VA = 0;
                    }
                     if (item.EXISTENCIA_A == null) {
                        item.EXISTENCIA_A = 0;
                    }
                    if (item.ENTRADA_CAM == null) {
                        item.ENTRADA_CAM=0;
                    }
                     if (item.TOTAL_BA == null) {
                        item.TOTAL_BA=0;
                     }
                    
                    TOTAL_ALMACEN = parseInt(item.TOTAL_TA) - parseInt(item.TOTAL_VA);

                    //console.log('TOTAL BODEGA' + TOTAL_ALMACEN + '' + item.nombre);
                    item.EXISTENCIA_A = TOTAL_ALMACEN + parseInt(item.ENTRADA_CAM)-parseInt(item.TOTAL_BA);

                });
            });
        };
        
        function  Loadreportecamioneta (){
            var TOTAL_CAMIONETA=0;
            $http.get(uri + '/api/Reportinventario/existencia/camioneta').success(function(respuesta) {
                $scope.listamovimientocami = respuesta;
                console.log('mov cami'+JSON.stringify($scope.listamovimientocami))
                angular.forEach($scope.listamovimientocami, function(item, i) {

                    if (item.TOTAL_T == null) {
                        item.TOTAL_T = 0;
                    }
                    if (item.TOTAL_VCA == null) {
                        item.TOTAL_VCA = 0;
                    }
                     if (item.ENTRADA_C== null) {
                        item.ENTRADA_C= 0;
                    }
                    TOTAL_CAMIONETA = parseInt(item.TOTAL_T) - parseInt(item.TOTAL_VCA);
                    item.TOTAL_CAMIONETA = TOTAL_CAMIONETA-parseInt(item.ENTRADA_C);

                });
            });
        };
        
        
        $scope.consulta = function (){
        var tipo = $scope.movimiento.consulta;    
            switch (tipo) {
                case "1":
                    Loadreportalmacen();
                     $scope.bodega=false;
                     $scope.almacen=true;
                     $scope.camioneta=false;
                     
                    break;
                case "2":
                    Loadreport();
                     $scope.bodega=true;
                     $scope.almacen=false;
                     $scope.camioneta=false;
                     
                    break;
                case "3":
                  Loadreportecamioneta();
                  $scope.bodega=false;
                  $scope.almacen=false;
                  $scope.camioneta=true;
                  
                break;
            }
        }
        
        $scope.imprimir = function (){
        var tipo = $scope.movimiento.consulta;    
            switch (tipo) {
                case "1":
                    printalm($scope.listamovimientoalm);
                    break;
                case "2":
                    print($scope.listamovimiento);
                    break;
                case "3":
                  printcamioneta($scope.listamovimientocami);
                break;
                   case 4:
                    printFecha($scope.listamovimiento);
                break;
            }
        }
        
        
        var print = function (dato)
        {
            document.getElementById("div-test").innerHTML = "";
            jQuery('#div-test').hide();
            var dto = '<table style="width:700px;font-family:"Courier New";font-size:2px">';
            dto += '<tr>';
            dto += '<td style="text-align:center;font-weight:bold;font.size:16px">INVERSIONES - CREDIMAR - S.A.S</td>';
            dto += '</tr>';
            dto += '</table>';

            dto += '<table style="width:700px;font-family:"Courier New";font-size:2px">';
            dto += '<tr>';
            dto += '<td style="text-align:center;font-weight:bold;font.size:16px">Reporte de inventario</td>';
            dto += '</tr>';
            dto += '</table>';

            dto += '<table style="width:700px;font-family:"Courier New";font-size:1px">';
            dto += '<tr>';
            dto += '<td style="text-align:left">Telefonos :</td>';
            dto += '<td style="text-align:right">301 463 7781 - 313 543 32 47</td>';
            dto += '</tr>';
            dto += '</table>';

            dto += '<table style="width:700px;font-family:"Courier New";font-size:0.5px;" class="table">';
            dto += '<tr>';
            dto += '<td style="text-align:left">Articulo</td>';
            dto += '<td style="">Exis bodega</td>';
            dto += '<td style="">Ingreso compra</td>';
            dto += '<td style="">Devoluciones</td>';
            dto += '<td style="">Ent.camioneta</td>';
            dto += '<td style="">Tras. almacen</td>';
            dto += '<td style="">Tras. camioneta</td>';
            dto += '<td style="">Ventas bodega</td>';
            dto += '</tr>';
            angular.forEach(dato, function(item, key) {
                dto += '<tr>';
                dto += '<td style="text-align:left">' + item.nombre + '</td>';
                dto += '<td style="text-align:left">' + item.TOTAL_BODEGA + '</td>';
                dto += '<td style="">'+item.EXISTENTE+'</td>';
                dto += '<td style="">' + item.TOTAL_DV + '</td> ';
                dto += '<td style="">' + item.ENTRADA_C + '</td> ';
                dto += '<td style="">' + item.TOTAL_T + '</td> ';
                dto += '<td style="">' + item.TOTAL_TA + '</td> ';
                dto += '<td style="">' + item.TOTAL_VB + '</td> ';
                dto += '</tr>';
            });
            dto += '</table>';
            jQuery('#div-test').append(dto);
            var data = jQuery('#div-test').html();
            var mywindow = window.open('', 'my div', 'width=410');
            mywindow.document.write('<html><head><title>my div</title>');

            mywindow.document.write('</head><body >');
            mywindow.document.write(data);
            mywindow.document.write('</body></html>');

            mywindow.document.close(); // necessary for IE >= 10
            mywindow.focus(); // necessary for IE >= 10

            mywindow.print();
            mywindow.close();    
        }
        
         var printalm = function (dato)
        {
            document.getElementById("div-test").innerHTML = "";
            jQuery('#div-test').hide();
            var dto = '<table style="width:700px;font-family:"Courier New";font-size:2px">';
            dto += '<tr>';
            dto += '<td style="text-align:center;font-weight:bold;font.size:16px">INVERSIONES - CREDIMAR - S.A.S</td>';
            dto += '</tr>';
            dto += '</table>';

            dto += '<table style="width:700px;font-family:"Courier New";font-size:2px">';
            dto += '<tr>';
            dto += '<td style="text-align:center;font-weight:bold;font.size:16px">Reporte de inventario</td>';
            dto += '</tr>';
            dto += '</table>';

            dto += '<table style="width:700px;font-family:"Courier New";font-size:1px">';
            dto += '<tr>';
            dto += '<td style="text-align:left">Telefonos :</td>';
            dto += '<td style="text-align:right">301 463 7781 - 313 543 32 47</td>';
            dto += '</tr>';
            dto += '</table>';

            dto += '<table style="width:700px;font-family:"Courier New";font-size:0.5px;" class="table">';
            dto += '<tr>';
            dto += '<td style="text-align:left">Articulo</td>';
            dto += '<td style="">Existencia almacen</td>';
            dto += '<td style="">Total trasladado</td>';
            dto += '<td style="">Ventas almacen</td>';
            dto += '</tr>';
            angular.forEach(dato, function(item, key) {
                dto += '<tr>';
                dto += '<td style="text-align:left">' + item.nombre + '</td>';
                dto += '<td style="text-align:left">' + item.EXISTENCIA_A + '</td>';
                dto += '<td style="">'+item.TOTAL_TA+'</td>';
                dto += '<td style="">' + item.TOTAL_VA + '</td> ';
                dto += '</tr>';
            });
            dto += '</table>';
            jQuery('#div-test').append(dto);
            var data = jQuery('#div-test').html();
            var mywindow = window.open('', 'my div', 'width=410');
            mywindow.document.write('<html><head><title>my div</title>');

            mywindow.document.write('</head><body >');
            mywindow.document.write(data);
            mywindow.document.write('</body></html>');

            mywindow.document.close(); // necessary for IE >= 10
            mywindow.focus(); // necessary for IE >= 10

            mywindow.print();
            mywindow.close();    
        }
        
        
         var printcamioneta = function (dato)
        {
            document.getElementById("div-test").innerHTML = "";
            jQuery('#div-test').hide();
            var dto = '<table style="width:700px;font-family:"Courier New";font-size:2px">';
            dto += '<tr>';
            dto += '<td style="text-align:center;font-weight:bold;font.size:16px">INVERSIONES - CREDIMAR - S.A.S</td>';
            dto += '</tr>';
            dto += '</table>';

            dto += '<table style="width:700px;font-family:"Courier New";font-size:2px">';
            dto += '<tr>';
            dto += '<td style="text-align:center;font-weight:bold;font.size:16px">Reporte de inventario</td>';
            dto += '</tr>';
            dto += '</table>';

            dto += '<table style="width:700px;font-family:"Courier New";font-size:1px">';
            dto += '<tr>';
            dto += '<td style="text-align:left">Telefonos :</td>';
            dto += '<td style="text-align:right">301 463 7781 - 313 543 32 47</td>';
            dto += '</tr>';
            dto += '</table>';

            dto += '<table style="width:700px;font-family:"Courier New";font-size:0.5px;" class="table">';
            dto += '<tr>';
            dto += '<td style="text-align:left">Articulo</td>';
            dto += '<td style="">Existencia almacen</td>';
            dto += '<td style="">Total trasladado</td>';
            dto += '<td style="">Ventas almacen</td>';
            dto += '</tr>';
            angular.forEach(dato, function(item, key) {
                dto += '<tr>';
                dto += '<td style="text-align:left">' + item.NOMBRE + '</td>';
                dto += '<td style="text-align:left">' + item.TOTAL_CAMIONETA+ '</td>';
                dto += '<td style="">'+item.TOTAL_T+'</td>';
                dto += '<td style="">' + item.TOTAL_VCA+ '</td> ';
                dto += '</tr>';
            });
            dto += '</table>';
            jQuery('#div-test').append(dto);
            var data = jQuery('#div-test').html();
            var mywindow = window.open('', 'my div', 'width=410');
            mywindow.document.write('<html><head><title>my div</title>');

            mywindow.document.write('</head><body >');
            mywindow.document.write(data);
            mywindow.document.write('</body></html>');

            mywindow.document.close(); // necessary for IE >= 10
            mywindow.focus(); // necessary for IE >= 10

            mywindow.print();
            mywindow.close();    
        }
        
        var printFecha = function (lista)
        {
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
           
             
            document.getElementById("div-test").innerHTML = "";
            jQuery('#div-test').hide();
            var dto = '<table style="width:750px;font-family:"Courier New";font-size:2px">';
            dto += '<tr>';
            dto += '<td style="text-align:center;font-weight:bold;font.size:16px">INVERSIONES - CREDIMAR - S.A.S</td>';
            dto += '</tr>';
            dto += '</table>';

            dto += '<table style="width:750px;font-family:"Courier New";font-size:2px">';
            dto += '<tr>';
            dto += '<td style="text-align:center;font-weight:bold;font.size:16px">Reporte de inventario</td>';
            dto += '</tr>';
            dto += '</table>';

            dto += '<table style="width:750px;font-family:"Courier New";font-size:1px">';
            dto += '<tr>';
            dto += '<td style="text-align:left">Telefonos :</td>';
            dto += '<td style="text-align:right">301 463 7781 - 313 543 32 47</td>';
            dto += '</tr>';
            dto += '</table>';
            
            dto += '<table style="width:750px;font-family:"Courier New";font-size:1px">';
            dto += '<tr>';
            dto += '<td style="text-align:left">Fecha de consulta :</td>';
            dto += '<td style="text-align:right">'+inicial + " - " +final+'</td>';
            dto += '</tr>';
            dto += '</table>';
            
            dto += '<table style="width:750px;font-family:"Courier New";font-size:0.4px;" class="table">';
            dto += '<tr>';
            dto += '<td style="text-align:left">Articulo</td>';
            dto += '<td style="">Exis bodega</td>';
            dto += '<td style="">Ingreso compra</td>';
            dto += '<td style="width:90px">Dev.</td>';
            dto += '<td style="text-aling:center">Ent.camioneta</td>';
            dto += '<td style="">Tras.almacen</td>';
            dto += '<td style="">Tras.camioneta</td>';
            dto += '<td style="">Ven.bodega</td>';
            dto += '<td style="">Fecha</td>';
            dto += '</tr>';
            angular.forEach(lista, function(item, key) {
                dto += '<tr>';
                dto += '<td style="text-align:left">' + item.nombre + '</td>';
                dto += '<td>' + item.TOTAL_BODEGA + '</td>';
                dto += '<td style="">'+item.EXISTENTE+'</td>';
                dto += '<td style="width:90px">' + item.TOTAL_DV + '</td> ';
                dto += '<td style="">' + item.ENTRADA_C + '</td> ';
                dto += '<td style="">' + item.TOTAL_T + '</td> ';
                dto += '<td style="">' + item.TOTAL_TA + '</td> ';
                dto += '<td style="">' + item.TOTAL_VB + '</td> ';
                dto += '<td style="font-size:12px">' + item.fecha_movimiento + '</td> ';
                dto += '</tr>';
            });
            dto += '</table>';
            jQuery('#div-test').append(dto);
            var data = jQuery('#div-test').html();
            var mywindow = window.open('', 'my div', 'width=410');
            mywindow.document.write('<html><head><title>my div</title>');

            mywindow.document.write('</head><body >');
            mywindow.document.write(data);
            mywindow.document.write('</body></html>');

            mywindow.document.close(); // necessary for IE >= 10
            mywindow.focus(); // necessary for IE >= 10

            mywindow.print();
            mywindow.close();    
        }
        
        
    }]); 

