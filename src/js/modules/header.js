$(".header__burger").click(function() {
    $(this).toggleClass("header__burger_active")
    $(".mobile-menu").toggleClass("mobile-menu_active")
    $("body, html").toggleClass("lock")
})

$(".header__link[data-drop-id]").click(function() {
    let id = $(this).attr("data-drop-id")
    $(`.dropmenu[data-drop-id=${id}]`).toggleClass("dropmenu_active")

    $("body, html").toggleClass("lock")
})

$(".mobile-menu__list [data-drop-id]").click(function() {
    let id = $(this).attr("data-drop-id")
    $(`.dropmenu[data-drop-id=${id}]`).toggleClass("dropmenu_active")
})

$(".js-back-mobile-menu").click(function() {
    let id = $(this).parent("[data-drop-id]").attr("data-drop-id")
    $(`.dropmenu[data-drop-id=${id}]`).removeClass("dropmenu_active")
})

$(window).scroll(function(event){

    var st = $(this).scrollTop();
    if (st > 100){
        $(".header").addClass("header_scrolled")
    } else {
        $(".header").removeClass("header_scrolled")
    }

});