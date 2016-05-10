<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Controllers\Controller;
use DB;
use App\movimiento;
use App\movimientoe;
use App\movimientot;
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
                where tipo_movimiento = 'ENTRADA (COMPRA)' or tipo_movimiento = 'ENTRADA (DEVOLUCION)' or tipo_movimiento='ENTRADA (CAMIONETA)' or tipo_movimiento='TRASLADO  (AB)'"));
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


   public function Detallemovimiento ($id){
        try 
            {
                $result = DB::select(DB::raw("
                    select id,movimiento,cantidad_t as cantidad ,nombre from movimientot inner join productos 
                    on id = producto_t where movimiento =$id"));
            return $result;
            } catch (Exception $exc) {
            echo $exc->getTraceAsString();
      }
   }
      
      public function DetallemovimientoEntrada ($id){
        try 
            {
                $result = DB::select(DB::raw("select id,movimiento,cantidad,nombre from movimientoe
                 inner join productos 
                 on id = producto where movimiento =$id"));
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
      public function UpdateEntrada(Request $request)
    {
        try {
            $data = $request->all();
            DB::table('movimientoe')
            ->where('movimiento', $data['movimiento']) 
           ->where('producto', $data['producto'])
            ->update(['cantidad' => $data['cantidad']]);
        return JsonResponse::create(array('message' => "Movimiento Modificado Correctamente", "request" =>json_encode($data)), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo Modificar el proveedor", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
        }

    }

    
    public function UpdateTraslados (Request $request){
        try {
                 $data = $request->all();
                   DB::table('movimientot')
                  ->where('movimiento', $data['movimiento']) 
                  ->where('producto_t', $data['producto_t'])
                  ->update(['cantidad_t' => $data['cantidad_t']]);
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
            DB::table('movimiento')->where('id_movimiento', $id)->delete();
            return JsonResponse::create(array('message' => "Movimiento removido Correctamente", "request" =>json_encode($id)), 200);
        } catch (Exception $ex) {
            return JsonResponse::create(array('message' => "No se pudo remover el producto", "exception"=>$ex->getMessage(), "request" =>json_encode($id)), 401);
        }
  }
  
  
  public function removelienaT ($id,$producto){
       try {
            DB::table('movimientot')->where('movimiento', $id )->where('producto_t', $producto)->delete();
            return JsonResponse::create(array('message' => "Movimiento removido Correctamente", "request" =>json_encode($id)), 200);
        } catch (Exception $ex) {
            return JsonResponse::create(array('message' => "No se pudo remover el producto", "exception"=>$ex->getMessage(), "request" =>json_encode($id)), 401);
      }
      
  }
  
  
    public function removelienaIn ($id,$producto){
       try {
            DB::table('movimientoe')->where('movimiento', $id )->where('producto', $producto)->delete();
            return JsonResponse::create(array('message' => "Movimiento removido Correctamente", "request" =>json_encode($id)), 200);
        } catch (Exception $ex) {
            return JsonResponse::create(array('message' => "No se pudo remover el producto", "exception"=>$ex->getMessage(), "request" =>json_encode($id)), 401);
      }
      
  }
}
