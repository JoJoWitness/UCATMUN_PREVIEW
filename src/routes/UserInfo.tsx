import { useState } from 'react'
import comitte from '../assets/Emblem_of_the_United_Nations.svg'
import country from '../assets/Flag_of_Denmark.svg.png'
import ucatmun from '../assets/ucatmun.png'
import user from '../assets/CAM01301.jpg'

import { UserSnackContainer, UserTextContainer } from '../components/userAtoms'
import "../styles/userInfo.css"

export const UserInfo = () =>{

  const [changeHeader, setChangeHeader] = useState(false)

 
  return(
    <div className="user_container">
      {changeHeader ? <HeaderWithPhoto/>: <HeaderWithoutPhoto/>}
      
      <div className='user_info_container'>
        <UserTextContainer
            title={"Nombre"}
            content={"John Doe"}
          />
          <UserTextContainer
            title={"Institucion"}
            content={"Universidad Experimental del Tachira"}
          />
          <UserTextContainer
            title={"Delegación"}
            content={"MUNET"}
          />
          <UserTextContainer
            title={"Numero"}
            content={"0414-1234567"}
          />
          <UserTextContainer
            title={"Correo"}
            content={"JohnDoe@gmail.com"}
          />
          <UserTextContainer
            title={"Alergias"}
            content={"No"}
          />

          <UserSnackContainer
            snacks={[true, true, false]}
            />

          <img src={ucatmun} style={{width: "84px", marginTop: "36px"}}/>
      
          <button className='buttonToggler' onClick={() => setChangeHeader(!changeHeader)}>
            Cambiar Cabezera
          </button>
      </div>
     

    </div>
  )
}

const HeaderWithoutPhoto = () => {
  const header = "Asamblea General"
  const originalCountryName = "Kongeriget Danmark"
  const cuntryName = "Reino de Dinamarca"


  return(
    <div className="user_header">
        <div className="user_header_band">
          <img className='user_header_comitte' src={comitte}/>
          <h1>{header}</h1>
        </div>
        <div className='user_header_countryInfo'>
          <img src={country}/>
          <p>{originalCountryName}</p>
          <h2>{cuntryName}</h2>
        </div>
      </div>
  )
}

const HeaderWithPhoto = () => {
  const header = "Asamblea General"
  const originalCountryName = "Kongeriget Danmark"
  const cuntryName = "Reino de Dinamarca"


  return(
    <div className="user_header">
        <div className="user_header_band_ph">
          <img className='user_header_Img' src={comitte}/>
          <h1>{header}</h1>
          <img className='user_header_flag' src={country}/>
        </div>
        <div className='user_header_countryInfo'>
          <img src={user} className='user_photo'/>
          <p>{originalCountryName}</p>
          <h2>{cuntryName}</h2>
        </div>
      </div>
  )
}