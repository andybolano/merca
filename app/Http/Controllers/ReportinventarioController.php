<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Controllers\Controller;

use DB;

class ReportinventarioController extends Controller
{
    

    
  public function show(){
   try
    {
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
  
  public function getExistencia(){
   try
    {
       $consulta = DB::select(DB::raw("SELECT * FROM mercamar.bodega_existencia"));
        return $consulta;
    } 
    catch (Exception $exc) {
        echo $exc->getTraceAsString();
    }

  }
  
  public function getExistencialmacen(){
   try
    {
       $consulta = DB::select(DB::raw("SELECT * FROM mercamar.almacen_bodega"));
        return $consulta;
    } 
    catch (Exception $exc) {
        echo $exc->getTraceAsString();
    }

  }
  
  public function getExistenciacamioneta(){
   try
    {
       $consulta = DB::select(DB::raw("SELECT * FROM mercamar.bodega_camioneta"));
        return $consulta;
    } 
    catch (Exception $exc) {
        echo $exc->getTraceAsString();
    }

  }
  
}
