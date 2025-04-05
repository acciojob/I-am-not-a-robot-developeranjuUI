//your code here
document.addEventListener('DOMContentLoaded', () => {
    
    const imageClasses = ['img1', 'img2', 'img3', 'img4', 'img5'];
    
   
    const imageContainer = document.getElementById('image-container');
    const resetBtn = document.getElementById('reset');
    const verifyBtn = document.getElementById('verify');
    const message = document.getElementById('h');
    const resultPara = document.getElementById('para');
    
    
    let selectedImages = [];
    let duplicateClass = '';
    
    
    function initGame() {
       
        imageContainer.innerHTML = '';
        selectedImages = [];
        resetBtn.style.display = 'none';
        verifyBtn.style.display = 'none';
        resultPara.textContent = '';
        message.textContent = 'Please click on the identical tiles to verify that you are not a robot.';
        
        
        duplicateClass = imageClasses[Math.floor(Math.random() * imageClasses.length)];
        
        
        const imagesToShow = [...imageClasses, duplicateClass];
        
       
        shuffleArray(imagesToShow);
        

        imagesToShow.forEach((imgClass, index) => {
            const img = document.createElement('div');
            img.className = imgClass;
            img.dataset.index = index;
            img.addEventListener('click', handleImageClick);
            imageContainer.appendChild(img);
        });
    }
    

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    

    function handleImageClick(e) {
        const clickedImage = e.target;
        
        
        if (selectedImages.length >= 2) return;
        
        
        if (selectedImages.includes(clickedImage)) return;
        
        
        clickedImage.classList.add('selected');
        selectedImages.push(clickedImage);
        

        resetBtn.style.display = 'inline-block';
        
       
        if (selectedImages.length === 2) {
            verifyBtn.style.display = 'inline-block';
        }
    }
    
   
    resetBtn.addEventListener('click', () => {
        
        document.querySelectorAll('#image-container > div').forEach(img => {
            img.classList.remove('selected');
        });
        
       
        selectedImages = [];
        resetBtn.style.display = 'none';
        verifyBtn.style.display = 'none';
        resultPara.textContent = '';
    });
    
    
    verifyBtn.addEventListener('click', () => {
       
        verifyBtn.style.display = 'none';
        
        
        const [img1, img2] = selectedImages;
        const isHuman = img1.className === img2.className;
        
        
        if (isHuman) {
            resultPara.textContent = 'You are a human. Congratulations!';
        } else {
            resultPara.textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
        }
    });
    
    
    initGame();
});