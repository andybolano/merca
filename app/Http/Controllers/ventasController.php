<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use App\venta;
use App\ventaProducto;
use App\fechaPagos;
use DB;
use App\movimiento;
class VentasController extends Controller
{
    

    
    public function getById($idVenta){
         $result = DB::select(DB::raw(
                        "Select * from ventas
                        WHERE  cedula = '$idVenta'"
                    ));
         
         return $result;
    }
    
    public function getAll(){
        return venta::all();  
    }

        /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        try {
             $result = DB::select(DB::raw(
                        "Select *, v.id as idventa  from ventas as v 
                        INNER JOIN clientes as c ON v.cliente = c.id 
                        INNER JOIN movimiento as m ON m. id_movimiento = v.id
                        WHERE v.estado='VIGENTE'"
                     ));
         
         return $result;  
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }
    
    public function getProductosVenta($idVenta){
       try {
             $result = DB::select(DB::raw(
                        "Select *  from ventasproducto vp INNER JOIN productos as p ON vp.idProducto = p.id 
                         WHERE vp.idVenta = $idVenta"
                        
                    ));
         
         return $result;  
        } catch (Exception $exc) {
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
        try {           
            $data = $request->all();
            $date = Carbon::now();
            $venta = new venta();
            $venta->cliente = $data["cliente"];
            $venta->fecha = $data["fecha"];
            $venta->formaPago= $data["formaPago"];
            $venta->tiempoPago= $data["tiempoPago"];
            $venta->descuento= $data["descuento"];
            $venta->descuentoValor= $data["descuentoValor"];
            $venta->abono= $data["abono"];
            $venta->subtotal= $data["subtotal"];
            $venta->total= $data["total"];
            $venta->numeroCuotas= $data["numeroCuotas"];
            $venta->valorCuotas= $data["valorCuotas"];
            $venta->saldo= $data["total"];
            $venta->estado = "VIGENTE";
            $venta->save();
            
            $productos = json_decode($data["productos"]);
                foreach ($productos as $p) {
                      $producto = new ventaProducto();
                      $producto->idVenta = $venta->id;
                      $producto->idProducto = $p->id;
                      $producto->cantidad = $p->cantidad;
                      $producto->precio = $p->precio;
                      $producto->total = $p->subtotal;
                      $producto->save();    
                  }
                  
                  $fechas = json_decode($data["fechasPagos"]);
                foreach ($fechas as $f) {
                      $fechaPagos = new FechaPagos();
                      $fechaPagos->idCuota = $f->id;
                      $fechaPagos->fecha = $f->fecha;
                      $fechaPagos->idVenta = $venta->id;
                      $fechaPagos->estado = 'PENDIENTE';
                      $fechaPagos->save();    
                  }

        
            $movimiento = new movimiento();
            $movimiento->id_movimiento=$venta->id;
            $movimiento->fecha_movimiento= $data["fecha"];
            $movimiento->tipo_movimiento= $data["movimiento"];
            $movimiento->lugar = 'VENTA';
            $movimiento->estado= "C";
            $movimiento->save();
     
            return JsonResponse::create(array('message' => "Venta Registrada Correctamente", "request" => $venta->id), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo guardar el Venta", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
        }
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
        
  public function UpdateVentas(Request $request)
    {
        try {
            $data = $request->all();
            DB::table('ventas')
            ->where('id', $data['id']) 
            ->update(['fecha' => $data['fecha']],['formaPago' => $data['formaPago']]);
            
             DB::table('movimiento')
            ->where('id_movimiento', $data['id']) 
            ->update(['tipo_movimiento' => $data['tipo_movimiento']]);
            
        return JsonResponse::create(array('message' => "Movimiento Modificado Correctamente", "request" =>json_encode($data)), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo Modificar el proveedor", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
        }

    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        try {
            $venta = venta::find($id);
            $venta->estado = "ANULADO";
            $venta->save();
          
            return JsonResponse::create(array('message' => "Venta Eliminada Correctamente", "request" => "true"), 200);
        } catch (Exception $ex) {
            return JsonResponse::create(array('message' => "No se pudo Eliminar la marca", "exception"=>$ex->getMessage(), "request" =>json_encode($id)), 401);
        }
    }
}
