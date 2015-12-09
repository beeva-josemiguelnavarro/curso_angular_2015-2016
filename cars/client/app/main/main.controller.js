'use strict';

angular.module('carsApp')
  .controller('MainCtrl',['$scope','$http',function($scope,$http){
    $scope.options = {};
    $scope.error = false;
    $scope.redy = false;
    $scope.myData = {
      type:'',
      bodyEngine: '',
      engine: '',
      transmission: '',
      finish: '',
      tires: '',
      color: '',
      colorSport: '',
      extras: [],
      cp: '',
      email: ''
    }

    $http.get('/api/options').then(function(response){
      //console.log(response)
      $scope.options = response.data;
      $scope.ready = true;
    },function(error){
      //console.log(error);
      $scope.error = true;
      $scope.ready = true;
    });

    $scope.toggleExtra = function(extra){
      //console.log(extra)
      //console.log($scope.myData.extras.indexOf(extra))
      if($scope.myData.extras.indexOf(extra)>-1)
        $scope.myData.extras.splice($scope.myData.extras.indexOf(extra),1)
      else
        $scope.myData.extras.push(extra)
    }

    $scope.sendForm = function(){
      $http.post('/api/customers',$scope.myData).then(function(data){
        console.log(data)
      },function(error){
        console.log(error)
      })
    }

    $scope.$watch('myData.type',function(newValue){
      //$scope.myData = {
      //  type:newValue,
      //  bodyEngine: '',
      //  engine: '',
      //  transmission: '',
      //  finish: '',
      //  tires: '',
      //  color: '',
      //  colorSport: '',
      //  extras: [],
      //  cp: '',
      //  email: ''
      //}

      $scope.myData.bodyEngine = '';
      $scope.myData.engine = '';
      $scope.myData.transmission = '';
      $scope.myData.finish = '';
      $scope.myData.tires = '';
      $scope.myData.color = '';
      $scope.myData.colorSport = '';
      $scope.myData.extras = [];

    });
  }]);
