var uploadController = {
  data: {
    config: null,
    isAuthenticated: null
  },
  uiElements: {
    uploadButton: null
  },
  init: function(configConstants, apiClient, isAuthenticated) {
    this.data.config = configConstants;
    this.data.isAuthenticated = isAuthenticated;
    this.uiElements.uploadButton = $('#upload');
    this.uiElements.uploadButtonContainer = $('#upload-video-button');
    this.uiElements.uploadProgressBar = $('#upload-progress');
    if (!isAuthenticated) {
      this.uiElements.uploadButton.hide();
      this.uiElements.uploadButtonContainer.hide();
    }else{
      this.uiElements.uploadButton.show();
      this.uiElements.uploadButtonContainer.show();
    }

    this.wireEvents();
  },
  wireEvents: function() {
    var that = this;

    this.uiElements.uploadButton.on('change', function(result) {
      var file = $('#upload').get(0).files[0];
      var requestDocumentUrl = that.data.config.API_BASE_URL +
        '/gets3uploadpolicy?filename=' + encodeURI(file.name);

      console.log("requestDocumentUrl: " + requestDocumentUrl);
      $.get(requestDocumentUrl, function(data, status) {
        that.upload(file, data, that)
      });
    });
  },

  upload: function(file, data, that) {
    console.log("upload ....");
    console.log("data:", data);

    this.uiElements.uploadButtonContainer.hide();
    this.uiElements.uploadProgressBar.show();
    this.uiElements.uploadProgressBar.find('.progress-bar').css('width',
      '0');

    var fd = new FormData();
    fd.append('key', data.key)
    fd.append('acl', 'private');
    fd.append('Content-Type', file.type);
    fd.append('AWSAccessKeyId', data.access_key);
    fd.append('policy', data.encoded_policy)
    fd.append('signature', data.signature);
    fd.append('file', file, file.name);

    //data.upload_url='http://yongliu-s3-bucket.s3.amazonaws.com/';
    console.log("POST:" + data.upload_url);
    $.ajax({
      url: data.upload_url,
      type: 'POST',
      data: fd,
      processData: false,
      contentType: false,
      xhr: this.progress,
      //headers: {'user-custom-header': 'upload'},
      beforeSend: function(req) {
        req.setRequestHeader('Authorization', '');
      }
    }).done(function(response) {
      that.uiElements.uploadButtonContainer.show();
      that.uiElements.uploadProgressBar.hide();
      alert('Uploaded Finished');
    }).fail(function(response) {
      that.uiElements.uploadButtonContainer.show();
      that.uiElements.uploadProgressBar.hide();
      alert('Failed to upload');
    })
  },
  progress: function() {
    var xhr = $.ajaxSettings.xhr();
    xhr.upload.onprogress = function(evt) {
      var percentage = evt.loaded / evt.total * 100;
      $('#upload-progress').find('.progress-bar').css('width', percentage +
        '%');
    };
    return xhr;
  }
}
