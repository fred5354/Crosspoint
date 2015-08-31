// Mobionic: Mobile Ionic Framework

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'mobionicApp' is the name of this angular module (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('mobionicApp', ['ionic', 'mobionicApp.controllers', 'mobionicApp.data', 'mobionicApp.directives', 'mobionicApp.filters', 'mobionicApp.storage', 'ngSanitize', 'uiGmapgoogle-maps'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
      
    // Open any external link with InAppBrowser Plugin
    $(document).on('click', 'a[href^=http], a[href^=https]', function(e){

        e.preventDefault();
        var $this = $(this); 
        var target = $this.data('inAppBrowser') || '_blank';

        window.open($this.attr('href'), target);

    });

    // Initialize Push Notifications
    var initPushwoosh = function() {
        var pushNotification = window.plugins.pushNotification;

		if(device.platform == "Android") {
			registerPushwooshAndroid();
		}
        if (device.platform == "iPhone" || device.platform == "iOS") {
            registerPushwooshIOS();
        }
    }
    
    // Uncomment the following initialization when you have made the appropriate configuration for iOS - http://goo.gl/YKQL8k and for Android - http://goo.gl/SPGWDJ
	// initPushwoosh();

  });
    
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    
    // $ionicConfigProvider
    // http://ionicframework.com/docs/api/provider/%24ionicConfigProvider/
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.views.maxCache(5);

    $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/posts.html",
          //templateUrl: "templates/home-grid-3.html",
          //templateUrl: "templates/home-rows.html",
          controller: 'PostsCtrl'
        }
      }
    })

    .state('app.archive', {
      url: "/news",
      views: {
        'app-archive' :{
          templateUrl: "templates/news.html",
          controller: 'NewsCtrl'
        }
      }
    })

    .state('app.contact', {
      url: "/contact",
      views: {
        'app-contact' :{
          templateUrl: "templates/contact.html",
          controller: 'ContactCtrl'
        }
      }
    })

   
    .state('app.about', {
      url: "/about",
      views: {
        'app-about' :{
          templateUrl: "templates/about.html",
          controller: 'AboutCtrl'
        }
      }
    })

    
    .state('app.posts', {
      url: "/posts",
      views: {
        'app-posts' :{
          templateUrl: "templates/posts.html",
          controller: 'PostsCtrl'
        }
      }
    })
    
    .state('app.post', {
      url: "/posts/:postId",
      views: {
        'app-posts' :{
          templateUrl: "templates/post.html",
          controller: 'PostCtrl'
        }
      }
    })    

  
    .state('app.serverposts', {
      url: "/serverposts",
      views: {
        'app-feeds' :{
          templateUrl: "templates/serverposts.html",
          controller: 'ServerPostsCtrl'
        }
      }
    })
    
    
       .state('app.serverpost', {
      url: "/serverposts/:serverpostId",
      views: {
        'app-feeds' :{
          templateUrl: "templates/serverpost.html",
          controller: 'ServerPostCtrl'
        }
      }
    })    
    
    .state('app.feed-categories', {
      url: "/feed-categories/:series_slug",
      views: {
        'app-news' :{
          templateUrl: "templates/feed-categories.html",
          controller: 'FeedPluginCategoriesCtrl'
        }
      }
    })

    .state('app.feed-category', {
      url: "/feed-category/:id",
      views: {
        'app-news' :{
          templateUrl: "templates/feed-category.html",
          controller: 'FeedPluginCategoryCtrl'
        }
      }
    })
    
    .state('app.feed-master', {
      url: "/feed-master/:series_slug/:sermonPostID/:siteLangID",
      views: {
        'app-news' :{
          templateUrl: "templates/feed-master.html",
          controller: 'FeedPluginMasterCtrl'
        }
      }
    })
  

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/posts');
});