<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Controllers\Controller;

use DB;
use App\movimiento;
use App\productos;
use App\movimientoe;

class ReportinventarioController extends Controller
{
    

    
  public function show(Request $request){
   try
    {
       $data = $request->all();
       $result = DB::select(DB::raw("select sum(cantidad) as cantidad, 
        fecha_movimiento,tipo_movimiento,producto,nombre,lugar from movimiento
        inner join  movimientoe on id_movimiento = movimiento 
        inner join productos on id = producto group by fecha_movimiento,producto,tipo_movimiento"));
        return $result;
    } 
    catch (Exception $exc) {
        echo $exc->getTraceAsString();
    }

  }
    
 
    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        
    }
}
