(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{162:function(e,a,t){e.exports=t(346)},167:function(e,a,t){},255:function(e,a){},257:function(e,a){},291:function(e,a){},292:function(e,a){},346:function(e,a,t){"use strict";t.r(a);var n=t(29),r=t(30),l=t(33),i=t(31),c=t(32),o=t(25),s=t(0),d=t.n(s),u=t(43),h=t.n(u),v=(t(167),t(169),t(44)),m=t.n(v),p=t(155),y=t.n(p),E=t(96),f=t.n(E),g=t(97),b=t.n(g),D=t(68),C=t(159),O=t(99),k=t(158),w=t(69),j=t(98),I=t(19);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));t(252);var S=t(156),K=t(160),T=function(e){function a(){return Object(n.a)(this,a),Object(l.a)(this,Object(i.a)(a).apply(this,arguments))}return Object(c.a)(a,e),Object(r.a)(a,[{key:"render",value:function(){var e=this;return d.a.createElement("div",null,d.a.createElement(S.a,{className:"mb-3"},d.a.createElement(K.a,{placeholder:"Search for a region..","aria-label":"Region","aria-describedby":"basic-addon2",value:this.props.searchValue,onChange:function(a){return e.props.searchValueOnChange(a)}})))}}]),a}(d.a.Component),V=function(e){function a(){return Object(n.a)(this,a),Object(l.a)(this,Object(i.a)(a).apply(this,arguments))}return Object(c.a)(a,e),Object(r.a)(a,[{key:"render",value:function(){return d.a.createElement("div",{className:"popup"},d.a.createElement("div",{className:"popup_inner"},d.a.createElement("h1",null,this.props.text),d.a.createElement("button",{onClick:this.props.closePopup},"Close me")))}}]),a}(d.a.Component);t.d(a,"Covid",function(){return _});var _=function(e){function a(e){var t;return Object(n.a)(this,a),(t=Object(l.a)(this,Object(i.a)(a).call(this,e))).handleSearchValueOnChange=t.handleSearchValueOnChange.bind(Object(o.a)(Object(o.a)(t))),t.setKey=t.setKey.bind(Object(o.a)(Object(o.a)(t))),t.state={covidData:{},displayedData:{},indiaData:{},displayedIndiaData:{},searchValue:"",deathCount:"",recoverCount:"",activeKey:"world",showPopup:!1},t}return Object(c.a)(a,e),Object(r.a)(a,[{key:"togglePopup",value:function(){this.setState({showPopup:!this.state.showPopup})}},{key:"getTableBody",value:function(){var e=this,a=[];return f()(this.state.displayedData,function(t,n){var r="".concat(t.cases," | ").concat(t.todayCases),l="".concat(t.deaths," | ").concat(t.todayDeaths);b()(t.country)||"World"===t.country||a.push(d.a.createElement("tr",null,d.a.createElement("td",null,d.a.createElement(I.a,{variant:"primary",onClick:e.togglePopup.bind(e)},t.country,e.state.showPopup?d.a.createElement(V,{text:"Happy Birthday Ishani!",closePopup:e.togglePopup.bind(e)}):null)),d.a.createElement("td",null,d.a.createElement(I.a,{variant:"primary"},r)),d.a.createElement("td",null,d.a.createElement(I.a,{variant:"success"},t.recovered)),d.a.createElement("td",null,d.a.createElement(I.a,{variant:"danger"},l))))}),a}},{key:"getSpinner",value:function(){if(b()(this.state.covidData))return d.a.createElement("div",null,d.a.createElement(k.a,{as:"span",animation:"grow",size:"md",role:"status","aria-hidden":"true"}),"Loading...")}},{key:"getTableBodyForIndia",value:function(){var e=[];return f()(this.state.displayedIndiaData,function(a,t){var n="".concat(a.confirmedCasesIndian," | ").concat(a.confirmedCasesForeign),r="".concat(a.deaths);e.push(d.a.createElement("tr",null,d.a.createElement("td",null,d.a.createElement(I.a,{variant:"primary"},a.loc)),d.a.createElement("td",null,d.a.createElement(I.a,{variant:"primary"},n)),d.a.createElement("td",null,d.a.createElement(I.a,{variant:"success"},a.discharged)),d.a.createElement("td",null,d.a.createElement(I.a,{variant:"danger"},r))))}),e}},{key:"getTableForIndia",value:function(){return d.a.createElement(j.a,{hover:!0,variant:"dark",responsive:!0,size:"sm"},d.a.createElement("thead",null,d.a.createElement("tr",null,d.a.createElement("th",null,"State"),d.a.createElement("th",null,"Cases (Indians | Foreigners)"),d.a.createElement("th",null,"Recovered"),d.a.createElement("th",null,"Deaths"))),d.a.createElement("tbody",null,this.getTableBodyForIndia()))}},{key:"getTable",value:function(){return d.a.createElement(j.a,{hover:!0,variant:"dark",responsive:!0,size:"sm"},d.a.createElement("thead",null,d.a.createElement("tr",null,d.a.createElement("th",null,"Country"),d.a.createElement("th",null,"Cases (Total | Today)"),d.a.createElement("th",null,"Recovered"),d.a.createElement("th",null,"Deaths (Total | Today)"))),d.a.createElement("tbody",null,this.getTableBody()))}},{key:"getHeader",value:function(){return d.a.createElement("div",{className:"covid__full-data-body"},d.a.createElement(D.a,null,d.a.createElement(w.a,null,d.a.createElement(D.a.Toggle,{as:w.a.Header,eventKey:"0"},"Global Coronavirus Information"),d.a.createElement(D.a.Collapse,{eventKey:"0"},d.a.createElement(w.a.Body,null,"The data is updated every 24 hours and has been taken from official WHO statistics",d.a.createElement("hr",null),"Stay Home. Stay Safe")))))}},{key:"getDisplayedData",value:function(e){var a=this.state.covidData,t="country";return"india"===this.state.activeKey&&(a=this.state.indiaData,t="loc"),y()(a,function(a,n){return 0===m()(a,t,"").toLowerCase().indexOf(e.toLowerCase())})}},{key:"handleSearchValueOnChange",value:function(e){var a=e.target.value,t={};if(t.searchValue=a,"world"===this.state.activeKey){var n=this.getDisplayedData(a);0===n.length?(t.displayedData=this.state.covidData,t.searchValue="",alert("Invalid search")):t.displayedData=n}else{var r=this.getDisplayedData(a);0===r.length?(t.displayedIndiaData=this.state.indiaData,t.searchValue="",alert("Invalid search")):t.displayedIndiaData=r}this.setState(t)}},{key:"setKey",value:function(e){this.setState({activeKey:e,searchValue:"",displayedData:this.state.covidData,displayedIndiaData:this.state.indiaData})}},{key:"render",value:function(){var e=this;return d.a.createElement("div",{className:"covid__body"},this.getHeader(),d.a.createElement("div",{className:"covid__search-component"},d.a.createElement(T,{searchValue:this.state.searchValue,searchValueOnChange:this.handleSearchValueOnChange})),d.a.createElement(C.a,{id:"controlled-tab-example",activeKey:this.state.activeKey,onSelect:function(a){return e.setKey(a)}},d.a.createElement(O.a,{eventKey:"world",title:"World"},d.a.createElement("div",{className:"covid__table"},this.getTable(),this.getSpinner())),d.a.createElement(O.a,{eventKey:"india",title:"India"},d.a.createElement("div",{className:"covid__table"},this.getTableForIndia(),this.getSpinner()))))}},{key:"componentDidMount",value:function(){var e=this;document.title="Covid Update",fetch("https://api.rootnet.in/covid19-in/stats/daily").then(function(e){return e.json()}).then(function(a){console.log(a);var t=m()(a,"data",[]),n=m()(t[t.length-1],"regional",{});e.setState({indiaData:n,displayedIndiaData:n})}),fetch("https://coronavirus-19-api.herokuapp.com/countries").then(function(e){return e.json()}).then(function(a){var t={country:"All Countries",cases:0,todayCases:0,deaths:0,todayDeaths:0,recovered:0,active:0,critical:0};a.splice(0,8),a.forEach(function(e,a){t.cases+=e.cases,t.todayCases+=e.todayCases,t.deaths+=e.deaths,t.todayDeaths+=e.todayDeaths,t.recovered+=e.recovered,t.active+=e.active,t.critical+=e.critical}),a.unshift(t),e.setState({covidData:a,displayedData:a})})}}]),a}(d.a.Component);h.a.render(d.a.createElement(_,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[162,2,1]]]);
//# sourceMappingURL=main.e28ebaad.chunk.js.map