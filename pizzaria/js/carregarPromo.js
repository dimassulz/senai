//Identificando o arquivo html para a leitura do jQuery (iniciando o jQuery)
$(document).ready(function () {
    var $doc = $('html, body');
    // monta o evento dos botões das pizzas com rolagem suave para o 
    // link ancorado
    $('#jCardapio button').on('click', function () {
        $doc.animate({
            scrollTop: $($.attr(this, 'link')).offset().top
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
        url: "json/promo.json",
        //tipo de envio (GET ou POST)
        type: "get",
        //tipo de retorno do AJAX no caso JSON
        dataType: "json",
        //O que mostrar enquanto carrega a informação AJAX (pode ser um carregando)
        beforeSend: function () {},
        //mostra o resultado da consulta no arquivo pizza.json
        success: function (promo) {
            //dentro do arquivo pizza.json existe um array (representado por []) que //contem 3 objetos ("especial, "tradicional", "doce") 
            //que armazenamos nas variáveis abaixo:
            var aniversariante = promo.aniversariante;
            var happyhour = promo.happyhour;

            //$('#especiais') representa o ID da div que será preenchida com o html //retornado na função montarHtmlPizza()
            //a função montarHtmlPizza espera um parametro que será uma das variaveis //acima no caso (especial, tradicional ou doce)
            $('#niver').html(montarHtmlPromo(aniversariante));
            $('#happy').html(montarHtmlPromo(happyhour));
            eventoClickImprimir();

        },
        //função error responsável por mostrar os erros caso o AJAX não consiga trazer //as informações do arquivo pizza.json
        error: function () {
            alert('Ocorreu um erro ao carregar as pizzas');
        }
    });

    //função responsavel por retornar o HTML do bloco de cada pizza.
    //ela espera receber um objeto pizza
    montarHtmlPromo = function (objPromo) {
        //html do bloco de cada pizza vazio
        var htmlRowPromo = '';
        //função para fazer uma iteração nos resultados das pizzas. Ex. no array //especial tem 2 pizzas essa função vai rodar 2 vezes um para mostrar a //primeira pizza e outra para mostrar a segunda caixa das pizzas.
        $.each(objPromo, function (num, promo) {
            //monta o html padrão de cada pizza
            var htmlModeloPromo = '<div class="row"><div class="col-lg-4">' + '<div class="thumbnail">' + '<img class="img-responsive" src="' + promo.urlimg + '" alt="imgpromo' + num + '" />' + '</div></div>' + '<div class="col-lg-8">' + '<h1>' + promo.nome + '</h1>' + '<p>' + promo.descricao + '</p>' + '<div class="text-right">' + '<button class="btn btn-lg btn-info cupom">' + '<span class="glyphicon glyphicon-print"></span> ' + 'Imprimir' + '</button>' + '</div>' + '</div></div>'

            //cada vez que passar na iteração o modelo será concatenado com o outro.
            //aqui junta os modelos html para ficarem lado a lado.
            //o sinal de + significa concatenar
            htmlRowPromo += htmlModeloPromo;

        });
        //retorna o html pronto contendo todas as pizzas
        return htmlRowPromo;
    };

    eventoClickImprimir = function () {
        bootbox.setLocale('pt'); //traduzir para portugues
        $('.cupom').on('click', function () { //adicionando evento de click ao botao imprimir utilizando a classe cupom.
            var nomePromo = $(this).parent().parent().find('h1').html();
            bootbox.prompt("Digite seu cpf para validar: " + nomePromo,
                function (clickOK) {
                    if (clickOK === null) {
                        bootbox.hideAll();
                    }else{
                        bootbox.alert('Seu CPF foi validado com sucesso!', function () {
                            window.print();
                        });
                    }

                });
        });
    };

});