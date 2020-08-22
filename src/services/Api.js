import React, { Component } from 'react'
// import Main from '../components/Main.js'
import $ from 'jquery'
import Key from './key.json'

class Api extends Component {
  constructor ( props ) {
    super( props )

    this.state = {
      data: null,
      loading: false,
      fetched: false,
      latitude: 23.4868653,
      longitude: 113.0602017 // tokyo
    }
  }

  // update weather
  getWeather () {
    if ( navigator && navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition( ( position ) => {
        this.setState( {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          loading: true
        } )

        return $.getJSON( 'https://api.openweathermap.org/data/2.5/weather?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&appid=' + Key.data + '&units=metric&lang=pt_br')
          .then( ( data ) => {
            console.log( data )
            this.setState( {
              data: data,
              loading: true,
              fetched: true
            } )
          } ) // json
      } )
    } else {
      console.log( 'Not supported!' )
      alert( 'Não suportado!' )
    }
  }

  componentDidMount () {
    this.getWeather()
  }

  render () {
    const { fetched } = this.state
    let content

    if ( fetched ) {
      let temperature = Math.round(this.state.data.main.temp)

    const divStyle = {
        width: "100%",
        height: "100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover"
      }

      content =
        <main style={divStyle}>
          { this.state.data ? (
            <section  className='weather-results'>
              <div>
                <p>
                  Hoje em <strong>{ this.state.data.name }</strong> com <strong>{ this.state.data.weather[ 0 ].description }</strong>, a temperatura está por volta de <strong className="gradient-txt">{ temperature }º</strong>.
                </p>
                <p className='small'>
                  <span className='additional-info'>Velocidade  do vento: {this.state.data.wind.speed}m/s</span>
                  <span className='additional-info'>Humidade: {this.state.data.main.humidity}%</span>
                </p>
              </div>
            </section>

             ) : (
             <span>Nothing to see.</span>
             ) }
        </main>
    } else {
      content =
        <div className='container-loading'>
            <span className="marker--pulse"></span>
            <p>Enable location.</p>
        </div>
    }

    return <div className="full">
             { content }
           </div>
  }
}

export default Api
