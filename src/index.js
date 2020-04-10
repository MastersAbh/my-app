import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import  get  from 'lodash/get';
import  filter  from 'lodash/filter';
import forEach from 'lodash/forEach';
import  isEmpty  from 'lodash/isEmpty';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';
import * as serviceWorker from './serviceWorker';
import { KeyObject } from 'crypto';
import Search from './search-component';

export class Covid extends React.Component {
  constructor(props) {
		super(props);
		this.handleSearchValueOnChange = this.handleSearchValueOnChange.bind(this);
		this.setKey = this.setKey.bind(this);
    this.state = {
			covidData: {},
			displayedData: {},
			indiaData: {},
			displayedIndiaData: {},
			searchValue: "",
			deathCount: "",
			recoverCount: "",
			activeKey: "world"
    };
	}

	getTableBody() {
		let tableData = [];
		forEach(this.state.displayedData, (data, key) => {
			const casesToday = `${data.cases} | ${data.todayCases}`;
			const deathsToday = `${data.deaths} | ${data.todayDeaths}`;
			if (!isEmpty(data.country) && data.country !== "World") {
					tableData.push(
						<tr>
							<td>
								<Alert variant="primary">
										<Alert.Heading>
												{data.country}
										</Alert.Heading>
								</Alert>
							</td>

							<td>
								<Alert variant="primary">
										<Alert.Heading>
												{casesToday}
										</Alert.Heading>
								</Alert>
							</td>
							<td>
								<Alert variant="success">
										<Alert.Heading>
												{data.recovered}
										</Alert.Heading>
								</Alert>
							</td>
							<td>
								<Alert variant="danger">
										<Alert.Heading>
												{deathsToday}
										</Alert.Heading>
								</Alert>
							</td>
						</tr>
				
					);
			}
	});
		return tableData;
	}

	getSpinner() {
		if (isEmpty(this.state.covidData)) {
			return (
				<div>
						<Spinner
						as="span"
						animation="grow"
						size="md"
						role="status"
						aria-hidden="true"
					/>
						Loading...
				</div>
			);
		}
	}

	getTableBodyForIndia() {
		let tableData = [];
		forEach(this.state.displayedIndiaData, (data, key) => {
			const casesToday = `${data.confirmedCasesIndian} | ${data.confirmedCasesForeign}`;
			const deathsToday = `${data.deaths}`;
			tableData.push(
				<tr>
					<td>
						<Alert variant="primary">
								<Alert.Heading>
										{data.loc}
								</Alert.Heading>
						</Alert>
					</td>

					<td>
						<Alert variant="primary">
								<Alert.Heading>
										{casesToday}
								</Alert.Heading>
						</Alert>
					</td>
					<td>
						<Alert variant="success">
								<Alert.Heading>
										{data.discharged}
								</Alert.Heading>
						</Alert>
					</td>
					<td>
						<Alert variant="danger">
								<Alert.Heading>
										{deathsToday}
								</Alert.Heading>
						</Alert>
					</td>
				</tr>
			);
	});
		return tableData;
	}

	getTableForIndia() {
		return (
			<Table
			hover
			variant="dark"
			responsive
			size="sm">
			 <thead>
				<tr>
					<th>
					<Badge variant="light"
						className="covid__table-header"
					>State</Badge>
					</th>
					<th><Badge variant="light"
						className="covid__table-header"
					>Cases (Indians | Foreigners)</Badge></th>
					<th><Badge variant="light"
						className="covid__table-header"
					>Recovered</Badge></th>
					<th><Badge variant="light"
						className="covid__table-header"
					>Deaths</Badge></th>
				</tr>
			 </thead>
			 <tbody>
				 {this.getTableBodyForIndia()}
			 </tbody>
			</Table>
		);
	}

	getTable() {
		return (
			<Table
			hover
			variant="dark"
			responsive
			size="sm">
			 <thead>
				<tr>
					<th>
					<Badge variant="light"
						className="covid__table-header"
					>Country</Badge>
					</th>
					<th><Badge variant="light"
						className="covid__table-header"
					>Cases (Total | Today)</Badge></th>
					<th><Badge variant="light"
						className="covid__table-header"
					>Recovered</Badge></th>
					<th><Badge variant="light"
						className="covid__table-header"
					>Deaths (Total | Today)</Badge></th>
				</tr>
			 </thead>
			 <tbody>
				 {this.getTableBody()}
			 </tbody>
			</Table>
		);
	}

	getHeader() {
		return(
			<div className="covid__full-data-body">
				<Accordion>
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="0">
      Global Coronavirus Information
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="0">
			<Card.Body>
				The data is updated every 24 hours and has been taken from official WHO statistics
				<hr />
				Stay Home. Stay Safe
			</Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion>
			</div>
		);
	}

	getDisplayedData(searchValue) {
		let covidData = this.state.covidData;
		let regionValue = "country";
		if (this.state.activeKey === "india") {
				covidData = this.state.indiaData;
				regionValue = "loc";
		}
		const displayedData = filter(covidData, (data, key) => {
			const region = get(data, regionValue, '').toLowerCase();
			return region.indexOf(searchValue.toLowerCase()) === 0;
		});
		return displayedData;
	}

	handleSearchValueOnChange(e) {
		const searchValue = e.target.value;
		let newStateValue = {};
		newStateValue.searchValue = searchValue;
		if (this.state.activeKey === "world") {
				let displayedData = this.getDisplayedData(searchValue);
			
				if(displayedData.length === 0) {
					newStateValue.displayedData = this.state.covidData;
					newStateValue.searchValue = "";
					alert('Invalid search');
				} else {
					newStateValue.displayedData = displayedData;
				}
		} else {
			let displayedIndiaData = this.getDisplayedData(searchValue);
			if(displayedIndiaData.length === 0) {
				newStateValue.displayedIndiaData = this.state.indiaData;
				newStateValue.searchValue = "";
				alert('Invalid search');
			} else {
				newStateValue.displayedIndiaData = displayedIndiaData;
			}
		}
		this.setState(newStateValue);
	}

	setKey(k) {
		this.setState({
			activeKey: k,
			searchValue: "",
			displayedData: this.state.covidData,
			displayedIndiaData: this.state.indiaData
		});
	}

  render(){

		/*let options = [];
		if (!isEmpty(covid)) {
			forEach(covid, (data, value) => {
					console.log(data, value);
					console.log("jell");
			});
		}*/

	  return (
			<div className="covid__body">
				{this.getHeader()}
				<div className="covid__search-component">
					<Search
						searchValue={this.state.searchValue}
						searchValueOnChange={this.handleSearchValueOnChange}
					/>
				</div>
				<Tabs
					id="controlled-tab-example"
					activeKey={this.state.activeKey}
					onSelect={(k) => this.setKey(k)}
				>
					<Tab eventKey="world" title="World">
					<div className = "covid__table">
						{this.getTable()}
						{this.getSpinner()}
				</div>
					</Tab>
					<Tab eventKey="india" title="India">
					<div className = "covid__table">
						{this.getTableForIndia()}
						{this.getSpinner()}
				</div>
					</Tab>
				</Tabs>
			</div>
    );
	}
	componentDidMount(){
		document.title = "Covid Update";

		// https://api.covid19india.org/state_district_wise.json
		// https://api.covid19india.org/data.json
		// https://api.rootnet.in/covid19-in/stats/latest
		// https://api.rootnet.in/covid19-in/stats/daily

		fetch('https://api.rootnet.in/covid19-in/stats/daily')
		.then(results => {
				return results.json();
		}).then(data => {
				console.log(data);
				const indiaData = get(data, 'data', []);
				const obj = get(indiaData[indiaData.length - 1], 'regional', {});
				this.setState({
					indiaData: obj,
					displayedIndiaData: obj
				});
		});

		fetch('https://coronavirus-19-api.herokuapp.com/countries')
		.then(results => {
				return results.json();
		}).then(data => {
			let totalCountObj = {
				country: 'All Countries',
				cases: 0,
				todayCases: 0,
				deaths: 0,
				todayDeaths: 0,
				recovered: 0,
				active: 0,
				critical: 0
			};
			let processData = function(){

				data.forEach(function(obj){
					totalCountObj.cases += obj.cases;
					totalCountObj.todayCases += obj.todayCases;
					totalCountObj.deaths += obj.deaths;
					totalCountObj.todayDeaths += obj.todayDeaths;
					totalCountObj.recovered += obj.recovered;
					totalCountObj.active += obj.active;
					totalCountObj.critical += obj.critical;
				});
				data.unshift(totalCountObj);
			}
			processData();
			this.setState({
				covidData: data,
				displayedData: data
			});
		});
  }
}

ReactDOM.render(
  <Covid />,
  document.getElementById('root')
);

serviceWorker.unregister();
