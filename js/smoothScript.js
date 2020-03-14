 /* <!-- Script Smooth -->
    <script type="text/javascript" src="js\smooth-scroll.min.js"></script>
    <script>
     var scroll = new SmoothScroll('a[href*="#"]', {
     ignore: '[data-scroll-ignore]',
     header: null,
     speed: 500,
     offset: 0,
     easing: 'easeInOutCubic',
     customEasing: function (time) {
       return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time;
     },
     before: function (anchor, toggle) {},
     after: function (anchor, toggle) {}
     });
     </script>


     *Colocarlo en el head*

*/