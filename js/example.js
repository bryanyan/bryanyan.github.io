function InitExample3() {

	var height = 400;
	var width = 400;

	var radius = height/2;

	var data = [
          { color: 'blue', percent: 10 }, 
          { color: 'orange', percent: 20 },
          { color: 'green', percent: 30 },
          { color: 'red', percent: 40 }
    ];

	var color = d3.scale.category10();

	var svg = d3.select("#product")
				.append("svg")
				.attr("class", "pieChart")
				.attr("width", width)
				.attr("height", height)
				.append("g")
				.attr("transform", "translate(" + (width/2) + "," + (height/2) + ")");

	var arc = d3.svg.arc().outerRadius(radius);

	var pie = d3.layout.pie().value(function (d) { return d.percent; })

	var p = svg.selectAll("path")
				.data(pie(data))
				.enter().append("path")
				.attr("d", arc)
				.attr("id", function(d) {
					return d.data.color;
				})
				.attr("fill", function(d) {
					return color(d.data.percent);
				})
				.on("mouseover", function(d) {
					var element = $("#"+d.data.color).position();
					createTooltip(element, d.data.color, d.data.percent);
				})
				.on("mouseout", function(d) {
					destroyToolTip();
				});

				
}

function createTooltip(element, color, percent) {

	var labelText = "<p>" + color + ": " + percent + "%"

	var infolabel = d3.select("#product")
					.append("div")
					.attr("class", "tooltip")
					.html(labelText)
					.style("position", "absolute")
					.style("left", element.left+"px")
					.style("top", element.top+"px");
}

function destroyToolTip() {
	d3.select(".tooltip").remove();
}