// UPDATE POSITIONS
const labels = [
    {
        label: "skin",
        xPosition: 85.5,
        yPosition: 44,
    },
    {
        label: "blood vessels",
        xPosition: 13.5,
        yPosition: 30,
    },
    {
        label: "bones",
        xPosition: 32,
        yPosition: 60.3,
    },
    {
        label: "bone marrow",
        xPosition: 30.5,
        yPosition: 53.5,
    },
    {
        label: "joints",
        xPosition: 33,
        yPosition: 67,
    },
    {
        label: "muscles",
        xPosition: 63,
        yPosition: 59,
    },
    {
        label: "perephiral nerves",
        xPosition: 57,
        yPosition: 89,
    },
    {
        label: "retina",
        xPosition: 49,
        yPosition: 3.4,
    },
    {
        label: "teeth",
        xPosition: 44,
        yPosition: 8,
    },
    {
        label: "thyroid",
        xPosition: 44,
        yPosition: 13,
    },
    {
        label: "heart",
        xPosition: 52,
        yPosition: 20.8,
    },
    {
        label: "kidneys",
        xPosition: 56.8,
        yPosition: 32.8,
    },
  ]

$(document).ready(function() {	
    gsap.registerPlugin(ScrollTrigger);

    const anatomy_pin = document.querySelector("#anatomy_pin");
    const anatomy_label_list = document.querySelector("#anatomy_label_list");
    let anatomyMarkedPos = 0; //Initiates Marked Labels and Markers
    
    let isOnSmallWindow = false; //Controls functionalities to only be used when needed
    const SMALL_WINDOW_MAX_WIDTH = 768;

    ///////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////

    /* --------- LOGISTICS --------- */

    const markTopic = (labelPosition) => {
        console.log("isClicking") //Debugging
        let id = removeWhiteSpaces(labels[anatomyMarkedPos].label); //marked positions' id
        
        //Unmark the previous marked position
        $(`#${id}_label`).removeClass('marked_label');
        $(`#${id}`).removeClass('marked');
        
        id = removeWhiteSpaces(labels[labelPosition].label); //new positions' id
        //Mark the new position
        $(`#${id}_label`).addClass('marked_label');
        $(`#${id}`).addClass('marked');

        //assign the new marked pos to anatomyMarkedPos
        anatomyMarkedPos = labelPosition;
    }

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

    // Pinning the anatomy section until it's fully scrolled through
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
                end: `top -${anatomy_label_list.offsetWidth + 100}px`,
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
    $("#anatomy_pin").append(`
        <div id="anatomy_model" class="anatomy_model">
            <img src="./ui/images/dummy.png" alt="a figure of the human body anatomy with circle on top to indicate parts' positions">
        </div>
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
    $("#anatomy_pin").append(`<div id = "anatomy_label_list" class="label_list"></div>`);
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
    
});