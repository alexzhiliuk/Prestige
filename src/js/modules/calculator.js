
try {
    function addSpaces(nStr) {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ' ' + '$2');
        }
        return x1 + x2;
    }
    
    $(".calculator__type").click(function() {
        if ($(this).hasClass("calculator__type_active")) { return }
        
        let calculatorTab = $(this).attr("data-calculator-tab")
    
        $(".calculator__type").removeClass("calculator__type_active")
        $(this).addClass("calculator__type_active")
    
        $(".calculator__tab").hide()
        $(`.calculator__tab[data-calculator-tab=${calculatorTab}]`).show()
        
        $(".calculator__services").hide()
        $(`.calculator__services[data-calculator-tab=${calculatorTab}]`).show()
    })
    
    $(".calculator__period").each(function(i, el) {
        let discount = $(el).attr("data-discount") 
        if (discount > 0) {
            $(el).append(`<br>${discount}% скидка`)
        }
    })
    
    function addRemoveConfigurationEvent() {
        $(".calculator__remove-configuration").click(function() {
            let name = $(this).parents(".calculator__configuration").attr("data-name"),
                calculatorTab = $(this).parents("[data-calculator-tab]").attr('data-calculator-tab')
    
            $(this).parents(".calculator__configuration").remove()
            let input = $(`.configurations[data-calculator-tab=${calculatorTab}] input[name=${name}]`)[0]
            if (input) {
                input.checked = false
            }
            
            identifyPackage()
            calculations()
        })
    }
    addRemoveConfigurationEvent()
    
    $(".toggle").click(function() {
        $(this).toggleClass("toggle_active")
        let input = $(this).find("input[type='radio']")[0]
        
        input.checked ? input.checked = false : input.checked = true   
    
    })
    
    $(".js-toggle").click(function() {
    
        let input = $(this).find("input[type='radio']")[0]
        
        if (input.checked) {
            $(`[data-toggle-object=${$(this).attr("data-toggle")}]`).show()
        } else {
            $(`[data-toggle-object=${$(this).attr("data-toggle")}]`).hide()
        }
    
        calculations()
    })
    
    $(".calculator__period").click(function() {
        if ($(this).hasClass("calculator__period_active")) { return }
    
        $(".calculator__period").removeClass("calculator__period_active")
        $(this).addClass("calculator__period_active")
    
        calculations()
    })
    
    $(".configurations__search input").on("input", function() {
        $(".configurations__configuration").show()
        let query = $(this).val()
        if (!query) {
            return
        }
        
        $(".configurations__configuration").each(function(i, el) {
            let title = $(el).find("span").text().toLowerCase()
            if (!title.includes(query.toLowerCase())) {
                $(el).hide()
            }
        })
    
    })
    
    
    // Open & Close
    $(".js-open-configurations").click(function() {
        let calculatorTab = $(this).parents("[data-calculator-tab]").attr("data-calculator-tab")
        $(`.configurations[data-calculator-tab=${calculatorTab}]`).show()
        $("body, html").addClass("lock")
    })
    $(".js-configurations-close").click(function() {
        $(this).parents(".configurations").hide()
        $("body, html").removeClass("lock")
    })
    
    $(".js-packages-open").click(function() {
        let calculatorTab = $(this).parents("[data-calculator-tab]").attr("data-calculator-tab")
        $(`.packages[data-calculator-tab=${calculatorTab}]`).show()
        $("body, html").addClass("lock")
    })
    $(".js-packages-close").click(function() {
        $(this).parents(".packages").hide()
        $("body, html").removeClass("lock")
    })
    
    // Configurations
    function identifyPackage() {
        $(".configurations").each(function(index, elem) {
            let packageId = 1
            let calculatorTab = $(elem).attr("data-calculator-tab")
    
            $(elem).find(".configurations__configuration").each(function(i, el) {
                let input = $(el).find("input[type='checkbox']")[0],
                    title = $(el).find("span"),
                    currentPackage = Number($(el).attr("data-package")) 
    
                if (input.checked) {
                    currentPackage > packageId ? packageId = currentPackage : null
                }
            })
    
            $(`.packages[data-calculator-tab=${calculatorTab}] .packages__item`).removeClass("packages__item_active").removeClass("packages__item_selected")
            $(`.packages[data-calculator-tab=${calculatorTab}] .packages__item[data-package-id=${packageId}]`).addClass("packages__item_active").addClass("packages__item_selected")
            $(`.packages[data-calculator-tab=${calculatorTab}] .packages__configurations`).hide()
            $(`.packages[data-calculator-tab=${calculatorTab}] .packages__configurations[data-package-id=${packageId}]`).show()
        })
    }
    function showConfigurations() {
        $(".configurations").each(function(index, elem) {
            let calculatorTab = $(elem).attr("data-calculator-tab")
            let checkedInputs = []
            $(elem).find(".configurations__configuration").each(function(i, el) {
                let input = $(el).find("input[type='checkbox']")[0],
                    title = $(el).find("span")
    
                if (input.checked) {
                    checkedInputs.push([$(input).attr("name"), title.text()])
                }
            })
    
            $(`.calculator__tab[data-calculator-tab=${calculatorTab}] .calculator__configuration`).remove()
    
            for (let configuration of checkedInputs) {
                $(`.calculator__tab[data-calculator-tab=${calculatorTab}] .calculator__configurations`).append(
                    `
                    <div class="calculator__configuration" data-name='${configuration[0]}'>
                        ${configuration[1]}
                        <svg class="calculator__remove-configuration" width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4351 1.4644L9.02089 0.0501823L5.48535 3.58572L1.94982 0.0501819L0.535604 1.4644L4.07114 4.99993L0.535604 8.53546L1.94982 9.94968L5.48535 6.41414L9.02089 9.94968L10.4351 8.53546L6.89957 4.99993L10.4351 1.4644Z" fill="#BFC5CA"></path>
                        </svg>                                    
                    </div>
                    `
                )
            }
            addRemoveConfigurationEvent()
            identifyPackage()
        })
    }
    
    $(".js-select-configurations").click(function() {
        showConfigurations()
        calculations()
    })
    showConfigurations()
    
    $(".packages__item").click(function() {
        if ($(this).hasClass("packages__item_selected")) { return }
        
        let packageid = $(this).attr("data-package-id"),
            parent = $(this).parents(".packages")
    
        parent.find(".packages__item").removeClass("packages__item_selected")
        $(this).addClass("packages__item_selected")
    
        parent.find(".packages__configurations").hide()
        parent.find(`.packages__configurations[data-package-id=${packageid}]`).show()
    })
    
    function calculations() {
        $(".calculator__configurations .hint").remove()
        $('.calculator__price .default').remove()
        $(".calculator__tab").each(function(i, el) {
            if ($(el).find(".calculator__configurations .calculator__configuration").length == 0) {
                $(el).find(".calculator__configurations").append("<span class='hint'>Выберите минимум 1 конфигурацию</span>")
            }
        })
    
        // Аренда 1С
        let packagePrice = Number($(`.packages[data-calculator-tab=1] .packages__item_active`).attr("data-package-price")),
            sessionsCount = Number($("#sessionsCount").val()),
            remoteDesktop = $("#remoteDesktop")[0].checked,
            desktopPrice = Number($("#remoteDesktop").attr('data-price')),
            desktopCount = Number($("#desktopCount").val())
    
        
        packagePrice *= sessionsCount
        if (remoteDesktop) {
            packagePrice += desktopCount * desktopPrice 
        }
    
        let discount = Number($(".calculator__period_active").attr("data-discount"))
        if (discount) {
            $('.calculator__price .with-discount').before(`<span class='default'>${packagePrice}</span>`)
            packagePrice = packagePrice - packagePrice * discount / 100
        }
        $('.calculator__price .with-discount').html(` ${addSpaces(packagePrice)}`)
    
    
    }
    calculations()
    
    $(".calculator .counter__input").on("input", function() {
        calculations()
    })
    
    $(".calculator .counter__minus").on("click", function() {
        calculations()
    })
    
    $(".calculator .counter__plus").on("click", function() {
        calculations()
    })
    
} catch {
    
}
