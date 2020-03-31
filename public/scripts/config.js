
var a=40;

// ------------------------------------------------------------------
// Codage des pieces et de leurs positions normal, a çà, 180 et 270
// que des rotations a partir de leur centre 
// ------------------------------------------------------------------
var configs={
    "jeu_A":{"nbcases":100,
        "name":"A",
        "indications":"",
        "couleur":"lime",
        "positions":[
            [-1, 1, 1,-1,-1, 0, 0,-1, 1,-1],
            [-1, 1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1, 1,-1,-1, 0,-1,-1, 1],
            [-1, 1,-1,-1,-1, 0,-1,-1, 0,-1],
            [ 0,-1,-1, 1,-1,-1, 1,-1,-1,-1],
            [-1,-1, 1,-1,-1,-1,-1,-1, 1, 1],
            [-1,-1,-1,-1,-1, 0, 0,-1,-1,-1],
            [ 1, 1,-1, 0,-1, 1,-1, 0,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1, 1, 1,-1, 0,-1]
    ],
    "descriptif":"Chaque ligne et chaque colonne doit contenir le même nombre de 0 et de 1. On ne peut pas placer plus de deux 0 ou de deux 1 côte à côte ou l'un en dessous de l'autre. Deux colonnes et deux lignes ne peuvent être identiques."
    },
    "jeu_B":{"nbcases":100,
    "name":"B",
    "indications":"",
    "couleur":"lime",
    "positions":[
        [-1, 0, 0,-1,-1,-1,-1,-1,-1,1],
        [-1,-1,-1,-1, 0,-1, 1,-1,-1,0],
        [-1, 0,-1,-1, 0,-1,-1,-1,-1,-1],
        [-1,-1,-1, 0,-1, 0, 0,-1,-1,-1],
        [-1, 1,-1, 0, 0,-1,-1, 0,-1,-1],
        [-1, 1,-1,-1, 0,-1, 1,-1,-1, 1],
        [-1,-1,-1,-1,-1,-1, 1,-1,-1,-1],
        [ 0,-1,-1, 0,-1,-1,-1,-1,-1,-1],
        [-1, 1, 1,-1, 1,-1,-1, 0,-1,-1],
        [-1, 0,-1,-1,-1, 0,-1, 1, 1,-1]
],
"descriptif":"Chaque ligne et chaque colonne doit contenir le même nombre de 0 et de 1. On ne peut pas placer plus de deux 0 ou de deux 1 côte à côte ou l'un en dessous de l'autre. Deux colonnes et deux lignes ne peuvent être identiques."
}
};

