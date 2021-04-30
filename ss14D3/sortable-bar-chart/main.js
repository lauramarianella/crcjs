// https://observablehq.com/@d3/sortable-bar-chart@255
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["alphabet.csv",new URL("./files/thefile",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Sortable Bar Chart

Use the dropdown menu to change the sort order.`
)});
  main.variable(observer("viewof order")).define("viewof order", ["html"], function(html)
{
  const options = [
    {label: "Alphabetical", value: (a, b) => a.name.localeCompare(b.name)},
    {label: "Frequency, ascending", value: (a, b) => a.value - b.value},
    {label: "Frequency, descending", value: (a, b) => b.value - a.value}
  ];
  const form = html`<form style="display: flex; align-items: center; min-height: 33px;"><select name=i>${options.map(o => html`<option>${document.createTextNode(o.label)}`)}`;
  const timeout = setTimeout(() => {
    form.i.selectedIndex = 2;
    form.onchange();
  }, 2000);
  form.onchange = () => {
    clearTimeout(timeout);
    form.value = options[form.i.selectedIndex].value;
    form.dispatchEvent(new CustomEvent("input"));
  };
  form.value = options[form.i.selectedIndex].value;
  return form;
}
);
  main.variable(observer("order")).define("order", ["Generators", "viewof order"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["d3","width","height","data","x","y","xAxis","yAxis"], function(d3,width,height,data,x,y,xAxis,yAxis)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);
  
  const bar = svg.append("g")
      .attr("fill", "steelblue")
    .selectAll("rect")
    .data(data)
    .join("rect")
      .style("mix-blend-mode", "multiply")
      .attr("x", d => x(d.name))
      .attr("y", d => y(d.value))
      .attr("height", d => y(0) - y(d.value))
      .attr("width", x.bandwidth());
  
  const gx = svg.append("g")
      .call(xAxis);
  
  const gy = svg.append("g")
      .call(yAxis);

  return Object.assign(svg.node(), {
    update(order) {
      x.domain(data.sort(order).map(d => d.name));

      const t = svg.transition()
          .duration(750);

      bar.data(data, d => d.name)
          .order()
        .transition(t)
          .delay((d, i) => i * 20)
          .attr("x", d => x(d.name));

      gx.transition(t)
          .call(xAxis)
        .selectAll(".tick")
          .delay((d, i) => i * 20);
    }
  });
}
);
  main.variable(observer("update")).define("update", ["chart","order"], function(chart,order){return(
chart.update(order)
)});
  main.variable(observer("data")).define("data", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("alphabet.csv").text(), ({letter, frequency}) => ({name: letter, value: +frequency}))
)});
  main.variable(observer("x")).define("x", ["d3","data","margin","width"], function(d3,data,margin,width){return(
d3.scaleBand()
    .domain(data.map(d => d.name))
    .range([margin.left, width - margin.right])
    .padding(0.1)
)});
  main.variable(observer("y")).define("y", ["d3","data","height","margin"], function(d3,data,height,margin){return(
d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)]).nice()
    .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","x"], function(height,margin,d3,x){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0))
)});
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y"], function(margin,d3,y){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
)});
  main.variable(observer("height")).define("height", function(){return(
500
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top: 20, right: 0, bottom: 30, left: 40}
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  return main;
}
