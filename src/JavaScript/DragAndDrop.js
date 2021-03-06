    
$(function() {    
    
    document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");
  
    $('.buttonImg').click(function() {
      inputElement.click();
     
    })
  
    inputElement.addEventListener("change", (e) => {
      if (inputElement.files.length) {
        updateThumbnail(dropZoneElement, inputElement.files[0]);
      }
    });
  
    dropZoneElement.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZoneElement.classList.add("drop-zone--over");
    });
  
    ["dragleave", "dragend"].forEach((type) => {
      dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove("drop-zone--over");
      });
    });
  
    dropZoneElement.addEventListener("drop", (e) => {
      e.preventDefault();
  
      if (e.dataTransfer.files.length) {
        inputElement.files = e.dataTransfer.files;
        updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
      }
  
      dropZoneElement.classList.remove("drop-zone--over");
      
    });
  });
  
  /**
   * Updates the thumbnail on a drop zone element.
   *
   * @param {HTMLElement} dropZoneElement
   * @param {File} file
   */
  
  function updateThumbnail(dropZoneElement, file) {
    
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
  

    
    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
        
      thumbnailElement = document.createElement("div");
      thumbnailElement.classList.add("drop-zone__thumb");
      dropZoneElement.appendChild(thumbnailElement);
    }
  
   
  
    // Show thumbnail for image files
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
  
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(`url('${reader.result}')`)
        thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
        $('.main').css('background-image',thumbnailElement.style.backgroundImage);
        
      };
    } 
    $('.btnMain').css('display','none')
    thumbnailElement.style.display='none';
    $('input').disabled
  }
});