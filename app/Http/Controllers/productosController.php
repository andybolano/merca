<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Controllers\Controller;

use App\Producto;

class ProductosController extends Controller
{
    

    
    public function show($idProducto){       
        return Producto::find($idProducto); 
    }
    
    public function getAll(){
        return Producto::all();;   
    }

        /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        try {
            return Producto::all();   
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
        
            $producto = new Producto();
            $producto->nombre = $data["nombre"];
            $producto->proveedor= $data["proveedor"];
            $producto->valorUnitario= $data["valorUnitario"];
            $producto->precioVenta= $data["precioVenta"];
            $producto->descripcion= $data["descripcion"];
            $producto->save();
            
     
     
            return JsonResponse::create(array('message' => "Producto Guardado Correctamente", "request" => $producto), 200);
            
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
            
            $producto = Producto::find($id);

             $producto->nombre = $data["nombre"];
            $producto->proveedor= $data["proveedor"];
            $producto->valorUnitario= $data["valorUnitario"];
            $producto->precioVenta= $data["precioVenta"];
            $producto->descripcion= $data["descripcion"];
        
            
            $producto->save();
            
        
            
        return JsonResponse::create(array('message' => "Producto Modificado Correctamente", "request" =>json_encode($data)), 200);
            
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
            $producto = Producto::find($id);
            $producto->delete();
            return JsonResponse::create(array('message' => "Producto Eliminado Correctamente", "request" =>json_encode($id)), 200);
        } catch (Exception $ex) {
            return JsonResponse::create(array('message' => "No se pudo Eliminar la marca", "exception"=>$ex->getMessage(), "request" =>json_encode($id)), 401);
        }
    }
}
