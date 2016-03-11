angular.module('mobionicApp.data', [])

// Home Data: Home page configuration
.factory('Data', function(){
    var data = {};
    
    data.items = [
        { 
            title: '匯報',
            icon: 'ion-ios-calendar-outline',
            note: 'Latest News',
            url: '#/app/posts'
        },
        { 
            title: '即時重溫',
            icon: 'ion-ios-play-outline',
            note: 'Watch Now',
            url: '#/app/feed-categories/newest'
        },
       /* { 
            title: 'Gallery',
            icon: 'ion-images',
            note: 'Our Photos',
            url: '#/app/gallery'
        },*/
        { 
            title: '昔日講道',
            icon: 'ion-ios-box-outline',
            note: 'Past Sermons',
            url: '#/app/news'
        },
        { 
            title: '報名',
            icon: 'ion-ios-compose-outline',
            note: 'Registrations',
            url: '#/app/feeds'
        },
        { 
            title: '崇拜時間',
            icon: 'ion-ios-location-outline',
            note: 'Service Times and Locations',
            url: '#/app/about'
        },
        { 
            title: '聯絡我們',
            icon: 'ion-ios-email-outline',
            note: 'Contact Us',
            url: '#/app/contact'
        },
         /*
        { 
            title: 'Feed Plugin',
            icon: 'ion-social-rss-outline',
            note: 'Atom, RSS, or Media RSS',
            url: '#/app/feed-categories'
        },
        { 
            title: 'YouTube',
            icon: 'ion-social-youtube',
            note: 'YouTube Videos',
            url: '#/app/youtubevideos'
        },
        { 
            title: 'Wordpress JSON',
            icon: 'ion-social-wordpress',
            note: 'JSON API plugin',
            url: '#/app/posts'
        },
        { 
            title: 'Wordpress Pagination',
            icon: 'ion-social-wordpress-outline',
            note: 'Server Side',
            url: '#/app/serverposts'
        },
        { 
            title: 'Mobile Plugins',
            icon: 'ion-iphone',
            note: 'Cordova/PhoneGap',
            url: '#/app/plugins'
        },*/
    ]; 
    
    return data;
})

// Menu Data: Menu configuration
.factory('MenuData', function(){
    var data = {};
    
    data.items = [
        { 
            title: 'Home',
            icon: 'ion-home',
            url: '#/app'
        },        
        { 
            title: 'Elements',
            icon: 'ion-code',
            url: '#/app/elements'
        },        
        { 
            title: 'Tabs',
            icon: 'ion-drag',
            url: '#/app/tabs'
        },
        { 
            title: 'Grid',
            icon: 'ion-grid',
            url: '#/app/grid'
        },
        { 
            title: 'RSS (Pull to refresh)',
            icon: 'ion-social-rss',
            url: '#/app/feeds-refresher'
        }
    ]; 
    
    return data;
})

// Plugins Data: Mobile Plugins configuration
.factory('PluginsData', function(){
    var data = {};
    
    data.items = [
        { 
            title: 'Device',
            icon: 'ion-ipad',
            note: 'Device API',
            url: '#/app/plugins/device'
        },
        { 
            title: 'Geolocation',
            icon: 'ion-location',
            note: 'Geolocation API',
            url: '#/app/plugins/geolocation'
        },
        { 
            title: 'Notifications',
            icon: 'ion-alert',
            note: 'Dialogs API',
            url: '#/app/plugins/notifications'
        },
        { 
            title: 'Barcode',
            icon: 'ion-qr-scanner',
            note: 'Barcode Scanner',
            url: '#/app/plugins/barcodescanner'
        }
    ]; 
    
    return data;
})

// Map Data: Map configuration
.factory('MapData', function(){
    var data = {};
    
    data.map = {
        zoom: 12,
        center: {
            latitude: 40.74,
            longitude: -74.18
        },
        markers: [
        {
            id: 1,
            icon: 'img/marker.png',
            latitude: 40.71,
            longitude: -74.21,
            title: 'This is our main store'
        }, 
        {
            id: 2,
            icon: 'img/marker.png',
            latitude: 40.72,
            longitude: -74.20,
            title: 'This is our second store'
        },
        {
            id: 3,
            icon: 'img/marker.png',
            latitude: 40.73,
            longitude: -74.19,
            title: 'This is our third store'
        },
        {
            id: 4,
            icon: 'img/marker.png',
            latitude: 40.74,
            longitude: -74.18,
            title: 'This is our fourth store'
        },
        {
            id: 5,
            icon: 'img/marker.png',
            latitude: 40.75,
            longitude: -74.17,
            title: 'This is our fifth store'
        },
        {
            id: 6,
            icon: 'img/marker.png',
            latitude: 40.76,
            longitude: -74.16,
            title: 'This is our sixth store'
        },
        {
            id: 7,
            icon: 'img/plane.png',
            latitude: 40.77,
            longitude: -74.15,
            title: 'Airport'
        }]
    };

    return data;
})

// Gallery Data: Gallery configuration
.factory('GalleryData', function(){
    var data = {};
    
    data.items = [
        { 
            label: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            src: 'img/gallery-1.jpg',
            location: 'New York, June 2014'
        },
        { 
            label: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
            src: 'img/gallery-2.jpg',
            location: 'Athens, August 2013'
        },
        { 
            label: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            src: 'img/gallery-3.jpg',
            location: 'Tokyo, May 2013'
        }
    ]; 
    
    return data;
})

// News Data: JSON
.factory('SermonArchivesData', function($http, $q, SermonArchivesStorage) {
    

    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};
    
    service.async = function(categoryId, id) {
        
      var deferred = $q.defer();
        var promise = deferred.promise;
    var json = 'http://www.crosspointchurchsv.org/api/get_recent_sermons/?r=';
//    var json = 'http://localhost:8888/wordpress8/api/get_recent_sermons/?r=';

		    var t = new Date();
		    json += t.getTime();
			
            $http({method: 'GET', url: json, timeout: 5000}).
            // this callback will be called asynchronously
            // when the response is available.
            success(function(d) {
    	       	result = d;
            	data = result;

            	
	            deferred.resolve();
            }).
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            error(function() {
            deferred.reject();
            });
        return promise;
        
    };
    
    service.getAll = function() { return data; };

    
    return service;
})

// Products Data: JSON
.factory('ProductsData', function($http, $q, ProductsStorage) {
    
    var json = 'json/products.json';

    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};

    service.async = function() {
    $http({method: 'GET', url: json, timeout: 5000}).
    // this callback will be called asynchronously
    // when the response is available.
    success(function(d) {
        data = d.result;
        ProductsStorage.save(data);
        deferred.resolve();
    }).
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    error(function() {
        data = ProductsStorage.all();
        deferred.reject();
    });
        
    return promise;
        
    };

    service.getAll = function() { return data; };

    service.get = function(productId) { return data[productId]; };

    service.getLetterLimit = function() { return 100; };

    return service;
})

.factory('PastorData', function(){
    var data = {};
    
    data.pastors = [
        { 
            name: '招世超牧師',
            nameEng: 'Rev. Abraham Chiu',            
            src: 'img/PastorChiu.jpg',
            title: '主任牧師',
            titleEng: 'Senior Pastor',
            email: 'achiu@crosspointchurchsv.org'       
        },
        { 
            name: '馮大衛牧師',
            nameEng: 'Rev. David Fung',            
            src: 'img/PastorFung.jpg',
            title: '祈禱及關顧',
            titleEng: 'Prayer and Caring',
            email: 'dfung@crosspointchurchsv.org'
                   
        },
        { 
            name: '陳恩賜牧師',
            nameEng: 'Rev. Timothy Chan',            
            src: 'img/PastorChan.jpg',
            title: 'Pleasanton Campus 小組及門徒訓練',
            titleEng: 'Pleasanton Campus Life Group and Discipleship',
            email: 'tchan@crosspointchurchsv.org'
        },
        { 
            name: '鄭兆奇牧師',
            nameEng: 'Rev. Jacky Cheng',            
            src: 'img/PastorJacky.jpg',
            title: '粵語小組及門徒訓練',
            titleEng: 'Cantonese Life Group and Discipleship',
            email: 'jcheng@crosspointchurchsv.org'
        },        
        { 
            name: '潘智翔牧師',
            nameEng: 'Rev. Justin Pan',            
            src: 'img/PastorPan.jpg',
            title: '國語事工及聖經課程',
            titleEng: 'Mandarin Life Group and Discipleship',
            email: 'jpan@crosspointchurchsv.org'
        },        
        { 
            name: '招文雋牧師',
            nameEng: 'Rev. Matthew Chiu',            
            src: 'img/PastorMatt.jpg',
            title: '英語事工',
            titleEng: 'English Ministry',
            email: 'mchiu@crosspointchurchsv.org'
        },
        { 
            name: '葉瀅茵傳道',
            nameEng: 'Pastor Priscilla Ip',            
            src: 'img/PastorPriscilla.jpg',
            title: '兒童事工',
            titleEng: 'Children\'s Ministry',
            email: 'pip@crosspointchurchsv.org'
        },
        { 
            name: '',
            nameEng: 'Pastor Mary Scott',            
            src: 'img/PastorMary.jpg',
            title: '青少年事工',
            titleEng: 'Youth\'s Ministry',
            email: 'mscott@crosspointchurchsv.org'
        }        
        
    ]; 
    
    return data;
})


// Gallery Data: Gallery configuration
.factory('GalleryData', function(){
    var data = {};
    
    data.items = [
        { 
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            src: 'img/gallery-1.jpg',
            location: 'New York, June 2014'
        },
        { 
            description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
            src: 'img/gallery-2.jpg',
            location: 'Athens, August 2013'
        },
        { 
            description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            src: 'img/gallery-3.jpg',
            location: 'Tokyo, May 2013'
        }
    ]; 
    
    return data;
})

// About Data: JSON
.factory('AboutData', function($http, $q, AboutStorage) {
    
   // var json = 'http://www.crosspointchurchsv.org/api/get_info/';
    
    var json = 'http://www.crosspointchurchsv.org/api/get_category_posts/?category_slug=aboutxp&order=DESC&order_by=date&r=132';

    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};
    
    service.async = function() {
     var json = 'http://www.crosspointchurchsv.org/api/get_category_posts/?category_slug=aboutxp&order=DESC&order_by=date&';
    var t = new Date();
    	json += t.getTime();
    $http({method: 'GET', url: json, timeout: 5000}).
    // this callback will be called asynchronously
    // when the response is available.
    success(function(d) {
        data = d.posts;
        AboutStorage.save(data);
        deferred.resolve();
    }).
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    error(function() {
        data = AboutStorage.all();
        deferred.reject();
    });
        
    return promise;
        
    };
    
    service.getAll = function() { return data; };

    service.get = function(id) { return data[0].content; };

    return service;
})

// PostsData Data: JSON Wordpress Posts configuration
.factory('PostsData', function($http, $q, PostsStorage) {
    
    /* (For DEMO purposes) Local JSON data */
/*    var json = 'json/wordpress.json'; */

//var json = 'http://www.crosspointchurchsv.org/api/get_category_posts/?category_slug=crosspointnews&order=ASC&order_by=date';
;

		//

        var json = 'http://www.crosspointchurchsv.org/api/get_xp_frontpage_posts/?order=ASC&order_by=date&';
    /* Set your URL as you can see in the following example */
    // var json = 'YourWordpressURL/?json=get_recent_posts';
    
    /* With user-friendly permalinks configured */
    // var json = 'YourWordpressURL/api/get_recent_posts';
    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};
    
    service.getJson = function(){
	    var json = 'http://www.crosspointchurchsv.org/api/get_xp_frontpage_posts/?order=ASC&order_by=date&';
//	    var json = 'http://localhost:8888/wordpress8/api/get_xp_frontpage_posts/?order=ASC&order_by=date&';
	    var t = new Date();
    	json += t.getTime();
    
    	return json
    };
    
    service.async = function() {
    var json = 'http://www.crosspointchurchsv.org/api/get_xp_frontpage_posts/?order=ASC&order_by=date&';
    var t = new Date();
    json += t.getTime();

    $http({method: 'GET', url: json, timeout: 5000}).
    // this callback will be called asynchronously
    // when the response is available.
    success(function(d) {

        data = d;

        PostsStorage.save(data);
        deferred.resolve(data)
    }).
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    error(function() {

        data = PostsStorage.all();
        deferred.reject();
    });
        
    return promise;
        
    };

	service.setData = function(d) { data = d;};
   	 
    service.getAll = function() { return data; };

    service.get = function(postId) { return data.posts[postId]; };
    
    service.getTimeAndPlace = function(postId){
    	try{
     		var a = data.posts[postId].custom_fields.post_1_date_and_location[0].split(";")[2];     		
			return a.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "");
    	 }catch(er){
    	 	return "";
    	}
    }
    
    service.getRegisterTitle = function(postId){
	     try{
     		var a = data.posts[postId].custom_fields.post_1_sign_up_title[0].split(";")[2].split(":");
			var registerTitle = a[2];
			registerTitle = registerTitle.replace(/\"/g, "");
			if (registerTitle){
				return registerTitle;}else{return null;}

    	 }catch(er){
    	 	return null;
    	 }    
    }
    
    service.getRegisterUrl = function(postId){
    try{
		var a = data.posts[postId].custom_fields.post_1_sign_up_url[0].split(";")[2].split(":");
		var registerURL = a[2]+":"+a[3];
		registerURL = registerURL.replace(/\"/g, "");
		return registerURL;
		}catch (er){ return null;}
		//window.open(registerURL, '', '');
	}
	
	service.getOKtoShare = function(postId){
	           			 if (data.posts[postId].title.match(/奉獻報告|offering report/i)){return false;}
					 else{ return true;}
	}

	service.gethasEventTimeDate = function (postId){
		try{
			var ssss = data.posts[postId].custom_fields.post_1_start_date_time[0].split(";")[2].split(":")[2];
			if (ssss.length>2){return true;}else{return false;}
		}catch(err){
    		return false;
    	}
	}
    

    return service;
})

// ServerPosts Data: JSON Wordpress Posts configuration with Server Side pagination
.factory('RegistrationPosts', function($http, $q) {
    var youtubeKey = 'AIzaSyClMa-MaKro_m95tb--4LaAorl-NmGPJxc';
    var apiUrl = 'https://www.googleapis.com/youtube/v3/';
    var videosUrl    = apiUrl + 'playlistItems?part=snippet&key=' + youtubeKey + '&maxResults=' + 20;
    var playlistsUrl = apiUrl + 'channels?part=contentDetails&key=' + youtubeKey;
    
    var username = 'apple';

    var data = [];
    var result = [];
    var videos = [];
    var service = {};
    

    
    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    // var json = 'YourWordpressURL/?json=get_recent_posts&';
    
    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
    var json = 'http://www.crosspointchurchsv.org/api/get_category_posts/?category_slug=registrations&order=DESC&order_by=date';
			    //http://www.crosspointchurchsv.org/api/get_category_posts/?category_slug=registrations&order=DESC&order_by=date&123
    
//    service.getURL = function() { return json; };
    
//    service.setData = function(posts) { data = posts; };

//    service.get = function(serverpostId) { return data[serverpostId]; };


    service.async = function(categoryId, id) {
        
      var deferred = $q.defer();
        var promise = deferred.promise;
        var json = 'http://www.crosspointchurchsv.org/api/get_category_posts/?category_slug=registrations&order=DESC&order_by=date&r=';

		    var t = new Date();
		    json += t.getTime();
		    			
            $http({method: 'GET', url: json, timeout: 5000}).
            // this callback will be called asynchronously
            // when the response is available.
            success(function(d) {
    	       	result = d;
            	data = result.posts;
	            deferred.resolve();
            }).
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            error(function() {
            deferred.reject();
            });
        return promise;
        
    };
    
    service.getRegPosts = function() { return data; };

	service.getRegPost = function(serverpostId) { return data[serverpostId]; };
    
    return service;
})

// RSS Feeds Data: JSON
.factory('FeedsData', function($http, $q, FeedsStorage) {
    
    var xml = 'http://www.huffingtonpost.com/feeds/index.xml';
    var url = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(xml);
    
    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};
    var entries = []; 
    
    service.async = function() {
    $http({method: 'JSONP', url: url, timeout: 5000}).
    // this callback will be called asynchronously
    // when the response is available.
    success(function(d) {
        data = d;
        FeedsStorage.save(data.responseData.feed);
        entries = data.responseData.feed.entries;
        deferred.resolve();
    }).
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    error(function() {
        data = FeedsStorage.all();
        entries = data.entries;
        deferred.reject();
    });
        
    return promise;
        
    };
    
    service.getAll = function() { return data.responseData.feed; };

    service.get = function(entryId) { return entries[entryId];  };

    return service;
})

// Settings Data: Settings configuration
.factory('SettingsData', function(){
    var data = {};
    
    data.items = {        
        sorting: false,
    };
    


	
		
    return data;
})

// Feed Plugin Data: JSON
.factory('SeriesSermonData', function($http, $q) {
    
//    var json = 'json/structure2.json';
    var json = 'http://www.crosspointchurchsv.org/api/get_sermons/';

    var api_url = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=';
    
    var data = [];
    var result = [];
    var entries = [];
    var service = {};


	service.getJson = function(){
	
	    var json = 'http://www.crosspointchurchsv.org/api/get_sermons/';
	
		var t = new Date();
		json += "?r="+t.getTime();
		return json;
	
	};
	
	service.getCampus = function() { 
		try{
			cp = JSON.parse(window.localStorage['settings']).campus;
			return cp;
		}catch (err){
			return '';
		}
	};
	    
    service.asyncCategories = function(series_slug) {
        
        var json = 'http://www.crosspointchurchsv.org/feed/podcast/?isJSON=true&111212';
        if(series_slug != 'newest'){
        	json = "http://www.crosspointchurchsv.org/feed/podcast/?isJSON=true&f=get_series&s="+series_slug;
        }



        var deferred = $q.defer();
        var promise = deferred.promise;
        
        $http({method: 'GET', url: json, timeout: 5000}).
        // this callback will be called asynchronously
        // when the response is available.
        success(function(d) {
            data = d;
            deferred.resolve();
        }).
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        error(function(result, status, header, config) {
            deferred.reject();
            alert(result);
        });
        
        return promise;
        
    };
    
    service.setData = function(d) { data = d; };
    
//    service.getData = function(id) { return data.sermons[id]; };
    


    service.getSermons = function() { return data.sermons; }; 
    service.getSermon = function(id) { return data.sermons[id].site_langs; };  
    service.getSermonTitle = function(id) { return data.sermons[id].title; };  
	
	service.getSermonPostID = function(id) { return data.sermons[id].post_id; };  
	
    service.getSiteLangs = function(id) { return data.sermons[id].site_langs};  
    
    service.getSermonSiteLang = function(id,id2) { 
    
     	var sites =  data.sermons[id].site_langs;
     	for (id in sites){
			if (sites[id].site_lang_id == id2){
				return sites[id];
			}
     	}
    };  
    
    
	service.getLatestSermonDate = function(){
		
		var sermons = data.sermons;

		for (id in sermons){
			if (_isCurrentWeek(sermons[id].sermon_date)) {
				return sermons[id].sermon_date;
			}

		}
	
	}
	
	service.isCurrentWeek = function (sd) { return _isCurrentWeek(sd);}
	
	function _isCurrentWeek(sd){
	 		 var sermondate = new Date(sd);
		   	 var nextweek = new Date(sermondate);
   	 		 nextweek.setDate(nextweek.getDate()+7);
	 		 var today = new Date();
	 		if ( (today >= sermondate) &&(today<=nextweek) ){
				return true;
	 		}
	 		return false;	 
	
	}
     
    service.get_series_title = function() { return data.series_name; };
    service.get_series_slug = function() { return data.series_slug; };    
    service.get_series_description = function() { return data.series_description; };
    service.get_series_date = function() { return data.series_date; };
    service.get_series_image = function() { return data.series_image; };
    service.get_series_url = function() { return data.href; };
 

    return service;
})


// YouTube Data: YouTube Videos configuration
.factory('YouTubeData', function($http, $q) {
    
    var youtubeKey = 'AIzaSyClMa-MaKro_m95tb--4LaAorl-NmGPJxc';
    var apiUrl = 'https://www.googleapis.com/youtube/v3/';
    var videosUrl    = apiUrl + 'playlistItems?part=snippet&key=' + youtubeKey + '&maxResults=' + 20;
    var playlistsUrl = apiUrl + 'channels?part=contentDetails&key=' + youtubeKey;
    
    var username = 'apple';

    var data = [];
    var result = [];
    var videos = [];
    var service = {};

    var json = 'http://www.crosspointchurchsv.org/api/get_category_posts/?category_slug=registrations&order=DESC&order_by=date&r=';

    service.async = function(categoryId, id) {
        
        var deferred = $q.defer();
        var promise = deferred.promise;
        
        service.getPlaylistId().then(function(playlistId) {
        
            var url = videosUrl + '&playlistId=' + playlistId;

            $http({method: 'GET', url: url, timeout: 5000}).
            // this callback will be called asynchronously
            // when the response is available.
            success(function(d) {
    	       	result = d;
            	data = result.videos;

	            deferred.resolve();
            }).
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            error(function() {
				deferred.reject();
            });
        });
        return promise;
        
    };

    service.getPlaylistId = function() {
        
        var url = playlistsUrl + '&forUsername=' + username;

        return $http.get(url).then(function(response) {
            var items = response.data.items;
            if (items.length && items[0].contentDetails.relatedPlaylists.uploads) {
                return items[0].contentDetails.relatedPlaylists.uploads;
            }

            return null;
        });
    }
    
    service.getVideos = function() { return data; };

    service.getVideo = function(videoId) { return data[videoId]; };
    
    return service;
    
})

.factory('MediaSrv', function($q, $ionicPlatform, $window){
  var service = {
    loadMedia: loadMedia,
    getStatusMessage: getStatusMessage,
    getErrorMessage: getErrorMessage
  };

  function loadMedia(src, onError, onStatus, onStop){
    var defer = $q.defer();
    $ionicPlatform.ready(function(){
      var mediaSuccess = function(){
        if(onStop){onStop();}
      };
      var mediaError = function(err){
        _logError(src, err);
        if(onError){onError(err);}
      };
      var mediaStatus = function(status){
        if(onStatus){onStatus(status);}
      };

      defer.resolve(new $window.Media(src, mediaSuccess, mediaError, mediaStatus));
    });
    return defer.promise;
  }

  function _logError(src, err){
    console.error('media error', {
      code: err.code,
      message: getErrorMessage(err.code)
    });
  }

  function getStatusMessage(status){
    if(status === 0){return 'Media.MEDIA_NONE';}
    else if(status === 1){return 'Media.MEDIA_STARTING';}
    else if(status === 2){return 'Media.MEDIA_RUNNING';}
    else if(status === 3){return 'Media.MEDIA_PAUSED';}
    else if(status === 4){return 'Media.MEDIA_STOPPED';}
    else {return 'Unknown status <'+status+'>';}
  }

  function getErrorMessage(code){
    if(code === 1){return 'MediaError.MEDIA_ERR_ABORTED';}
    else if(code === 2){return 'MediaError.MEDIA_ERR_NETWORK';}
    else if(code === 3){return 'MediaError.MEDIA_ERR_DECODE';}
    else if(code === 4){return 'MediaError.MEDIA_ERR_NONE_SUPPORTED';}
    else {return 'Unknown code <'+code+'>';}
  }

  return service;
})

.factory('myDateFunc', function() {
		function _getPSTtime (d2){
			    utc = d2.getTime() + (d2.getTimezoneOffset() * 60000);
    			offset = -8;
			    nd = new Date(utc + (3600000*offset));
				return nd;
		}

        return {
            getPSTtime: function(d2) {
            	return _getPSTtime(d2);
            },
            
            formatDate:function(d){
            	var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
				var days = new Array('Sun','Mon','Tue','Wed','Thur','Fri','Sat');
		
				var curr_day = d.getDate();
				var curr_hours = d.getHours();
				var curr_minutes = d.getMinutes();

				if (curr_day < 10) {
					curr_day = '0' + curr_day;
				}
				return ( days[d.getDay()] + '. ' + m_names[d.getMonth()] + ' ' + curr_day + ', ' + d.getFullYear() );
        	},
        	convertStrToDateObj:function(s){
        		//2016-01-21 18:59:47
        		y = s.split(" ")[0].split("-")[0];
        		m = s.split(" ")[0].split("-")[1];
        		d = s.split(" ")[0].split("-")[2];        		        		
        		h = s.split(" ")[1].split(":")[0];
        		mm = s.split(" ")[1].split(":")[1];
        		ss = s.split(" ")[1].split(":")[2];        		   		
        		return  _getPSTtime(new Date(y,m-1,d,h,mm,ss));        		
        	}
        }
})

.factory('LastAJAXloadedTime', function() {
    var service = {};
    var lastTimeStamp = 0;
    var life = 1000*60*60*12; //half day
    
    service.setCurrentTimeStamp = function(){
    	lastTimeStamp = Date.now();
    }

    service.getLastTimeStamp = function(){
		return lastTimeStamp;
	}
	
	service.isExpired = function(d){
		d = Math.floor((Date.now() - lastTimeStamp)/1000);
		console.log(d+ ' sec has passed');
		if (Date.now() - lastTimeStamp > life) {
			return true;
		}
		return false;
	}
    
    return service
		
})

.factory('broadcast', function ($rootScope, $document) {
    var _events = {
        onPause: 'onPause',
        onResume: 'onResume'
    };
    $document.bind('resume', function () {
        _publish(_events.onResume, null);
    });
    $document.bind('pause', function () {
        _publish(_events.onPause, null);
    });

    function _publish(eventName, data) {
        $rootScope.$broadcast(eventName, data)
    }
    return {
        events: _events
    }
})


