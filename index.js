const gifs = {
    love: "https://gifman.net/wp-content/uploads/2019/06/ursinho-fofo-apaixonado.gif",
    angry: "https://gifman.net/wp-content/uploads/2019/06/ursinho-fofo-cara-de-bravo.gif",
    kiss: "https://gifman.net/wp-content/uploads/2019/06/ursinhos-fofos-beijos.gif",
    bite: "https://gifman.net/wp-content/uploads/2019/06/ursinhos-fofos-mordidas.gif",
    pat: "https://gifman.net/wp-content/uploads/2019/06/ursinhos-fofos-coracoes.gif",
    celebrate1: "https://media.tenor.com/UXNeHTYKR1wAAAAM/happy-dance-dance.gif",
    celebrate2: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDZseGVqdDhwNHNjM2txYmM4aXFuMDh4eno4ZHE5ZXhzZzlqajFrZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/artj92V8o75VPL7AeQ/giphy.webp", 
    celebrate3: "https://media2.giphy.com/media/bIEzoZX0qJaG6s6frc/200.webp?cid=790b7611d6lxejt8p4sc3kqbc8iqn08xzz8dq9exsg9jj1kd&ep=v1_gifs_search&rid=200.webp&ct=g",
    celebrate4: "https://media2.giphy.com/media/xT8qAY7e9If38xkrIY/200w.webp?cid=790b7611d6lxejt8p4sc3kqbc8iqn08xzz8dq9exsg9jj1kd&ep=v1_gifs_search&rid=200w.webp&ct=g",
    celebrate5: "https://media2.giphy.com/media/RDbZGZ3O0UmL6/100.webp?cid=ecf05e47xlu0njf15kqzlcazrcynqmspvvrhkxg9kqg1d2op&ep=v1_gifs_search&rid=100.webp&ct=g",
    celebrate6: "https://media.giphy.com/media/UnhItSED68B931Hi2V/giphy.gif?cid=790b7611ayw3yfkr14v5o7b0xld6feqda3tbm2l7fm5sw203&ep=v1_gifs_search&rid=giphy.gif&ct=g"
};

const loveGif = document.getElementById("love-gif");
const loveText = document.getElementById("love-text");
const noBtn = document.querySelector(".no-btn");
let sheSaidYes = false;
let noCount = 0;

const createPlaceholderButton = () => {
    const placeholder = document.createElement('button');
    placeholder.className = 'btn no-btn';
    placeholder.style.visibility = 'hidden';
    placeholder.disabled = true;
    placeholder.textContent = 'No';
    return placeholder;
}

const onYesClick = () => {
    sheSaidYes = true;

    let currentIndex = 0;
    const gifSequence = [gifs.kiss, gifs.bite, gifs.pat];
    
    // Start with the first GIF
    loveGif.src = gifSequence[currentIndex];

    loveText.textContent = "I knew you'd say yes! <3 SEE YAH LABLAB!!!";
    
    // Set up the infinite loop
    setInterval(() => {
        currentIndex = (currentIndex + 1) % gifSequence.length;
        loveGif.src = gifSequence[currentIndex];
    }, 2000); // Change every 2 seconds

    noBtn.style.display = "none";

    const celebrateGifs = document.querySelectorAll(".celebrate-gif");
    celebrateGifs.forEach(gif => {
        gif.style.display = "block";
    });
}

const onNoClick = () => {

    console.log(noCount);

    noCount++;

    if (noCount === 5) {
        noBtn.textContent = "YES";
        noBtn.style.backgroundColor = "#FF2F6F";
        noBtn.removeEventListener("click", onNoClick);
        noBtn.addEventListener("click", onYesClick);

        sheSaidYes = true;
        return;
    }

    if (sheSaidYes) return;

    // Change GIF to angry
    if (loveGif.src !== gifs.angry) loveGif.src = gifs.angry;

    
    // Create placeholder if it doesn't exist
    if (!document.querySelector(".no-btn[disabled]")) {
        const placeholder = createPlaceholderButton();
        noBtn.parentNode.insertBefore(placeholder, noBtn.nextSibling);
    }
    
    // Get viewport dimensions
    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;
    
    // Generate random position
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    // Apply new position
    noBtn.style.position = "fixed";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
}

document.addEventListener("DOMContentLoaded", () => {
    loveGif.src = gifs.love;

    const yesBtn = document.querySelector(".yes-btn");
    const noBtn = document.querySelector(".no-btn");
    
    yesBtn.addEventListener("click", onYesClick);
    noBtn.addEventListener("click", onNoClick);
})