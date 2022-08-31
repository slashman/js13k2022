const ANIMALS = {
    // Head, eye location,mouth,headColor,beardColor,earShadowColor,mouthColor,noseType,noseX,noseY
    fox: "head2,38,49,mouth1,f3a319,eff2f3,4c0c0c,,1,49,49",
    cat: "head1,38,49,mouth1,fff,fec8df,fec8df,,,",
    dog: "head1,38,49,mouth1,ffc556,fec8df,,,1,49,49",
    rabbit: "rabbitHead,35,50,mouth2,fff,FAD6FF,FAD6FF,FAD6FF,rabbitNose"
  };
  
  const PROTO_SHAPES = {
    head1: [
      // Cat, Pig, Panda, Lion, Bear, Dog1, Monkey, Penguin
      "M49 34Q34 34 28 42Q25 48 27 54Q29 60 49 61"
    ],
    head2: [
      // Fox
      "M49 33Q32 32 27 38L21 53Q29 62 49 61"
    ],
    rabbitHead: [
      "M49 31Q25 31 24 50Q9 52 8 67Q7 88 33 83Q41 81 50 81"
    ],
    foxBeard: [
      "M49 48Q46 49 46 51Q46 54 43 54L21 53Q30 62 49 61"
    ],
    catBeard: [
      "C", 33, 52, 2
    ],
    dogBeard: [
      "C", 33, 52, 2
    ],
    rabbitBeard: [
     "C", 25, 66, 11
    ],
    foxEars: [
      "M38 32Q17 6 28 42",
      "M35 34Q24 19 31 39"
    ],
    catEars: [
      "M37 36Q31 29 27 30Q24 36 27 44",
      "M33 37Q27 31 29 41"
    ],
    dogEars: [
      "M37 35L33 31L24 32Q19 40 21 48Q29 46 32 37"
    ],
    rabbitEars: [
      "M36 34Q33 32 21 11Q14 0 8 8Q5 17 13 27Q20 36 27 42",
      "M33 36Q26 25 21 17Q12 5 11 16Q11 25 29 41",
    ],
    rabbitNose: [
      "M50 67Q44 75 38 70"
    ],
    mouth1: [
      // Cat, Panda, Lion, Bear, Dog1, Fox
      "M49 52Q47 55 47 54",
    ],
    mouth2: [
      "M50 60Q42 60 42 62Q45 67 50 67"
    ]
  };
  
  function makeAnimal(type) {
    if (SHAPES[type]) return SHAPES[type];
    var def = ANIMALS[type].split(',');
    var shapes = [];
    var headColor = '#' +def[4];
    var lineColor = '#4c0c0c';
    shapes.push([PROTO_SHAPES[type+'Ears'][0],lineColor,2,headColor]); // Ear Shape
    if (PROTO_SHAPES[type+'Ears'].length>1)
      shapes.push([PROTO_SHAPES[type+'Ears'][1],'#' +def[6],1,'#' +def[6]]); // Ear Shadow
    shapes.push([PROTO_SHAPES[def[0]][0],lineColor,2,headColor]); // Head
    if (PROTO_SHAPES[type+'Beard']) {
      // Beard Shadow
      path = PROTO_SHAPES[type+'Beard'];
      if (path[0] == 'C')
        shapes.push(['C',path[1],path[2], path[3],'#' +def[5],1,'#' +def[5]]);
      else
        shapes.push([path[0],'#' +def[5],1,'#' +def[5]]); 
    }
    shapes.push(["C",def[1],def[2],2, lineColor,2,lineColor]); // Eye
    shapes.push([PROTO_SHAPES[def[3]][0],lineColor,2,'#'+def[7]]); // Mouth //TODO: Mark as round tips
    if (def[8]=="1") { 
      // Circular nose
      shapes.push(["C",def[9],def[10],1,lineColor,2,lineColor,"noFlip"]); // Nose
    } else if (def[8]) {
      shapes.push([PROTO_SHAPES[def[8]][0],lineColor,2,headColor]); // Special Nose
    }
    // TODO: Add Bigotes
    return shapes;
  }