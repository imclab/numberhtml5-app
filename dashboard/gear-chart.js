(function(exports) {

function AngleChart(options) {
  this.angle = 0;
  this._init();
}

AngleChart.prototype.setValue = function(value) {
};

AngleChart.prototype._init = function() {
  // Draw a circle.
  // Draw an arrow pointing in the current direction.
  // Keep a handle to the arrow object because we're going to be moving it
  // around.
  var svg = d3.select("body").insert("svg:svg", "form")
    .attr("width", w)
    .attr("height", h)
  .append("svg:g")
    .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")scale(.9)")
  .append("svg:g")
    .data([{radius: r * 5}]);

svg.append("svg:g")
    .attr("class", "ring")
    .data([{teeth: 80, radius: -r * 5, ring: true}])
  .append("svg:path")
    .attr("class", "gear")
    .attr("d", gear);

var sun = svg.append("svg:g")
    .attr("class", "sun")
    .data([{teeth: 16, radius: r}])
  .append("svg:g")
    .attr("class", "gear");

sun.append("svg:path")
    .attr("d", gear);

sun.append("svg:text")
    .attr("x", r / 2 + 6)
    .attr("dy", ".31em")
    .attr("text-anchor", "middle")
    .text("D3");

var planet1 = svg.append("svg:g")
    .attr("class", "planet")
    .attr("transform", "translate(0,-" + r * 3 + ")")
    .data([{teeth: 32, radius: -r * 2}])
  .append("svg:g")
    .attr("class", "gear");

planet1.append("svg:path")
    .attr("d", gear);

planet1.append("svg:text")
    .attr("x", -r)
    .attr("dy", ".31em")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(45)")
    .text("CSS");

var planet2 = svg.append("svg:g")
    .attr("class", "planet")
    .attr("transform", "translate(" + -r * 3 * x + "," + -r * 3 * y + ")")
    .data([{teeth: 32, radius: -r * 2}])
  .append("svg:g")
    .attr("class", "gear");

planet2.append("svg:path")
    .attr("d", gear);

planet2.append("svg:text")
    .attr("x", -r)
    .attr("dy", ".31em")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(45)")
    .text("HTML");

var planet3 = svg.append("svg:g")
    .attr("class", "planet")
    .attr("transform", "translate(" + r * 3 * x + "," + -r * 3 * y + ")")
    .data([{teeth: 32, radius: -r * 2}])
  .append("svg:g")
    .attr("class", "gear");

planet3.append("svg:path")
    .attr("d", gear);

planet3.append("svg:text")
    .attr("x", -r)
    .attr("dy", ".31em")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(45)")
    .text("SVG");

d3.selectAll("input[name=reference]")
    .data([r * 5, Infinity, -r])
    .on("change", function(d) { svg.data([{radius: d}]); });

d3.selectAll("input[name=speed]")
    .on("change", function() { speed = +this.value; });

function gear(d) {
  var n = d.teeth,
      r2 = Math.abs(d.radius),
      r0 = r2 - 8,
      r1 = r2 + 8,
      r3 = d.ring ? (r3 = r0, r0 = r1, r1 = r3, r2 + 20) : 20,
      da = Math.PI / n,
      a0 = -Math.PI / 2 + (d.ring ? Math.PI / n : 0),
      i = -1,
      path = ["M", r0 * Math.cos(a0), ",", r0 * Math.sin(a0)];
  while (++i < n) path.push(
      "A", r0, ",", r0, " 0 0,1 ", r0 * Math.cos(a0 += da), ",", r0 * Math.sin(a0),
      "L", r2 * Math.cos(a0), ",", r2 * Math.sin(a0),
      "L", r1 * Math.cos(a0 += da / 3), ",", r1 * Math.sin(a0),
      "A", r1, ",", r1, " 0 0,1 ", r1 * Math.cos(a0 += da / 3), ",", r1 * Math.sin(a0),
      "L", r2 * Math.cos(a0 += da / 3), ",", r2 * Math.sin(a0),
      "L", r0 * Math.cos(a0), ",", r0 * Math.sin(a0));
  path.push("M0,", -r3, "A", r3, ",", r3, " 0 0,0 0,", r3, "A", r3, ",", r3, " 0 0,0 0,", -r3, "Z");
  return path.join("");
}

d3.timer(function() {
  var angle = (Date.now() - start) * speed,
      transform = function(d) { return "rotate(" + angle / d.radius + ")"; };
  svg.selectAll(".gear").attr("transform", transform);
  svg.attr("transform", transform); // fixed ring
});
};

exports.AngleChart = AngleChart;
})(window);
