<?php
 Route::resource("api/pagos","PagosController");
 Route::get('api/pagosventa/{idventa}',"PagosController@getPagosVenta");