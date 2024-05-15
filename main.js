//Javascript Vanilla
// document.addEventListener('DOMContentLoaded', function(){
//     documentElement.getElementbyId('btn-buscar-cep').addEventListener('click', function(){
//         //AJAX - Async Javascript and XML, faz comunicação entre front e back sem recarregar as páginas
//         const xhttp = new XMLHttpRequest();
//         const cep = document.getElementById('cep').value;
//         const endpoint = `https://viacep.com.br/ws/${cep}/json`;

//         xhttp.open('GET', endpoint);
//         xhttp.send();
//     })
// })

//Escrevendo com jquery
$(document).ready(function(){
    //Como criar mascára em JS vanilla?
    $('#cep').mask('00000-000')

    $('#btn-buscar-cep').click(function(){
        const cep = $('#cep').val();
        const endpoint = `https://viacep.com.br/ws/${cep}/json`;
        const botao = $(this)

        $(botao).find('i').addClass('d-none')
        $(botao).find('span').removeClass('d-none')

        // $.ajax(endpoint).done(function(resposta){
        //     // console.log(resposta)
        //     const logradouro = resposta.logradouro;
        //     const bairro = resposta.bairro;
        //     const cidade = resposta.localidade;
        //     const estado = resposta.uf;
        //     const endereco = `${logradouro}, ${bairro} - ${cidade} - ${estado}`;
        //     $('#endereco').val(endereco)

        //     setTimeout(function(){
        //         $(botao).find('i').removeClass('d-none')
        //         $(botao).find('span').addClass('d-none')
        //     }, 4000)

        // })

        fetch(endpoint)
        .then(function(resposta){
            return resposta.json()
        })
        .then(function(json){
            const logradouro = json.logradouro;
            const bairro = json.bairro;
            const cidade = json.localidade;
            const estado = json.uf;
            const endereco = `${logradouro}, ${bairro} - ${cidade} - ${estado}`;
            $('#endereco').val(endereco);
        
        setTimeout(function(){
            $(botao).find('i').removeClass('d-none');
            $(botao).find('span').addClass('d-none');
        }, 1000);
        })

        .catch(function(erro){
            alert("Ocorreu um erro ao buscar o endereço. Tente novamente mais tarde")
        })
        .finally(function(){
            setTimeout(function(){
                $(botao).find('i').removeClass('d-none');
                $(botao).find('span').addClass('d-none');
            }, 1000);
        })
    })

    $('#formulario-pedido').submit(function(evento){
        evento.preventDefault();    

        if($('#nome').val().lenght == 0){
            throw new Error('Digite o nome');
        }
    })
})