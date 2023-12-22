$(document).ready(function() {	
    gsap.registerPlugin(ScrollTrigger);


    /* --------- GLOBAL VARIABLES & INITIALLIZATION FUNCTIONS --------- */

    const SMALL_WINDOW_MAX_WIDTH = 768;

    const anatomy_pin = document.querySelector("#anatomy_pin");
    let anatomyMarkedPos = 0; //Initiates Marked Labels and Markers
    let anatomyScrollStart = 0; //Initiallized bellow (quick search: if(anatomyScrollStart == 0)) to jump to the initiallization
    let isAnatomyPinned = false; //Controls functionalities of the label_list scroll when the anatomy section is pinned
    let isOnSmallWindow = window.innerWidth < SMALL_WINDOW_MAX_WIDTH? true: false; //Controls functionalities to only be used when needed
    let interval = false;
    let scrollEventUp = false;
    let scrollEventDown = false;

    console.log(window.innerWidth, SMALL_WINDOW_MAX_WIDTH, isOnSmallWindow)
    const shiftScreenSetting = (setting) => {   //Setting can either be "small" or "large"
        if(setting === "small"){
            $(anatomy_pin).removeClass("anatomy_pin");      //Remove desktop styles from the anatomy pin
            $(anatomy_pin).addClass("anatomy_pin_mobile");  //Apply mobile style to the anatomy pin
        } else if (setting === "large"){
            $(anatomy_pin).removeClass("anatomy_pin_mobile");  //Remove mobile style to the anatomy pin
            $(anatomy_pin).addClass("anatomy_pin");      //Apply desktop styles from the anatomy pin
        }
    }
    if(isOnSmallWindow) shiftScreenSetting("small");

    const getAnatomyScrollDistance = (id) => {
        const tempLabel = $(`#${id}_label`);
            const tempContainer = $(`#anatomy_label_list`);
            const OFFSET_FACTOR = 30;
            const scrollDistance = 
                        tempLabel[0].offsetLeft -               // if x + y = z
                        tempContainer[0].offsetLeft -           // then z - y = x
                        (tempContainer[0].offsetWidth/2) +
                        OFFSET_FACTOR;  // this is a factor of centering the scrolling to the middle of the screen
        return scrollDistance;
    }

    ///////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////

    /* --------- LOGISTIC ACTIONS & EVENTS --------- */

    const markTopic = (labelPosition) => {
        labelPosition = Math.min(labelPosition, labels.length-1);
        labelPosition = Math.max(labelPosition, 0);
        if(labelPosition== labels.length-1 || labelPosition <= 0) {
            clearInterval(interval); 
            interval = false;
        }

        let id = removeWhiteSpaces(labels[anatomyMarkedPos].label); //marked positions' id
        
        //Unmark the previous marked position
        $(`#${id}_label`).removeClass('marked_label');
        $(`#${id}`).removeClass('marked');
        
        id = removeWhiteSpaces(labels[labelPosition].label); //new positions' id
        //Mark the new position
        $(`#${id}_label`).addClass('marked_label');
        $(`#${id}`).addClass('marked');

        if(anatomyScrollStart == 0){
            anatomyScrollStart = getAnatomyScrollDistance(id);
        }
        
        if(isOnSmallWindow){
            const scrollDistance = getAnatomyScrollDistance(id);
            $("#anatomy_label_list").animate({
                scrollLeft:  scrollDistance
            }, 500);
        }

        //assign the new marked pos to anatomyMarkedPos
        anatomyMarkedPos = labelPosition;
        console.log(anatomyMarkedPos)
    }


    
    //Handles all the resizing variables, DOM ids and DOM classes when switching from desktop view to mobile view
    window.addEventListener("resize", () => {
        if(!isOnSmallWindow && window.innerWidth < SMALL_WINDOW_MAX_WIDTH){
            //Set all configurations to mobile mode
            isOnSmallWindow = true;
            shiftScreenSetting("small");
            
        } else if (isOnSmallWindow && window.innerWidth >= SMALL_WINDOW_MAX_WIDTH) {
            //Set all configurations to desktop mode
            isOnSmallWindow = false;
            shiftScreenSetting("large");
        }

    })


    // Controlling Scrolling of the anatomy region while the anatomy section is being pinned (mobile/tablet view functionality)
    const labelListElement = $(`#anatomy_label_list`);
    const anatomySection = $(`#anatomy_pin`);
    const anatomySectionStart = anatomySection.offset().top;
    const anatomySectionEnd = anatomySectionStart + 200;
    let isScrolling = false;


    var lastScrollTop = 0;
    $(window).scroll(function(event){
        if(lastScrollTop < anatomySectionStart || lastScrollTop > anatomySectionEnd) {
            lastScrollTop = document.documentElement.scrollTop;
            return;
        }

        if(!isOnSmallWindow || (scrollEventUp && scrollEventDown)) {return;}
        if(interval) {
            $('html, body').animate({scrollTop: lastScrollTop + 1000/labels.length}, 0);

            return;
        }
        console.log("attempt")
        var st = $(this).scrollTop();
        if (st > lastScrollTop){
            if(scrollEventDown) return;
            interval = setInterval(()=> {
                markTopic(anatomyMarkedPos+1);
            }, 300);
            scrollEventDown = true;
        } else {
            if(scrollEventUp) return;
            interval = setInterval(()=> {
                markTopic(anatomyMarkedPos-1);
            }, 300);
            scrollEventUp = true;
        }

        
        lastScrollTop = st;
    });

    // Pinning the anatomy section until it's fully scrolled through (using matchMedia to limit actions to a certain screen media setting)
    let matchMedia = gsap.matchMedia();
    
    
    ///////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////

    /* --------- ANIMATIONS --------- */

    // ANIMATIONS ON MOBILE DEVICES AND TABLETS
    matchMedia.add("(max-width: 768px)", () => {

        gsap.to("#filler3", {
            scrollTrigger: {
                trigger: "#anatomy_pin",
                start: "top 10%",
                end: `top -1000px`,
                scrub: true,
                pin: true,
                // toggleClass: "red",
            },
        })

    })
        
    // GENERAL ANIMATIONS
    gsap.to("#set1shape1", {
        // duration: 0.5,
        y: -1000,
        // scrollTrigger: "#filler1",
        scrollTrigger: {
            trigger: "#filler1",
            start: "bottom 95%",
            end: "bottom 10%",
            // markers: true,
            scrub: 1,
            // toggleActions: "play pause reverse reset",
        },
        ease: 'power1.inOut'
      });
    gsap.to("#set1shape2", {
        // duration: 0.5,
        y: -800,
        // scrollTrigger: "#filler1",
        scrollTrigger: {
            trigger: "#filler1",
            start: "bottom 95%",
            end: "bottom 10%",
            // markers: true,
            scrub: 1,
            // toggleActions: "play pause reverse reset",
        },
        ease: 'power1.inOut'
      });
    gsap.to("#set1shape3", {
        // duration: 0.5,
        y: -500,
        // scrollTrigger: "#filler1",
        scrollTrigger: {
            trigger: "#filler1",
            start: "bottom 95%",
            end: "bottom 10%",
            // markers: true,
            scrub: 1,
            // toggleActions: "play pause reverse reset",
        },
        ease: 'power1.inOut'
      });
    gsap.to("#set1shape4", {
        // duration: 0.5,
        y: -300,
        // scrollTrigger: "#filler1",
        scrollTrigger: {
            trigger: "#filler1",
            start: "bottom 95%",
            end: "bottom 10%",
            // markers: true,
            scrub: 1,
            // toggleActions: "play pause reverse reset",
        },
        ease: 'power1.inOut'
      });
    gsap.to("#set1shape5", {
        // duration: 0.5,
        y: -1500,
        // scrollTrigger: "#filler1",
        scrollTrigger: {
            trigger: "#filler1",
            start: "bottom 95%",
            end: "bottom 10%",
            // markers: true,
            scrub: 1,
            // toggleActions: "play pause reverse reset",
        },
        ease: 'power1.inOut'
      });

    /////////////////////////////////////////////////////////

    gsap.to("#set2shape1", {
        // duration: 0.5,
        y: -1000,
        // scrollTrigger: "#filler1",
        scrollTrigger: {
            trigger: "#filler2",
            start: "bottom 95%",
            end: "bottom 10%",
            // markers: true,
            scrub: 1,
            // toggleActions: "play pause reverse reset",
        },
        ease: 'power1.inOut'
      });
      gsap.to("#set2shape2", {
        // duration: 0.5,
        y: -800,
        // scrollTrigger: "#filler1",
        scrollTrigger: {
            trigger: "#filler2",
            start: "bottom 95%",
            end: "bottom 10%",
            // markers: true,
            scrub: 1,
            // toggleActions: "play pause reverse reset",
        },
        ease: 'power1.inOut'
      });
    gsap.to("#set2shape3", {
        // duration: 0.5,
        y: -500,
        // scrollTrigger: "#filler1",
        scrollTrigger: {
            trigger: "#filler2",
            start: "bottom 95%",
            end: "bottom 10%",
            // markers: true,
            scrub: 1,
            // toggleActions: "play pause reverse reset",
        },
        ease: 'power1.inOut'
      });
    gsap.to("#set2shape4", {
        // duration: 0.5,
        y: -1000,
        // scrollTrigger: "#filler1",
        scrollTrigger: {
            trigger: "#filler2",
            start: "bottom 95%",
            end: "bottom 10%",
            // markers: true,
            scrub: 1,
            // toggleActions: "play pause reverse reset",
        },
        ease: 'power1.inOut'
      });
    gsap.to("#set2shape5", {
        // duration: 0.5,
        y: -1500,
        // scrollTrigger: "#filler1",
        scrollTrigger: {
            trigger: "#filler2",
            start: "bottom 95%",
            end: "bottom 10%",
            // markers: true,
            scrub: 1,
            // toggleActions: "play pause reverse reset",
        },
        ease: 'power1.inOut'
      });



    ///////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////

    /* --------- RENDERING --------- */
    
    //Rendering the anatomy dummy figure
    $('#anatomy_model').append(`
            <img src="./ui/images/dummy.png" alt="a figure of the human body anatomy with circle on top to indicate parts' positions">
    `)
    
    labels.forEach((topic, currentIndex) => {
        //First we construct the circles elements
        const markerId = removeWhiteSpaces(topic.label);
        $("#anatomy_model").append(`
            <span id = "${markerId}" class="mark ${currentIndex == anatomyMarkedPos? "marked": ""}"></span>
        `);
        //Then we edit their HTML CSS to position them as we wish
        $(`#${markerId}`).css({
            top: `${topic.yPosition}%`,
            left: `${topic.xPosition}%`
        })
        //Then make it marked when clicked
        $(`#${markerId}`).click(() => {markTopic(currentIndex)});
    });

    //Rendering the labels' list
    labels.forEach((label, currentIndex) => {
        const labelId = removeWhiteSpaces(label.label);
        $('#anatomy_label_list').append(`
            <div id = "${labelId}1_label" class = "label carousel">
                <h2>${capitalize(label.label)}</h2>
            </div>
        `)
    
        //Time to make the labels clickable (action: marks everything related to the label's topic)
        $(`#${labelId}1_label`).click(() => {markTopic(currentIndex)});
    })
    labels.forEach((label, currentIndex) => {
        const labelId = removeWhiteSpaces(label.label);
        $('#anatomy_label_list').append(`
            <div id = "${labelId}_label" class = "label ${currentIndex == anatomyMarkedPos? "marked_label": ""}">
                <h2>${capitalize(label.label)}</h2>
            </div>
        `)
    
        //Time to make the labels clickable (action: marks everything related to the label's topic)
        $(`#${labelId}_label`).click(() => {markTopic(currentIndex)});
    })
    labels.forEach((label, currentIndex) => {
        const labelId = removeWhiteSpaces(label.label);
        $('#anatomy_label_list').append(`
            <div id = "${labelId}2_label" class = "label carousel">
                <h2>${capitalize(label.label)}</h2>
            </div>
        `)
    
        //Time to make the labels clickable (action: marks everything related to the label's topic)
        $(`#${labelId}2_label`).click(() => {markTopic(currentIndex)});
    })
});