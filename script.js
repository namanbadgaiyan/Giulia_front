
let locomotivefunction = () => {

    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });


    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
locomotivefunction();

const element = document.getElementById('centerimages');

document.addEventListener('mousemove', (e) => {
    const { clientX } = e;
    const { left, width } = element.getBoundingClientRect();
    const centerX = left + width / 2;

    const deltaX = clientX - centerX;

    // Calculate the horizontal tilt angle based on cursor position
    const tiltAngleY = deltaX * -0.005; // Adjust the factor for the desired tilt speed

    // Calculate the depth effect using translateZ
    const depth = deltaX * 0.001; // Adjust the factor for the desired depth effect

    // Apply the horizontal tilt and depth transforms to the image
    element.style.transform = `translate(-50%, -50%) perspective(800px) rotateY(${tiltAngleY}deg) translateZ(${depth}px)`;
});

gsap.to("#page3 .leftse",{
    transform : "translateX(-35%) rotate(-3deg)",
    scrollTrigger:{
        trigger : "#page3",
        scroller : "#main",
        scrub : true,
        start : "top 90%",
        end : "top 0%",
    }
})
gsap.to("#page3 .rightse",{
    transform : "translateX(35%) rotate(3deg)",
    scrollTrigger:{
        trigger : "#page3",
        scroller : "#main",
        scrub : true,
        start : "top 80%",
        end : "top 0%",
    }
})

gsap.to("#page4 .leftse",{
    transform : "translateX(-35%) rotate(-3deg)",
    scrollTrigger:{
        trigger : "#page4",
        scroller : "#main",
        scrub : true,
        start : "top 90%",
        end : "top 0%",
    }
})
gsap.to("#page4 .rightse",{
    transform : "translateX(35%) rotate(3deg)",
    scrollTrigger:{
        trigger : "#page4",
        scroller : "#main",
        scrub : true,
        start : "top 80%",
        end : "top 0%",
    }
})
