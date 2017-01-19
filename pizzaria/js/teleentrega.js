/**
O valor de entrega de até 3 pizzas são os valores abaixo, para cada pizza adicionada o valor acresce em 5%.
4 -> 5%
5 -> 10%
...
12 -> 45%
*/
valCei = 5.50;
valTag = 4.80;
valSam = 6.40;
valRec = 7.10;
valAgu = 5.90;
valVic = 7.30;
valGua = 9.25;
$(document).ready(function () {
    //Evento de mudança do campo select
    $('#qtd').on('change', function () {
        var valSelecionado = $(this).val();
        $('#qtdSel').html($(this).val());
        if (valSelecionado > 3) {
            var qtdPizza = parseInt(valSelecionado - 3);
            var percentual = parseInt(qtdPizza * 5);
            var valFrete = parseFloat($('#valorFreteReg').val());
            var totalFrete = parseFloat(((valFrete / 100) * percentual) + valFrete);
            $('#valor').html(totalFrete.toFixed(2));
        } else {
            $('#valor').html($('#valorFreteReg').val());
        }
    });

    function primeiraLetraMaiuscula(teste) {
        return teste.charAt(0).toUpperCase() + teste.slice(1);
    };

    //Todas as ações em um evento apenas (sem criar para cada botão)
    $('#jEntrega .btn').on('click', function () {

        var id = primeiraLetraMaiuscula($(this).attr('id')); //novo Tag 
        var evalId = 'val' + id + '.toFixed(2)'; //novo valTag.toFixed(2)
        $('#qtd').val(1).trigger('change');
        var nomeRegiao = $(this).html();
        $('#formEntrega').show('slow');
        $('#regiao').html(nomeRegiao);
        $('#valor').html(eval(evalId)); //mudou
        $('#valorFreteReg').val(eval(evalId)); //mudou
    });

});