<?php
 Route::resource("api/Reportinventario","ReportinventarioController");
 Route::get("api/Reportinventario/existencia/get","ReportinventarioController@getExistencia"); 
 Route::get("api/Reportinventario/existencia/almacen","ReportinventarioController@getExistencialmacen");
Route::get("api/Reportinventario/existencia/camioneta","ReportinventarioController@getExistenciacamioneta");
Route::get("api/Reportinventario/existencia/fechas/{inicial}/{final}","ReportinventarioController@getReportefechas");

   