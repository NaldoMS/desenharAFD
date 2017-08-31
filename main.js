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
    $("#qtd_estado").val(urlMaster[1]);
    $("#estadoI").val(urlMaster[2]);
    $("#estadoF").val(urlMaster[3]);
    $("#transicoes").val(urlMaster[4]);

    var tranNaVIrgula = urlMaster[4].split(",");
    var tranNaBa = [];

    for(var  i = 0; i < tranNaVIrgula.length; i++){
        tranNaBa[i] = tranNaVIrgula[i].split("/");
    }
    alert(tranNaBa[0][3]);


    $('#desenhar').click(function() {
        desenharEstados();

        var canvas = document.getElementById('reta');
        var context = canvas.getContext('2d');

        context.beginPath();
        context.moveTo(60, 30);
        context.lineTo(60, 330);
        context.stroke();

       /* var canvas2 = document.getElementById('loop');
        if (canvas2.getContext){
            var ctx = canvas2.getContext('2d');
            ctx.beginPath();
            var x              = 125;               // coordenada x
            var y              = 25;               // coordenada y
            var radius         = 20;                    // Raio do Arco
            var startAngle     = 0.5;                     // Ponto inicial no círculo
            var endAngle       = Math.PI+(Math.PI*2)/2; // Ponto final no círculo
            var anticlockwise  = false; // horário ou anti-horário

            ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
            ctx.stroke();
        }

        var canvas3 = document.getElementById('curvas');
        if (canvas3.getContext) {
            var ctx2 = canvas3.getContext('2d');

            // Quadratric curves example
            ctx2.beginPath();
            ctx2.moveTo(75,25);
            ctx2.quadraticCurveTo(25,25,25,62.5);
            ctx2.quadraticCurveTo(25,100,50,100);
            ctx2.quadraticCurveTo(50,120,30,125);
            ctx2.quadraticCurveTo(60,120,65,100);
            ctx2.quadraticCurveTo(125,100,125,62.5);
            ctx2.quadraticCurveTo(125,25,75,25);
            ctx2.stroke();
        }*/
    });

    $('#desenhar').click();
});