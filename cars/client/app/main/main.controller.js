'use strict';

angular.module('carsApp')
  .controller('MainCtrl',['$scope','$http','Modal',function($scope,$http,Modal){
    $scope.options = {};
    $scope.error = false;
    $scope.ready = false;
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
      email: '',
      comments: ''
    }

    $http.get('/api/options').then(function(response){
      //console.log(response)
      $scope.options = response.data;
      $scope.initialize()
    },function(error){
      //console.log(error);
      $scope.error = true;
      $scope.ready = true;
    });

    $scope.toggleExtra = function(extra){
      if($scope.myData.extras.indexOf(extra)>-1)
        $scope.myData.extras.splice($scope.myData.extras.indexOf(extra),1)
      else
        $scope.myData.extras.push(extra)
    }

    $scope.initialize = function(){
      $scope.ready = false

      $scope.myData.type = 'normal'
      $scope.myData.bodyEngine = $scope.options.bodyEngines[0].value
      $scope.myData.engine = $scope.options.engines[0].value
      $scope.myData.transmission = $scope.options.transmissions[0].value
      $scope.myData.finish = $scope.options.finishes[0].value
      $scope.myData.tires = $scope.options.tires[0].value
      $scope.myData.color = $scope.options.colors[0].value
      $scope.myData.colorSport = $scope.options.colorsSport[0].value
      $scope.myData.cp= '',
      $scope.myData.email= '',
      $scope.myData.comments= ''

      $scope.ready = true
    }

    $scope.sendForm = function(){
      $http.post('/api/customers',$scope.myData).then(function(data){
        console.log(data)
        $scope.initialize()
      },function(error){
        console.log(error)
      })
    }

    $scope.$watch('myData.type',function(newValue){
      if(newValue=='sport'){
        $scope.myData.bodyEngine = $scope.options.bodyEngines[2].value
        $scope.myData.engine = $scope.options.engines[3].value
        $scope.myData.transmission = $scope.options.transmissions[0].value
        $scope.myData.finish = $scope.options.finishes[0].value
        $scope.myData.tires = $scope.options.tires[3].value
        $scope.myData.colorSport = $scope.options.colorsSport[0].value
      }
    });

  }]);
