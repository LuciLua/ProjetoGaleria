import $ from 'jquery'

// Array de funcoes que seja chamado sempre que eu carregar um hmtl de forma bem sucedida 
const loadHtmlSuccessCallbacks = []

export function onLoadHtmlSuccess(callback){
    if(!loadHtmlSuccessCallbacks.includes(callback)){
        loadHtmlSuccessCallbacks.push(callback)
    }
}

function loadIncludes(parent){
     if(!parent) parent = 'body'
     $(parent).find('[wm-include]').each(function(i, e){
         const url = $(e).attr('wm-include')
         $.ajax({
             url, success(data){
                 $(e).html(data)
                 $(e).removeAttr('wm-include') // evitar ser processada por uma segunda vez

                 loadHtmlSuccessCallbacks.forEach(callback => callback(data))
                 loadIncludes(e)
             }
         })
     })
}


loadIncludes()