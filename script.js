/*=========================================
MotoVerse
script.js
=========================================*/

document.addEventListener("DOMContentLoaded", function () {

    /*==========================
    Sticky Header
    ==========================*/

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {

            header.style.background = "rgba(8,17,31,.96)";
            header.style.boxShadow = "0 10px 30px rgba(0,0,0,.15)";

        } else {

            header.style.background = "rgba(15,23,42,.82)";
            header.style.boxShadow = "none";

        }

    });


    /*==========================
    Fade Up Animation
    ==========================*/

    const revealElements = document.querySelectorAll(
        ".category-card,.post-card,.stat-box,.review-grid,.newsletter-box,.section-title"
    );

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },

        {
            threshold: .15
        }

    );

    revealElements.forEach((item) => {

        item.classList.add("fade-up");

        observer.observe(item);

    });


    /*==========================
    Counter Animation
    ==========================*/

    const counters = document.querySelectorAll(".stat-box h2");

    const counterObserver = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(!entry.isIntersecting) return;

            const counter = entry.target;

            const text = counter.innerText;

            const target = parseInt(text.replace(/\D/g,""));

            let current = 0;

            const speed = target / 120;

            const update = ()=>{

                current += speed;

                if(current < target){

                    counter.innerText =
                    Math.floor(current) +
                    text.replace(/[0-9]/g,"");

                    requestAnimationFrame(update);

                }else{

                    counter.innerText = text;

                }

            }

            update();

            counterObserver.unobserve(counter);

        });

    });

    counters.forEach(c=>counterObserver.observe(c));


    /*==========================
    Smooth Anchor Scroll
    ==========================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

        anchor.addEventListener("click",function(e){

            const target=document.querySelector(this.getAttribute("href"));

            if(target){

                e.preventDefault();

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    });


    /*==========================
    Active Navigation
    ==========================*/

    const links=document.querySelectorAll("nav a");

    links.forEach(link=>{

        link.addEventListener("click",()=>{

            links.forEach(l=>l.classList.remove("active"));

            link.classList.add("active");

        });

    });


    /*==========================
    Back To Top
    ==========================*/

    const topBtn=document.createElement("button");

    topBtn.innerHTML="↑";

    topBtn.className="top-btn";

    document.body.appendChild(topBtn);

    topBtn.style.position="fixed";
    topBtn.style.right="25px";
    topBtn.style.bottom="25px";
    topBtn.style.width="50px";
    topBtn.style.height="50px";
    topBtn.style.borderRadius="50%";
    topBtn.style.border="none";
    topBtn.style.cursor="pointer";
    topBtn.style.background="#ff6b00";
    topBtn.style.color="#fff";
    topBtn.style.fontSize="20px";
    topBtn.style.display="none";
    topBtn.style.zIndex="9999";
    topBtn.style.boxShadow="0 15px 35px rgba(0,0,0,.25)";

    window.addEventListener("scroll",()=>{

        if(window.scrollY>500){

            topBtn.style.display="block";

        }else{

            topBtn.style.display="none";

        }

    });

    topBtn.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });


    /*==========================
    Image Hover Tilt
    ==========================*/

    document.querySelectorAll(".category-card,.post-card").forEach(card=>{

        card.addEventListener("mousemove",(e)=>{

            const rect=card.getBoundingClientRect();

            const x=e.clientX-rect.left;

            const y=e.clientY-rect.top;

            const rotateY=((x/rect.width)-0.5)*10;

            const rotateX=((y/rect.height)-0.5)*-10;

            card.style.transform=
            `perspective(800px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-10px)`;

        });

        card.addEventListener("mouseleave",()=>{

            card.style.transform="translateY(0)";

        });

    });


    /*==========================
    Newsletter Validation
    ==========================*/

    const form=document.querySelector(".newsletter form");

    if(form){

        form.addEventListener("submit",(e)=>{

            e.preventDefault();

            const email=form.querySelector("input").value.trim();

            if(email===""){

                alert("Please enter your email address.");

                return;

            }

            alert("Thank you for subscribing!");

            form.reset();

        });

    }


    /*==========================
    Lazy Loading Images
    ==========================*/

    document.querySelectorAll("img").forEach(img=>{

        img.loading="lazy";

    });


    /*==========================
    Current Year
    ==========================*/

    const year=document.querySelector(".year");

    if(year){

        year.innerHTML=new Date().getFullYear();

    }

});


/*=========================================
END
=========================================*/