var front = document.querySelector('.face-front');
var back = document.querySelector('.face-back');
var flip = document.querySelector('.book-content');
var cards = document.querySelectorAll('.book'); 
var cover = document.querySelectorAll('#cover');

var contZindex = 2;
var customZindex = 1;

for (var i = 0; i < cards.length; i++) {
    cards[i].style.zIndex = customZindex;
    customZindex--;

    cards[i].addEventListener('click', function (e) {

        var tgt = e.target;
        var cardThis = this; 
        cardThis.style.zIndex = contZindex;
        contZindex++;

        if (tgt.getAttribute('class') == 'face-front') {
            cardThis.style.zIndex = contZindex;
            contZindex += 20;
            setTimeout(function () {
                cardThis.style.transform = 'rotateY(-180deg)';
            }, 500);
        }
        if (tgt.getAttribute("class") == 'face-back') {
            cardThis.style.zIndex = contZindex;
            contZindex += 20;

            setTimeout(function () {
                cardThis.style.transform = 'rotateY(0deg)';
            }, 500);
        }

        if (tgt.getAttribute('id') == 'cover') {
            flip.classList.remove("trnsf-reset");
            flip.classList.add("trnsf");
        }
        if (tgt.getAttribute('id') == 'trsf') {
            flip.classList.remove("trnsf");
            flip.classList.add("trnsf-reset");
        }

    });
}
