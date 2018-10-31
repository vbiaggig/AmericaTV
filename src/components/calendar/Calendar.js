import React, { Component } from 'react';

const database = window.firebase.database();
const arrayDay = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
const arrayIDCalendar = [];

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      arrayIdCalendar: []
    }
    this.myRef = React.createRef();
  }

  componentDidMount() {
    database.ref('/calendar').once('value').then((snapshot) => {
      this.setState({ data: snapshot.val() })
    });
    database.ref('/booking').once('value').then(snapshot => {
      // console.log(snapshot.val())
      const { arrayIdCalendar } = this.state;
      Object.values(snapshot.val()).map(snap => {
        // console.log(snap.idCalendar)
        arrayIdCalendar.push(snap.idCalendar)
      })
      this.setState({
        arrayIdCalendar: arrayIdCalendar
      })
    })
  }

  render() {
    console.log(this.props.statusCalendar)
    return (
      <div className="container bg-white table-container d-flex justify-content-center">
        <table className="table-item table-striped">
          <thead>
            <tr>
              <th scope="col">Hora</th>
              <th scope="col">Domingo 4</th>
              <th scope="col">Lunes 5</th>
              <th scope="col">Martes 6</th>
              <th scope="col">Miércoles 7</th>
              <th scope="col">Jueves 8</th>
              <th scope="col">Viernes 9</th>
              <th scope="col">Sabado 10</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.data.map((data, i) => {
                return (
                  <tr key={`data${i}`}>
                    <th scope="row">{i < 10 ? ('0' + i) : i}:00 - {(i + 1) < 10 ? ('0' + (i + 1)) : (i + 1)}:00</th>
                    {
                      arrayDay.map((day, j) => {
                        const newID = i + "-" + day + "-" + data[day].name + "-" + data[day].price;
                        arrayIDCalendar.push(newID)
                        return (<td ref={this.myRef} key={`day${j}`} className={`td text-secondary hour${i}`} id={newID} onClick={this.handleClick.bind(this)} handleGetLength={this.handleGetLength.bind(this)}>{data[day].name}</td>)
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>

      </div>
    );
  }

  handleClick(e) {
    e.preventDefault();
    this.props.handleChangeStatus(true);
    const newTarget = e.target.id.split('-');
    const hour = (newTarget[0] < 10 ? ('0' + newTarget[0]) : newTarget[0]);
    this.props.handleGoForm(e.target.id, hour, newTarget[1], newTarget[2], newTarget[3]);
  }

  handleGetLength(asd){
    // console.log(asd)
  }
}

export default Calendar;
