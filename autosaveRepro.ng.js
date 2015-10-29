angular.module('reproduction', [
        'angular-meteor',
        'ui.router',
    ])
    .config(AppConfig)
    .controller('Route1Controller', route1Controller)
    .controller('Route2Controller', route2Controller)
    .run(AppRun);

function AppConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise('/');

    $stateProvider.state(
        {
            name: 'route1',
            url: '/',
            views: {
                '': {
                    controller: 'Route1Controller',
                    controllerAs: 'vm',
                    templateUrl: 'route1.ng.html'
                }
            },
            resolve: {
            }
        }
    ).state(
        {
            name: 'route2',
            url: '/route2',
            views: {
                '': {
                    controller: 'Route2Controller',
                    controllerAs: 'vm',
                    templateUrl: 'route2.ng.html'
                }
            },
            resolve: {
            }
        }
    )
}

function AppRun($rootScope, $timeout, $state) {
    console.log('#### App Run ####');
    // Add State to $rootScope so we can use it for ng-show
    $rootScope.$state = $state;

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        console.info('State Change Started');
    });

    $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) {
        console.error('State not Found');
        console.error(unfoundState.to);
        console.error(unfoundState.toParams);
        console.error(unfoundState.options);
    });

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        console.error('State Error Event: ', event);
        console.error('Error From: ', fromState, fromParams);
        console.error('Error To: ', toState, toParams);
    });

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        console.info('State Change Success', toState);
    });
};

function route1Controller($scope, $meteor) {
    var vm = this;
    console.log('Route 1 Controller');

    $scope.$meteorSubscribe('Collection1');

    // This does not trigger autosave as soon as the route is loaded
    // $scope.$meteorCollection(
    //     function(){
    //         return Collection1.find({ _id: 'HHetzpkuqukhFr4i4' });
    //     }
    // );

    // This triggers autosave as soon as the route is loaded
    $scope.$meteorObject(Collection1, 'HHetzpkuqukhFr4i4');

    // $scope.$meteorAutorun(
    //     function() {
    //         console.log('#### Autorun ####');
    //     }
    // );
}

function route2Controller($scope, $meteor) {
    var vm = this;
    console.log('Route 2 Controller');

    $scope.$meteorSubscribe('Collection2');

    $scope.$meteorObject(Collection2, 'g7tXpujEj8aHqNXA5');
}

Collection1.before.update(
    function(userId, doc, fieldNames, modifier, options) {
        console.log('#### Collection 1 Update ####', userId, doc, fieldNames, modifier, options);
    }
);

Collection2.before.update(
    function(userId, doc, fieldNames, modifier, options) {
        console.log('#### Collection 2 Update ####', userId, doc, fieldNames, modifier, options);
    }
);