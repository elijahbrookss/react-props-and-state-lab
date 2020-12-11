import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }

  }

  onChangeType = (e) => {
    this.setState({
        filters: {
          type: e.target.value
        }
      }
    );
  }

  onFindPetsClick = () => {
    let url = '/api/pets'
    if(this.state.filters.type!=='all'){
      url = `/api/pets?type=${this.state.filters.type}`
    }
    fetch(url)
    .then(response => response.json())
    .then(pets => {
      this.setState({
        pets: pets
      });
    });
  }

  onAdoptPet = (petId) => {
    this.state.pets.forEach(pet => {
        if(pet.id === petId){
          pet.isAdopted = true;
        }
    });
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
