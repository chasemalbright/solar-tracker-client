const MAX = 3.3;

function changeHeadingColor(value) {
    var heading = document.getElementById("content-2");
  
    if (value < 50.00) {
      heading.style.color = "red";
    } else {
      heading.style.color = "green";
    }
  }

function updateDynamicContent() {
    fetch('https://633f-2607-fb90-8a34-d059-e83b-5c3a-2ad3-9ff.ngrok-free.app')
    .then(response => response.text())
    .then(data => {
      console.log(parseFloat(data.toString()));
      // Update the HTML content with the received data
      const contentElement = document.getElementById('content');
      contentElement.textContent = parseFloat(data.toString()) + ' V';

      const contentElement2 = document.getElementById('content-2');
      changeHeadingColor((parseFloat(data.toString())/MAX)*100);
      contentElement2.textContent = ((parseFloat(data.toString())/MAX)*100).toFixed(2) + ' %';

    })
    .catch(error => {
      console.error('Error:', error);
    });
}


  setInterval(updateDynamicContent, 1000); // 5000 milliseconds = 5 seconds
