let table;

function preload() {
  // put preload code here
  table = loadTable("assets/dataset.csv","csv","header");
}

function setup() {
  //controllo se ho caricato i dati
  console.log(table); //stampa sulla console cosa c'è nella variabile table

  //larghezza dello sketch uguale a quella della finestra
  // decido un ingombro (larghezza, gap, quanti in una riga...)
  // quando so il numero di righe posso sapere l'altezza dello sketch 

  let outerPadding = 20; // padding esterno
  let padding = 10; // padding tra gli elementi
  let itemSize = 30; // dimensione degli elementi

  //calcolo il numero delle colone  // colonne = larghezza - 2 * padding esterno/ item + padding interno
  let cols = floor((windowWidth - outerPadding * 2) / (itemSize + padding)); // arrotondo per difetto --> meglio una colonna in meno che una che sborda

  let rows = ceil(table.getRowCount() / cols); //numero di righe / il numero di colonne

  let totalHeight = outerPadding * 2 + rows * itemSize + (rows - 1) * padding;

  //creo il canvas
  createCanvas(windowWidth, totalHeight); //larghezza finestra, altezza calcolata

  background("black");

  console.log("cols: ", cols, "rows: ", rows);

  let colCount = 0;
  let rowCount = 0;

  //esegue il ciclo per ogni riga
  for(let rowNumber = 0; rowNumber < table.getRowCount(); rowNumber++){
    //per ogni riga carico i dati dalla tabella
    let data = table.getRow(rowNumber).obj;
    
    //valori dimensione column0
    let valueCol0 = data['column0'];
    let allValuesCol0 = table.getColumn("column0");//calcolo min e max della colonna
    let minValueCol0 = min(allValuesCol0);
    let maxValueCol0 = max(allValuesCol0);
    let scaledValue = map(valueCol0, minValueCol0, maxValueCol0, 1, itemSize); //valore che vogliamo scalare, valore minimo della scala di partenza, valore max, dim. + piccola, dim. + grande 

    //valori dimensione column1
    let valueCol1 = data['column1'];
    let allValuesCol1 = table.getColumn("column1");//calcolo min e max della colonna
    let minValueCol1 = min(allValuesCol1);
    let maxValueCol1 = max(allValuesCol1);
    let scaledValueCol1 = map(valueCol1, minValueCol1, maxValueCol1, 1, 5);

    // valori colore column2
    let valueCol2 = data['column2'];
    let allValuesCol2 = table.getColumn("column2");
    let minValueCol2 = min(allValuesCol2);
    let maxValueCol2 = max(allValuesCol2);
    let value2Mapped = map(valueCol2, minValueCol2, maxValueCol2, 0, 1); //trasformiamo il valore min/max a da 0 a 1

    let c1 = color(45, 255, 145); // "#2dff91"
    let c2 = color(0, 0, 255);    // "blue"
    let mappedColor = lerpColor(c1, c2, value2Mapped); // Colore interpolato

    //valori dimensione column3
    let valueCol3 = data['column3'];
    let allValuesCol3 = table.getColumn("column3");//calcolo min e max della colonna
    let minValueCol3 = min(allValuesCol3);
    let maxValueCol3 = max(allValuesCol3);
    let scaledValueCol3 = map(valueCol3, minValueCol3, maxValueCol3, 1, 3);

    //valori trasparenza column4
    let valueCol4 = data['column4'];
    let allValuesCol4 = table.getColumn("column4");//calcolo min e max della colonna
    let minValueCol4 = min(allValuesCol4);
    let maxValueCol4 = max(allValuesCol4);
    let alphaValue = map(valueCol4, minValueCol4, maxValueCol4, 0, 255);
    let cWithAlpha = color(red(mappedColor), green(mappedColor), blue(mappedColor), alphaValue);


    //posizione x e y
    let xPos = outerPadding + colCount * (itemSize + padding);
    let yPos = outerPadding + rowCount * (itemSize + padding);


    // ====== ELLISSI COLUMN0 ======
    push();
    stroke(cWithAlpha); //opacità column4
    strokeWeight(scaledValueCol1); //peso linee column1
    fill(cWithAlpha); //opacità column4
    circle(xPos, yPos, scaledValue, scaledValue); // x, y, largh., altez.
    pop();
    
    // ====== LINEE-1 COLUMN3 ======
    push();
    stroke(mappedColor);
    strokeWeight(scaledValueCol1/2);
    line(xPos, yPos, xPos+5, yPos+10, scaledValueCol1, scaledValueCol1);
    pop();

    // ====== LINEE-2 COLUMN3 ======
    push();
    stroke(mappedColor);
    let angle = scaledValueCol3; //angolo column3
    translate(xPos, yPos);// Traslo il punto di origine per ruotare intorno al centro dell'ellisse
    rotate(angle);
    line(-5, -10, 0, 5); // Disegno la linea rispetto al nuovo centro
    pop();

    // ====== LINEE-3 COLUMN3 ======
    push();
    stroke(mappedColor);
    let angle2 = scaledValueCol3; //angolo column3
    translate(xPos, yPos);// Traslo il punto di origine per ruotare intorno al centro dell'ellisse
    rotate(angle2);
    line(-5, -10, scaledValueCol1+3, scaledValueCol1+6); // Disegno la linea rispetto al nuovo centro
    pop();

    // ====== RECT COLUMN3 ======
    push();
    stroke(cWithAlpha);
    strokeWeight(scaledValueCol1);
    noFill();
    rectMode(CENTER)
    let angle3 = scaledValueCol3; //angolo3 column3
    translate(xPos, yPos);
    rotate(angle3);
    rect(0, 0,itemSize-10); // x, y, largh., altez.
    pop();

    //ad ogni ciclo aumento colCount
    colCount++;

    //controllo se siamo a fine riga
    if(colCount == cols){ //se è uguale al numero di colonne
      colCount = 0; //conteggio colonne torna 0
      rowCount++; //conteggio righe aumenta di uno
    }
  }
}

function draw() {
  // put drawing code here
}
