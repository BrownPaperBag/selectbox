angular.module('selectbox', [])
    .directive('selectbox', function () {
        return {
            replace : true,
            restrict: 'E',
            scope: {
                options: '=',
                model: '=',
                width: '='
            },
            template:
                '<div class="selectbox" ng-style="style.main">' +
                '    <div style="position:fixed; top: 0; bottom: 0; left: 0; right: 0" class="selectbox-overlay" ng-show="selecting" ng-click="selecting=0"></div>' +
                '    <div class="selectbox-value ng-class: {placeholder: !lookup[model]}" ng-click="selecting=!selecting">{{lookup[model] || placeholder}}</div>' +
                '    <div class="selectbox-options" ng-show="selecting" ng-style="style.options">' +
                '        <div class="selectbox-option" ng-repeat="option in options"' +
                '            ng-click="$parent.model=option.code; $parent.selecting=0">{{option.description}}</div>' +
                '    </div>' +
                '</div>',
            link : function($scope, $element, $attributes) {
                $scope.inited = false;
                $scope.placeholder = $attributes.placeholder;
                $scope.style = {
                    main : {},
                    options : {}
                };
                $scope.$watch('model', function(newValue, oldValue) {
                    if (newValue != oldValue) {
                        if (!$scope.inited) {
                            $scope.inited = true;
                            if ($attributes.onInit)
                                $scope.$parent.$eval($attributes.onInit);
                        } else {
                            if ($attributes.onChange)
                                $scope.$parent.$eval($attributes.onChange);
                        }
                    }
                });
                $scope.$watchCollection('options', function(newValue, oldValue) {
                    if (typeof $scope.options != 'undefined') {
                        $scope.lookup = createLookup($scope.options, 'code', 'description');
                    }
                });
                if ($scope.width) {
                    $scope.style.main.width = $scope.width + 'px';
                    $scope.style.options.width = $scope.width + 'px';
                }
            }
        }
    })
    .directive('valueSelectbox', function () {
        return {
            replace : true,
            restrict: 'E',
            scope: {
                options: '=',
                width: '=',
            },
            template:
                '<div class="selectbox ng-class: {\'disabled\': _disabled}" ng-style="style.main">' +
                '    <div style="position:fixed; top: 0; bottom: 0; left: 0; right: 0" class="selectbox-overlay" ng-show="selecting" ng-click="selecting=0"></div>' +
                '    <div class="selectbox-value ng-class: {placeholder: !lookup[val]}" ng-click="selecting=!_disabled && !selecting">{{lookup[val] || placeholder}}</div>' +
                '    <div class="selectbox-options" ng-show="selecting" ng-style="style.options">' +
                '        <div class="selectbox-option" ng-repeat="option in options"' +
                '            ng-click="$parent.selecting=0; changed(option.code, $event)">{{option.description}}</div>' +
                '    </div>' +
                '</div>',
            link : function($scope, $element, $attributes) {
                $scope.placeholder = $attributes.placeholder;
                $scope.style = {
                    main : {},
                    options : {}
                };
                $scope.changed = function($value, $event) {
                    var $subScope = $scope.$parent.$new();
                    $subScope.$value = $value;
                    $subScope.$event = $event;
                    $subScope.$eval($attributes.onChange);
                };
                $scope.$parent.$watch($attributes.value, function(newValue, oldValue) {
                    $scope.val = $scope.$parent.$eval($attributes.value);
                    $scope._disabled = $scope.$parent.$eval($attributes.disabled || 'false');
                });

                $scope.$watchCollection('options', function(newValue, oldValue) {
                    $scope.lookup = createLookup($scope.options, 'code', 'description');
                });
                if ($scope.width) {
                    $scope.style.main.width = $scope.width + 'px';
                    $scope.style.options.width = $scope.width + 'px';
                }
            }
        }
    })
    ;
