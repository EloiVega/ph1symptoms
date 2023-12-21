$(document).ready(function() {	
    gsap.registerPlugin(ScrollTrigger);

    const anatomy_pin = document.querySelector("#anatomy_pin");
    let anatomyMarkedPos = 0; //Initiates Marked Labels and Markers
    let isAnatomyPinned = false; //Controls functionalities of the label_list scroll when the anatomy section is pinned
    let isOnSmallWindow = false; //Controls functionalities to only be used when needed
    const SMALL_WINDOW_MAX_WIDTH = 768;

    ///////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////

    /* --------- LOGISTIC ACTIONS & EVENTS --------- */

    const markTopic = (labelPosition) => {
        let id = removeWhiteSpaces(labels[anatomyMarkedPos].label); //marked positions' id
        
        //Unmark the previous marked position
        $(`#${id}_label`).removeClass('marked_label');
        $(`#${id}`).removeClass('marked');
        
        id = removeWhiteSpaces(labels[labelPosition].label); //new positions' id
        //Mark the new position
        $(`#${id}_label`).addClass('marked_label');
        $(`#${id}`).addClass('marked');

        if(isOnSmallWindow){
            const tempLabel = $(`#${id}_label`);
            const tempContainer = $(`#anatomy_label_list`);
            const OFFSET_FACTOR = 30;
            const scrollDistance = 
                        tempLabel[0].offsetLeft -               // if x + y = z
                        tempContainer[0].offsetLeft -           // then z - y = x
                        (tempContainer[0].offsetWidth/2 - OFFSET_FACTOR);  // this is a factor of centering the scrolling to the middle of the screen

            $("#anatomy_label_list").animate({
                scrollLeft:  scrollDistance
            }, 500);
        }

        //assign the new marked pos to anatomyMarkedPos
        anatomyMarkedPos = labelPosition;
    }


    
    //Handles all the resizing variables, DOM ids and DOM classes when switching from desktop view to mobile view
    window.addEventListener("resize", () => {
        if(!isOnSmallWindow && window.innerWidth < SMALL_WINDOW_MAX_WIDTH){
            //Set all configurations to mobile mode
            isOnSmallWindow = true;

            $(anatomy_pin).removeClass("anatomy_pin");      //Remove desktop styles from the anatomy pin
            $(anatomy_pin).addClass("anatomy_pin_mobile");  //Apply mobile style to the anatomy pin
            // anatomy_pin.id = "anatomy_pin_mobile";
            
        } else if (isOnSmallWindow && window.innerWidth >= SMALL_WINDOW_MAX_WIDTH) {
            //Set all configurations to desktop mode
            isOnSmallWindow = false;
            
            $(anatomy_pin).removeClass("anatomy_pin_mobile");   //Remove mobile style from the anatomy pin
            $(anatomy_pin).addClass("anatomy_pin");             //Apply desktop styles to the anatomy pin    
            // anatomy_pin.id = "anatomy_pin";
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
                markers: true,
                scrub: true,
                pin: true,
                // toggleClass: "red",
            },
        })

    })
        
    // GENERAL ANIMATIONS
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