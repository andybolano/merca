<?php
 Route::resource("api/movimientos","movimientosController");
 Route::get("api/movimientos/traslados/traslados","movimientosController@MovimientosTraslados");


