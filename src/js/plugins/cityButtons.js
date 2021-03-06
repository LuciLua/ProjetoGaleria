import $ from 'jquery'

import { onLoadHtmlSuccess } from '../core/includes'

const duration = 600

function filterByCity(city) {
    $('[wm-type]').each(function (i, e) {
        const isTarget = $(this).attr('wm-type') === city
            || city === null
        if (isTarget) {
            $(this).parent().removeClass('d-none')
            $(this).fadeIn(duration)
        } else {
            $(this).fadeOut(duration, () => {
                $(this).parent().addClass('d-none')
            })
        }
    })
}

$.fn.cityButtons = function () {
    const cities = new Set // set nao tem repeticao

    $('[wm-type]').each((i, e) => {
        cities.add($(e).attr('wm-type'))
    })

    const btns = Array.from(cities).map(city => {
        const btn = $('<button>')
            .addClass(['btn', 'btn-info', 'rounded-0']).html(city)

        btn.click(e => filterByCity(city))
        return btn
    })

    const btnAll = $('<button>')
        .addClass(['btn', 'btn-info', 'active', 'rounded-0']).html('Todas')
    btnAll.click(e => filterByCity(null))
    btns.push(btnAll)

    const btnGroup = $('<div>').addClass(['btn-group', 'd-flex', 'flex-wrap'])
    btnGroup.append(btns)

    $(this).html(btnGroup)
    return this
}

onLoadHtmlSuccess(() => {
    $('[wm-city-buttons]').cityButtons()
})

