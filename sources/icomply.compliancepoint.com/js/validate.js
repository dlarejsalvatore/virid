var aTags = document.getElementsByTagName("script");
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var cert_script;
if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
{
	for (var i = 0; i < aTags.length; i++) {
		if (aTags[i].hasAttribute("data-certid")) {
			cert_script = aTags[i];
			break;
		}
	}
} else {
	cert_script = document.currentScript;
}

var certid = cert_script.getAttribute("data-certid");
var size = cert_script.getAttribute("data-size");
var parent = cert_script.parentElement;
var target = document.createElement("a");
target.setAttribute("id", "id_" + certid);
target.setAttribute("target", "_blank");
target.setAttribute("href", "https://icomply.compliancepoint.com/certification.php?id=" + certid);
target.setAttribute("style", "cursor:pointer;text-decoration:none;");
parent.appendChild(target);
var req = createCORSRequest("get", "https://icomply.compliancepoint.com/controllers/certificate/validate_cert.php?size=" + size + "&certUniqueId=" + certid + "");
if (req) {
  req.onload = function () {
    if(this.readyState == 4) {
      if(this.status == 200) {
          var data = JSON.parse(this.responseText);
          var anchor = document.getElementById("id_" + data.certid);
          anchor.innerHTML = data.certimg;
      }
    }
  }
}
req.send();

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    xhr.open(method, url, true);
    xhr.setRequestHeader('Accept', 'application/json');
  } else if (typeof XDomainRequest != "undefined") {
    xhr = new XDomainRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Accept', 'application/json');
  } else {
    xhr = null;
  }
  return xhr;
}
