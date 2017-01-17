document.addEventListener('DOMContentLoaded', function() {
    var time = Date.now();
    var button = document.querySelector('#btn');
    button.addEventListener('click', function() {
        alert('Time: ' + time);
    });
});
