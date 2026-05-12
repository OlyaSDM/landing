document.getElementById('liveClick').addEventListener('click', function (e) {
   e.preventDefault();
   this.parentElement.classList.toggle('active');
});

window.onclick = function (event) {
   if (!event.target.matches('.dropdown-toggle') && !event.target.matches('.arrow')) {
      var dropdowns = document.getElementsByClassName("dropdown");
      for (var i = 0; i < dropdowns.length; i++) {
         dropdowns[i].classList.remove('active');
      }
   }
}