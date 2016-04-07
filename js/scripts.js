// Taken from https://bl.ocks.org/mbostock/a4b53ef57fce8fffc423

function InitExample1() {

	var canvas = document.querySelector("canvas"),
	    context = canvas.getContext("2d"),
	    width = canvas.width,
	    height = canvas.height;

	var n = 400,
	    pi = Math.PI,
	    tau = 2 * pi;

	var nodes = d3.range(n).map(function() {
	  var r = Math.random() * width / 3,
	      a = Math.random() * tau,
	      x = width / 2 + r * Math.cos(a),
	      y = height / 2 + r * Math.sin(a);
	  return {
	    x: x,
	    y: y,
	    px: x + (height / 2 - y) * 0.006,
	    py: y + (x - width / 2) * 0.006
	  };
	});

	var force = d3.layout.force()
	    .charge(0.2)
	    .gravity(0)
	    .friction(1)
	    .nodes(nodes)
	    .size([width, height])
	    .start();

	var stroke = d3.scale.linear()
	    .domain([0, 10])
	    .range(["magenta", "yellow"]);

	force.on("tick", function(e) {
	  context.clearRect(0, 0, width, height);
	  context.lineWidth = 4;
	  context.lineCap = "round";

	  for (var i = 0, node, vx, vy; i < n; ++i) {
	    node = nodes[i], vx = node.x - node.px, vy = node.y - node.py;
	    context.beginPath();

	    context.moveTo(node.x, node.y);
	    context.lineTo(node.x + vx * 3, node.y + vy * 3);
	    context.strokeStyle = stroke(vx * vx + vy * vy);
	    context.stroke();
	  }

	  force.resume();
	});
}


// Taken from http://codepen.io/mshwery/pen/uCBbn

function InitExample2() {

	var n = 10, // how many bars?
    random = function() { return Math.floor(Math.random() * 100); }, // randomize some numbers for data
    data = d3.range(n).map(random); // an array of randomized datapoints

	var barChart = {
	  init: function() {
	    this.height = 100;
	    this.width = 220;
	    this.padding = 12;
	    this.el = ".bar-chart"; // where we'll put our svg 

	    // calculate the bar width from the total chart width
	    barWidth = Math.floor((this.width - (this.padding * (data.length - 1))) / data.length);
	    barHeight = this.height - 20;


	    this.svg = d3.select(this.el).insert('svg', ':first-child')
	      .attr('width', this.width)
	      .attr("height", this.height);
	    
	    this.draw();
	  },
	    draw: function() {
	    this.meters = this.svg
	      .append("g")
	        .attr("class", "meter")
	        .selectAll("rect")
	          .data(data)
	          .enter()
	          .append('g')
	            .attr("class", "bar");

	    this.drawBar().attr("class", "background").attr("y", 0).attr("height", barHeight);
	    this.drawBar().attr("class", "foreground").attr("y", barHeight).attr("height", 0);
	  },
	    // this actually draws a bar
	  drawBar: function () {
	    var self = this;

	    return this.meters.append("rect")
	      .attr("x", function (d, i) {
	        return i * (barWidth + self.padding);
	      })
	      .attr("width", barWidth);
	  },
	 update: function () {
	      var self = this;
	      // select the foreground bars and call the animate method on them
	      d3.selectAll("rect.foreground").each(self.animate);
	  },

	  animate: function (d, i) {
	    var total = data[i];
	    var bar = d3.select(this);
	    if (barHeight - total != bar.attr("y")) {
	      bar.transition().duration(1500).attr("height", total).attr("y", barHeight - total);
	    }
	  }
	}

	barChart.init();

	// In this example, every couple seconds update the bar chart with new numbers!
	setInterval(function() {
	  data = d3.range(n).map(random); // get new random numbers
	  barChart.update();
	}, 2000);  
}