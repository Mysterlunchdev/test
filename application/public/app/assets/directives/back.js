app.directive('backButton', function () {
    return {
        restrict: 'E',
        template: '<button class="btn bgColor"><i class="fa fa-arrow-left def-font-color"></i></button>',
        scope: {
            back: '@back',
            icons: '@icons'
        },
        link: function(scope, element, attrs) {
            $(element[0]).on('click', function() {
                history.back();
                scope.$apply();
            });
        }
    };
});