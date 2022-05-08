const imageFileInput = document.querySelector('#imageFileInput');
const topText = document.querySelector('#topText');
const bottomText = document.querySelector('#bottomText');
const canvas = document.querySelector('#meme');

let image;

// for whenever the user picks a new image
imageFileInput.addEventListener('change', () => {
    // take in a file and return a string containing the object url
    const imageDataURL = URL.createObjectURL(imageFileInput.files[0]);
    // create a new instance of the image and add the source
    image = new Image();
    image.src = imageDataURL;
    // the image won't render immediately, so we add an event listener
    image.addEventListener('load', () => {
        updateMemeCanvas(canvas, image, topText.value, bottomText.value)
    }, { once: true });
});

topText.addEventListener('change', () => {
    updateMemeCanvas(canvas, image, topText.value, bottomText.value)
});
bottomText.addEventListener('change', () => {
    updateMemeCanvas(canvas, image, topText.value, bottomText.value)
});

const updateMemeCanvas = (canvas, image, topText, bottomText) => {
    const ctx = canvas.getContext('2d');
    const width = image.width;
    const height = image.height;
    const fontSize = Math.floor(width / 10);
    const yOffset = height / 25;

    // ensure same dimensions of the image
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0);

    // black border around the text
    ctx.strokeStyle = 'black';
    ctx.lineWidth = Math.floor(fontSize / 4);
    // fill w/white
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    // ensures no strange spikes in our text
    ctx.lineJoin = 'round';
    ctx.font = `${fontSize}px sans-serif`;

    // topTxt
    ctx.textBaseline = 'top';
    ctx.strokeText(topText, width / 2, yOffset);
    ctx.fillText(topText, width / 2, yOffset);

    // bottomTxt
    ctx.textBaseline = 'bottom';
    ctx.strokeText(bottomText, width / 2, height - yOffset);
    ctx.fillText(bottomText, width / 2, height - yOffset);
}