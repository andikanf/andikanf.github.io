var nameMaps = {
    "dir" : ["Riko", "Nabil", "Daniel", "Davit", "Vici", "Wisnu", "Stefan", "Bram", "Edy", "Vicky", "Stanley", "Ezra", "Randi", "Erwin", "Edwin", "Lius", "Naufal", "Phie"],
    "mktbkg" : ["Jogie", "Aan", "Dhanu", "Riany", "Richie", "Yudhis", "Boni", "Yap", "Arno", "Budiman", "Nabilah", "Zaki", "Rudy", "Maul", "Rizki M.", "Andre", "Digya", "Arfi", "Daniel"],
    "qa" : ["Niar", "Sekti", "Hanna", "Dyna", "Satria", "Duhita", "Isni", "Farid", "Raihan", "Triyoto", "Thomas"],
    "few" : ["Afrishal", "Clinford", "Kelvin", "Anita", "Bobby", "Edwar", "Ericko", "Ulfah", "Oky", "Rubhi"],
    "fea" : ["Pedro", "Alnodi", "Christian I.", "Christian L.", "Harlie", "Novan", "Rayhan", "Willian", "Ayyash"],
    "b2b" : ["Erik", "Rizki", "Ergi", "Kaspul", "Damar", "Irfan", "Ivan", "Nugroho", "Aziz"],
    "pm" : ["Jeane", "Gladys", "KJ", "Sasa", "Ryan", "Dhena", "Stefani", "Stephanie"]
}

var t = url.searchParams.get("t")
if (t != null) {
    c = t.split("_")
    if (c[0] == "a") {
        g = "Haaaaaiiiii !!!!!"
    }
    else if (c[0] == "s2") {
        g = "Hai"
    }

    $("#text-invitee-1").text(g);
    new TypeIt("#text-invitee-1", {
        speed: 200,
        loop: false,
    }).go();


    var names = nameMaps[c[1]].sort()

    var typeIt = 'new TypeIt("#text-invitee-2", {speed: 10, waitUntilVisible: true, loop: true,})'
    for (i = 0; i < names.length; i++) {
        typeIt += '.type(names[' + i + '], { delay: 500 }).delete(names[' + i + '].length)'
    }
    typeIt += '.go()'
    eval(typeIt)
}
else {
    var g = url.searchParams.get("g")
    var n = url.searchParams.get("n")
    if (n != null) {
        $("#text-invitee-2").text(n);


        new TypeIt("#text-invitee-2", {
            speed: 100,
            loop: false,
        }).go();
        if (g != null) {
            $("#text-invitee-1").text(g);
            new TypeIt("#text-invitee-1", {
                speed: 50,
                loop: false,
            }).go();
        }
    }
}
