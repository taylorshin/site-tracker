document.addEventListener('DOMContentLoaded', function() {
    var time = Date.now();
    var button = document.querySelector('#btn');
    console.log('time: ' + time);
    button.addEventListener('click', function() {
        alert('Time: ' + time);
    });
});

var start;

$(document).ready(function() {
  start = Date.now();

  $(window).on('unload', function(e) {
      end = Date.now();
      console.log('timespent' + (end - start));
    //   $.ajax({
    //     url: "log.php",
    //     data: {'timeSpent': end - start}
    //   })
    });
});
