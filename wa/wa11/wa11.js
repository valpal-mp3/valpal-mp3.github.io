const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const images = ['horse1.jpg', 'horse2.jpg', 'horse3.jpg', 'horse4.jpg', 'horse5.jpg'];

/* Declaring the alternative text for each image file */
const altTxt = ['Horse with apple 1', 'Horse with apple 2', 'Horse with apple 3', 'Horse with apple 4', 'Horse with apple 5'];

/* Looping through images */
for (let i = 0; i < images.length; i++) {
    const newImg = document.createElement('img');
    newImg.setAttribute('src', 'images/' + images[i]);
    newImg.setAttribute('alt', altTxt[i]);
    thumbBar.appendChild(newImg);
    newImg.addEventListener('click', function(e){
        displayedImage.setAttribute('src', newImg.src);
        displayedImage.setAttribute('alt', newImg.alt);
    });
}

/* Wiring up the Darken/Lighten button */
btn.addEventListener('click', function(e) {
    if (btn.getAttribute('class') === 'white') {
        btn.setAttribute('class', 'light');
        btn.textContent = 'Normal';
        overlay.style.backgroundColor = 'rgba(250, 250, 238, 0.32)';
    }
    else {
        btn.setAttribute('class', 'white');
        btn.textContent = 'Whiten';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }
});