angular.module('selectbox', [])
    .directive('selectbox', function () {
        return {
            restrict: 'E',
            scope: {
                options: '=',
                model: '='
            },
            template:
                '<div class="selectbox">' +
                '    <div style="position:fixed; top: 0; bottom: 0; left: 0; right: 0" class="selectbox-overlay" ng-show="selecting" ng-click="selecting=0"></div>' +
                '    <div class="selectbox-value" ng-click="selecting=!selecting">{{options[model]}}</div>' +
                '    <div class="selectbox-options" ng-show="selecting">' +
                '        <div class="selectbox-option" ng-repeat="(code, description) in options"' +
                '            ng-click="$parent.model=code; $parent.selecting=0">{{description}}</div>' +
                '    </div>' +
                '</div>'
        }
    });
