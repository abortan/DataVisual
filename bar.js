const DATA = [
  {id:1,value:5,name:"Kaz"},
  {id:2,value:10,name:"Rus"},
  {id:3,value:15,name:"Kyr"},
  {id:4,value:20,name:"Ukr"}
]


  const listItems = d3.select('ul')
  .selectAll('li')
  .data(DATA,(data)=>data.name)
  .enter()
  .append('li');

  listItems.append('span')
.text((data)=>data.name);

const xScale = d3.scaleBand()
.domain(DATA.map((dp)=>dp.name)).rangeRound([0,250]).padding(0.1);

const yScale = d3.scaleLinear().domain([0,12]).rangeRound([0,200]);

const container = d3.select("svg")
.append('g')
.call(d3.axisBottom(xScale))
.attr('color', '#DD1111');


const bars=container
.selectAll(".bar")
.data(DATA)
.enter()
.append('rect')
.classed('bar', true)
.attr('width', xScale.bandwidth())
.attr('height', data=>yScale(data.value))
.attr('x',data=>xScale(data.name))
.attr('y',data=>200-yScale(data.value));

//.text(data=>data.name);
listItems
.append('input')
.attr('type','checkbox')
.attr('checked',true)
.attr('id',(data)=>data.id)
.on('change', (evnt)=>{
  console.log(evnt.target.id);

  var re = new RegExp("[0-4]");
  changeId = re.exec(evnt.target.id);
  console.log(changeId)
  cid = parseInt(evnt.target.id);
  console.log('cid=' +cid)
  var count=0;
  var q = new Boolean(true);
//  console.log(q)
//  console.log(DATA.length)
  while (count < 4) {
    if ((DATA[count]['id']) == cid) {
      if (DATA[count]['q'] == true) { DATA[count]['q'] = false;
        var filtered = DATA.filter((el)=>el.q!==false);
        //console.log(filtered);

        container.selectAll('.bar')
        .data(filtered, data=>data.id)
        .exit()
        .remove();
      }
      else
      {
        DATA[count]['q'] = true;

        var filtered = DATA.filter((el)=>el.q==true);
      //console.log(filtered);
        container.selectAll('.bar')
        .data(filtered, data=>data.name)
        .enter()
        .append('rect')
        .classed('bar',true)
        .attr('width',xScale.bandwidth())
        .attr('height',data=>yScale(data.value))
        .attr('x',data=>xScale(data.name))
        .attr('y', data=>200-yScale(data.value))
      }
    }
    count++;
  }
});

const M = d3.scaleBand()
.domain(['Jan', 'Feb', 'Mar', 'Apr', 'May'])
.range([1,2]);

console.log(M('Jan'));
console.log(M('Feb'));
console.log(M('Mar'));
console.log(M('Apr'));
console.log(M('May'));
