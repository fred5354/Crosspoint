// Mobionic: Mobile Ionic Framework

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'mobionicApp' is the name of this angular module (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
//angular.module('mobionicApp', ['ionic', 'mobionicApp.controllers', 'mobionicApp.data', 'mobionicApp.directives', 'mobionicApp.filters', 'mobionicApp.storage', 'ngSanitize', 'uiGmapgoogle-maps','ngCordova'])

angular.module('mobionicApp', ['ionic', 'mobionicApp.controllers', 'mobionicApp.data', 'mobionicApp.directives', 'mobionicApp.filters', 'mobionicApp.storage', 'ngSanitize', 'ngCordova'])

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

		var options = {
		location: 'yes',
		clearcache: 'yes',
		toolbar: 'no'
		};
       //console.log($this.attr('href'));		
        window.open($this.attr('href'), target,'location=yes');

    });
    
    $ionicPlatform.errMsg = "Opps.  Our servie is currently experience issues.  Please check back later.";
    

    // Initialize Push Notifications
    /*
    var initPushwoosh = function() {
        var pushNotification = window.plugins.pushNotification;

		if(device.platform == "Android") {
			registerPushwooshAndroid();
		}
        if (device.platform == "iPhone" || device.platform == "iOS") {
            registerPushwooshIOS();
        }
    }
    */
    // Uncomment the following initialization when you have made the appropriate configuration for iOS - http://goo.gl/YKQL8k and for Android - http://goo.gl/SPGWDJ
	// initPushwoosh();

  });
    
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    
    // $ionicConfigProvider
    // http://ionicframework.com/docs/api/provider/%24ionicConfigProvider/
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.views.maxCache(3);



    $stateProvider
	
		
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('home', {
      url: "/home",
      template: "<p>hello world</p>"
    })



    .state('app.archive', {
      url: "/sermonArchives",
      views: {
        'app-sermons' :{
          templateUrl: "templates/sermonArchives.html",
          controller: 'SermonArchivesCtrl'
        }
      }
    })

    .state('app.contact', {
      url: "/contact/:to",
      views: {
        'app-about' :{
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

    .state('app.pastor-posts', {
      url: "/pastor-posts",
      views: {
        'app-pastorposts' :{
          templateUrl: "templates/pastor-posts.html",
          controller: 'PostsCtrl'
        }
      }
    })
    
    .state('app.pastor-post', {
      url: "/posts/:postId",
      views: {
        'app-pastorposts' :{
          templateUrl: "templates/post.html",
          controller: 'PostCtrl'
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

  
    .state('app.registrations', {
      url: "/registrations",
      views: {
        'app-registrations' :{
          templateUrl: "templates/registrations.html",
          controller: 'RegistrationsCtrl'
        }
      }
    })
    
    
       .state('app.registration', {
      url: "/registrations/:serverpostId",
      views: {
        'app-registrations' :{
          templateUrl: "templates/registration.html",
          controller: 'RegistrationCtrl'
        }
      }
    })    
    
    .state('app.series-sermons', {
      url: "/series-sermons/:series_slug",
      views: {
        'app-sermons' :{
          templateUrl: "templates/series-sermons.html",
          controller: 'SeriesSermonsCtrl'
        }
      }
    })

    .state('app.series-campuses', {
      url: "/series-campuses/:id",
      views: {
        'app-sermons' :{
          templateUrl: "templates/series-campuses.html",
          controller: 'SeriesCampusesCtrl'
        }
      }
    })
    
    .state('app.series-sermon', {
      url: "/series-sermon/:series_slug/:sermonPostID/:siteLangID",
      views: {
        'app-sermons' :{
          templateUrl: "templates/series-sermon.html",
          controller: 'SermonCtrl'
        }
      }
    })
  
     .state('app.settings', {
      url: "/settings",
      views: {
        'app-settings' :{
          templateUrl: "templates/settings.html",
          controller: 'SettingsCtrl'
        }
      }
    }) 
    
     .state('firsttime', {
	      url: "/firsttime",
          templateUrl: "templates/firstTime.html",
          controller: 'firstTimeCtrl'
    })     
    
 

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/posts');
});