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
    
    var getData = function() {    SermonArchivesData.async().then(
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
    }
    
        getData();

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
.controller('PostsCtrl', function($ionicScrollDelegate, broadcast,LastAJAXloadedTime,$ionicPlatform, $scope, myDateFunc, $ionicLoading, PostsData, PostsStorage,SettingsStorage, $sce, $http,$cordovaCalendar) {
    
    $scope.posts = [];
    $scope.storage = '';
	var data;     
	

	$scope.$on(broadcast.events.onResume, function (event) {
   		console.log('reloading in background');
   	    _loadData('isbackground');
	});
        
	$scope.loadData = function (s) {

		if (s != 'isbackground'){
			$scope.loading = $ionicLoading.show({
			  template: '<i class="spinner-a">Loading..</i>',
			  animation: 'fade-in',
			  showBackdrop: false,
			  showDelay: 10
			});
		}
		
	   $http({method: 'GET', url: PostsData.getJson(), timeout: 8000}).
		success(function(d) {	
			data = d;
			
            PostsData.setData(data);            
              
              
            var postModifiedDates = [];          
           	for (id in data.posts){
				postModifiedDates.push(data.posts[id].modified);
           	
           		data.posts[id].timePlace = PostsData.getTimeAndPlace(id);
           		data.posts[id].excerpt = formatExcerpt(data.posts[id].excerpt);
           		data.posts[id].registerTitle = PostsData.getRegisterTitle(id);
           		data.posts[id].registerUrl = PostsData.getRegisterUrl(id);
           		data.posts[id].OKtoShare = PostsData.getOKtoShare(id);
           		data.posts[id].hasEventTimeDate = PostsData.gethasEventTimeDate(id);
           		data.posts[id].modified = myDateFunc.formatDate(new Date(data.posts[id].modified.substring(0,10)));
           	} 


            $scope.posts = data.posts;
			var lastModifiedDate = myDateFunc.formatDate(myDateFunc.convertStrToDateObj(getLastModifiedDate(postModifiedDates)));
			data.lastModifiedDate = lastModifiedDate;			
			$scope.lastModifiedDate = lastModifiedDate;
			PostsStorage.save(data);			
			
			LastAJAXloadedTime.setCurrentTimeStamp();
                $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop(true);


             $ionicLoading.hide();             
             ionic.Platform.ready( function() {
			    if(navigator && navigator.splashscreen) navigator.splashscreen.hide();
			});             
			$scope.$broadcast('scroll.refreshComplete');
			console.log('News loaded from server');

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
   
	
	var _loadData = function(s){	
		$scope.$on('$ionicView.beforeEnter', function(){
			console.log('beforeEnter');
			if (LastAJAXloadedTime.isExpired()) {
				$scope.loadData(s);
			}else{
					data = PostsStorage.all();
					$scope.posts = data.posts;
					$scope.lastModifiedDate = data.lastModifiedDate +".";            
			}
			}
		); 
	}
    
	_loadData();
    
    
    
    
	var getLastModifiedDate = function(postModifiedDates){
		
						
			postModifiedDates.sort(function(a, b){
			    return a-b;
			});
			
		return postModifiedDates[0];
			
	
			
	
	}
    
    var formatExcerpt = function(s){
	    s = s.replace("&#8230;..",".... continue reading ");
    	return s.replace("Read more","");
    
    }

	
	
	 var decodeHtmlEntity = function(str) {
	  return str.replace(/&#(\d+);/g, function(match, dec) {
		return String.fromCharCode(dec);
	  });
	};

 	$scope.shareEntryPost = function (d) {	
        var subject = $scope.posts[d].title;
        var message = $scope.posts[d].content;
        message = message.replace(/(<([^>]+)>)/ig,"");
                message = message.replace(/&nbsp;/ig,"");
		message = decodeHtmlEntity(message);

        var link = $scope.posts[d].url;

        //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
        //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');

        window.plugins.socialsharing.share(message, subject, null, link);
    }


	var extractDate = function(t,k){
	  		   // ["s", "19", ""2016-01-19 03", "37", "59""] 

			var s = t[0].split(";")[2].split(":");
			var year = s[2].split(" ")[0].split("-")[0].replace("\"","");
			var month = s[2].split(" ")[0].split("-")[1]-1;
			var day = s[2].split(" ")[0].split("-")[2];
			var hour = parseInt(s[2].split(" ")[1]);
			var minute = s[3];
			//["s", "2", ""pm""]
					
			var a = k[0].split(";")[2].split(":")[2];
			if (a == '"pm"') {hour += 12;}
					
			return [year,month, day, hour, minute];
	}
	
	

	$scope.remindMe = function(d){


			var s = $scope.posts[d].custom_fields.post_1_start_date_time;
			var t = $scope.posts[d].custom_fields.post_1_start_am_pm;
			var ab  = extractDate(s,t);								
			var startDate = myDateFunc.getPSTtime(new Date(ab[0], ab[1], ab[2], ab[3], ab[4], 0, 0, 0));
			    
					console.log(startDate);
					console.log('the time is'+startDate);


			
			try {									
				var s = $scope.posts[d].custom_fields.post_1_end_date_time[0].split(";")[2].split(":");
			
				var endDate;			
				if (s.length>3){
							var ab  = extractDate($scope.posts[d].custom_fields.post_1_end_date_time,
										$scope.posts[d].custom_fields.post_1_end_am_pm);								
					endDate = myDateFunc.getPSTtime(new Date(ab[0], ab[1], ab[2], ab[3], ab[4], 0, 0, 0));
			
			}else{
				endDate = new Date(startDate);
				endDate.setHours(endDate.getHours()+2);
			}

			//["s", "2", ""pm""]
			
		
			//console.log(start_year+' '+start_month+' '+start_day+' '+start_hour+' '+start_minute);			
		//	console.log(end_year+' '+end_month+' '+end_day+' '+end_hour+' '+end_minute);
		//	console.log(endDate);

	
		} catch(err){ console.log(err);				
									console.log('2');
				endDate = new Date(startDate);
				endDate.setHours(endDate.getHours()+2); 
		}

		title = $scope.posts[d].title_plain;
		notes = $scope.posts[d].timePlace+'. '+$scope.posts[d].url;

		

//		console.log(start_year+' '+start_month+' '+start_day+' '+start_hour+' '+start_minute);			
		

		
//		console.log(end_year+' '+end_month+' '+end_day+' '+end_hour+' '+end_minute);
		//console.log(startDate);

		//console.log(endDate);

var eventExists = false;		

  $cordovaCalendar.findEvent({
			title: title,
			location: '',
			notes: notes,
			startDate: startDate, 
			endDate: endDate
  }).then(function (result) {
	if (result.length) {

		var msg = "The event is already added to your calendar.";
		navigator.notification.alert(msg,function() {console.log("Alert success")},"Event existed","Close");
		
	}else{
		createEvent();
		console.log('no event exists');
	}
  }, function (err) {
						 var msg = "The event cannot be added to your calendar.  Please check your privacy setting and allow Crosspoint App to access your calendar.";
				 	    navigator.notification.alert(msg,function() {console.log("Alert success")},"Sorry.","Close");
  });
  

	var  createEvent =	function(){
		$cordovaCalendar.createEvent({
			title: title,
			location: '',
			notes: notes,
			startDate: startDate, 
			endDate: endDate
			 }).then(function (result) {
			 console.log('success');
			 var msg = 'The event has been added to calendar on ' + startDate;
					    navigator.notification.alert(msg,function() {console.log("Alert success")},"Event Added","Close");
			}, function (err) {
						 console.log(err);
						 var msg = "The event cannot be added to your calendar.  Please check your privacy setting and allow Crosspoint App to access your calendar.";
				 	    navigator.notification.alert(msg,function() {console.log("Alert success")},"Sorry.","Close");
			});
			
			}

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
.controller('RegistrationsCtrl', function($scope, $ionicLoading, RegistrationPosts) {

    $scope.posts = [];
        
    $scope.loading = $ionicLoading.show({
			  template: '<i class="spinner-a">Loading..</i>',


      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The delay in showing the indicator
      showDelay: 10
    });
    
    var getData = function() {
        
        RegistrationPosts.async().then(
            // successCallback
            function() {
                $scope.posts = RegistrationPosts.getRegPosts();
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
    
    $scope.doRefresh = function() {
        getData();  
    }
    
})

// ServerPost Controller
.controller('RegistrationCtrl', function($scope, $stateParams, RegistrationPosts, $sce) {


    $scope.post = RegistrationPosts.getRegPost($stateParams.serverpostId);
    
    t = $scope.post;
    
    
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



// Seetings Controller
.controller('SettingsCtrl', function($scope, SettingsStorage, $state) {
 
 
    $scope.settings = SettingsStorage.all();
    
	s = $scope.settings;
	


    $scope.saveSettings = function() {
        SettingsStorage.save($scope.settings);
    };
    
    $scope.$watch('settings', function() { SettingsStorage.save($scope.settings) }, true);
    
    $scope.resetSettings = function() {
        SettingsStorage.clear();
        $scope.settings = SettingsStorage.all();

    };
  
  	$scope.isFirstSetting = function(){

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


 /*
	var lang = JSON.parse(window.localStorage['settings']).campus;


 
 
	if (!lang)
		$state.go('firsttime');
	else
		$state.go('app.posts');
		
*/		

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
.controller('SeriesSermonsCtrl', function($scope, $http, $ionicLoading, $stateParams, SeriesSermonData,myDateFunc) {
    
    
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
			  template: '<i class="spinner-a">Loading..</i>',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: true,
        
      // The delay in showing the indicator
      showDelay: 10
    });
    
    
    url = SeriesSermonData.getJson();
	

    if ($stateParams.series_slug){
    	s = $stateParams.series_slug;
    	if(s != 'newest'){
    		url += '&s='+s;
    	}
    }
    
                start = new Date().getTime();
        $http({method: 'GET', url: url, timeout: 8000}).
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
				$scope.series_url = data.href;
				SeriesSermonData.setData(data); 
				s = SeriesSermonData.getLatestSermonDate();				
				data.latestSermonDate = myDateFunc.getPSTtime(new Date(s)).getTime();
				console.log(data.latestSermonDate);
				console.log('time taken for request: ' + (new Date().getTime() - start) + 'ms');
				SeriesSermonData.setData(data); 
				
			}catch(e){
					$scope.err = true;
			}
			$ionicLoading.hide();
        }).
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        error(function(e) {
            $ionicLoading.hide();

         //   $scope.posts = ServerPostsStorage.all().data;
           // ServerPostsData.setData(ServerPostsStorage.all().posts);
            
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
       			return "#/app/series-sermon/"+$scope.series_slug+"/"+id+"/"+campus;
       		else
       			return "#/app/series-campuses/"+id;
       
       } 
                
         $scope.isCurrentWeek= function(sd){
	 		 return SeriesSermonData.isCurrentWeek(sd);
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



        var link = $scope.series_url;
        
        
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
            $scope.series_image = SeriesSermonData.get_series_image();

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

	url = SeriesSermonData.getJson()+'&s='+v.series_slug+'&post_id='+v.sermonPostID+'&site_lang='+v.siteLangID;
    var media; 


	start = new Date().getTime();

	$scope.loadData = function () {
	/*
	    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-c"></i> Loading Sermon',

      //Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,
        
      // The delay in showing the indicator
      showDelay: 10
    });
       
*/

       data = SeriesSermonData.getSermonSiteLang(v.sermonPostID,v.siteLangID);
//       console.log(data);
            $scope.sermon = data;     
            $scope.series_image =      SeriesSermonData.get_series_image();
                    	 media = new Media($scope.sermon.mp3path, null, null, mediaStatusCallback);

/*

        $http({method: 'GET', url: url, timeout: 5000}).
        // this callback will be called asynchronously
        // when the response is available.
        success(function(data) {
	        console.log('time taken for request: ' + (new Date().getTime() - start) + 'ms');
            $scope.sermon = data;            
        	
            d = $scope.sermon;

                        $ionicLoading.hide();
            //SeriesSermonData.setData(data);
           	
 

        }).
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        error(function() {
         //   $scope.posts = ServerPostsStorage.all().posts;
          //  ServerPostsData.setData(ServerPostsStorage.all().posts);
            $scope.storage = '.'; 
            $ionicLoading.hide();
        });
*/

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
		$scope.playingStatus = "Playing ... ";
    	if (!isPlaying){
	        $cordovaMedia.play(media);
	        isPlaying = true;
	    }
    }
    
    $scope.pause = function(){
    	if(isPlaying){
    		$scope.playingStatus = "Paused";
    		$cordovaMedia.pause(media);
    		isPlaying = false;
    	}
    }
    
    $scope.stop = function() {
	    $scope.playingStatus = "Stopped";
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

.controller('myCtrl', function($scope, $cordovaAppVersion) {

  document.addEventListener("deviceready", function () {

    $cordovaAppVersion.getVersionNumber().then(function (version) {
        var appVersion = version;
      });
  }, false);
  
})  

