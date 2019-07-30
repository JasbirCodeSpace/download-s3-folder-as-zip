function downloadFiles() {
  // e.preventDefault();
  var URL = "lambda-api-link";


  var user_name = window.location.hash.substring(1);

  var data = {
    user_name: user_name
  };

  var cors = 'https://cors-anywhere.herokuapp.com/';
  var xhr = new XMLHttpRequest();
  xhr.open("POST", cors + URL);
  xhr.onload = function (event) {
    // console.log("Success, server responded with: " + this.response);
    try {
      var str = this.response.substring(1, this.response.length - 1);
      var links = str.split(",");
      var urls = links[1].substring(12, links[1].length - 3).split(";");
      urls = urls.slice(0, urls.length - 1);
    } catch (e) {
      swal({
        title: 'Error!',
        text: 'Something went wrong , Try again',
        type: 'error',
        confirmButtonText: 'OK',
        timer: 2000
      })
    }

    var zip = new JSZip();
    var a = document.getElementById("downloadFilesLink");

    function request(url) {
      return new Promise(function (resolve) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.open("GET", url);
        httpRequest.onload = function () {
          zip.file(url, this.responseText);
          // alert(url);
          resolve()
        }
        httpRequest.send()
      })
    }

    Promise.all(urls.map(function (url) {
        // alert(url);
        return request(url)
      }))
      .then(function () {
        zip.generateAsync({
            type: "blob"
          })
          .then(function (content) {
            a.download = user_name+".zip";
            var myURL = window.URL || window.webkitURL
            a.href = myURL.createObjectURL(content);
            a.innerHTML = "Download";
            if (a.innerHTML == "" || a.innerHTML == "Preparing link ...") {
              swal({
                title: 'Error!',
                text: 'Something went wrong , Try again',
                type: 'error',
                confirmButtonText: 'OK',
                timer: 2000
              })
            }
          });
      })

  };

  xhr.send();
}
