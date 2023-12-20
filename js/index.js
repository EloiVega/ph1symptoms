$(document).ready(function() {		
    const config = {
        view: document.querySelector('.app'),
        preload: true,
        native: false,
        change(state) {
        //   document.documentElement.style.backgroundColor = `hsl(${(state.current / state.bounding) * 360}, 100%, 95%)`;
        },
        scenes: {
          
        },
      };
      
      const r = window.rolly(config);
      r.init();
      
});