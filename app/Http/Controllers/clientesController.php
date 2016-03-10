<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Controllers\Controller;

use App\Clientes;

use DB;

class ClientesController extends Controller
{
    

    
    public function getById($idCliente){
         $result = DB::select(DB::raw(
                        "Select * from clientes
                        WHERE  cedula = '$idCliente'"
                    ));
         
         return $result;
    }
    
    public function getAll(){
        return Clientes::all();  
    }

        /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        try {
            return Clientes::all();   
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
        
            $cliente = new Clientes();
            $cliente->cedula = $data["cedula"];
            $cliente->nombre = $data["nombres"];
            $cliente->apellidos= $data["apellidos"];
            $cliente->barrio= $data["barrio"];
            $cliente->direccion= $data["direccion"];
            $cliente->ciudad= $data["ciudad"];
            $cliente->telefono= $data["telefono"];
            $cliente->save();
            
     
     
            return JsonResponse::create(array('message' => "Cliente Guardado Correctamente", "request" => $cliente), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo guardar el Cliente", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
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
            
            $cliente = Clientes::find($id);

            $cliente->nombre = $data["nombre"];
            $cliente->proveedor= $data["proveedor"];
            $cliente->valorUnitario= $data["valorUnitario"];
            $cliente->precioVenta= $data["precioVenta"];
            $cliente->descripcion= $data["descripcion"];
        
            
            $cliente->save();
            
        
            
        return JsonResponse::create(array('message' => "Cliente Modificado Correctamente", "request" =>json_encode($data)), 200);
            
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
            $cliente = Clientes::find($id);
            $cliente->delete();
            return JsonResponse::create(array('message' => "Cliente Eliminado Correctamente", "request" =>json_encode($id)), 200);
        } catch (Exception $ex) {
            return JsonResponse::create(array('message' => "No se pudo Eliminar la marca", "exception"=>$ex->getMessage(), "request" =>json_encode($id)), 401);
        }
    }
}
