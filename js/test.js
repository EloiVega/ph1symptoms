$(document).ready(function() {	
    gsap.registerPlugin(ScrollTrigger);	

    const anatomy_pin = document.querySelector("#anatomy_pin");
    const anatomy_label_list = document.querySelector("#anatomy_label_list");
    const anatomy_labels = anatomy_label_list.children;
    
    let isOnSmallWindow = false; //Controls functionalities to only be used when needed
    const SMALL_WINDOW_MAX_WIDTH = 768;
    window.addEventListener("resize", () => {
        if(!isOnSmallWindow && window.innerWidth < SMALL_WINDOW_MAX_WIDTH){
            //Set all configurations to mobile mode
            isOnSmallWindow = true;

            $(anatomy_pin).removeClass("anatomy_pin");      //Remove desktop styles from the anatomy pin
            $(anatomy_pin).addClass("anatomy_pin_mobile");  //Apply mobile style to the anatomy pin

        } else if (isOnSmallWindow && window.innerWidth >= SMALL_WINDOW_MAX_WIDTH) {
            //Set all configurations to desktop mode
            isOnSmallWindow = false;
            
            $(anatomy_pin).removeClass("anatomy_pin_mobile");   //Remove mobile style from the anatomy pin
            $(anatomy_pin).addClass("anatomy_pin");             //Apply desktop styles to the anatomy pin    
        }

    })


    // Controlling Scrolling of the anatomy region

    // let anatomyBody = document.querySelector(".anatomy_pin_modal");
    // console.log(anatomyBody.offsetTop);
    // document.onscroll = () => {
    //     anatomyBody.scrollIntoView();
    //     // console.log(window.scrollY);
    // }

    // let element = document.querySelector(".label_list");
    // let list = element.children;
    // console.log(list);
    
    // for(let i = 0 ; i < list.length; ++i){
    //     console.log(`${i}: ${list[i].offsetLeft - element.offsetLeft}`)
    // }

    // element.onscroll = (e) => {
    //     e.target.scrollLeft = 148;
    // }

    // console.log(element.offsetLeft, element.offsetWidth, element.offsetLeft + element.offsetWidth);

    // Pinning the anatomy section until it's fully scrolled through
    gsap.to("#filler3", {
        scrollTrigger: {
            trigger: "#anatomy_pin",
            start: "top 10%",
            end: `top -${anatomy_label_list.offsetWidth + 100}px`,
            markers: true,
            scrub: true,
            pin: true,
            // toggleClass: "red",
        },
        scrollLeft: () => {
            return `${document.querySelector(".label_list").scrollLeft + 20}`}
    })

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
});