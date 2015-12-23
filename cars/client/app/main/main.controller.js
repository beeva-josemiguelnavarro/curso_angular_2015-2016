'use strict';

angular.module('carsApp')
  .controller('MainCtrl',['$scope','$http',function($scope,$http){
    $scope.options = {};

    $scope.error = false;
    $scope.ready = false;

    $scope.sendingForm = false;
    $scope.successForm = false;
    $scope.errorForm = false;

    $scope.showModal = false;

    $scope.closeModal = function(){
      $scope.showModal = false;
      $scope.sendingForm = false;
      $scope.successForm = false;
      $scope.errorForm = false;
      $scope.initialize()
    }

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
      $scope.myData.extras = []
      $scope.myData.cp= '',
      $scope.myData.email= '',
      $scope.myData.comments= ''

      setTimeout(function(){
        $scope.ready = true;
        $scope.$apply();
      },0);
    }

    $scope.sendForm = function(){
      $scope.showModal = true;
      $scope.sendingForm = true;
      $scope.errorForm = false;
      $scope.successForm = false;

      $http.post('/api/customers',$scope.myData).then(function(data){
        console.log(data)
        $scope.sendingForm = false;
        $scope.successForm = true;
        $scope.initialize()
      },function(error){
        $scope.sendingForm = false;
        $scope.errorForm = true;
        console.log(error)
      })
    }

    $scope.$watch('myData.type',function(newValue){
      if(newValue=='sport'){
        $scope.myData.bodyEngine = _.find($scope.options.bodyEngines, {type: newValue}).value;
        $scope.myData.engine = _.find($scope.options.engines, {type: newValue}).value;
        $scope.myData.transmission = _.find($scope.options.transmissions, {type: newValue}).value;
        $scope.myData.finish = _.find($scope.options.finishes, {type: newValue}).value;
        $scope.myData.tires = _.find($scope.options.tires, {type: newValue}).value;
        $scope.myData.colorSport = $scope.options.colorsSport[0].value
        for (var extra in $scope.options.extras) {
          if($scope.myData.extras.indexOf($scope.options.extras[extra].value)<0)
            $scope.myData.extras.push($scope.options.extras[extra].value)
        }
      } else {
        $scope.myData.colorSport = '';
      }
    });

  }]);
