class CranberryGoogleAnalytics {
  // element registration
  beforeRegister() {
    this.is = 'cranberry-google-analytics';
    this.properties = {
      trackingId: Array,
      trackerIds: {
        type: Array,
        value : []
      },
      user: {
        type: Object,
        value: {}
      },
      userId: {
          type: String,
          notify: true
      }
    };
    this.listeners = {
      'track-event': 'trackEvent',
      'track-page': 'trackPage',
      'user-id-changed': 'userIDChanged'
    };
  }

  // public methods

  // attached to document
  attached() {
    app.logger('\<cranberry-google-analytics\> attached');

    this._checkGoogle();
  }

  _checkGoogle() {
    let el = this;

    setTimeout(function() {
      if (typeof ga !== 'undefined') {
        el._setupGA();

        return;
      } else {
        el._checkGoogle();
      }
    }, 50);
  }

  _setupGA() {
    let trackingArray = this.get('trackingId');

    if (typeof trackingArray !== 'undefined' && trackingArray.length > 0) {
      trackingArray.forEach((value, index) => {
        this._createGA(value.code, index);
      });
    }
  }

  _createGA(id, index) {
    this.async(() => {
      let trackerId = '';
      let trackerIds = this.get('trackerIds');

      if (index >= 1) {
        trackerId = 'tracker' + index;
      }

      app.logger('\<cranberry-google-analytics\> setting tracking for ' + id + ' with trackerId ' + ((trackerId !== '') ? trackerId : 'default'));

      if (trackerId !== '') {
        ga('create', id, 'auto', trackerId);
        trackerIds.push(trackerId);
        this.set('trackerIds', trackerIds);
      } else {
        ga('create', id, 'auto');
      }
    });
  }

  trackEvent(e) {
      //Add support for a non-interaction even that does not effect bounce rates - eg things that happen after a timeout
      //ga('send', 'event', 'category', 'action', {'nonInteraction': 1});
      ga('send', 'event', e.detail.category, e.detail.action, e.detail.label, e.detail.value);
  }

  trackPage(e) {
    setTimeout(() => {
      if (typeof ga !== 'undefined') {
        //Use set param, this way if we then send a subsequent event on the page it will be correctly associated with the same page

        if (typeof e !== 'undefined' && typeof e.detail.path !== 'undefined') {
            ga('set', 'page', e.detail.path);
        }

        let trackerIds = this.get('trackerIds');

        if(typeof e.detail.data !== 'undefined') {
          app.logger('\<cranberry-google-analytics\> pageview sent with data on default tracker');
          ga('send', 'pageview', e.detail.data);
          trackerIds.forEach((value, index) => {
            app.logger('\<cranberry-google-analytics\> pageview sent with data on ' + value);
            ga( value + '.send', 'pageview', e.detail.data);
          });
        } else {
          app.logger('\<cranberry-google-analytics\> pageview sent on default tracker');
          ga('send', 'pageview');

          trackerIds.forEach((value, index) => {
            app.logger('\<cranberry-google-analytics\> pageview sent on ' + value);
            ga( value + '.send', 'pageview');
          });
        }
        return;
      } else {
        this.trackPage(e);
      }
    }, 50);
  }

  userIDChanged(e) {
      ga('set', '&uid', this.userId);
  }
}
Polymer(CranberryGoogleAnalytics);
