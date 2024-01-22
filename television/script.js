let priceValue = 500; 

function adjustPrice(value) {
    priceValue += value;
    priceValue = Math.min(5000, Math.max(500, priceValue));
    document.getElementById('priceValue').innerText = priceValue;
}

function displayFullScreenImage() {
    var fullScreenImage = document.getElementById("fullScreenImage");
    fullScreenImage.style.display = "flex";
}

function typeQuestion(questionText, targetElement, onComplete) {
    var i = 0;
    var speed = 60; // typing speed

    function type() {
        if (i < questionText.length) {
            targetElement.innerHTML += questionText.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            onComplete();
        }
    }

    type();
}

function fadeInAnswerPanel1() {
    var answerPanel1 = document.querySelector('#panel1');
    answerPanel1.style.opacity = '0';
    answerPanel1.style.transition = 'opacity 1s';

    setTimeout(function () {
        answerPanel1.style.opacity = '1';
    }, 100);
}

function fadeInNextAnswerPanel(panelId) {
    var answerPanel2 = document.querySelector('#' + panelId);
    answerPanel2.style.opacity = '0';
    answerPanel2.style.display = 'flex';

    answerPanel2.style.transition = 'opacity 1s';

    setTimeout(function () {
        answerPanel2.style.opacity = '1';
    }, 10);
}

function removePanel(panelId) {
    var answerPanel = document.querySelector('#' + panelId);
    answerPanel.style.opacity = '1';
    answerPanel.style.transition = 'opacity 1s';

    setTimeout(function () {
        answerPanel.style.opacity = '0';
    }, 50);
}

function playGifAndDisplayImage() {
    var fullscreenGif = document.getElementById("fullscreen-gif");
    var fullScreenImage = document.getElementById("fullScreenImage");
    var backGround = document.querySelector('.container');

    // Show the fullscreen-gif
    fullscreenGif.style.display = "flex";
    setTimeout(function () {
        fullscreenGif.classList.add("show");
    }, 10);

    setTimeout(function () {
        fullscreenGif.classList.remove("show");
        setTimeout(function () {
            fullscreenGif.style.display = "none";
        }, 1000);

        fullScreenImage.style.display = "flex";
        setTimeout(function () {
            fullScreenImage.classList.add("show");
            var questionElement = document.querySelector('.question p');
            var questionText = "WHICH OF THE FOLLOWING MOVIES WOULD YOU CHOOSE IN A CINEMATIC SHOWDOWN OF 'THIS OR THAT'?";

            // displaying the question
            typeQuestion(questionText, questionElement, fadeInAnswerPanel1);
        }, 10);
    }, 1000);

    backGround.classList.add("Blur");
}

function setChannelHidden(channelToHideId, fullscreenGifId, fullScreenImageId, channelToShowId) {
    var channelToHide = document.getElementById(channelToHideId);
    channelToHide.classList.add('hidechannel');

    var fullscreenGif = document.getElementById(fullscreenGifId);
    var fullScreenImage = document.getElementById(fullScreenImageId);
    var channelToShow = document.getElementById(channelToShowId);

    fullscreenGif.style.display = 'flex';
    setTimeout(function () {
        fullscreenGif.classList.add('show');
    }, 10);

    setTimeout(function () {
        fullscreenGif.classList.remove('show');
        setTimeout(function () {
            fullscreenGif.style.display = 'none';
        }, 1000);

        fullScreenImage.style.display = 'flex';
        setTimeout(function () {
            fullScreenImage.classList.add('show');
            channelToShow.classList.remove('hidechannel');
            channelToShow.classList.add('channel');
        }, 10);
    }, 1000);
}

// submit button ch03
document.addEventListener('DOMContentLoaded', function () {
    var nameInput = document.getElementById('nm');
    var phoneInput = document.getElementById('ph');
    var emailInput = document.getElementById('mail');
    var submitDetailsButton = document.getElementById('submitDetails');

    function checkInputs() {
        var nameValue = nameInput.value.trim();
        var phoneValue = phoneInput.value.trim();
        var emailValue = emailInput.value.trim();

        var isInputsFilled = nameValue != '' && phoneValue != '' && emailValue != '';

        if(!isInputsFilled){
            submitDetailsButton.style.display = 'flex';
        }
    }

    nameInput.addEventListener('input', checkInputs);
    phoneInput.addEventListener('input', checkInputs);
    emailInput.addEventListener('input', checkInputs);
});


document.body.addEventListener('click', function (event) {
    if (event.target.classList.contains('onOff')) {
        playGifAndDisplayImage();
    }
});

document.body.addEventListener('click', function (event) {
    if (event.target.id.includes('option1') || event.target.id.includes('option2')) {
        removePanel('panel1');
        fadeInNextAnswerPanel('panel2');
    }
    if (event.target.id.includes('option3') || event.target.id.includes('option4')) {
        removePanel('panel2');
        fadeInNextAnswerPanel('panel3');
    } 
    if (event.target.id.includes('option5') || event.target.id.includes('option6')) {
        removePanel('panel3');
        setChannelHidden('ch10', 'fullscreen-gif', 'fullScreenImage', 'ch02');
    } 
    if (event.target.id.includes('submitPrice')) {
        setChannelHidden('ch02', 'fullscreen-gif', 'fullScreenImage', 'ch03');
    } 
    if (event.target.id.includes('submitDetails')) {
        setChannelHidden('ch03', 'fullscreen-gif', 'fullScreenImage', 'ch04');
    } 

    //qr page
    if (event.target.id.includes('done')) {
        window.location.reload();
    }    
});

//Mongo db connection
document.addEventListener('DOMContentLoaded', function () {
    var submitDetailsButton = document.getElementById('submitDetails');

    submitDetailsButton.addEventListener('click', function () {
      var nameInput = document.getElementById('nm').value;
      var phoneInput = document.getElementById('ph').value;
      var emailInput = document.getElementById('mail').value;

      // Send data to the server
      fetch('http://localhost:3000/submitDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nameInput,
          phone: phoneInput,
          email: emailInput,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          // Optionally, you can handle the response here
        })
        .catch(error => console.error('Error:', error));
    });
  });



