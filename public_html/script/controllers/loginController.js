app.controller('logiContnroller',['$scope','$http', function ($scope,$http){
        $scope.Usuario = {};
   
        $scope.validar = function() {
            
            $http.get('../public/api/usuarios/'+$scope.Usuario.usuario).success(function (respuesta){
                
                    $scope.Usuario = respuesta;
                    if ($scope.Usuario =="") 
                    {
                      toastr["error"]("Datos de usuarios ingresados son incorrectos");
                    }else
                    {
                      window.location="view/";
                      localStorage.setItem("bandera",1);   
                    } 

                    $scope.Usuario = "";
            });
        };
        
    }]); 

