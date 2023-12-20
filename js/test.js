$(document).ready(function() {	
    gsap.registerPlugin(ScrollTrigger);	
    
    // console.log(document.querySelector(".label_list").scrollLeft);

    gsap.to("#set1shape1", {
        // duration: 0.5,
        y: -500,
        // scrollTrigger: "#filler1",
        scrollTrigger: {
            trigger: "#filler1",
            start: "bottom 95%",
            end: "bottom 60%",
            // markers: true,
            scrub: 1,
            // toggleActions: "play pause reverse reset",
        },
        ease: 'power1.inOut'
      });

    let element = $(".label_list");
    let list = element[0].children;
    list[4].scrollIntoView();

    gsap.to("#filler3", {
        scrollTrigger: {
            trigger: ".anatomy_pin_modal",
            start: "top 10%",
            end: "top -300%",
            markers: true,
            scrub: true,
            pin: true,
            // toggleClass: "red",
        },
        scrollY: () => {
            console.log($(".label_list").scrollLeft);
            return `${$(".label_list").scrollLeft}`}
    })
});