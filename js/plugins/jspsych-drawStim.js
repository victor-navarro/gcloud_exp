
// method for drawing stimuli.
// returns the string description of svg element containing the stimulus


jsPsych.plugins.drawStim = (function() {

    var plugin = {};

    plugin.generate_stimulus = function(lineLength, lineAngle) {

        var size = 300;

        lineLength = Math.round(lineLength * 100) / 100;
        lineAngle = Math.round(lineAngle * 10000) / 10000;

        var xDiff = lineLength * Math.cos(lineAngle) / 2;
        var yDiff = lineLength * Math.sin(lineAngle) / 2;

        var x_start = size/2 - xDiff;
        var x_end = size/2 + xDiff;

        var y_start = size/2 + yDiff;
        var y_end = size/2 - yDiff;

        // create a div to hold the generated svg object
        var stim_div = $('body').append($('<div id="stim-container">'));

        $('#stim-container').append('<svg id="tStim" width="' + size + '" height="' + size + '"></svg>');

        // create the snap object
        var paper = Snap("#tStim");

        var rect = paper.rect(0, 0, size, size);
        rect.attr("fill", "#ffffff").attr("stroke-width", "1").attr("stroke", "#000");

        var line = paper.line(x_start, y_start, x_end, y_end);
        line.attr("stroke-width", "8").attr("stroke", "#0000FF");

        $("#stim-container").find('desc').remove();     // Remove the silly "created by Snap" string
        $("#stim-container").find('defs').remove();     // Remove the defs tag from the string.

        var svg = $("#stim-container").html();

        $('#stim-container').remove();

        return svg;
    };

    return plugin;
})();
