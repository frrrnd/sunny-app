import React, { Component } from 'react'
// import Main from '../components/Main.js'
import $ from 'jquery'
import Key from './key.json'
// import Svg from '../images/loading.svg'

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

  //hasGeolocation();

  // update weather
  getWeather () {
    if ( navigator && navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition( ( position ) => {
        this.setState( {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          loading: true
        } )

        return $.getJSON( 'http://api.openweathermap.org/data/2.5/weather?lat=' + this.state.latitude + '&lon=' + this.state.longitude + '&appid=' + Key.data + '&units=metric' )
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
    const { fetched, loading, data } = this.state
    let content

    if ( fetched ) {
      content =
        <main className='weather-results'>
          { this.state.data ? (
            <section>
              <div>
                <p>
                  Today in <strong>{ this.state.data.name }</strong>, with <strong>{ this.state.data.weather[ 0 ].description }</strong>, the temperature is around <strong className="gradient-txt">{ this.state.data.main.temp }º</strong>.
                </p>
                <p className='small'>
                  <span className='additional-info'>Wind speed: {this.state.data.wind.speed}m/s</span>
                  <span className='additional-info'>Humidity: {this.state.data.main.humidity}%</span>
                  <span className="poweredBy">powered by <a href="https://openweathermap.org/">OpenWeatherMap</a></span>
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
            <p>Ative a localização.</p>
        </div>
    }

    return <div>
             { content }
           </div>
  }
}

export default Api
