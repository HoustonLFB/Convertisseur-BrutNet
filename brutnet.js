function onChange(inputID) {
    switch (inputID) {
        case ('annuelBrut'):
            updateMensuelBrut();

            break;
        case ('mensuelBrut'):
            updateAnnuelBrut();
            break;
    }
    updateNet();
    updatePostImpot();
}

function updateAnnuelBrut() {
    annuelBrut.value = mensuelBrut.value * 12;
}

function updateMensuelBrut() {
    mensuelBrut.value = annuelBrut.value / 12;
}

function updateNet() {
    switch (statut.value) {
        case ("1"):
            updateAnnuelNet(0.78);
            break;
        case ("2"):
            updateAnnuelNet(0.75);
            break;
        case ("3"):
            updateAnnuelNet(0.85);
            break;
        case ("4"):
            updateAnnuelNet(0.55);
            break;
    }

    updateMensuelNet();
}

function updateAnnuelNet(cgs) {
    annuelNet.value = annuelBrut.value * cgs;
}

function updateMensuelNet() {
    mensuelNet.value = annuelNet.value / 12;
}

/*

A8 = salaire annuel net
10 = difference

t1 : =SI(A8>10777;10777;A8)
t2 : =SI($A$8-10777>E10;E10; SI($A$8-10777<0;0;$A$8-10777))
t3 : =SI($A$8-27478>F10;F10; SI($A$8-27478<0;0;$A$8-27478))
t4 : =SI($A$8-78570>G10;G10; SI($A$8-78570<0;0;$A$8-78570))
t5 : =SI(A8-168944<0;0;A8-168944)
*/

function impot() {
    var tr1 = t1();
    var tr2 = t2();
    var tr3 = t3();
    var tr4 = t4();
    var tr5 = t5();

    var impot = tr1 * 0 + tr2 * 0.11 + tr3 * 0.3 + tr4 * 0.41 + tr5 * 0.45;

    return impot;
}

function t1() {
    if (annuelNet.value > 10777) {
        return 10777;
    } else {
        return annuelNet.value;
    }
}

function t2() {
    if (annuelNet.value - 10777 > 16701) {
        return 16701
    }
    if (annuelNet.value - 10777 < 0) {
        return 0;
    }
    return annuelNet.value - 10777;
}

function t3() {
    if (annuelNet.value - 27478 > 51092) {
        return 51092
    }
    if (annuelNet.value - 27478 < 0) {
        return 0;
    }
    return annuelNet.value - 27478;
}

function t4() {
    if (annuelNet.value - 78570 > 90424) {
        return 90424
    }
    if (annuelNet.value - 78570 < 0) {
        return 0;
    }
    return annuelNet.value - 78570;
}

function t5() {
    if (annuelNet.value - 168944 < 0) {
        return 0;
    }
    return annuelNet.value - 168944;
}

function updatePostImpot() {
    var impotPayer = impot();
    updatePostImpotAnnuel(impotPayer);
    updatePostImpotMensuel();
}

function updatePostImpotAnnuel(impot) {
    postImpotAnnuel.value = annuelNet.value - impot;
}

function updatePostImpotMensuel() {
    postImpotMensuel.value = postImpotAnnuel.value / 12;
}

