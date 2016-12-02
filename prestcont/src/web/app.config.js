(function () {
    'use strict';
    angular
        .module(global.config.APP_NAME)
        .config(Config);

    Config.$inject = ['$translateProvider', '$translateStaticFilesLoaderProvider', '$urlRouterProvider', '$stateProvider'];

    function Config($translateProvider, $translateStaticFilesLoaderProvider, $urlRouterProvider, $stateProvider) {
        var config = this;

        $urlRouterProvider.otherwise('/bills');

        $stateProvider
            .state('bills', {
                url: '/bills',
                cache: false,
                views: {
                    'pageContent@':{templateUrl: 'views/bills/bills.html'}
                }
            })

            .state('bills.detail', {
                url: '/:billId',
                cache: false,
                views: {
                    'pageContent@':{templateUrl: 'views/bills-detail/bills-detail.html'}
                }
            })

            .state('settings', {
                url: '/settings',
                cache: false,
                views: {
                    'pageContent@':{templateUrl: 'views/settings/settings.html'}
                }
            });

        var language = navigator.language.substr(0, 2);

        $translateProvider.useStaticFilesLoader({
            prefix: 'locales/',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage(language);
        $translateProvider.fallbackLanguage('pt');
        $translateProvider.useSanitizeValueStrategy('escaped');
    }
}());
