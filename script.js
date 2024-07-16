$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Software Developer", "Web Designer", "Product Development", "Poet"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Software Developer", "Web Designer", "Product Development", "Poet"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    $("#sendMsg").click(function(e) {
        e.preventDefault();
        if(!validateFormFields()) return;
        const form = document.getElementById('contactForm');
        const result = document.getElementById('resultMsg');
        const formData = new FormData(form);
        
        let object = Object.fromEntries(formData);
        object.access_key = "f29e3307-d14b-4435-8465-fe0185f418a7"; //setting public acces key
        object.from_name = "Portfolio Message"; // setting from name for email
        const json = JSON.stringify(object);
        $(".successMsg").slideDown();
        result.innerHTML = "Please wait...."

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Message sent successfully.";
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                $(".successMsg").slideUp();
                result.innerHTML = "";
            }, 5000);
        });
    });

    function validateFormFields() {
        let msg = "This feature is under maintainance.....";
        alert(msg);
        return false;
    };
});
