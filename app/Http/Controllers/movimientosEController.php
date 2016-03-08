<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Controllers\Controller;

use App\movimientoE;
use App\movimiento;

class movimientosEController extends Controller
{
//    
//
//    
//    public function show($identificacion){       
//        return Proveedores::find($identificacion); 
//    }
//    
//    public function getAll(){
//        return Proveedores::all();   
//    }
//
//        /**
//     * Display a listing of the resource.
//     *
//     * @return Response
//     */
//    public function index()
//    {
//        try {
//            return movimiento_entrada::all();   
//        } catch (Exception $exc) {
//            echo $exc->getTraceAsString();
//        }
//    }
//    
//
//    
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
            foreach ($data as $value) 
            {   $movimiento = new movimientoE();
                $movimiento->movimiento = $value["movimiento"];
                $movimiento->producto=$value["producto"];
                $movimiento->cantidad=$value["cantidad"];
                $movimiento->estado_e= "C";
                $movimiento->save();
            }
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
//    public function update(Request $request, $id)
//    {
//        try {
//            
//            $data = $request->all();
//            
//            $proveedor = Proveedores::find($id);
//
//            $proveedor->nombre= $data["nombre"];
//            $proveedor->cuidad= $data["cuidad"];
//            $proveedor->direccion= $data["direccion"];
//            $proveedor->telefono_1= $data["telefono_1"];
//            $proveedor->telefono_2= $data["telefono_2"];
//        
//            
//            $proveedor->save();
//            
//        
//            
//        return JsonResponse::create(array('message' => "Proveedor Modificado Correctamente", "request" =>json_encode($data)), 200);
//            
//        } catch (Exception $exc) {
//            return JsonResponse::create(array('message' => "No se pudo Modificar el proveedor", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
//        }
//
//    }
//
//    /**
//     * Remove the specified resource from storage.
//     *
//     * @param  int  $id
//     * @return Response
//     */
//    public function destroy($id)
//    {
//        try {
//            $proveedor = Proveedores::find($id);
//            $proveedor->delete();
//            return JsonResponse::create(array('message' => "Proveedpr Eliminado Correctamente", "request" =>json_encode($id)), 200);
//        } catch (Exception $ex) {
//            return JsonResponse::create(array('message' => "No se pudo Eliminar el producto", "exception"=>$ex->getMessage(), "request" =>json_encode($id)), 401);
//        }
  //}
}
