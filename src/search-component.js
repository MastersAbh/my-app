import React from 'react';
import ReactDOM from 'react-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

export default class Search extends React.Component {

    render() {
        return(
            <div>
                <InputGroup className="mb-3">
    <FormControl
      placeholder="Search for a region.."
      aria-label="Region"
      aria-describedby="basic-addon2"
      value={this.props.searchValue}
      onChange={e => this.props.searchValueOnChange(e)}
    />
  </InputGroup>
            </div>
        );
    }

}
