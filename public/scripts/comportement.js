    var nb_lignes=10;
    var nb_colonnes=10;

    var liste_coups_joues=[]; // memoire du parcours 
    var nave=navigator.userAgent.toLowerCase(); 
    if (nave.indexOf("firefox") > -1) nave="Firefox"; else nave="Firefox";
    var fenetre = document.getElementById('canvas'); 
    var hh=canvas.getContext('2d');
    hh.canvas.style.border="3px solid #000";
    hh.translate(0.5,0.5);
    var D=20;
    var Xs,Ys;
    var Xd=5,Yd=5;
    var xmin=Xd+10,xmax=xmin+10*a,ymin=Yd+10,ymax=ymin+10*a;
    var ctold;
    var grille_jeu=[];
    for(var i=0; i<21; i++){
        grille_jeu[i]=[]; 
    }		
    // defintion des pieces
    var I,J,dx,dy,piece,larg,haut;
    var xold,yold;	
    var actif=false,fini,ok=false,save=false;
    var auto=false;
    var blanc="rgb(220,220,220)",gris="rgb(70,70,70)";
    // tableau du maillage de la piece 
    var LPD=[]
    var couleur_ligne=[false,false,false,false,false,false,false,false,false,false];
    var couleur_colonne=[false,false,false,false,false,false,false,false,false,false];
    var textarea;
    var configuration;
    charge_listejeux();
    chargement_();

    function charge_listejeux() {
        var sele = document.getElementById('config-select');
        for (var jeu in configs){
            var option = document.createElement("option");
            option.text = jeu;
            option.value = jeu;
            sele.add(option);
        }
    }

    function chargement_(){
        var sele = document.getElementById('config-select');
        var config=sele.value;
        indication=configs[config].descriptif;
        // lecture de la fonfiguration
        configuration=configs[config];
        choixRaz();      
        $("#descriptif > p").html(indication);
    }

// commandes ***********************
    function choixRaz(){
        LPD={};
        init_tab();
        trace();
    }  
    function RAZ_grille() {
        for(var i=0; i<10; i++)						
        for(var j=0; j<10; j++) grille_jeu[i][j]="-2";
    }
    function affichage_message(message){
        // il faut pernser à effacer
        hh.fillStyle="silver";
        hh.fillRect(10,5,300,40);
        hh.fillStyle="black";   
        var debut_ligne=20;
        for(var mess of message) {           
            hh.fillText(mess,160,debut_ligne);
            debut_ligne+=20;
        }    
    }
    // Trace de l'indication de l'erreur pour l'utilsiateur a la hauteur de ligne 
    function trace_indicateur_erreur_ligne(numero,couleur){
        x=20;	y=Yd+a*(numero)+60;
        hh.fillStyle =couleur;
        hh.beginPath();
        hh.moveTo(x, y);
        hh.lineTo(x+15,y+15);
        hh.lineTo(x,y+30);
        hh.lineTo(x,y);
        hh.closePath();
        hh.fill();
    }

    function trace_indicateur_erreur_colonne(numero,couleur){
        x=a*(2+numero)+10;	y=30;
        hh.fillStyle = couleur;
        hh.beginPath();
        hh.moveTo(x, y);
        hh.lineTo(x+15,y+15);
        hh.lineTo(x+30,y);
        hh.lineTo(x,y);
        hh.closePath();
        hh.fill();
    }
    // Trace de l'indication de l'erreur pour l'utilsiateur a la hauteur de ligne 
    function trace_indicateur_nb_ligne(numero,couleur){
        x=460;	y=Yd+a*(numero)+60;
        hh.fillStyle =couleur;
        hh.beginPath();
        hh.moveTo(x+15, y);
        hh.lineTo(x,y+15);
        hh.lineTo(x+15,y+30);
        hh.lineTo(x+15,y);
        hh.closePath();
        hh.fill();
    }

    function trace_indicateur_nb_colonne(numero,couleur){
        x=a*(2+numero)+10;	y=470;
        hh.fillStyle = couleur;
        hh.beginPath();
        hh.moveTo(x, y+15);
        hh.lineTo(x+15,y);
        hh.lineTo(x+30,y+15);
        hh.lineTo(x,y+15);
        hh.closePath();
        hh.fill();
    }

    function verif_() {
        var lignes=[];
        var colonnes=[];
        // on reconstitue pour chaque ligne et chaque colonne 
        // la concatenation des codes de la grille
        for (var i=0; i<10;i++){
            var chaineL="";
            var chaineC="";
            for (var j=0; j<10;j++){
                chaineL+=grille_jeu[i][j][1];
                chaineC+=grille_jeu[j][i][1];
            }
            lignes.push(chaineL);
            colonnes.push(chaineC);
        }
        for (var i=0; i<10;i++){couleur_ligne[i]=false;couleur_colonne[i]=false;}
        // verification que deux lignes ou deux colonnes ne soient pas identiques
        // on fait une soustraction si ==0 identique 
        for (var i=0; i<10;i++){
            var lig=lignes[i];
            var col=colonnes[i];
            for (var j=i+1; j<10;j++){
                if (lig-lignes[j]==0){
                    couleur_ligne[i]=true;
                    couleur_ligne[j]=true;
                }
                if (col-colonnes[j]==0){
                    couleur_colonne[i]=true;
                    couleur_colonne[j]=true;
                }

            }
        }
        // on fait le onctrole du nombre d'elements dans les lignes
        // et les colonnes 
        const regex0=/0{3}/g;
        const regex1=/1{3}/g;
        lignes.forEach((e,i)=>{
            e.match(regex0)!=null?trace_indicateur_erreur_ligne(i,"red"):undefined;
            e.match(regex1)!=null?trace_indicateur_erreur_ligne(i,"red"):undefined;
            e.split("0").length>5?trace_indicateur_nb_ligne(i,"blue"):undefined;
            e.split("1").length>5?trace_indicateur_nb_ligne(i,"blue"):undefined;
        });
        colonnes.forEach((e,i)=>{
            e.match(regex0)!=null?trace_indicateur_erreur_colonne(i-1,"red"):undefined;
            e.match(regex1)!=null?trace_indicateur_erreur_colonne(i-1,"red"):undefined;
            e.split("0").length>5?trace_indicateur_nb_colonne(i-1,"blue"):undefined;
            e.split("1").length>5?trace_indicateur_nb_colonne(i-1,"blue"):undefined;
        });

    }
    // --------------------------------------------------------------
    // on controle chaque ligne et chaque colonne en nombre
    // on controle le fait que deux lignes ou deux colonnes ne sont pas identiques
    // --------------------------------------------------------------
    function  verification_regles() {
        var erreur=false;
        var message=[];
        var gagne=true;
        var nb_cellules=0;
        for(var i=0; i<10; i++)	{	
            var nb_0=0;
            var nb_1=0;
            var nb_total_1=0;
            var nb_total_0=0;
            for(var j=0; j<10; j++) {
                
                // on compte le nb d'elements consecutifs à 0 ou à 1
                if (grille_jeu[i][j][1]!='2')
                //if (grille_jeu[i][j][1]!=undefined ||grille_jeu[i][j][1]=="" )
               {   
                    if (grille_jeu[i][j][1]==="1") {
                        nb_cellules+=1;
                        nb_total_1+=1;
                        nb_0=0;nb_1+=1;
                        if (nb_1>2) {
                            trace_indicateur_erreur_ligne(i,"red");
                            gagne=false;
                        }            
                    } else {
                        nb_1=0;nb_0+=1;
                        nb_total_0+=1;
                        if (nb_0>2) {
                            trace_indicateur_erreur_ligne(i,"red");
                            gagne=false;
                        }            
                    }
               } else { // si undefined on reinitialise
                    nb_0=0;nb_1=0;
               }
            }
            if (nb_total_0>5 || nb_total_1>5 ) {
                message.push("Trop de 0 ou de 1 sur la ligne");
            }
        }
        
        if (gagne)affichage_message("");
        if (gagne && nb_cellules==100) {
            message.push("C EST GAGNE");
        }
        affichage_message(message);
    }
    fenetre.addEventListener('click', function(evt) {
        var x = evt.pageX;	
        var y = evt.pageY;
        var node = evt.target;				
        while (node) {
            x -= node.offsetLeft - node.scrollLeft;
            y -= node.offsetTop  - node.scrollTop;
            node = node.offsetParent;
        }
        Xs=x-3;		Ys=y-3;
        I=1+Math.floor((Xs-xmin)/a);
        J=Math.floor((Ys-ymin)/a);
        console.log(grille_jeu[J-1][I-2],I-2,J-1);
        x=I*a+fenetre.offsetLeft-25;y=J*a+fenetre.offsetTop+25;
        if (grille_jeu[J-1][I-2].substr(0,1)!="S") {
            // on passe la valeur à 0, 1 ou rien
            var valeur_actuelle= grille_jeu[J-1][I-2];
            if (grille_jeu[J-1][I-2][1]=='2') { //undefined){
                grille_jeu[J-1][I-2]="U0";
             }else if (grille_jeu[J-1][I-2][1]=="0") {
                grille_jeu[J-1][I-2]="U1";
            } else {
                grille_jeu[J-1][I-2]="U2";
            }
            trace();        
            verif_();
            subrillance();
            
            //verification_regles();

        }
    });          

    function drawLine(xi,yi,xf,yf){
        hh.beginPath();
        hh.moveTo(xi,yi);
        hh.lineTo(xf,yf);
        hh.stroke();} 
    
    function cadre3D(x,y,w,ha){
        hh.strokeStyle="rgb(130,130,133)";            
        drawLine(x,y+1,w-1,y+1);	drawLine(x,y,x,ha);
        drawLine(x+1,y,x+1,ha-1);   drawLine(x,y,w,y);
        hh.strokeStyle="rgb(230,230,230)";  		
        drawLine(x,ha,w,ha);	drawLine(w,y+1,w,ha);
        drawLine(x+1,ha-1,w,ha-1);	drawLine(w-1,y+2,w-1,ha);} 
       

    function init_tab(){	
        // la grille est composee de plusieurs zones  de jeu et de stockage 
        RAZ_grille();
        LPD={};
        // il faut juste charger la grille       
        for(var i=0; i<10; i++)						
            for(var j=0; j<10; j++) {
                if (configuration.positions[i][j]!=-1){
                    grille_jeu[i][j]="S"+configuration.positions[i][j];
                } else {
                    grille_jeu[i][j]="U2";
                }
            }

    }
    function subrillance() {
        var decalage=0*360+50;
       
        for (var i=0; i< nb_lignes; i++) {
            if (couleur_ligne[i]) {
                hh.strokeStyle="red";
                hh.lineWidth = 2;
                drawLine(decalage,20+(i+1)*40,nb_colonnes*40+decalage,20+(i+1)*40);
                drawLine(decalage,20+(i+2)*40,nb_colonnes*40+decalage,20+(i+2)*40);
            }
            if (couleur_colonne[i]) {
                hh.lineWidth = 2;
                hh.strokeStyle="red";
                drawLine(decalage+(i+1)*40,60,decalage+(i+1)*40,(nb_lignes+1)*40+20);
            }
        }
        hh.lineWidth = 1;

    }
    // ------------------------------------------------------
    // fonctin de tracer d'un maillage dans la zone de jeu 
    // ------------------------------------------------------
    function maillage(numero) {
        var decalage=numero*360+50;
        for (var i=0; i< nb_lignes; i++) {
            hh.strokeStyle=gris;
            drawLine(decalage,20+(i+1)*40,nb_colonnes*40+decalage,20+(i+1)*40);
        }
        for (var j=0; j< nb_colonnes; j++) {
            hh.strokeStyle=gris;
            drawLine(decalage+(j+1)*40,60,decalage+(j+1)*40,(nb_lignes+1)*40+20);
        }

    }
    // -----------------------------------------------------------
    // fonction pour afficher les reperes des pieces sur la grille
    // -----------------------------------------------------------
    function affiche(){
        var x,y;
        for (var i=0;i<10;i++){
            trace_indicateur_erreur_ligne(i,"silver");
            trace_indicateur_erreur_colonne(i-1,"silver");
        }
        hh.fillStyle="black";
        for(var i=0; i<10; i++){
            for(var j=0; j<10; j++){
                if (grille_jeu[i][j]!=-1) {
                    x=a*(2+i)+10;	y=Yd+a*(j)+60;
                    if (grille_jeu[i][j].substr(0,1)=="S") {
                        hh.fillStyle="black";
                        hh.fillText(""+grille_jeu[i][j][1],y,x);
                    } else {
                         if (grille_jeu[i][j][1]!='2') { //undefined){
                            hh.fillStyle="silver";
                            hh.fillRect(y-10,x-15,30,20);
                            hh.fillStyle="blue";
                            hh.fillText(""+grille_jeu[i][j][1],y,x);
                         }else {
                            hh.fillText("",y,x);
                         }
                    }
                    
                }
            }
        }
    }	
    // fonction de trace de la grille en fonction de son numero 
    function trace_grille(numero) {
        hh.fillStyle="black";
        hh.fillRect(30+numero*360+15,55,nb_colonnes*40+10,nb_lignes*40+10);
        hh.fillStyle="silver";
        hh.fillRect(30+numero*360+20,60,nb_colonnes*40,nb_lignes*40);
        maillage(numero);	
    }  
    
    // -----------------------------------------------------------
    // fonction pour tracer l'ensemble du jeu et la position des pieces 
    // -----------------------------------------------------------
    async function trace(modif=false){
        // dessine le cadre du jeu 
        hh.font="bold 16px Arial";
        hh.textAlign="center";
        hh.fillStyle="silver";       
        hh.fillRect(0,0,510,530);
        trace_grille(0);
        //RAZ_grille();    
        affiche();
        cadre3D(5,4,500,515);
    } 

