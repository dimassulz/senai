$(document).ready(function(){    
    /*
    * Selecionando todos elementos <a> da barra de navegação
    * e ouvindo o evento de click.
    */
    $('.nav-justified a').on('click', function(){
        //remove o sombremento de todos
        $('.nav-justified li').removeAttr('class');
        //adiciona o sombreamento somente do link ativo
        $(this).parent().attr('class', 'active');
        
        /* selecionando o atributo href da tag <a> onde 
        * o atributo tem o nome com o simbolo # no inicio do nome
        * removemos o # para vazio '' e concatenamos o '.html'
        * Ex.: o href com o nome #sobre fica: sobre.html
        * e é armazenado na variável nomePag
        */
        var nomePag = $(this).attr('href').replace('#','')+'.html'; 
        /*A função carregaPagina e chamada so para carregar as paginas
        * conforme forem clicados em seus respectivos links
        * Ex.: carregaPagina('sobre.html');
        * Essa função AJAX retorna a pagina html do exemplo a pag sobre
        */
        carregaPagina(nomePag);                
    });
    /*
    * Essa função AJAX retorna o arquivo html da pasta paginas
    */
    function carregaPagina(nomePagina){
        $.ajax({
           //url: qual arquivo será chamado
           url: nomePagina,
           //type: tipo de requisição (GET ou POST)
           type: 'GET',
           //dataType: tipo de retorno (html, json, text, xml)
           dataType: 'html',
           //beforeSend: função que é executada antes da requisição
           beforeSend: function(){
               $('#conteudo').html('<img src="img/load.gif" />');
           },
           //success: função que retorna a resposta positiva (a página)
           success:function(resposta){
               $('#conteudo').html(resposta);
           },
           //error: caso ocorra um erro retorna a mensagem da função
           error: function(respostaError){
               alert('Ocorreu um erro ao carregar a página');
           }
        });
    }
//gatilho disparado para quando entrar no site carregar a página inicial
    $('#start').trigger('click');
});