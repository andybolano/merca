<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Controllers\Controller;
use DB;
use App\usuarios;

class usuariosController extends Controller
{
    

    public function show($usuario){   
        $result = DB::select(DB::raw(
                        "Select * from usuarios
                        WHERE  user = $usuario"
                    )); 
                    return $result;
    }
    
    public function getAll(){
        return usuarios::all();   
    }

        /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        try {
            return usuarios::all();   
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
        
            $usuarios = new usuarios();
            $usuarios->nombre_usuario= $data["nombre"];
            $usuarios->user= $data["user"];
            $usuarios->pass= $data["pass"];
            $usuarios->save();
           
            return JsonResponse::create(array('message' => "usuarios Guardado Correctamente", "request" => $usuarios), 200);
            
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
            
            $usuarios = usuarios::find($id);
            $usuarios->nombre_usuario= $data["nombre"];
            $usuarios->user= $data["user"];
            $usuarios->pass= $data["pass"];
            
            $usuarios->save();
            
        
            
        return JsonResponse::create(array('message' => "usuario Modificado Correctamente", "request" =>json_encode($data)), 200);
            
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
            $usuarios = usuarios::find($id);
            $usuarios->delete();
            return JsonResponse::create(array('message' => "Proveedpr Eliminado Correctamente", "request" =>json_encode($id)), 200);
        } catch (Exception $ex) {
            return JsonResponse::create(array('message' => "No se pudo Eliminar el producto", "exception"=>$ex->getMessage(), "request" =>json_encode($id)), 401);
        }
    }
}
