<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Controllers\Controller;

use DB;

class ReporVentasController extends Controller
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
  
  public function getReportefechas($inicial,$final){
     try
    {
       $consulta = DB::select(DB::raw("select TOTAL_VB,EXISTENTE,ENTRADA_C,TOTAL_T,TOTAL_DV,TOTAL_TA,fecha_movimiento,id,nombre
        from reportentrada_compra
        left join reportentrada_cami on producto = producto_ec
        left join reportedevolucion on producto_v = producto
        left join reportetraslado_camioneta on producto_t = producto
        left join reportetraslado_almacen on producto_ta = producto
        right join productos on producto = id
        left join reporte_vbodega on idproducto=producto
        WHERE fecha_movimiento BETWEEN '$inicial' AND '$final'
        group by fecha_movimiento,ID"));
        return $consulta;
    } 
    catch (Exception $exc) {
        echo $exc->getTraceAsString();
    } 
  }
  
}
