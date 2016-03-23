/*  Подключенные модули  */
var app = angular.module('myApp', ['ngAnimate', 'ui.bootstrap']);


/* Общий контроллер */
app.controller('appCtr', function($scope, $http) {

});



/* Контроллер страницы логиста */
app.controller('requestsLogist', function($scope, $http) {



    $http.get( 'http://localhost/ERPPPK_Pivovarov/hs/Logistics/Order/List' ).then( function( response ){
        $scope.listGP = response.data;

        console.log( $scope.listGP );
    });




});
/* Контроллер  модального окна (вызов) */
app.controller('ModalCtrl', function ($scope, $uibModal, $log) {

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    $scope.modal = function (size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'js/modal/modalLogist.html',
            controller: 'ModalInst',
            windowClass: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

});
/* Контроллер  модального окна (ренедер) */
app.controller('ModalInst', function ($scope, $uibModalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});