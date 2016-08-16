class gigyaComments {
  beforeRegister() {
    this.is = 'gigya-comments';
    this.properties = {
      commentsId: {
        type: String
      },
      commentsUniqueId: {
        type: Number,
        value: '0'
      }
    };
    this.observers = ['_checkParams(commentsId, commentsUniqueId)'];
  }

  _checkParams(id, uniqueId) {
    if (id !== '' && uniqueId !== 0) {
      let streamId = uniqueId.toString();
      let self = this;
      let checkGigya = function () {
        setTimeout(function () {
          if (typeof gigya !== 'undefined') {
            var params = {
              categoryID: 'Default',
              streamID: streamId,
              streamURL: window.location.href,
              version: 2,
              containerID: id,
              cid: '',
              width: '100%'
            };
            gigya.comments.showCommentsUI(params);
          } else {
            checkGigya();
          }
        },1000);
      }
      checkGigya();
    }
  }
}
Polymer(gigyaComments);
