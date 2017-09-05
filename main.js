function toRadians(ang) {
    return ang / 180.0 * 3.14159265358979323846;
}

function desenharEstados() {
    var i = 2;
    var qtd_estados = $('#qtd_estado').val();
    var estadoI = $('#estadoI').val();
    var raio = 180;
    var centroX = $(window).width() / 2;
    var centroY = $(window).height() / 2;
    var finais = $('#estadoF').val().split(',');
    var alfabetoM = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    while (qtd_estados > 1){
        $("#desenhos").append("<canvas class='icon' iid='icon"+i+"'  id='icon"+(i++)+"' width='50' height='50'></canvas>");
        qtd_estados--;
    }

    i = 1;
    qtd_estados = $('#qtd_estado').val();
    $('.icon').each(function() {
        var cosseno = Math.cos(toRadians(360 * i / qtd_estados));
        var seno = Math.sin(toRadians(360 * i / qtd_estados));

        var x = (cosseno * raio) + centroX;
        var y = (seno * raio) + centroY;

        var canvas = document.getElementById($(this).attr('iid'));
        if (canvas.getContext) {
            var context = canvas.getContext('2d');

            //circulo
            if(estadoI == alfabetoM[i]){
                context.fillStyle = "rgba(172, 240, 215, 1)";
                context.strokeStyle = "black";
            }

            else {
                context.fillStyle = "rgba(241, 178, 21, 0.3)";
                context.strokeStyle = "blue";
            }
            context.beginPath();
            context.arc(25, 25, 25, 0, Math.PI * 2, true);
            context.closePath();
            context.stroke();
            context.fill();

            $('#icon'+i).css("top", y+"px");
            $('#icon'+i).css("left", x+"px");

            //texto
            context.strokeStyle = "rgba(2, 93, 198, 1)";
            context.fillStyle = "rgba(2, 93, 198, 0.9)";
            context.font = 'italic bold 25px sans-serif';
            context.fillText(alfabetoM[i++], 15, 32);//aqui ñ encontrei uma fórmula para x,y e o tamanho da fonte

            if($.inArray(alfabetoM[i].toString(), finais) !== -1){
                $('#icon'+i).addClass("final");
            }
        }
    });
}

$(document).ready(function() {
    var url = window.location.href;
    var urlMaster = url.split('|');
    var i = 1;
    var j = 0;
    var alfabetoM = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    $("#qtd_estado").val(urlMaster[1]);
    $("#estadoI").val(urlMaster[2]);
    $("#estadoF").val(urlMaster[3]);
    $("#transicoes").val(urlMaster[4]);

    var tranNaVIrgula = urlMaster[4].split(",");
    var tranNaBa = [];

    for(var  i = 1; i <= tranNaVIrgula.length; i++) {
        tranNaBa[i] = tranNaVIrgula[i-1].split("/");
    }


    $('#desenhar').on("click", function() {
        desenharEstados();
        for(var i = 1; i < tranNaBa.length; i++){
            var j = 0;
            var xInicial = $("#icon"+alfabetoM.indexOf(tranNaBa[i][0])).offset().left;
            var yInicial = $("#icon"+alfabetoM.indexOf(tranNaBa[i][0])).offset().top;
            var xFinal = $("#icon"+alfabetoM.indexOf(tranNaBa[i][2])).offset().left;
            var yFinal = $("#icon"+alfabetoM.indexOf(tranNaBa[i][2])).offset().top;

            if (tranNaBa[i][0] == tranNaBa[i][2]) {
                var canvas2 = document.getElementById('loop');
                if (canvas2.getContext){
                    var ctx = canvas2.getContext('2d');
                    ctx.beginPath();
                    var x              = 125;               // coordenada x
                    var y              = 25;               // coordenada y
                    var radius         = 20;                    // Raio do Arco
                    var startAngle     = 0.5;                     // Ponto inicial no círculo
                    var endAngle       = Math.PI+(Math.PI*2)/2; // Ponto final no círculo
                    var anticlockwise  = false; // horário ou anti-horário

                    ctx.arc(xInicial-20, yInicial+20, radius, startAngle, endAngle, anticlockwise);
                    ctx.stroke();
                }
            }
            else {
                $("#box").append("<line id='dog"+(i)+"' style='stroke:rgb(255,0,0);stroke-width:2' />");
                var qtd_estados = $('#qtd_estado').val();
                var raio = 180;
                var centroX = $(window).width() / 2;
                var centroY = $(window).height() / 2;

                var cosseno = Math.cos(toRadians(360 * alfabetoM.indexOf(tranNaBa[i][0]) / qtd_estados));
                var seno = Math.sin(toRadians(360 * alfabetoM.indexOf(tranNaBa[i][0]) / qtd_estados));

                var xInicial = (cosseno * raio) + centroX;
                var yInicial = (seno * raio) + centroY;

                var cosseno = Math.cos(toRadians(360 * alfabetoM.indexOf(tranNaBa[i][2]) / qtd_estados));
                var seno = Math.sin(toRadians(360 * alfabetoM.indexOf(tranNaBa[i][2]) / qtd_estados));

                var xFinal = (cosseno * raio) + centroX;
                var yFinal = (seno * raio) + centroY;

                $('#dog'+i).attr('x1', xInicial);
                $('#dog'+i).attr('y1', yInicial);
                $('#dog'+i).attr('x2', xFinal);
                $('#dog'+i).attr('y2', yFinal);

                $("#desenhos").append("<p style='margin-left: "+xFinal/2+"; margin-top: '>"+tranNaBa[i][1]+"</p>");
            }
        }
    });

    $('#desenhar').click();
});