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
            eventoClickComprar();
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
                        +'<button class="btn btn-lg btn-danger comprar">'
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
    
    eventoClickComprar = function () {
        bootbox.setLocale('pt'); //traduzir para portugues
        $('.comprar').on('click', function () { //adicionando evento de click ao botao imprimir utilizando a classe cupom.
            var nomePizza = $(this).parent().parent().find('h2').html();
            var formBordas = '<div class="form-group"> <label class="col-md-12 control-label" for="bordas"></label> <div class="col-md-12"> <label class="radio-inline" for="bordas-0"> <input type="radio" name="bordas" id="bordas-0" value="0" checked="checked"> Sem Borda </label> <label class="radio-inline" for="bordas-1"> <input type="radio" name="bordas" id="bordas-1" value="1"> Cheddar </label> <label class="radio-inline" for="bordas-2"> <input type="radio" name="bordas" id="bordas-2" value="2"> Requeijão </label> <label class="radio-inline" for="bordas-3"> <input type="radio" name="bordas" id="bordas-3" value="3"> Chocolate </label> <label class="radio-inline" for="bordas-4"> <input type="radio" name="bordas" id="bordas-4" value="4"> Doce de Leite </label> </div></div>';
            var formTamanho = '<div class="form-group"> <label class="col-md-12 control-label" for="tamanho"></label> <div class="col-md-12"> <label class="radio-inline" for="tamanho-0"> <input type="radio" name="tamanho" id="tamanho-0" value="0" checked="checked"> Pequena </label> <label class="radio-inline" for="tamanho-1"> <input type="radio" name="tamanho" id="tamanho-1" value="1"> Média </label> <label class="radio-inline" for="tamanho-2"> <input type="radio" name="tamanho" id="tamanho-2" value="2"> Grande </label> </div></div>';
            var formAcomp = '<div class="form-group"> <label class="col-md-12 control-label" for="acompanhamentos"></label> <div class="col-md-12"> <label class="checkbox-inline" for="acompanhamentos-0"> <input type="checkbox" name="acompanhamentos" id="acompanhamentos-0" value="0"> Azeitona </label> <label class="checkbox-inline" for="acompanhamentos-1"> <input type="checkbox" name="acompanhamentos" id="acompanhamentos-1" value="1"> Manjericão </label> <label class="checkbox-inline" for="acompanhamentos-2"> <input type="checkbox" name="acompanhamentos" id="acompanhamentos-2" value="2"> Pepperoni </label> <label class="checkbox-inline" for="acompanhamentos-3"> <input type="checkbox" name="acompanhamentos" id="acompanhamentos-3" value="3"> Presunto </label> <label class="checkbox-inline" for="acompanhamentos-4"> <input type="checkbox" name="acompanhamentos" id="acompanhamentos-4" value="4"> Tomate Seco </label> </div></div>';
            var formQtd = '<div class="form-group"> <label class="col-md-12 control-label" for="quantidade"></label> <div class="col-md-12"> <select id="quantidade" name="quantidade" class="form-control"> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option> <option value="9">9</option> <option value="10">10</option> </select> </div></div>';
            var message = '<h2>Escolha sua borda</h2>'
                        +formBordas
                        + '<h2>Escolha o tamanho</h2>'
                        +formTamanho
                        + '<h2>Adicionar acompanhamentos</h2>'
                        +formAcomp
                        + '<h2>Quantidade</h2>'
                        +formQtd;
                        

            bootbox.dialog({
                            title: "Personalize sua pizza sabor "+nomePizza, 
                            size: "large",
                            buttons: {
                                "Comprar" : {
                                    label: "Comprar",
                                    className: "btn-success",
                                    callback:function(){
                                    }
                                }
                            },
                            message: message
                          });
        });
    };
    
});