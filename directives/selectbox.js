angular.module('selectbox', [])
    .directive('selectbox', function () {
        return {
            replace : true,
            restrict: 'E',
            scope: {
                options: '=',
                model: '='
            },
            template:
                '<div class="selectbox">' +
                '    <div style="position:fixed; top: 0; bottom: 0; left: 0; right: 0" class="selectbox-overlay" ng-show="selecting" ng-click="selecting=0"></div>' +
                '    <div class="selectbox-value ng-class: {placeholder: !lookup[model]}" ng-click="selecting=!selecting">{{lookup[model] || placeholder}}</div>' +
                '    <div class="selectbox-options" ng-show="selecting">' +
                '        <div class="selectbox-option" ng-repeat="option in options"' +
                '            ng-click="$parent.model=option.code; $parent.selecting=0">{{option.description}}</div>' +
                '    </div>' +
                '</div>',

            link : function($scope, $element, $attributes){

                $scope.placeholder = $attributes.placeholder;

                $scope.$watch('model', function(newValue, oldValue){

                    if(newValue != oldValue){

                        $scope.$parent.$eval($attributes.onChange);

                    }

                });

                $scope.$watchCollection('options', function(newValue, oldValue){
                    $scope.lookup = createLookup($scope.options, 'code', 'description');
                });

            }

        }

    });