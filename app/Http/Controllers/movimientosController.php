<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Controllers\Controller;
use DB;
use App\movimiento;

class movimientosController extends Controller
{
    
    public function show($identificacion){       
        return Proveedores::find($identificacion); 
    }
    
        /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        try 
        {
            $result = DB::select(DB::raw("select fecha_movimiento,tipo_movimiento,lugar,id_movimiento AS movimiento FROM movimiento
                where tipo_movimiento = 'ENTRADA (COMPRA)' or tipo_movimiento = 'ENTRADA (DEVOLUCION)'
                "));
        return $result;
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }
    
     public function MovimientosTraslados (){
        try 
            {
                $result = DB::select(DB::raw("
                select fecha_movimiento,tipo_movimiento,lugar,id_movimiento AS movimiento FROM movimiento
                where tipo_movimiento = 'TRASLADO  (CAMIONETA)' or tipo_movimiento = 'TRASLADO  (ALMACEN)'
                "));
            return $result;
            } catch (Exception $exc) {
            echo $exc->getTraceAsString();
      }
    
    
}
    
//    /**
//     * Store a newly created resource in storage.
//     *
//     * @param  Request  $request
//     * @return Response
//     */
    public function store(Request $request)
    {
        try {           
            $data = $request->all();
            $movimiento = new movimiento();
            $movimiento->id_movimiento=$data["id_movimiento"];
            $movimiento->fecha_movimiento=$data["fecha_movimiento"];
            $movimiento->lugar=$data["lugar"];
            $movimiento->tipo_movimiento= $data["tipo_movimiento"];
            $movimiento->proveedor=$data["proveedor"];
            $movimiento->estado= "C";
            $movimiento->save();
           
            return JsonResponse::create(array('message' => "Movimiento Guardado Correctamente", "request" => $movimiento), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo guardar el movimiento", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
        }
        
    }
//
//    /**
//     * Update the specified resource in storage.
//     *
//     * @param  Request  $request
//     * @param  int  $id
//     * @return Response
//     */
    public function update(Request $request, $id)
    {
        try {
            
            $data = $request->all();
            
            $proveedor = Proveedores::find($id);

            $proveedor->nombre= $data["nombre"];
            $proveedor->cuidad= $data["cuidad"];
            $proveedor->direccion= $data["direccion"];
            $proveedor->telefono_1= $data["telefono_1"];
            $proveedor->telefono_2= $data["telefono_2"];
        
            
            $proveedor->save();
            
        
            
        return JsonResponse::create(array('message' => "Proveedor Modificado Correctamente", "request" =>json_encode($data)), 200);
            
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
            DB::table('movimiento')->where('id_movimiento', $id)->delete();
            return JsonResponse::create(array('message' => "Movimiento removido Correctamente", "request" =>json_encode($id)), 200);
        } catch (Exception $ex) {
            return JsonResponse::create(array('message' => "No se pudo remover el producto", "exception"=>$ex->getMessage(), "request" =>json_encode($id)), 401);
        }
  }
}
