
// Храненние базовых настроек
clicktune = {
    enable: true, // вкл выкл
    opened: false, // Открыт закрыт
    options: { // опции выбранные здесь будут доступны для редактирования через библиотеку
        opacity: true,
        'box-shadow': true,
        'text-shadow': true
    }
};

//// Генерируем главный интерфейс. вкл/выкл + опции.

clGenHtml('div', 'cl_container', '', 'cl_container', 'body').style.cssText = "position: absolute; right: 100px; z-index: 2";
(clicktune.enable) ? clGenHtml('button', 'cl_ind-enable', 'Включен', 'cl_ind-enable', 'cl_container').style.cssText = "background-color: rgba(0, 255, 0, 0.5)" : clGenHtml('button', 'cl_ind-enable', 'Выключен', 'cl_ind-enable', 'cl_container').style.cssText = "background-color: rgba(255, 0, 0, 0.5)";
//clGenHtml('button', 'cl_ind-enable', 'Включен', 'cl_ind-enable', 'cl_container').style.cssText = "background-color: rgba(0, 255, 0, 0.5)";
clGenHtml('button', 'cl_btn-opt', 'настройки', 'cl_btn-opt', 'cl_container');
clGenHtml('div', 'cl_options', '', 'cl_options', 'cl_container').style.display = 'none';
clGenHtml('label', '', 'opacity', 'cl_label-opa', 'cl_options');
clGenInputSimple('checkbox', clicktune.options.opacity, 'cl_opt-opacity', 'cl_label-opa');
clGenHtml('label', '', 'box-shadow', 'cl_label-bs', 'cl_options');
clGenInputSimple('checkbox', clicktune.options['box-shadow'], 'cl_opt-bs', 'cl_label-bs');
clGenHtml('label', '', 'text-shadow', 'cl_label-ts', 'cl_options');
clGenInputSimple('checkbox', clicktune.options['text-shadow'], 'cl_opt-ts', 'cl_label-ts');

// события

// >>меняем статус приложения при клике на кнопку вкл выкл
document.getElementById("cl_ind-enable").addEventListener("click", function(){
    (clicktune.enable) ? clicktune.enable = false : clicktune.enable = true;
    console.log("clicktune status: " + clicktune.enable);
    if (clicktune.enable) {
        clVar8 = document.getElementById("cl_ind-enable");
        clVar8.innerHTML = "Включен";
        clVar8.style.backgroundColor= "rgba(0, 255, 0, 0.5)";
    }
    else
    {
        clVar8 = document.getElementById("cl_ind-enable");
        clVar8.innerHTML = "Выключен";
        clVar8.style.backgroundColor= "rgba(255, 0, 0, 0.5)";
    }
});
// ==меняем статус приложения при клике на кнопку вкл выкл

// обработчик на открытие закрытие меню опций
document.getElementById("cl_btn-opt").addEventListener("click", function(){
    (document.getElementById("cl_options").style.display == "none") ? document.getElementById("cl_options").style.display = "block" : document.getElementById("cl_options").style.display = "none";
});

// группа обработчик выбора опций.
document.getElementById("cl_label-opa").addEventListener("click", function(){
    (clicktune.options.opacity) ? clicktune.options.opacity = false : clicktune.options.opacity = true;
    console.log("opacity status: " + clicktune.options.opacity);
});
document.getElementById("cl_label-bs").addEventListener("click", function(){
    (clicktune.options['box-shadow']) ? clicktune.options['box-shadow'] = false : clicktune.options['box-shadow'] = true;
    console.log("box-shadow status: " + clicktune.options['box-shadow']);
});
document.getElementById("cl_label-ts").addEventListener("click", function(){
    (clicktune.options['text-shadow']) ? clicktune.options['text-shadow'] = false : clicktune.options['text-shadow'] = true;
    console.log("text-shadow status: " + clicktune.options['text-shadow']);
});




// функция генерации html Блоков
// tag - тэг. classed - класс. content - содержание блока. id = ид.
// target - Блок в который будет добавлен элемент.

function clGenHtml(tag, classed, content, id, target){
    var div = document.createElement(tag);
    div.className = classed;
    div.innerHTML = content;
    div.id = id;
    if (target == 'body') {
        return document.body.appendChild(div);
    }
    target = document.getElementById(target);
    return target.appendChild(div);
};


// функция генерации инпута
function clGenInputSimple(type, chek_status, id, target) {
    var div = document.createElement("input");
    div.id = id;
    div.setAttribute('type', type);
    if (chek_status) {
        div.setAttribute('checked','checked');
    }
    target = document.getElementById(target);
    return target.appendChild(div);
};