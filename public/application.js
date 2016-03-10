var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['main','ngResource','ui.bootstrap','users']);

if (window.location.hash === "#_=_") {
    window.location.hash = "#!";
}

angular.element(document).ready(function() {
    angular.bootstrap(document, [mainApplicationModuleName]);
});