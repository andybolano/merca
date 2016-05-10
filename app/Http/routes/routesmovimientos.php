<?php
 Route::resource("api/movimientos","movimientosController");
 Route::get("api/movimientos/traslados/traslados","movimientosController@MovimientosTraslados");
 Route::get("api/movimientos/traslados/detallemovimieto/{id}","movimientosController@Detallemovimiento");
 Route::get("api/movimientos/entrada/detalleentrada/{id}","movimientosController@DetallemovimientoEntrada");
 Route::delete("api/movimientos/tasraladoR/remove/{id}/{producto}","movimientosController@removelienaT");
 Route::delete("api/movimientos/Removeentrada/removelienaIn/{id}/{producto}","movimientosController@removelienaIn");
 Route::put("api/movimientos/Updateentrada/EntradaUpd","movimientosController@UpdateEntrada");
 Route::put("api/movimientos/TrasladosUp/TrasladosUp","movimientosController@UpdateTraslados");

