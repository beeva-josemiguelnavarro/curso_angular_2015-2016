'use strict';

angular.module('carsApp')
	.directive('formElement',function(){
		return{
			restric: 'EA',
			templateUrl: function(element,attrs){
				switch(attrs.type){
					case 'input':
						return 'app/directives/formElement/formElement.template.input.html';
						break;
					case 'select':
						return 'app/directives/formElement/formElement.template.select.html';
						break;
					case 'radio':
						return 'app/directives/formElement/formElement.template.radio.html';
						break;
					case 'check':
						return 'app/directives/formElement/formElement.template.check.html';
						break;
					case 'text':
						return 'app/directives/formElement/formElement.template.text.html';
						break;
				}
				
			},
			scope: {
				form: '=',
				name: '@',
				type: '@',
				label: '@',
				model: '=',
				options: '=',
				disabled: '=',
				hide:'='
			},
			link: function(scope, elem, attrs, transclude){
			}
		}
	})