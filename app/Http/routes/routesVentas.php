<?php
Route::resource("api/ventas","VentasController");
Route::get('api/ventasproducto/{idventa}',"VentasController@getProductosVenta");
Route::get('api/ventas/ventastot/{inicio}/{final}',"ReporVentasController@getReporventaf");
Route::get('api/ventas/pagosvencidos/clientes/{inicio}/{final}',"ReporVentasController@getvencidos");
Route::put('api/ventas/updateventas/venta',"VentasController@UpdateVentas");
Route::get('api/ventas/getdetalle/ventas/{id}',"ReporVentasController@getdetalleventa");
