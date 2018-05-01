ct_init();  // визиваем функцию О_о

function ct_init() {

    //config
    mconf = {
        "enable" : true,
        "opened" : true
    };
    opt = { //options
        "opacity" : true,
        "boxShadow" : true
    };

    //main block name
    mbName = 'ct_main';

    $(document).on("click", (e) => {

        console.log(getComputedStyle(e.target).boxShadow);
        sixPropParse(getComputedStyle(e.target).boxShadow);


        // вот эта функция должна менять левел селектора, как минимум повышать его.
        cl_gHtml('cl_level-control', 'div', '<i>top_arrow</i>', {"position" : "absolute"}, {}, document.body).on("click", () => {
            console.log($(e.target).parent());
        });

        // если клик по нашим элементам то не запускать функцию генерации элементов
        if ($(e.target).closest('#'+mbName).length) return;
        if ( mconf.enable ) {
            ct_highlight(e.target); //пишем функцию которая по клику на елемент будет подсвечивать его
            cl_gElemControl(e);
        }
    })


    function cl_gElemControl(e) {
        mconf.opened = true;
        cl_gHtml(mbName, 'div', '', {"position" : "absolute", "left" : e.pageX, "top" : e.pageY, "width" : "300px"}, {"value":"123"}, document.body)

        if (opt.opacity) {

            // генерируем обёртку
            cl_gHtml('cl_block-opacity', 'div', '', {"position" : "relative"}, {}, $("#" + mbName));

            // генерируем тайтл
            cl_gHtml('', 'div', 'opacity', {}, {}, $("#cl_block-opacity"));

            // генерируем текстовый инпут
            cl_gHtml('', 'input', '', {}, {
                "type" : "text",
                "value" : getComputedStyle(e.target).opacity
            }, $("#cl_block-opacity")).on("input change", this, (event) => {
                $(e.target).css('opacity', event.target.value);
            })

            // генерируем ползунок
            cl_gHtml('', 'input', '', {}, {
                "type" : "range",
                "min" : "0",
                "max" : "1",
                "step" : "0.01",
                "value" : getComputedStyle(e.target).opacity
            }, $("#cl_block-opacity")).on("input change", this, (event) => {
                $(e.target).css('opacity', event.target.value);
                $("#cl_block-opacity").children().attr("value", event.target.value);
            })
        }

        if (opt.boxShadow) {
            // console.log("boxShadow")
            // генерируем главный блок расположения всех элементов свойства на примере box-boxShadow
            // div cl_box-shadow
            // далее идёт обёртка для отдельного элемента свойства, например box-sdadow-width
            //     div cl_box-shadow--width
            //         div title
            //         div input
            //         div input
            //


            nameDiv = "cl_block-boxShadow";
            // генерируем главную обёртку
            cl_gHtml(nameDiv, 'div', 'Box Shadow', {"position" : "relative"}, {}, $("#" + mbName));

            ///////////////
            ///for section
            // =====================
           for (i = 0 ; i < parsedShadow.param.length; i++) {
               console.log("one?" + i);
               nameDivOption = 'cl_block-boxShadow--' + i;
               // генерируем обёртку для свойств свойств)))
               cl_gHtml(nameDivOption, 'div', '', {"position" : "relative"}, {}, $("#" + nameDiv));

               // генерируем тайтл
               cl_gHtml('', 'div', i, {}, {}, $("#" + nameDivOption));

               // генерируем текстовый инпут
               cl_gHtml('', 'input', '', {}, {
                   "type" : "text",
                   "value" : parsedShadow.param[i]
               }, $("#" + nameDivOption)).on("input change", this, (event) => {
                   //$(e.target).css('opacity', event.target.value);
                   // тут пока ничего так как хз куда и шо вешать хД)
               })

               // генерируем ползунок
               cl_gHtml('', 'input', '', {}, {
                   "type" : "range",
                   "min" : "-200",
                   "max" : "200",
                   "step" : "1",
                   "value" : parsedShadow.param[i].replace(/\D+/g, "")
               }, $("#" + nameDivOption)).on("input change", this, (event) => {
                   // $(e.target).css('opacity', event.target.value);
                   // $("#cl_block-opacity").children().attr("value", event.target.value);
               })
           }
            ///////////////
            ///end for section
            // =====================

        }

    }

    function ct_highlight(e) { // функция подсветки элемента с которым осуществляется работа
        $('#' + mbName).remove();
        $('[clicktune-active-element]').removeAttr('clicktune-active-element').css('border', 'none');
        $(e).css('border','1px solid black').attr('clicktune-active-element', '');
    }

    function cl_gHtml(id, tag, html, css, attr, target) { //функция генерации Html элементов
        return $(document.createElement(tag))
            .attr('id', id)
            .html(html)
            .css(css)
            .attr(attr)
            .appendTo(target)
    }

    function sixPropParse(str) {
      //parser for box-shadow 6 properties
        // shift w
        // shift y
        // blur
        // scale
        // inset outset
        // color
        parsedShadow = {
            "param" :
                [],
            // {
            //     "xshift" : "",
            //     "yshift" : "",
            //     "blur" : "",
            //     "scale" : "",
            // },
            "inset" : false,
            "color" : {}
        };

        str = str.replace(/,\s|\s,/ig, ",");
        box_array = str.split(" ");

        for (i = 0; i < box_array.length; i++) {

            if(/inset/.test(box_array[i])) {
                parsedShadow.inset = true;
            }
            else if(/(\d)(px|rem|pr)/.test(box_array[i])) {
                // console.log('this elem is a variable');
                parsedShadow.param.push(box_array[i])
            }
            else if(/rgb/.test(box_array[i])) {
                parsedShadow.color.origin = box_array[i];
                parsedShadow.color.type = 'rgb';
                str = box_array[i].replace(/(rgba|rgb)\((.*)(?:\))/, '$2');
                // console.log(str);
                gg = str.split(",");
                // console.log(gg.length)

                parsedShadow.color.r = gg[0];
                parsedShadow.color.g = gg[1];
                parsedShadow.color.b = gg[2];

                // if (gg.length == 4 ) {
                parsedShadow.color.o = gg[3] || "1";
                // }
            }

        }
        console.log(parsedShadow)
        return parsedShadow;
    }




    /// end of block init_ct
}



