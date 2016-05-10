<?php
 Route::resource("api/pagos","PagosController");
 Route::get('api/pagosventa/{idventa}',"PagosController@getPagosVenta");
 Route::get('api/pagosventa/fecha/{idventa}',"PagosController@getPagosVentaFecha");
 Route::post('api/pagos/eliminar',"PagosController@eliminar");
 Route::get('api/pagos/Byfecha/{fechaInicio}/{fechaFin}',"PagosController@pagosByFecha");