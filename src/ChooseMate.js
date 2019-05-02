import React, { Component } from 'react';

class ChooseMate extends Component {
  constructor(props) {
    super(props);
    this.pokemonsCaughtSorted = '';
    this.state = {
      myValue: '',
    };
  }

  componentWillMount() {
    const { pokemonsCaught } = this.props;
    this.pokemonsCaughtSorted = pokemonsCaught.filter((obj, pos, arr) => arr
      .map(mapObj => mapObj.name).indexOf(obj.name) === pos);

    this.pokemonsCaughtSorted = this.pokemonsCaughtSorted.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } return -1;
    });
  }

  handleChange = (event) => {
    const { getMate, value } = this.props;
    this.setState({ myValue: event.target.value }, () => {
      const { myValue } = this.state;
      getMate(myValue, value);
    });
  }


  render() {
    const { myValue } = this.state;
    return (
      <div className="formPoke" style={{ marginRight: '7vw' }}>
        <form>
          <p>Pick your team mate:</p>
          <div className="list">
            <select
              size={this.pokemonsCaughtSorted.length + 1}
              value={myValue}
              onChange={this.handleChange}
            >
              {this.pokemonsCaughtSorted.length > 0
                ? <option key="none" value="none">Choose 1 of your pokemons</option>
                : <option key="none" value="none">You have 0 pokemon</option>}
              {
                this.pokemonsCaughtSorted.map(monster => (
                  <option key={monster.name} value={`${monster.type} ${monster.name}`}>
                    {monster.name}
                  </option>
                ))
              }

            </select>
          </div>
        </form>
      </div>
    );
  }
}

export default ChooseMate;
