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


app.controller('inventarioController', ['$scope', '$http', function($scope, $http) {
        var lugar;
        var tipo = 0;
        $scope.Update = {};
        $scope.Update.producto = "";
        $scope.Update.cantidad = 0;
        $scope.listamovimiento = {};
        $scope.Detallemovimiento = {};
        var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth() + 1; //hoy es 0!
        var yyyy = hoy.getFullYear();
        var dato = "";
        var TOTAL_BODEGA = 0;

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        hoy = mm + '/' + dd + '/' + yyyy;

        var productos = new Array();
        $scope.listaProductos = {};
        $scope.listaCarrito = {};

        $scope.Proveedor = {};
        $scope.listaProveedores = [];
        iniciar();
        proveedores();

        $scope.movimiento = {};
        $scope.detalle = {};
        $scope.movimiento.id_movimiento = "";
        $scope.movimiento.fecha_movimiento = "";

        $scope.listaCarrito.movimiento;
        refrescar();


        $scope.traslados = function() {
            tipo = 1;
            $http.get(uri + '/api/movimientos/traslados/traslados').success(function(respuesta) {
                $scope.listamovimiento = respuesta;
            });
        };

        $scope.ingresos = function() {
            refrescar();
            tipo = 0;
        }

        function refrescar() {
            $http.get(uri + '/api/movimientos').success(function(respuesta) {

                $scope.listamovimiento = respuesta;
            });
        };

        function  iniciar() {
            $scope.movimiento = {};
        };

        $scope.CurrentDate = new Date();//Fecha actual

        $scope.MovimietoModificar = function(item) {
            //alert(tipo)
            switch (tipo) {
                case 1:
                    $("#Movimientomodal").modal('show');
                    $http.get(uri + '/api/movimientos/traslados/detallemovimieto/' + item).success(function(respuesta) {
                        $scope.Detallemovimiento = respuesta;
                        console.log($scope.Detallemovimiento);
                    });
                    break;
                case 0:
                    //alert(item)
                    $("#Movimientomodal").modal('show');
                    $http.get(uri + '/api/movimientos/entrada/detalleentrada/' + item).success(function(respuesta) {
                        $scope.Detallemovimiento = respuesta;
                        console.log($scope.Detallemovimiento);
                    });
                    break;

            }
        };

        $scope.sacarCarrito = function(index) {
            $scope.listaCarrito.splice(index, 1);
        };

        $scope.removelinea = function(item, producto) {

            //alert(item);
            //alert(producto);
            //alert(tipo);
            switch (tipo) {
                case 1:
                    $http({
                        method: "delete",
                        url: uri + '/api/movimientos/tasraladoR/remove/' + item + '/' + producto,
                        //data: item+'/'+producto
                    }).success(function(respuesta) {
                        toastr["success"](respuesta.message);
                        $("#Movimientomodal").modal('hide');
                    });
                    break;
                case 0:

                    $("#Movimientomodal").modal('show');
                    $http({
                        method: "delete",
                        url: uri + '/api/movimientos/Removeentrada/removelienaIn/' + item + '/' + producto,
                        //data: item+'/'+producto
                    }).success(function(respuesta) {
                        toastr["success"](respuesta.message);
                        $("#Movimientomodal").modal('hide');
                    });
                    break;

            }
        };

        $scope.productos = function() {
            var DESCUENTOS = 0;
            $http.get(uri + '/api/Reportinventario/existencia/get').success(function(respuesta) {
                $scope.listaProductos = respuesta;
                angular.forEach($scope.listaProductos, function(item, i) {
                    console.log('existencia' + item.EXISTENTE);

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
                    if (item.TOTAL_BA == null) {
                        item.TOTAL_BA = 0;
                    }
                   
                    DESCUENTOS = parseInt(item.TOTAL_T) + parseInt(item.TOTAL_TA) + parseInt(item.TOTAL_VB);

                    console.log('descuentos' + DESCUENTOS + '' + item.nombre);

                    TOTAL_BODEGA = parseInt(item.EXISTENTE) + parseInt(item.ENTRADA_C) + parseInt(item.TOTAL_DV) - parseInt(DESCUENTOS);


                    console.log('TOTAL BODEGA' + TOTAL_BODEGA + '' + item.nombre);
                    item.EXISTENTE = TOTAL_BODEGA + parseInt(item.TOTAL_BA);

                });
                console.log($scope.listaProductos);
            });
        };

        function proveedores() {
            $http.get(uri + '/api/proveedores').success(function(respuesta) {

                $scope.listaProveedores = respuesta;
                $scope.Proveedor = "";
            });
        };


        $scope.addCart = function(producto) {
//            prompt("Ingrese una cantidad", '');
//            while (cantidad === null || cantidad === "" || parseInt(cantidad) != cantidad) {
//                cantidad = prompt("Ingrese una cantidad", '');
//            }
        for (var i = 0; i < $scope.listaCarrito.length; i++) {
                      if (producto.id == $scope.listaCarrito[i].producto){
                           toastr["error"]("El producto ya se encuentra en el carrito de compra, por favor verifique.");
                          return;
                      }
         };
             
            var cantidadM = 1;
            productos.push(
                    {
                        'producto': producto.id,
                        'movimiento': "",
                        'preciov': producto.precioVenta,
                        'nombre': producto.nombre,
                        'cantidadM': cantidadM
                    });
            $scope.listaCarrito = productos;
           
            console.log($scope.listaCarrito);
        };

       $scope.cambiarValor = function  (index) {
           console.log(index)
        var cantidad = $scope.Detallemovimiento[index].cantidad;
        $scope.Detallemovimiento[index].cantidad= $("#cantidad"+index).val(); 
        //$scope.listaCarrito[index].cantidad= $("#cantidad"+index).val(); 
        };
       
        $scope.cambiarValorM = function  (index) {
           console.log(index)
        var cantidadM = $scope.listaCarrito[index].cantidadM;
        $scope.listaCarrito[index].cantidadM= $("#cantidadM"+index).val(); 
        //$scope.listaCarrito[index].cantidad= $("#cantidad"+index).val(); 
        };
        $scope.tipomoviento = function() {
            var tipo = $("#movimiento").val();
            switch (tipo) {
                case "ENTRADA (COMPRA)":
                    dato = "E";
                    $("#traslado").attr('disabled', true);
                    $("#bodega").attr('disabled', false);
                    $("#proveedor").attr('disabled', false);
                    break;
                case "ENTRADA (AL)":
                    dato = "E";
                    $("#traslado").attr('disabled', true);
                    $("#bodega").attr('disabled', false);
                    $("#proveedor").attr('disabled', false);
                    break;
                    
                case"ENTRADA (DEVOLUCION)":
                    dato = "E";
                    $scope.movimiento.proveedor = 0;
                    $("#bodega").attr('disabled', false);
                    $("#traslado").attr('disabled', true);
                    $("#proveedor").attr('disabled', true);
                    break;
                case"ENTRADA (CAMIONETA)":
                    dato = "E";
                    $scope.movimiento.proveedor = 0;
                    $("#traslado").attr('disabled', true);
                    $("#proveedor").attr('disabled', true);
                    $("#bodega").attr('disabled', false);
                    break;
                case"TRASLADO  (ALMACEN)":
                    dato = "T";
                    $scope.movimiento.proveedor = 0;
                    $("#traslado").attr('disabled', false);
                    $("#bodega").attr('disabled', true);
                    $("#proveedor").attr('disabled', true);
                    break;
                    case"TRASLADO  (AB)":
                    dato = "E";
                    $scope.movimiento.proveedor = 0;
                    $("#traslado").attr('disabled', true);
                    $("#proveedor").attr('disabled', true);
                    $("#bodega").attr('disabled', false);
                    break;
                case"TRASLADO  (CAMIONETA)":
                    dato = "T";
                    $scope.movimiento.proveedor = 0;
                    $("#traslado").attr('disabled', false);
                    $("#bodega").attr('disabled', true);
                    $("#proveedor").attr('disabled', true);
                    break;
            }
        };

        $scope.guardar = function() {
            var hoy = new Date();
            var cad = hoy.getHours() + "" + hoy.getMinutes() + "" + hoy.getSeconds();
            $scope.movimiento.id_movimiento = dd + "" + mm + "" + yyyy + "" + cad;
            //$("#guardar").attr("disabled",true);
            console.log($scope.movimiento.fecha_movimiento);
            if ($scope.movimiento.fecha_movimiento == "")
            {
                toastr["error"]("Verifique que haya seleccionado una fecha de realizacion del movimiento");
            }
            else
            {
                if (productos.length == 0)
                {
                    toastr["error"]("No ha agregado articulos para realizar el movimiento");
                    $("#guardar").attr("disabled", false);
                } else
                {
                    switch (dato) {
                        case "E":
                            $http.post(uri + '/api/movimientos', $scope.movimiento).success(function(respuesta) {
                                if (respuesta.message == "Movimiento Guardado Correctamente")
                                {
                                    angular.forEach(productos, function(item, key) {
                                        item.movimiento = item.movimiento = $scope.movimiento.id_movimiento;
                                    });
                                    $scope.listaCarrito = productos;
                                    $http.post(uri + '/api/movimientosE', $scope.listaCarrito).success(function(respuesta) {
                                        if (respuesta.message == "Movimiento Guardado Correctamente")
                                        {
                                            toastr["success"](respuesta.message);
                                            print($scope.movimiento, $scope.listaCarrito);
                                            $("#guardar").attr("disabled", false);
                                            $scope.movimiento = "";
                                            $scope.listaCarrito = "";
                                            productos = [];
                                            $scope.productos();
                                            refrescar();
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
                            $http.post(uri + '/api/movimientos', $scope.movimiento).success(function(respuesta) {
                                if (respuesta.message == "Movimiento Guardado Correctamente")
                                {
                                    angular.forEach(productos, function(item, key) {
                                        item.movimiento = item.movimiento = $scope.movimiento.id_movimiento;
                                    });
                                    $scope.listaCarrito = productos;
                                    $http.post(uri + '/api/movimientosT', $scope.listaCarrito).success(function(respuesta) {
                                        if (respuesta.message == "Movimiento Guardado Correctamente")
                                        {

                                            toastr["success"](respuesta.message);
                                            print($scope.movimiento, $scope.listaCarrito);
                                            $("#guardar").attr("disabled", false);
                                            $scope.movimiento = "";
                                            $scope.listaCarrito = "";
                                            productos = [];
                                            refrescar();
                                        }
                                    });
                                }
                                else
                                {
                                    toastr["error"](respuesta.message);
                                }


                            });
                            break;
                    }
                }
            }



        };

        $scope.remover = function(id_movimiento) {
            swal({
                title: "Esta usted seguro(a)?",
                text: "No prodrá revertir este cambio, y puede causar daños en otros registros!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si, eliminar!",
                closeOnConfirm: false
            }, function() {
                $http.delete(uri + '/api/movimientos/' + id_movimiento).success(function(respuesta) {
                    swal("Eliminado!", "Movimiento removido exitosamente.", "success");
                    refrescar();
                });
            });
        };

        function print(dato, eval) {
            var fecha = new Date(dato.fecha_movimiento);
            var dc = fecha.getDate();
            var mc = fecha.getMonth() + 1; //hoy es 0!
            var yc = fecha.getFullYear();

            if (dc < 10) {
                dc = '0' + dc;
            }

            if (mm < 10) {
                mc = '0' + mc;
            }
            var fec = dc + "/" + mc + "/" + yc;
            document.getElementById("div-test").innerHTML = "";
            jQuery('#div-test').hide();
            var dto = '<table style="width:700px;font-family:"Courier New";font-size:2px">';
            dto += '<tr>';
            dto += '<td style="text-align:center;font-weight:bold;font.size:16px">INVERSIONES - CREDIMAR - A.S</td>';
            dto += '</tr>';
            dto += '<tr>';
            dto += '<td style="text-align:center;font-weight:bold;font.size:16px">Codigo de remisión : ' + $scope.movimiento.id_movimiento + '</td>';
            dto += '</tr>';
            dto += '</table>';

            dto += '<table style="width:700px;font-family:"Courier New";font-size:2px">';
            dto += '<tr>';
            dto += '<td style="text-align:center;font-weight:bold;font.size:16px">Movimiento de inventario</td>';
            dto += '</tr>';
            dto += '</table>';

            dto += '<table style="width:700px;font-family:"Courier New";font-size:1px">';
            dto += '<tr>';
            dto += '<td style="text-align:left">Fecha movimiento :</td>';
            dto += '<td style="text-align:right">' + fec + '</td>';
            dto += '</tr>';
            dto += '</table>';

            dto += '<table style="width:700px;font-family:"Courier New";font-size:1px">';
            dto += '<tr>';
            dto += '<td style="text-align:left">Telefonos :</td>';
            dto += '<td style="text-align:right">301 463 7781 - 313 543 32 47</td>';
            dto += '</tr>';
            dto += '</table>';


            dto += '<table style="width:700px;font-family:"Courier New";font-size:1px">';
            dto += '<tr>';
            dto += '<td style="text-align:left">Tipo movimiento :</td>';
            dto += '<td style="text-align:right">' + dato.tipo_movimiento + '</td>';
            dto += '</tr>';
            dto += '</table>';

            dto += '<table style="width:700px;font-family:"Courier New";font-size:1px;">';
            dto += '<tr>';
            dto += '<td style="text-align:left">lugar :</td>';
            dto += '<td style="text-align:right">' + dato.lugar + '</td>';
            dto += '</tr>';
            dto += '</table>';
            dto += '<br/>';
            dto += '<br/>';

            dto += '<table style="width:700px;font-family:"Courier New";font-size:0.5px;" class="table">';
            dto += '<tr>';
            dto += '<td style="text-align:left">Articulo</td>';
            dto += '<td style="text-align:left"></td>';
            dto += '<td style="text-align:right">Cantidad</td>';
            dto += '</tr>';
            angular.forEach(eval, function(item, key) {
                dto += '<tr>';
                dto += '<td style="text-align:left">' + item.nombre + '</td>';
                dto += '<td style="text-align:left"></td>';
                dto += '<td style="text-align:right">' + item.cantidadM + '  Und.</td> ';
                dto += '</tr>';
            });
            dto += '</table>';
            dto += '<br/>';
            dto += '<br/>';
            dto += '<table style="width:700px;font-family:"Courier New";font-size:1px">';
            dto += '<tr>';
            dto += '<td style="text-align:left">Entregado por: ________________________________</td>';
            dto += '</tr>';
            dto += '</table>';
            dto += '<br/>';
            dto += '<table style="width:700px;font-family:"Courier New";font-size:1px;padding-top:40px">';
            dto += '<tr>';
            dto += '<td style="text-align:left">Recibido por: __________________________________</td>';
            dto += '</tr>';
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
        };

        $scope.modificar = function(item, producto,cantidad) {
            switch (tipo) {
                case 0:
                    var obj = {
                        'movimiento': item,
                        'producto': producto,
                        'cantidad': cantidad,
                    };
                    alert(JSON.stringify(obj));
                    $scope.Update.producto = producto;
                    if (cantidad <= 0 || cantidad=="")
                    {
                        toastr["error"]("el valor digitado es menor o igual ha 0 verifique por favor, o el campo");
                    }
                    else
                    {
                        $http.put(uri + '/api/movimientos/Updateentrada/EntradaUpd', obj)
                                .success(function(respuesta) {
                                    toastr["success"](respuesta.message);
                                    $("#Movimientomodal").modal('hide');
                                    setTimeout(function (){location.reload()},1500);
                                });
                    }


                    break;

                case 1:
                    var obj = {
                        'movimiento': item,
                        'producto_t': producto,
                        'cantidad_t': cantidad,
                    };
                    
                    if (cantidad <= 0 || cantidad=="")
                    {
                        toastr["error"]("el valor digitado es menor o igual ha 0 verifique por favor");
                    }
                    else
                    {
                    $scope.Update.producto = producto;
                    $http.put(uri + '/api/movimientos/TrasladosUp/TrasladosUp', obj)
                            .success(function(respuesta) {
                                toastr["success"](respuesta.message);
                                $("#Movimientomodal").modal('hide');
                                setTimeout(function (){location.reload()},1500);
                            });
                    }
                    break;
            }

        };
     
    }]);

    