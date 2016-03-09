var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['main','ngResource','ui.bootstrap']);

angular.element(document).ready(function() {
    angular.bootstrap(document, [mainApplicationModuleName]);
});