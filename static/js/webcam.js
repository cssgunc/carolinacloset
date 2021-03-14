export function takepicture() {
    var context = canvas.getContext('2d');
    if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    } else {
        clearphoto();
    }
}



export function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
}

export function startup(config) {
    config.video = document.getElementById('video');
    config.canvas = document.getElementById('canvas');
    config.photo = document.getElementById('photo');
    console.log(video)
    config.startbutton = document.getElementById('startbutton');
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function (stream) {
            config.video.srcObject = stream;
            config.video.play();
        })
        .catch(function (err) {
            console.log("An error occurred: " + err);
        });
    config.video.addEventListener('canplay', function (ev) {
        if (!config.streaming) {
            config.height = config.video.videoHeight / (config.video.videoWidth / config.width);

            video.setAttribute('width', config.width);
            video.setAttribute('height', config.height);
            canvas.setAttribute('width', config.width);
            canvas.setAttribute('height', config.height);
            streaming = true;
        }
    }, false);
    startbutton.addEventListener('click', function (ev) {
        takepicture();
        ev.preventDefault();

    }, false);
    clearphoto();
}