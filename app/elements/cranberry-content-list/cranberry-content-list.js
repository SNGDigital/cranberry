class CranberryContentList {
    beforeRegister() {
        this.is = 'cranberry-content-list';
        this.properties = {
            count: {
                type: Number
            },
            items: {
                type: Object,
                value: []
            },
            params: {
                type: Object,
                value: [],
                observer: '_changeParams'
            },
            request: Object,
            response: {
                type: Object,
                observer: '_parseResponse'
            },
            rest: {
                type: String,
                value: 'http://sedev.libercus.net/rest.json'
            },
            sections: {
                type: String,
                observer: '_changeSections'
            },
            start: {
                type: Number
            },
            type: {
                type: String
            }
        };
    }

    attached() {
        app.logger('\<cranberry-content-list\> attached');
    }

    _changeParams() {
        let params = this.get('params');

        if (params.length !== 0 && params.desiredCount) {
            this.$.request.setAttribute('url', this.get('rest'));
            this.$.request.params = params;
            this.$.request.generateRequest();
        }
    }

    _changeSections(section) {
        this.async(function() {
            app.logger('\<cranberry-content-list\> section changed -\> ' + section);
            this._updateParams();
        });
    }

    _checkInStreamAd(index) {
        if (index === 2 || index === 13) {
            return true;
        } else {
            return;
        }
    }

    _checkNativeAd(index) {
        if (index === 2 || index === 17) {
            return true;
        } else {
            return;
        }
    }

    _checkLeaderboardAd(index) {
        if (index === 9 || index === 19) {
            return true;
        } else {
            return;
        }
    }

    _checkTopComments(index) {
      if (index === 1) {
        return true;
      } else {
        return;
      }
    }

    _handleLoad() {
        app.logger('<\cranberry-content-list\> load received');
    }

    _handleResponse() {
        app.logger('<\cranberry-content-list\> response received');
    }

    _hasPreview(preview) {
        if (typeof preview !== 'undefined' && preview.length > 0) {
            return true;
        } else {
            return;
        }
    }

    _parseResponse(response) {
        var result = JSON.parse(response.Result);

        this.set('items', result);
    }

    _updateParams() {
        let currentRequest = this.get('request');

        if (typeof currentRequest !== 'undefined' && currentRequest.loading === true) {
            app.logger('<\cranberry-content-list\> aborting previous request');
            this.$.request.abortRequest(currentRequest);
        }

        this.set('items', []);

        let jsonp = {};

        jsonp.request = 'content-list';
        jsonp.desiredSection = this.get('sections');
        jsonp.desiredContent = this.get('type');
        jsonp.desiredCount = this.get('count');
        this.set('params', jsonp);
    }
}
// Public methods.
// ready () {
//   app.logger('\<cranberry-content-list\> ready');
// }
// Private methods
Polymer(CranberryContentList);
