<?php
 Route::get("api/clientes/{id}","ClientesController@getById");
Route::resource("api/clientes","ClientesController");