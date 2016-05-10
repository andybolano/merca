var uri = "../../public";
var app;
(function(){
    app = angular.module("mercamar", ['ngRoute','ui.keypress']);
    
    app.config(['$routeProvider', '$locationProvider', function AppConfig($routeProvider, $locationProvider){
            
            
            $routeProvider
            .when("/home",{
                        templateUrl: 'home.html'
                    })
                    .when("/productos",{
                        templateUrl: 'productos/index.html'
                    })
                     .when("/ventas",{
                        templateUrl: 'ventas/index.html'
                    })
                    .when("/proveedores",{
                        templateUrl: 'proveedor/index.html'
                    })
                    .when("/inventario",{
                        templateUrl: 'inventario/index.html'
                    })
                   .when("/movimiento",{
                        templateUrl: 'inventario/movimiento.html'
                    })
                    .when("/recaudo",{
                        templateUrl: 'recaudo/index.html'
                    })
                    .when("/Rinventario",{
                        templateUrl: 'reportes/index.html'
                    })
                    .when("/Ventas",{
                        templateUrl: 'reportes/index_2.html'
                    })
                     .when("/recaudo/reporte",{
                        templateUrl: 'reportes/reportes.html'
                    })
                     .when("/recaudo/reporteV",{
                        templateUrl: 'reportes/Pagos_vencidos.html'
                    })
                    .when("/clientes",{
                        templateUrl: 'cliente/index.html'
                    })
                     .when("/seguridad",{
                        templateUrl: 'seguridad/index.html'
                    })
                    .otherwise({
                        redirectTo:"/home"
                    });
                    
            
    }]);

    app.directive('ngEnter', function () {
        return function (scope, elements, attrs) {
            elements.bind('keydown keypress', function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    });
    
    app.filter('ifEmpty', function() {
        return function(input, defaultValue) {
            if (angular.isUndefined(input) || input === null || input === '') {
                return defaultValue;
            }

            return input;
        };
    });
    
    app.directive('uploaderModel',['$parse',function($parse){
        return{
            restrict: 'A',
            link: function(scope,iElement,iAttrs){
                iElement.on('change',function(e)
                {
                    $parse(iAttrs.uploaderModel).assign(scope,iElement[0].files[0]);
                });
            }
        };

    }]);

   

})();




