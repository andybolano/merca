<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use App\venta;
use App\ventaProducto;
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
                        "Select *, v.id as idventa  from ventas as v INNER JOIN clientes as c ON v.cliente = c.id "
                        
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
        
        
        $movimiento = new movimiento();
        $movimiento->id_movimiento=$venta->id;
            $movimiento->fecha_movimiento= $data["fecha"];
          $movimiento->tipo_movimiento= 'VENTA';
            $movimiento->lugar = 'VENTA';
            $movimiento->estado= "C";
            $movimiento->save();
        
         
            
     
     
            return JsonResponse::create(array('message' => "Venta Registrada Correctamente", "request" => $venta), 200);
            
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
    public function update(Request $request, $id)
    {
        try {
            
            $data = $request->all();
            
            $venta = venta::find($id);

            $venta->nombre = $data["nombre"];
            $venta->proveedor= $data["proveedor"];
            $venta->valorUnitario= $data["valorUnitario"];
            $venta->precioVenta= $data["precioVenta"];
            $venta->descripcion= $data["descripcion"];
        
            
            $venta->save();
            
        
            
        return JsonResponse::create(array('message' => "Venta Modificada Correctamente", "request" =>json_encode($data)), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo Modificar la marca", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
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
            $venta->delete();
            return JsonResponse::create(array('message' => "Venta Eliminado Correctamente", "request" =>json_encode($id)), 200);
        } catch (Exception $ex) {
            return JsonResponse::create(array('message' => "No se pudo Eliminar la marca", "exception"=>$ex->getMessage(), "request" =>json_encode($id)), 401);
        }
    }
}
