jQuery(document).ready(function($) {
  var current_hostname = document.domain;

  var regHostname = new RegExp(/:\/\/(.[^/]+)/);
  var regMailto = new RegExp(/mailto:(.[^/]+)/);
  var regDownloadFile = new RegExp(".(pdf|doc|docx|xls|xlsx|ppt|pptx|pps|zip|rar)$");

  $('a').click(function() {
    var ga_category;
    var ga_action = "click";
    var ga_value;

    var current_href = $(this).attr('href');

    var isMailto = regMailto.test(current_href);

    if(! isMailto) {
      var isFile = regDownloadFile.test(current_href.match(/(.[^#|?]+)/)[1]);

      if (! isFile) {
        var hostname = current_href.match(regHostname);

        if(hostname && hostname[1] != current_hostname) {
          ga_category = "external link";
          ga_value = hostname[1];
        }
      } else {
        ga_category = "download";
        ga_value = current_href;
      }
    } else {
      ga_category = "mailto";
      ga_value = current_href.match(regMailto)[1];
    }
    
    if(ga_value) {
      if(! _gaq) {
        alert('You must configure Google Analytics code tracking');
      } else {
        _gaq.push(['_trackEvent', ga_category, ga_action, ga_value]);
      }
    }
    return true;
  });
});