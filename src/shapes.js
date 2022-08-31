const SHAPES = {
  coolStar: [["M44 41Q49 14 56 41Q85 30 65 49Q77 73 55 59Q32 74 45 52Q18 50 44 41", "#131047", 2, "#5b5e8b","noflip"]],
  triangle: [["M24 59L50 13L73 56L44 49Z", "#131047", 2, "#5b5e8b","noflip"]],
  booster: [["M50 26Q43 51 17 50Q44 59 50 83Q52 56 77 49Q52 51 50 26Z", "white", 2, "white","noflip"]],
  pinwheel: [["M42 41L42 9L64 23L56 41L82 41L75 60L56 54L56 80L33 72L43 53L19 53L24 34L42 41L12 8L42 9M56 41L81 10L82 41M56 54L80 80L55 80M19 53L19 78L43 53L56 41M42 41L55 53"
    ,"black", 2, "red","noflip"]],
  rocket: [
    ["M42 30L42 69L57 69L54 30", "black", 2, "white", "noflip"],
    ["M44 69L45 96L48 96L46 68", "black", 2, "brown", "noflip"],
    ["M54 69Q50 72 53 76Q60 76 58 81Q55 83 57 85", "black", 2, "none", "noflip"],
    ["M54 38L42 49L42 58L56 49Z", "black", 2, "red", "noflip"],
    ["M49 15L36 30L59 30Z", "black", 2, "red", "noflip"],
    ["M49 30L42 38L42 29L48 30","black", 2, "red", "noflip"],
    ["M57 58L42 69L57 69Z","black", 2, "red", "noflip"]
  ],
  blank: [[]],
  mineral: [
    ["C",
    50, 50, 14, "#e700dd", 3, "#9a007e",
    "noflip"]
  ],
  ship: [
    [
      // Thruster 2
      "M51 82L28 82L26 88L51 88",
      "#131047", 2, "#5b5e8b"
    ],
    [
      // Thruster 1
      "M53 77L26 77L24 85L53 85",
      "#131047", 2, "#5b5e8b"
    ],
    [
      // Wing
      "M28 71L15 69Q16 53 31 46Z",
      "#b82782", 2, "#eb29a4"
    ],
    [
      // Body
      "M50 13Q33 17 30 35L25 73L28 76Q30 79 50 79",
      "#dadde2", 2, "#dadde2"
    ],
    [
      // Window
      "C",
      50, 50, 14, "#6772dc", 3, "#100e1b",
      "noflip"
    ],
    [
      // Purple Cover
      "M51 58L36 67L27 58L21 80L51 81",
      "#b82782", 2, "#eb29a4"
    ],
  ],
  gato : [
    [ // ear1
      "M37 15Q36 11 27 10Q22 19 29 26Z",
      "#e7ad3f", 2, "#e7ad3f",
      // TODO: Flipside with different colors "#ede9ea", 2, "#ede9ea"
    ],
    [ // ear2
      "M34 18Q33 14 29 14Q26 18 31 25Z",
      "#d66ead", 2, "#d66ead"
    ],
    [ // head
      "M50 10Q28 15 24 37A4 6 0 0 0 24 52Q34 59 50 58Z",
      "#eeeaeb", 2, "#eeeaeb"
    ],
    [ // band
      "M50 10Q28 16 24 37Q47 33 57 14Z",
      "#ecae41", 2, "#ecae41"
    ],
    [ // eye
      "M42 34Q38 20 31 34",
      "#733621", 2, false
    ],
    [ // nose
      "M50 38Q40 41 50 44",
      "#dc7ab7", 2, "#dc7ab7"
    ],
    [ // mouth
      "M50 47Q45 47 42 45Q40 54 50 55",
      "#c52c5a", 2, "#c52c5a"
    ]
  ],
  lizard : [
    ["M50 31L39 31Q36 22 28 22Q18 23 17 33Q9 42 9 52Q8 67 50 67Q91 68 92 52Q92 44 83 32Q81 22 72 22Q65 22 61 31L50 31",
    "#477238", 2, "#8FD032", 1],
    ["C", 28, 34, 8, "#33272A", 2, "#F8E398"],
    ["M28 29Q26 33 28 38Q31 33 28 28", "#33272A", 2, "#33272A"],
    ["M20 49Q22 58 49 57", "#477238", 2, "#8FD032"],
    ["M40 48Q40 50 41 51Q42 53 45 53Q46 52 43 50Q43 48 39 48", "#293F21", 2, "#293F21"]
  ],
  fox: [
    ["M34 30Q26 21 11 16Q6 33 16 46M27 32", "#673931", 2 ,"#673931"],
    ["M28 33Q24 27 17 25Q15 36 20 40", "#e88a36", 2, "#e88a36"],
    ["M50 27Q16 27 15 51Q15 65 8 64Q1 86 50 86", "#673931", 2, "#e88a36"], 
    ["M50 58Q41 58 41 68Q19 69 8 64Q4 71 11 78Q20 86 50 86", "#673931", 2, "#fcf7be"],
    ["M25 68Q20 68 19 64Q16 66 18 71", "#673931", 2, "#fcf7be"],
    ["C", 32, 58, 4, "#673931", 2, "#673931"],
    ["M50 67Q48 71 44 68", "#673931", 2, "#fcf7be"],
    ["M50 61Q44 61 46 64Q48 67 50 67", "#673931", 2, "#673931"]
  ],
  egg: [
    [
      "M63 23Q56 18 45 19Q38 26 32 27Q21 31 20 42Q30 51 29 58Q29 70 48 69Q52 60 59 61Q71 66 78 56Q68 45 80 36Q88 21 77 21Q68 19 63 23",
      "#25242a", 2, "#858390", "noflip"
    ]
  ],
  city: [
    [
      "M79 84L79 45L72 45L72 47L68 47L68 32L63 32L63 41L57 41L57 45L53 45L53 28A2 3 0 0 0 46 28L46 37L41 37L41 42L33 42A5 8 0 0 0 23 42L19 42L19 85",
      "#59778f", 2, "#59778f"
    ]
  ],
  lake: [
    [
      "M73 18Q53 16 32 32Q26 46 30 58Q39 71 20 83Q12 93 28 93Q60 91 73 73Q95 53 83 33Q84 22 73 18",
      "#021431", 2, "#021431", "noflip"
    ]
  ]
}