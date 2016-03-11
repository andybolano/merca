<?php
Route::resource("api/ventas","VentasController");
Route::get('api/ventasproducto/{idventa}',"VentasController@getProductosVenta");