class toutElement {
  beforeRegister() {
    this.is = 'tout-element';
    this.properties = {
    };
  }

  ready() {
    console.info('Tout ready');
    let self = this;
    this._setupTout();
    console.info(TOUT);
    TOUT.onReady(function(){
      console.info('Tout is ready');
      let thisTout = self.querySelector('#tout-slot-b50c2b');
      console.info(thisTout);
      TOUT.slotManager.slotReady("b50c2b", thisTout);
    });
  }

  _setupTout() {
    console.info('In setup tout');
    !function(){var TOUT=window.TOUT=window.TOUT||{};if(console&&console.log&&console.log('Tout SDK: '+ +new Date),!TOUT._sdkScriptTagParsedAt){TOUT._sdkScriptTagParsedAt=new Date,TOUT.EMBED_CODE_VERSION='1.2.0';var sdkHost=TOUT.SDK_HOST||'platform.tout.com',sdkProtocol=TOUT.SDK_PROTOCOL||('https:'==window.location.protocol?'https:':'http:'),analyticsHost=TOUT.SDK_ANALYTICS_HOST||'analytics.tout.com',analyticsProtocol=TOUT.SDK_ANALYTICS_PROTOCOL||sdkProtocol;TOUT.onReady=TOUT.onReady||function(func){return TOUT._onReadyQueue=TOUT._onReadyQueue||[],TOUT._onReadyQueue.push(func),TOUT},TOUT.fireSimpleAnalyticsPixel=function(trigger_name,attrs){var img=new Image,url=analyticsProtocol+'//'+analyticsHost+'/events?trigger='+trigger_name;for(var attr in attrs)attrs.hasOwnProperty(attr)&&(url+='&'+attr+'='+encodeURIComponent(attrs[attr]));return img.src=url,img},TOUT.init=function(brandUid,options){options=options||{};var sdkScriptId='tout-js-sdk';if(document.getElementById(sdkScriptId)&&!options.forceInit)return TOUT;if(brandUid=TOUT.SDK_BRAND_UID||brandUid,'undefined'==typeof brandUid||'string'!=typeof brandUid||0===brandUid.length||brandUid.length>7)return TOUT.fireSimpleAnalyticsPixel('sdk_log',{log_level:'error',log_message:'BRAND_UID_NOT_DEFINED',content_page_url:window.location.href}),console&&console.error&&console.error('TOUT - Invalid Brand UID: '+brandUid),TOUT;TOUT._initOptions=options;var script=document.createElement('script');script.type='text/javascript',script.src=sdkProtocol+'//'+sdkHost+'/sdk/v1/'+brandUid+'.js',script.id=sdkScriptId,script.className='tout-sdk';var firstScript=document.getElementsByTagName('script')[0];return firstScript.parentNode.insertBefore(script,firstScript),TOUT.fireSimpleAnalyticsPixel('sdk_initialized',{content_brand_uid:brandUid,sdk_embed_code_version:TOUT.EMBED_CODE_VERSION,content_page_url:window.location.href}),TOUT}}}();
    (function(){
        TOUT.init('2f45b0');
    })();
  }
}
Polymer(toutElement);
