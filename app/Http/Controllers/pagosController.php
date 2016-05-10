<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Controllers\Controller;
use App\venta;
use App\Pagos;
use App\fechaPagos;
use DB;
class PagosController extends Controller
{
    

    
    public function show($identificacion){       
        return Pagos::find($identificacion); 
    }
    
    public function getAll(){
        return Pagos::all();   
    }

        /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        try {
            return pagos::all();   
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }
    

     public function getPagosVenta($idventa){
      
         $result = DB::select(DB::raw(
                        "Select * from pagos
                        WHERE  idVenta = $idventa AND estado = 'VIGENTE' " 
                    ));
         
         return $result;
    }
    
    public function pagosByFecha($fechaInicio, $fechaFin){
        
        $result = DB::select(DB::raw(
                        "Select  p.*, clientes.*, clientes.cedula, ventas.id as num_factura, ventas.*, p.idVenta as idventa from pagos  as p
                        INNER JOIN ventas ON ventas.id = p.idVenta
                        INNER JOIN  clientes ON clientes.id = ventas.cliente
                     
                        WHERE p.fecha BETWEEN '$fechaInicio' AND '$fechaFin' AND p.estado = 'VIGENTE' " 
                    ));
         
         return $result;
    }
    
     public function getPagosVentaFecha($idventa){
      
         $result = DB::select(DB::raw(
                        "Select * from fechapagos
                        WHERE  idVenta = $idventa" 
                    ));
         
         return $result;
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
        
            $pago = new Pagos();
            $pago->valor = $data["valor"];
            $pago->fecha = $data["fecha"];
            $pago->fechaLimite = $data["fechaLimite"];
            $pago->saldo= $data["saldo"];
            $pago->idVenta= $data["venta"];
            $pago->estado = "VIGENTE";
            $pago->save();
            
        
            $fechaPagos = FechaPagos::find($data["id_fechaLimite"]);
            $fechaPagos->estado = "PAGADO";
            $fechaPagos->save();
            
            $venta = venta::find($data["venta"]);
            $venta->saldo= $data["saldo"];
            $venta->save();
            

            return JsonResponse::create(array('message' => "Pago registrado Correctamente", "request" => $pago), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo guardar el Producto", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
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
            
            $pago = Pagos::find($id);
            $pago->valor = $data["valor"];
            $pago->fecha = $data["fecha"];
            $pago->saldo= $data["saldo"];
            $pago->idVenta= $data["venta"];
            $pago->save();
        
            
            
            
        
            
        return JsonResponse::create(array('message' => "Pago Modificado Correctamente", "request" =>json_encode($data)), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo Modificar el pago", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function eliminar(Request $request)
    {
      
            try {
                
            $data = $request->all();
            
            $pago = pagos::find($data["id"]);
            $pago->estado = "ANULADO";
            $pago->save();
            
            $venta = venta::find($data["idVenta"]);
            $venta->saldo= $data["saldo"];
            $venta->save();
            
             DB::table('fechapagos')
            ->where('fecha',$data["fecha"])
            ->update(array('estado' => 'PENDIENTE'));
          
            return JsonResponse::create(array('message' => "Pago eliminado Correctamente", "request" => "true"), 200);
        } catch (Exception $ex) {
            return JsonResponse::create(array('message' => "No se pudo Eliminar el producto", "exception"=>$ex->getMessage(), "request" =>json_encode($id)), 401);
        }
    }
}
