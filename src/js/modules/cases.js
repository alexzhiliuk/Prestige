import Swiper, {Autoplay, Navigation, Pagination} from 'swiper';
Swiper.use([Autoplay, Navigation, Pagination]);



const casesSlider = new Swiper('#casesSlider', {
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 1000,
    freeMode: true,
    loop: true,

    navigation: {
        nextEl: '#casesSliderNext',
        prevEl: '#casesSliderPrev',
    },

    pagination: {
        el: "#casesSliderPagination",
        clickable: true,
    },

    breakpoints: {
        576: {
            
        },
        768: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 32,
        }
    }
    
});


$(".js-show-case").click(function() {
    let caseId = $(this).attr("data-case-id")
    $(`.cases__case`).hide()
    $(`.cases__case[data-case-id=${caseId}]`).show()
})

