angular.module('mobionicApp.controllers', [])

// Home Controller
.controller('HomeCtrl', function($scope, Data, $ionicLoading, SeriesSermonData) {
  $scope.items = Data.items;



  
  /*
      $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Loading Sermons',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,
        
      // The delay in showing the indicator
      showDelay: 10
    });
    */
    /*
       SeriesSermonData.asyncCategories("newest").then(
        // successCallback
        function() {
            $scope.series_image = SeriesSermonData.get_series_image(); 
            $ionicLoading.hide();
             ionic.Platform.ready( function() {
			    if(navigator && navigator.splashscreen) navigator.splashscreen.hide();
			});
        },
        // errorCallback 
        function() {
			$scope.series_image = "img/xphome.jpg";
			ionic.Platform.ready( function() {
			    if(navigator && navigator.splashscreen) navigator.splashscreen.hide();
			});
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    ); 
    
*/
    
})





// News Controller
.controller('SermonArchivesCtrl', function($scope, $ionicLoading, SermonArchivesData, SermonArchivesStorage) {
    
    $scope.news = [];
    $scope.storage = '';
    

    
    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Loading Sermons',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The delay in showing the indicator
      showDelay: 10
    });
    
    SermonArchivesData.async().then(
        // successCallback
        function() {
            $scope.news = SermonArchivesData.getAll();
			d = $scope.news;

            $ionicLoading.hide();
        },
        // errorCallback 
        function() {
            $scope.news = SermonArchivesStorage.all();
            $scope.storage = '.';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    );

})

// New Controller
/*
.controller('NewCtrl', function($scope, $stateParams, NewsData) {

    $scope.new = NewsData.get($stateParams.newId);
    
})
*/


// Products Controller
.controller('ProductsCtrl', function($scope, $ionicLoading, ProductsData, ProductsStorage) {
    
    $scope.products = [];
    $scope.storage = '';
    
    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Loading Data',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The delay in showing the indicator
      showDelay: 10
    });
    
    ProductsData.async().then(
        // successCallback
        function() {
            $scope.products = ProductsData.getAll();
            $scope.letterLimit = ProductsData.getLetterLimit();
            $ionicLoading.hide();
        },
        // errorCallback 
        function() {
            $scope.products = ProductsStorage.all();
            $scope.letterLimit = ProductsData.getLetterLimit();
            $scope.storage = '.';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    );
    
})

// Product Controller
.controller('ProductCtrl', function($scope, $stateParams, ProductsData) {
    
    $scope.product = ProductsData.get($stateParams.productId);
    
})

// Gallery Controller
.controller('GalleryCtrl', function($scope, GalleryData) {

    $scope.items = GalleryData.items;

})

// Map Controller
.controller('MapCtrl', function($scope, MapData) {

    $scope.windowOptions = false;

    $scope.onClick = function () {
    this.windowOptions = !this.windowOptions;
    };

    $scope.closeClick = function () {
    this.windowOptions = false;
    };

    $scope.map = MapData.map;

})

// About Controller
.controller('AboutCtrl', function($scope, $ionicLoading, AboutData, PastorData, AboutStorage, $sce) {
    
    $scope.about = [];
 
    $scope.getContent = function(id) {	
	   return $sce.trustAsHtml(AboutData.get(id));    
    }
	
	$scope.pastors = PastorData.pastors;
	

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Loading Data',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,
        
      // The delay in showing the indicator
      showDelay: 10
    });
    
    AboutData.async().then(
        // successCallback
        function() {
            $scope.about = AboutData.getAll();
            $ionicLoading.hide();
        },
        // errorCallback 
        function() {
            $scope.about = AboutStorage.all();
            $scope.storage = '.';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    );
    
})

// Member Controller
.controller('MemberCtrl', function($scope, $stateParams, AboutData) {
    
    $scope.member = AboutData.get($stateParams.memberId);
    
})

// Contact Controller
.controller('ContactCtrl', function($scope,$stateParams) {
    
    
    $scope.to = $stateParams.to;
    
    $scope.contact = {
      subject:  '',
      body: ''
    }
    
    $scope.submitForm = function() {

        window.plugin.email.open({
            to:      ['frederick.ng@gmail.com'],
            cc:      [''],
            bcc:     [''],
            subject: $scope.contact.subject,
            body:    $scope.contact.body
        });

    };

})

// Posts Controller
.controller('PostsCtrl', function($scope, $ionicLoading, PostsData, PostsStorage,SettingsStorage, $sce, $http) {
    
    $scope.posts = [];
    $scope.storage = '';
	var data;     

		
	$scope.loadData = function () {


		
		$scope.loading = $ionicLoading.show({
		  template: '<i class="icon ion-loading-c"></i> Loading News',

		  //Will a dark overlay or backdrop cover the entire view
		  showBackdrop: false,

		  // The delay in showing the indicator
		  showDelay: 10
		});
		
	   $http({method: 'GET', url: PostsData.getJson(), timeout: 5000}).
		success(function(d) {
		
			data = d;

			PostsStorage.save(data);
            $scope.posts = data.posts;
            PostsData.setData(data);
             $ionicLoading.hide();
             ionic.Platform.ready( function() {
			    if(navigator && navigator.splashscreen) navigator.splashscreen.hide();
			});             
			$scope.$broadcast('scroll.refreshComplete');


		}).
		error(function(e) {

			data = PostsStorage.all();
            $scope.posts = data.posts;
            $ionicLoading.hide();
             ionic.Platform.ready( function() {
			    if(navigator && navigator.splashscreen) navigator.splashscreen.hide();
			});
            if (!data.posts) $scope.err = true;
			$scope.$broadcast('scroll.refreshComplete');


		});
    }
    
    $scope.loadData();
    
    
    
    
	$scope.formatDate = function(a){

		d = new Date(a.substring(0,10));
		   var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    var curr_day = d.getDate();
    var curr_hours = d.getHours();
    var curr_minutes = d.getMinutes();

    if (curr_day < 10) {
        curr_day = '0' + curr_day;
    }


    return ( m_names[d.getMonth()] + ' ' + curr_day + ', ' + d.getFullYear() );
	
	}
    
    $scope.getExcerpt = function(s){
    	return s.replace("Read more","");
    
    }
    
    $scope.getRegisterTitle = function(d){
	     try{
     		var a = $scope.posts[d].custom_fields.post_1_sign_up_title[0].split(";")[2].split(":");
			var registerTitle = a[2];
			registerTitle = registerTitle.replace(/\"/g, "");
			if (registerTitle){
				return registerTitle;}else{return "Sign Up";}

    	 }catch(er){
    	 	return "";
    	 }
	}
    
    $scope.isRegisterURL = function(d){
		try {

			var a = $scope.posts[d].custom_fields.post_1_sign_up_url[0].split(";")[2].split(":")[2];
    		if (a.length>2){  return true; }else{return false ;}    	
    	}catch(err){
    		return false;
    	}

    }

	$scope.getRegisterURL = function(d){
		var a = $scope.posts[d].custom_fields.post_1_sign_up_url[0].split(";")[2].split(":");
		var registerURL = a[2]+":"+a[3];
		registerURL = registerURL.replace(/\"/g, "");
		return registerURL;
		//window.open(registerURL, '', '');
	}
	
	
	
	
 
 	$scope.shareEntryPost = function (d) {

		
        var subject = $scope.posts[d].title;
        var message = $scope.posts[d].content;
        message = message.replace(/(<([^>]+)>)/ig,"");


        var link = $scope.posts[d].url;

        //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
        //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
        window.plugins.socialsharing.share(message, subject, null, link);
    }

  

})

// Post Controller
.controller('PostCtrl', function($scope, $stateParams, PostsData, $sce) {

    $scope.post = PostsData.get($stateParams.postId);
    
    $scope.content = $sce.trustAsHtml($scope.post.content);
    
    $scope.loadURL = function (url) {
        //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
        //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
        //_blank: Opens in the InAppBrowser.
        //_system: Opens in the system's web browser.
        window.open(url,'_blank');
    }
    
    $scope.sharePost = function () {

        var subject = $scope.post.title;
        var message = $scope.post.content;
        message = message.replace(/(<([^>]+)>)/ig,"");

        var link = $scope.post.url;

        //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
        //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
        window.plugins.socialsharing.share(message, subject, null, link);
    }
    
})

// ServerPosts Controller
.controller('RegistrationsCtrl', function($scope, $http, $ionicLoading, ServerPostsData, ServerPostsStorage) {
    var data = []
    $scope.posts = [];
    $scope.storage = '';
    
    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Loading Data',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The delay in showing the indicator
      showDelay: 10
    });
    
    $scope.loadData = function () {
        
        $http({method: 'GET', url: ServerPostsData.getURL(), timeout: 5000}).
        // this callback will be called asynchronously
        // when the response is available.
        success(function(data) {
            $scope.more = data.pages !== $scope.page;
            $scope.posts = $scope.posts.concat(data.posts);
            ServerPostsData.setData($scope.posts);
            ServerPostsStorage.save(data);
            $ionicLoading.hide();
        }).
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        error(function() {
            $scope.posts = ServerPostsStorage.all().posts;
            ServerPostsData.setData(ServerPostsStorage.all().posts);
            $scope.storage = '.';
            $ionicLoading.hide();
        });

    };
        
    $scope.showMoreItems = function () {
        $scope.page += 1;
        $ionicLoading.show({
        template: '<i class="icon ion-loading-c"></i> Loading Data',

        //Will a dark overlay or backdrop cover the entire view
        showBackdrop: false,

        // The delay in showing the indicator
        showDelay: 10
        });
        $scope.loadData();
    }

    $scope.hasMoreItems = function () {
        return $scope.more;
    }

    $scope.page = 1;
    $scope.more = true;
    $scope.loadData();
    
})

// ServerPost Controller
.controller('RegistrationCtrl', function($scope, $stateParams, ServerPostsData, $sce) {

    $scope.post = ServerPostsData.get($stateParams.serverpostId);
    
    $scope.content = $sce.trustAsHtml($scope.post.content);
    
    registerURL = "";
    try{
	    var a = $scope.post.custom_fields.post_1_sign_up_url[0].split(";")[2].split(":");
		registerURL = a[2]+":"+a[3];
		registerURL = registerURL.replace(/\"/g, "");
	}catch(err){
		registerURL = "";
	}

	$scope.registerURL = registerURL;
		
    
    $scope.loadURL = function (url) {
        //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
        //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
        //_blank: Opens in the InAppBrowser.
        //_system: Opens in the system's web browser.
        window.open(url,'_blank');
    }
    
    $scope.sharePost = function () {

        var subject = $scope.post.title;
        var message = $scope.post.content;
        message = message.replace(/(<([^>]+)>)/ig,"");

        var link = $scope.post.url;

        //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
        //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
        window.plugins.socialsharing.share(message, subject, null, link);
    }
    
})

// RSS Feeds Controller
.controller('FeedsCtrl', function($scope, $ionicLoading, FeedsData, FeedsStorage) {
    /*
    $scope.feeds = [];
    
    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Loading Data',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The delay in showing the indicator
      showDelay: 10
    });
    
    var data;
    
    FeedsData.async().then(
        // successCallback
        function() {
            data = FeedsData.getAll();

            $scope.title = data.title;
            $scope.description = data.description;
            $scope.link = data.link;
            $scope.feeds = data.entries;
            
            $ionicLoading.hide();
            
        },
        // errorCallback 
        function() {
            data = FeedsStorage.all();

            $scope.storage = '.';
            
            $scope.title = data.title;
            $scope.description = data.description;
            $scope.link = data.link;
            $scope.feeds = data.entries;
            
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    );
    
    var page = 1;
    // Define the number of the feed results in the page
    var pageSize = 5;

    $scope.paginationLimit = function(data) {
    return pageSize * page;
    };

    $scope.hasMoreItems = function() {
    return page < ($scope.feeds.length / pageSize);
    };

    $scope.showMoreItems = function() {
    page = page + 1;
    $scope.$apply();
    }; 
    
    $scope.getImage = function(index) {
    var selectedItem = $scope.feeds[index];
    var content = selectedItem.content;
    var element = $('<div>').html(content);
    var source = element.find('img').attr("src");
    return source;
    }
    */
    
})

// RSS Feeds Controller
.controller('FeedsRefresherCtrl', function($scope, $ionicLoading, FeedsData, FeedsStorage) {
    
    $scope.feeds = [];
    
    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Loading Data',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The delay in showing the indicator
      showDelay: 10
    });
    
    var data;
        
    var getData = function() {
    
        FeedsData.async().then(
            // successCallback
            function() {
                data = FeedsData.getAll();


                $scope.title = data.title;
                $scope.description = data.description;
                $scope.link = data.link;
                $scope.feeds = data.entries;

                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');

            },
            // errorCallback 
            function() {
                data = FeedsStorage.all();

                $scope.storage = '.';

                $scope.title = data.title;
                $scope.description = data.description;
                $scope.link = data.link;
                $scope.feeds = data.entries;

                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
            },
            // notifyCallback
            function() {}
        );
        
    }
    
    getData();
    
    $scope.doRefresh = function() {
        getData();  
    }
    
    $scope.getImage = function(index) {
    var selectedItem = $scope.feeds[index];
    var content = selectedItem.content;
    var element = $('<div>').html(content);
    var source = element.find('img').attr("src");
    return source;
    }
    
})

// RSS Feed Controller
.controller('FeedCtrl', function($scope, $stateParams, FeedsData, $sce) {
    
    $scope.entry = FeedsData.get($stateParams.entryId);
    
    $scope.content = $sce.trustAsHtml($scope.entry.content);
    
    $scope.loadURL = function (url) {
        //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
        //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
        //_blank: Opens in the InAppBrowser.
        //_system: Opens in the system's web browser.
        window.open(url,'_blank');
    }
    
    $scope.shareEntry = function () {

        var subject = $scope.entry.title;
        var message = $scope.entry.content;
        message = message.replace(/(<([^>]+)>)/ig,"");

        var link = $scope.entry.link;

        //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
        //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
        window.plugins.socialsharing.share(message, subject, null, link);
    }
    
})



// Plugins Controller
.controller('PluginsCtrl', function($scope, PluginsData) {
  $scope.items = PluginsData.items;
})

// Device Controller
.controller('DeviceCtrl', function($scope) {
  $scope.device = device;
})

// Notifications Controller
.controller('NotificationsCtrl', function($scope) {
    
    $scope.alertNotify = function() {
    navigator.notification.alert("Sample Alert",function() {console.log("Alert success")},"My Alert","Close");
    };

    $scope.beepNotify = function() {
    navigator.notification.beep(1);
    };

    $scope.vibrateNotify = function() {
    navigator.notification.vibrate(3000);
    };

    $scope.confirmNotify = function() {
    navigator.notification.confirm("My Confirmation",function(){console.log("Confirm Success")},"Are you sure?",["Ok","Cancel"]);
    };
    
})

// Barcodescanner Controller
.controller('BarcodescannerCtrl', function($scope) {
    
    $scope.scan = function() {
        cordova.plugins.barcodeScanner.scan(function(result) {
            $scope.result = result;
            $scope.$apply();
        }, function(error) {
            $scope.error = error;
            $scope.$apply();
        });
    };
    
})

// Geolocation Controller
.controller('GeolocationCtrl', function($scope, $ionicLoading) {
    
    $scope.map = {
    center: {
        latitude: 45, 
        longitude: -73
    },
    marker: {},
    zoom: 5
    };

    $scope.loading = $ionicLoading.show({

      //The text to display in the loading indicator
      template: '<i class="icon ion-loading-c"></i> Getting current location',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The delay in showing the indicator
      showDelay: 10
    });

    var options = { enableHighAccuracy: true };
    navigator.geolocation.getCurrentPosition(function(position) {

        $scope.map = {
            center: {
                latitude: position.coords.latitude, 
                longitude: position.coords.longitude
            },
            marker: {
                latitude: position.coords.latitude, 
                longitude: position.coords.longitude
            },
            zoom: 12
        };

        $ionicLoading.hide();
        
        }, function(error) {
        alert('Unable to get location: ' + error.message);
        $ionicLoading.hide();
    }, options);


})

// Seetings Controller
.controller('SettingsCtrl', function($scope, SettingsStorage, $state) {
 
    $scope.settings = SettingsStorage.all();

    $scope.saveSettings = function() {
        SettingsStorage.save($scope.settings);
    };
    
    $scope.$watch('settings', function() { SettingsStorage.save($scope.settings) }, true);
    
    $scope.resetSettings = function() {
        SettingsStorage.clear();
        $scope.settings = SettingsStorage.all();
    };
  
  	$scope.isFirstSetting = function(){
  		console.log($state);
  		if ($state.current.name = "settings"){
  			return true;
  		}
  		return false;
  	}
  	
  	
})

// firstTimeCtrl Controller
.controller('firstTimeCtrl', function($scope, SettingsStorage, $state) {
 
 
   ionic.Platform.ready( function() {
			    if(navigator && navigator.splashscreen) navigator.splashscreen.hide();
	});             
    $scope.settings = SettingsStorage.all();

    $scope.saveSettings = function() {
        SettingsStorage.save($scope.settings);
    };
    
    $scope.$watch('settings', function() { SettingsStorage.save($scope.settings) }, true);
    

  	$scope.goHome = function(){
  		$state.go("app.posts");
  	}    
})



.controller('AppCtrl', function($scope, $ionicModal, $timeout, MenuData, $ionicActionSheet, $state) {


	var lang = JSON.parse(window.localStorage['settings']).campus;


	if (!lang)
		$state.go('firsttime');
	else
		$state.go('app.posts');

	//if(0) //if first time
	  //  $state.go('app.archive'); //go to sign up view.
	//else
   		 


  /*  
  $scope.items = MenuData.items;
  
   
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  },

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
    
    // Triggered on a button click, or some other target
    $scope.show = function() {

        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
         buttons: [
           { text: '<b>Share</b> This' },
           { text: 'Move' }
         ],
         destructiveText: 'Delete',
         titleText: 'Modify your album',
         cancelText: 'Cancel',
         cancel: function() {
              // add cancel code..
            },
         buttonClicked: function(index) {
           return true;
         }
        });

    };
*/
})

// Feed Plugin Categories Controller
.controller('SeriesSermonsCtrl', function($scope, $http, $ionicLoading, $stateParams, SeriesSermonData) {
    
    
	var data = [];
      $scope.sermons = []
            $scope.series_title = "";
            $scope.series_description = "";
            $scope.series_date = "";
            $scope.series_image = "";
	        $scope.site_langs = [];
    

    s = $stateParams.series_slug;
	
	$scope.loadData = function () {
	    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Loading Sermons',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: true,
        
      // The delay in showing the indicator
      showDelay: 10
    });
    
    
    url = SeriesSermonData.getJson();
	

    if ($stateParams.series_slug){
    	s = $stateParams.series_slug;
    	if(s != 'newest'){
    		url += '?s='+s;
    	}
    }
        $http({method: 'GET', url: url, timeout: 5000}).
        // this callback will be called asynchronously
        // when the response is available.
        success(function(data) {
			try{
				$scope.sermons = data.sermons;
				$scope.series_title = data.series_name;
				$scope.series_slug = data.series_slug;            
				$scope.series_description = data.series_description;
				$scope.series_date = data.series_date;            
				$scope.series_image = data.series_image;            
				$scope.site_langs = data.sermons[0].site_langs;
				SeriesSermonData.setData(data); 
			}catch(e){
					$scope.err = true;
			}
			$ionicLoading.hide();
        }).
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        error(function() {
            $ionicLoading.hide();
            /* $scope.posts = ServerPostsStorage.all().posts;
            ServerPostsData.setData(ServerPostsStorage.all().posts);*/
            $scope.err = true;
            $scope.storage = '.'; 
        });

    };
        $scope.loadData();
        
         
        
        $scope.getPostID = function(id){
        	return $scope.sermons[id].post_id;
        }
        
       
       $scope.getHref = function(id){
       		var campus = SeriesSermonData.getCampus();
       		
       		if (campus)
       			return "#/app/series-sermon/"+$scope.series_slug+"/"+$scope.sermons[id].post_id+"/"+campus;
       		else
       			return "#/app/series-campuses/"+id;
       
       } 
        
        
         $scope.isCurrentWeek= function(sd){
	 		  var sermondate = new Date(sd);
		   	 var nextweek = new Date(sermondate);
   	 		 nextweek.setDate(nextweek.getDate()+6);
	 		 var today = new Date();
	 		if ( (today >= sermondate) &&(today<=nextweek) ){
				return true;
	 		}
	 		return false;	 
	 }


	 $scope.isFutureSermon = function(sd){

	 	 		  var sermondate = new Date(sd);
		   	 var nextweek = new Date(sermondate);
   	 		 nextweek.setDate(nextweek.getDate()+6);
	 		 var today = new Date();
	 		if ( (today >= sermondate) ){
				return false;
	 		}
	 		return true;	  
	 }

	
	 
 $scope.shareSeries = function () {

        var subject = $scope.series_title;
        var message = $scope.series_description;
        message = message.replace(/(<([^>]+)>)/ig,"");

        var link = $scope.href;
        
        window.plugins.socialsharing.share(message, subject, null, link);
    }	 
	 

            

/*
    SeriesSermonData.asyncCategories(s).then(
        // successCallback
        function() {
            $scope.sermons = SeriesSermonData.getSermons();
            $scope.series_title = SeriesSermonData.get_series_title(); 
            $scope.series_description = SeriesSermonData.get_series_description(); 
            $scope.series_date = SeriesSermonData.get_series_date(); 
            $scope.series_image = SeriesSermonData.get_series_image(); 
            $scope.site_langs = SeriesSermonData.getSiteLangs(0);            
            $ionicLoading.hide();
        },
        // errorCallback 
        function() {
        	$scope.loadError = true;
            $ionicLoading.hide();            
        },
        // notifyCallback
        function() {}
    );
*/
    
})

// Feed Plugin Category Controller
.controller('SeriesCampusesCtrl', function($scope, $ionicLoading, $stateParams, SeriesSermonData) {
    
    $scope.id = $stateParams.id;
	
	
    v = $stateParams;

    
  //  $scope.title = SeriesSermonData.getSermonTitle($stateParams.id);
    
         	$scope.sermons = SeriesSermonData.getSermons();
            $scope.series_title = SeriesSermonData.get_series_title(); 
            $scope.series_slug = SeriesSermonData.get_series_slug(); 

            $scope.series_description = SeriesSermonData.get_series_description(); 
            $scope.series_date = SeriesSermonData.get_series_date(); 
            $scope.series_url = SeriesSermonData.get_series_url();

            d = $scope.series_date;

	 
			$scope.site_langs = SeriesSermonData.getSiteLangs($scope.id);
			$scope.post_id = SeriesSermonData.getSermonPostID($scope.id);
            
            $scope.series_image = SeriesSermonData.get_series_image(); 
             $scope.site_lang_id = $stateParams.id;
    
})

// Feed Plugin Feeds Controller
.controller('SermonCtrl', function($scope, $ionicLoading, $stateParams, SeriesSermonData,$sce, $http,$cordovaMedia) {
	v = $stateParams;
	$scope.sermon = [];

	url = SeriesSermonData.getJson()+'?s='+v.series_slug+'&post_id='+v.sermonPostID+'&site_lang='+v.siteLangID;
    var media; 

	$scope.loadData = function () {
	    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Loading Sermon',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,
        
      // The delay in showing the indicator
      showDelay: 10
    });
        
        $http({method: 'GET', url: url, timeout: 5000}).
        // this callback will be called asynchronously
        // when the response is available.
        success(function(data) {
            $scope.sermon = data;            
            
            d = $scope.sermon;
                        $ionicLoading.hide();
        	 media = new Media($scope.sermon.mp3path, null, null, mediaStatusCallback);
            //SeriesSermonData.setData(data);

        }).
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        error(function() {
         /*   $scope.posts = ServerPostsStorage.all().posts;
            ServerPostsData.setData(ServerPostsStorage.all().posts);*/
            $scope.storage = '.'; 
            $ionicLoading.hide();
        });

    };
        $scope.loadData();	
	
    

    $scope.getSermonVideoUrl = function () {
    	var url =  $scope.sermon.youtubeURL;
   		var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;

		var match = url.match(regExp);
		var videoUrl= null;
		
		if (match&&match[2].length==11){
   			 videoUrl =  'http://www.youtube.com/embed/'+match[2]+'';
		}
        return $sce.trustAsResourceUrl(videoUrl);
    }
    
    
    $scope.getSermonAudioUrl = function () {
    		audioURL = $scope.sermon.mp3path;
            return $sce.trustAsResourceUrl(audioURL);
    }
    
    
 
    
    
    $scope.isAndroid = function(){
    	 if(device.platform == "Android") {
    	 	return true;
    	 }
    	 return false;
    }
    
	$scope.isIOS = function(){
		if (device.platform == "iPhone" || device.platform == "iOS") {
        	return true;
        }
        return false;
	}

     
    var isPlaying = false;
    
    $scope.play = function() {
    	if (!isPlaying){
	        $cordovaMedia.play(media);
	        isPlaying = true;
	    }
    }
    
    $scope.pause = function(){
    	if(isPlaying){
    		$cordovaMedia.pause(media);
    		isPlaying = false;
    	}
    }
    
    $scope.stop = function() {
        $cordovaMedia.stop(media);
        isPlaying = false;
    } 
 
    var mediaStatusCallback = function(status) {
        if(status == Media.MEDIA_STARTING) {
            $ionicLoading.show({template: 'Loading mp3...'});
        } else {
            $ionicLoading.hide();
        }
    }
   $scope.shareSermon = function () {

        var subject = $scope.sermon.title;
        var message = $scope.sermon.series_name+": "+$scope.sermon.title;

        var link = $scope.sermon.href;
        
        window.plugins.socialsharing.share(message, subject, null, link);
    }	 
	


    	
})

// Feed Plugin Feed Controller
.controller('FeedPluginDetailCtrl', function($scope, $stateParams, SeriesSermonData, $sce) {
    
    $scope.entry = SeriesSermonData.getFeed($stateParams.id);
    
    $scope.content = $sce.trustAsHtml($scope.entry.content);
    
    $scope.loadURL = function (url) {
        //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
        //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
        //_blank: Opens in the InAppBrowser.
        //_system: Opens in the system's web browser.
        window.open(url,'_blank');
    }
    
    $scope.shareEntry = function () {

        var subject = $scope.entry.title;
        var message = $scope.entry.content;
        message = message.replace(/(<([^>]+)>)/ig,"");

        var link = $scope.entry.link;

        //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
        //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
        window.plugins.socialsharing.share(message, subject, null, link);
    }
    
    $scope.mediaObject = function(item) {
        return (item && item.mediaGroups) ? item.mediaGroups[0].contents[0] : {url:''};
    }

    $scope.hasVideo = function(item) {
        var media = $scope.mediaObject(item);

        //JAVASCRIPT: condition ? val1 : val2
        //return media.type ? (media.type == "video/mp4") : (media.url ? (media.url.indexOf(".mp4") != -1) : false);
        return media.type ? (media.type == "video/mp4") : false;
    }

    $scope.hasAudio = function(item) {
        var media = $scope.mediaObject(item);

        //JAVASCRIPT: condition ? val1 : val2
        return media.type ? (media.type == "audio/mp3") : false;
    }

    $scope.getTrustedResourceUrl = function(src) {
        return $sce.trustAsResourceUrl(src);
    }
    
})

// YouTube Videos Controller
.controller('YouTubeVideosCtrl', function($scope, $ionicLoading, YouTubeData) {
    
    $scope.videos = [];
    
    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Loading Data',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The delay in showing the indicator
      showDelay: 10
    });
    
    var getData = function() {
        
        YouTubeData.async().then(
            // successCallback
            function() {
                $scope.videos = YouTubeData.getVideos();
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
            },
            // errorCallback 
            function() {
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
            },
            // notifyCallback
            function() {}
        );
    }
    
    getData();
    
    var page = 1;
    // Define the number of the posts in the page
    var pageSize = 6;
    
    $scope.doRefresh = function() {
        getData();  
    }
    
    $scope.paginationLimit = function(data) {
    return pageSize * page;
    };

    $scope.hasMoreItems = function() {
    return page < ($scope.videos.length / pageSize);
    };

    $scope.showMoreItems = function() {
    page = page + 1;       
    }; 
    
})

// YouTube Video Controller
.controller('YouTubeVideoCtrl', function($scope, $stateParams, YouTubeData, $sce) {
    $scope.video = {};
    $scope.video = YouTubeData.getVideo($stateParams.videoId);
    
    $scope.content = $sce.trustAsHtml($scope.video.snippet.description);
    
    $scope.getVideoUrl = function () {
        var videoUrl= 'http://www.youtube.com/embed/' + $scope.video.snippet.resourceId.videoId;
        return $sce.trustAsResourceUrl(videoUrl);
    }
    
    $scope.shareVideo = function () {

        var subject = $scope.video.snippet.title;
        var message = $scope.video.snippet.description;
        message = message.replace(/(<([^>]+)>)/ig,"");

        var link = 'http://www.youtube.com/embed/' + $scope.video.snippet.resourceId.videoId;

        //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
        //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
        window.plugins.socialsharing.share(message, subject, null, link);
        
        
    }
    
})