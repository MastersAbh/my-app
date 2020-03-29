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
    this.state = {
			covidData: {},
			displayedData: {},
			searchValue: "",
			deathCount: "",
			recoverCount: "",
    };
	}

	getTableBody() {
		let tableData = [];
		forEach(this.state.displayedData, (data, key) => {
			const casesToday = `${data.cases} | ${data.todayCases}`;
			const deathsToday = `${data.deaths} | ${data.todayDeaths}`;
			tableData.push(
				<tr>
					<td>
						<Alert variant="primary">
								<Alert.Heading>
										{data.country}
								</Alert.Heading>
								<hr />

						</Alert>
					</td>

					<td>
						<Alert variant="primary">
								<Alert.Heading>
										{casesToday}
								</Alert.Heading>
								<hr />
						</Alert>
					</td>
					<td>
						<Alert variant="success">
								<Alert.Heading>
										{data.recovered}
								</Alert.Heading>
								<hr />
						</Alert>
					</td>
					<td>
						<Alert variant="danger">
								<Alert.Heading>
										{deathsToday}
								</Alert.Heading>
								<hr />
						</Alert>
					</td>
				</tr>
			);
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
		const displayedData = filter(this.state.covidData, (data, key) => {
			const country = data.country.toLowerCase();
			return country.indexOf(searchValue.toLowerCase()) === 0;
		});
		return displayedData;
	}

	handleSearchValueOnChange(e) {
		const searchValue = e.target.value;
		this.setState({
			searchValue: searchValue,
			displayedData: this.getDisplayedData(searchValue)
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
				<div className = "covid__table">
						{this.getTable()}
						{this.getSpinner()}
				</div>
			</div>
    );
	}
	componentDidMount(){
		document.title = "Covid Update";
		/*fetch('https://pomber.github.io/covid19/timeseries.json')
		.then(results => {
				return results.json();
		}).then(data => {
			this.setState({
				covidData: data
			});
		});*/

		// https://api.covid19india.org/state_district_wise.json
		// https://api.covid19india.org/data.json

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
