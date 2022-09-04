const imageFileInput = document.querySelector('#imageFileInput');
const topText = document.querySelector('#topText');
const bottomText = document.querySelector('#bottomText');
const canvas = document.querySelector('#meme');

let image;

imageFileInput.addEventListener('change', () => {
    // take in a file and return a string containing the object url
    const imageDataURL = URL.createObjectURL(imageFileInput.files[0]);
    image = new Image();
    image.src = imageDataURL;
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

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = Math.floor(fontSize / 4);
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
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
