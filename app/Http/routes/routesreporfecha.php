<?php
 Route::resource("api/Reportinventario","ReportinventarioController");
Route::get("api/Reportinventario/existencia/get","ReportinventarioController@getExistencia");

