var videoController = {
	data: {
		config: null,
		isAuthenticated: null
	},
	uiElements: {
		videoCardTemplate: null,
		videoList: null,
		loadingIndicator: null
	},

	service: {
		apiClient: null
	},

	init: function(config, apiClient, isAuthenticated){
		this.uiElements.videoCardTemplate = $('#video-template');
		this.uiElements.videoList = $('#video-list');
		this.data.config = config;
		this.data.isAuthenticated = isAuthenticated;
		this.service.apiClient = apiClient;
		this.uiElements.videoCardTemplate.hide();
		//this.uiElements.videoCardTemplate[0].style.display = 'none';

		this.getVideoList();
	},

	getVideoList: function() {
		var that = this;
		var url = '/videos?encoding=' + encodeURIComponent('720p');

		if (this.data.isAuthenticated) {

			this.service.apiClient.get(url).then(
				function(resp) {
					that.updateVideoFrontpage(resp.data);
				}
			).catch(function(error) {
				console.log(error);
			});

		} else {
			console.log("No login, No videos");
		}
	},

	updateVideoFrontpage: function(resp) {
		console.log("resp:", resp);
		var baseUrl = resp.domain;
		var bucket = resp.bucket;

		for (var i = 0; i < resp.files.length; i++) {
			var video = resp.files[i];

			var clone = this.uiElements.videoCardTemplate.clone().attr('id', 'video-' +
				i);

			//clone.find('source').attr('src', baseUrl + '/' + bucket + '/' + video.filename);
			//console.log(`add video: ${baseUrl + '/' + bucket + '/' + video.filename}`);

			clone.find('source').attr('src', video.url);
			console.log("add video:", video);

			this.uiElements.videoList.prepend(clone);
			clone.show();
		}
	}
}
