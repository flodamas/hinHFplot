var marker_size = function() { return width*width/1.e+4; }

var vorders = [20, 24, 21, 25, 33, 27, /*22, 26,*/ 29, 30];

var vopt = {
    // Circle
    20 : {
        type : d3.symbolCircle,
        // option : '&#x29F3;',
        option : '&#x25CF;',
        fill : 1,
        offset : [1.1, 0.7, 0.7, 0.7],
        rotate : 0
    },
    24 : {
        type : d3.symbolCircle,
        // option : '&#x29F2;',
        option : '&#x25CB;',
        fill : 0,
        offset : [1.1, 0.7, 0.7, 0.7],
        rotate : 0
    },
    // Square
    21 : {
        type : d3.symbolSquare,
        // option : '&#x29EF;',
        option : '&#x25A0;',
        fill : 1,
        offset : [1.1, 0.7, 0.7, 0.7],
        rotate : 0
    },
    25 : {
        type : d3.symbolSquare,
        // option : '&#x29EE;',
        option : '&#x25A1;',
        fill : 0,
        offset : [1.1, 0.7, 0.7, 0.7],
        rotate : 0
    },
    // Diamond
    33 : {
        type : d3.symbolDiamond,
        // option : '&#x29F1;',
        // option : '&#x29EB;',
        // option : '&#x2B27;',
        option : '&#x2666;',
        fill : 1,
        offset : [1., 1.0, 1.0, 0.5],
        rotate : 0
    },
    27 : {
        type : d3.symbolDiamond,
        // option : '&#x29F0;',
        // option : '&#x25CA;',
        // option : '&#x2B28;',
        option : '&#x2662;',
        fill : 0,
        offset : [1., 1.0, 1.0, 0.5],
        rotate : 0
    },
    // Triangle-up
    22 : {
        type : d3.symbolTriangle,
        // option : '&#x25B4;',
        option : '&#x25B2;',
        fill : 1,
        offset : [0.85, 1.0, 0.5, 0.7],
        rotate : 0
    },
    26 : {
        type : d3.symbolTriangle,
        // option : '&#x25B5;',
        option : '&#x25B3;',
        fill : 0,
        offset : [0.85, 1.0, 0.5, 0.7],
        rotate : 0
    },
    // Star
    29 : {
        type : d3.symbolStar,
        option : '&#x272D;',
        fill : 1,
        offset : [0.6, 1.0, 0.6, 0.7],
        rotate : 0
    },
    30 : {
        type : d3.symbolStar,
        option : '&#x272B;',
        fill : 0,
        offset : [0.6, 1.0, 0.6, 0.7],
        rotate : 0
    },
};

var voptlegend = {
    20 : '&#x25CF;',
    24 : '&#x25CB;',
    21 : '&#x25A0;',
    25 : '&#x25A1;',
    33 : '&#x25C6;',
    27 : '&#x25C7;',
    22 : '&#x25B2;',
    26 : '&#x25B3;',
    29 : '&#x2B51;',
    30 : '&#x2B52;'
};

