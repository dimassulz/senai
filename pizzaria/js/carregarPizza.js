//Identificando o arquivo html para a leitura do jQuery (iniciando o jQuery)
$(document).ready(function(){   
    var $doc = $('html, body');
    // monta o evento dos botões das pizzas com rolagem suave para o 
    // link ancorado
    $('#jCardapio button').on('click', function(){
        $doc.animate({
            scrollTop:$($.attr(this, 'link')).offset().top
        }, 750);
        return false;
    });
    
    //Efeito para fazer a seta sumir/aparecer quando rolar a tela para baixo
    $(window).scroll(function () {
        //se a rolagem for superior a 50px (mostrar ou sumir com a seta)
        if ($(this).scrollTop() > 50) {
            //aparecer
            $('#back-to-top').fadeIn();
        } else {
            //sumir
            $('#back-to-top').fadeOut();
        }
    });
    
    //quando clicar na seta (para subir a tela)
    $('#back-to-top').click(function () {
        //sumir a seta
        $('#back-to-top').tooltip('hide');
        //montar o efeito em 0,8 segundos (a subida da tela)
        $('body,html').animate({
            //posição 0 da tela
            scrollTop: 0
        }, 800);
        return false;
    });
    
    //para sempre mostrar a seta ativa
    $('#back-to-top').tooltip('show');



    //função $.ajax do jQuery que faz a comunicação com o arquivo pizza.json
    //AJAX = Asynchronous JavaScript e XML | O AJAX envia ou recebe informações em
    //diversos formatos de dados (JSON, XML, HTML e TXT), trabalhando com métodos de
    //envio "get" ou "post". 
    //GET = Envio de informações pela URL.
    //POST = Envio de informações sigilosas.
    $.ajax({
        //selecionando o arquivo de onde será carregado o JSON
        url: "json/pizzas.json",
        //tipo de envio (GET ou POST)
        type: "get",
        //tipo de retorno do AJAX no caso JSON
        dataType: "json",
        //O que mostrar enquanto carrega a informação AJAX (pode ser um carregando)
        beforeSend: function(){},
        //mostra o resultado da consulta no arquivo pizza.json
        success: function(pizza){
            //dentro do arquivo pizza.json existe um array (representado por []) que //contem 3 objetos ("especial, "tradicional", "doce") 
            //que armazenamos nas variáveis abaixo:
            var especial = pizza.especial;
            var tradicional = pizza.tradicional;
            var doce = pizza.doce;
            var exotica = pizza.exotica;
            //$('#especiais') representa o ID da div que será preenchida com o html //retornado na função montarHtmlPizza()
            //a função montarHtmlPizza espera um parametro que será uma das variaveis //acima no caso (especial, tradicional ou doce)
            $('#especiais').html(montarHtmlPizza(especial));
            $('#tradicionais').html(montarHtmlPizza(tradicional));
            $('#doces').html(montarHtmlPizza(doce));
            $('#exoticas').html(montarHtmlPizza(exotica));
        },
        //função error responsável por mostrar os erros caso o AJAX não consiga trazer //as informações do arquivo pizza.json
        error: function(){
            alert('Ocorreu um erro ao carregar as pizzas');
        }
    });
    
    //função responsavel por retornar o HTML do bloco de cada pizza.
    //ela espera receber um objeto pizza
    montarHtmlPizza = function(objPizza){ 
        //html do bloco de cada pizza vazio
        var htmlRowPizza = '';
        //função para fazer uma iteração nos resultados das pizzas. Ex. no array //especial tem 2 pizzas essa função vai rodar 2 vezes um para mostrar a //primeira pizza e outra para mostrar a segunda caixa das pizzas.
        $.each(objPizza, function(num, pizza){
            //monta o html padrão de cada pizza
            var htmlModeloPizza = '<div class="col-lg-4">'
            +'<div class="thumbnail">'
                +'<img class="img-responsive" src="'+pizza.urlimg+'" alt="img1" />'
                +'<div class="caption">'
                    +'<h2>'+pizza.nome+'</h2>'
                    +'<p>'+pizza.ingredientes+'</p>'
                    +'<h1 class="text-right">R$ '+pizza.preco+'</h1>'
                    +'<div class="text-right">'
                        +'<button class="btn btn-lg btn-danger">'
                            +'<span class="glyphicon glyphicon-shopping-cart"></span>'
                            +'Comprar'
                        +'</button>'
                    +'</div>'
                +'</div>'
            +'</div>'
        +'</div>';
          //cada vez que passar na iteração o modelo será concatenado com o outro.
          //aqui junta os modelos html para ficarem lado a lado.
          //o sinal de + significa concatenar
          htmlRowPizza += htmlModeloPizza;
            
        });
        //retorna o html pronto contendo todas as pizzas
        return htmlRowPizza;
    };
    
});