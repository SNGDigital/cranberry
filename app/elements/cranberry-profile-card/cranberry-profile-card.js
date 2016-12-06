class cranberryProfileCard {
  beforeRegister() {
    this.is = 'cranberry-profile-card';
    this.properties = {
      profile: {
        type: Object,
        observer: '_profileChanged'
      },
      hideEmail: {
        type: Boolean,
        value: true
      },
      hideFacebook: {
        type: Boolean,
        value: true
      },
      hideLinkedin: {
        type: Boolean,
        value: true
      },
      hideTwitter: {
        type: Boolean,
        value: true
      },
    }
  }

  _profileChanged(newValue, oldValue) {
    if (typeof newValue !== 'undefined' && typeof newValue.socialInfo !== 'undefined') {
      if (typeof newValue.socialInfo.email !== 'undefined' && newValue.socialInfo.email !== '') {
        this.set('hideEmail', false);
      }

      if (typeof newValue.socialInfo.facebook !== 'undefined' && newValue.socialInfo.facebook !== '') {
        this.set('hideFacebook', false);
      }

      if (typeof newValue.socialInfo.linkedin !== 'undefined' && newValue.socialInfo.linkedin !== '') {
        this.set('hideLinkedin', false);
      }

      if (typeof newValue.socialInfo.twitter !== 'undefined' && newValue.socialInfo.twitter !== '') {
        this.set('hideTwitter', false);
      }
    }
  }
}
Polymer(cranberryProfileCard);
