function toRadians(ang) {
    return ang / 180.0 * 3.14159265358979323846;
}

$(document).ready(function() {
    $('#desenhar').click(function() {
        var i = 2;
        var qtd_estados = $('#qtd_estado').val();
        var raio = 180;
        var centroX = $(document).width() / 2;
        var centroY = $(document).height() / 2;

        while (qtd_estados > 1){
            $("#desenhos").append("<canvas class='icon' iid='icon"+i+"'  id='icon"+(i++)+"' width='50' height='50'></canvas>");
            qtd_estados--;
        }


        /*var canvas2 = document.getElementById('circunferencia');
        if (canvas2.getContext) {
            var context = canvas2.getContext('2d');

            //circulo
            context.fillStyle = "rgba(241, 178, 21, 0.3)";
            context.strokeStyle = "blue";
            context.beginPath();
            context.arc(100, 100, 100, 0, Math.PI * 2, true);
            context.closePath();
            context.stroke();
            context.fill();

            //texto
            context.strokeStyle = "rgba(2, 93, 198, 1)";
            context.fillStyle = "rgba(2, 93, 198, 0.9)";
            context.font = 'italic bold 25px sans-serif';
            context.fillText("", 8, 32);//aqui ñ encontrei uma fórmula para x,y e o tamanho da fonte

        }*/
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
                context.fillStyle = "rgba(241, 178, 21, 0.3)";
                context.strokeStyle = "blue";
                context.beginPath();
                context.arc(x, y, 25, 0, Math.PI * 2, true);
                alert(x);
                alert(y);
                context.closePath();
                context.stroke();
                context.fill();

                //texto
                context.strokeStyle = "rgba(2, 93, 198, 1)";
                context.fillStyle = "rgba(2, 93, 198, 0.9)";
                context.font = 'italic bold 25px sans-serif';
                context.fillText("q"+i++, 8, 32);//aqui ñ encontrei uma fórmula para x,y e o tamanho da fonte
            }
        });
    });
});