import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { animals: [], loading: true };
  }

  componentDidMount() {
    this.populateAnimalsData();
  }

  static renderAnimalsTable(animals) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Name</th>
            <th>Picture</th>
            <th>Animal Type</th>
            <th>Breed</th>
            <th>Gender</th>
            <th>Availability</th>
            <th>Age</th>
            <th>Weight</th>
            <th>Color</th>
            <th>Description</th>
            <th>News</th>
            <th>Date Acquired</th>
          </tr>
        </thead>
        <tbody>
          {animals.map(animal =>
            <tr key={animal.id}>
                  <td>{animal.name}</td>
                  <td>{animal.picture}</td>
                  <td>{animal.type}</td>
                  <td>{animal.breed}</td>
                  <td>{animal.gender}</td>
                  <td>{animal.availability}</td>
                  <td>{animal.age}</td>
                  <td>{animal.weight}</td>
                  <td>{animal.color}</td>
                  <td>{animal.description}</td>
                  <td>{animal.news}</td>
                  <td>{animal.datecreated}</td>
            </tr>
          )}
        </tbody>
        </table>
        
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderAnimalsTable(this.state.animals);

    return (
      <div>
        <h1 id="tabelLabel" >Our Animals</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateAnimalsData() {
    const response = await fetch('api/animals');
    const data = await response.json();
    this.setState({ animals: data, loading: false });
  }
}
