import { useEffect, useState } from 'react'
import ucatmun from '../assets/ucatmun.png'
import { UserSnackContainer, UserTextContainer } from '../components/userAtoms'
import "../styles/userInfo.css"
import Psi from '../assets/IUPsyS.png'
import Oit from '../assets/ILO.png'
import Cop16 from '../assets/cop16.png'
import Onu from '../assets/Emblem_of_the_United_Nations.svg'
import caef_omc from '../assets/CAEF-OMC.png'
import UEFA from '../assets/uefa.png'
import "../styles/navbar.css"
import Bilderberg from '../assets/Bilderberg.png'
import Prensa from '../assets/prensa.png'
import Protoclo from '../assets/protocolo.svg'
import { supabase } from '../supabaseClient'

export const UserInfo = () =>{

  const lastPathSegment = location.pathname.split('/').filter(Boolean).pop();

  interface Delegado {
    cedula: string;
    cargo: string;
    representacion: string;
    comite: string;
    nombre: string;
    delegacion: string;
    telefono: string;
    correo: string;
    alergias: string;
    numero_rep?: string;
    refrigerios: number
  }

  const [delegado, setDelegado] = useState<Delegado | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [countryUrl, setCountryUrl] = useState<string>("");
  const [nombreOficial, setNombreOficial] = useState<string>("");
  const [cargo, setCargo] = useState<string>("")
  const [comite, setComite] = useState<string>("")
  const [fileExists, setFileExists] = useState<boolean>(false)
  const [comiteImgUrl, setComiteImgUrl] = useState<string>("")


  const comiteImg: { [key: string]: string } = {
    "IUPsyS": Psi,
    "OIT" : Oit,
    "COP16" : Cop16,
    "GEGNU": Onu,
    "CAEF-OMC": caef_omc,
    "UEFA": UEFA,
    "Bilderberg": Bilderberg,
    "Prensa": Prensa,
    "Protocolo": Protoclo,
    "Mesas": ucatmun

  }



  const fetchDelegado = async () =>{
    const { data, error } = await supabase
    .from("ucatmun_delegados")
    .select()
    .eq("cedula",lastPathSegment)
    .single()

    if (error) {
      console.error("Error fetching tweets:", error);
    } else {
      setDelegado(data)
      setCargo(data?.cargo)
    }
    
  }

  async function fetchImage() {
    try {
      const { data: files, error: listError } = await supabase
        .storage
        .from('users_image')
        .list('')
      if (listError) {
        console.error("Error listing files:", listError);
      
        return;
      }
  
      setFileExists(files.some(file => file.name === `${delegado?.cedula}`));
  
      
        const { data } = await supabase
          .storage
          .from('users_image')
          .getPublicUrl(`${delegado?.cedula}`);
  
        if (!data) {
          console.error("Error fetching image URL");
        } else {
          setImageUrl(data.publicUrl);
          console.log(data.publicUrl)
        }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  }
  
  async function fetchFlag() {
    const { data, error } = await supabase
      .storage
      .from('flags')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .getPublicUrl(`${delegado?.representacion}.png`) as { data: { publicUrl: string }, error: any }
    if (error) {
      console.error("Error fetching image:", error);
    } else {
      setCountryUrl(data.publicUrl);
    }
  }

  async function fetchCountry() {
    const { data, error } = await supabase
      .from('ucatmun_paises')
      .select('nombre_oficial')
      .eq('nombre', delegado?.representacion)
      .single()  
    if (error) {
      console.error("Error fetching image:", error);
    } else {
      setNombreOficial(data.nombre_oficial);
    }
  }

  async function fetchComite() {
    const { data, error } = await supabase
      .from('ucatmun_comites')
      .select('comite')
      .eq('comite_id', delegado?.comite)
      .single()  
    if (error) {
      console.error("Error fetching image:", error);
    } else {
      setComite(data.comite);
    }
  }

 

  
  useEffect(() => {
    fetchDelegado();

    return () => {
    
      setDelegado(null);
    };
  }, [lastPathSegment]);

  useEffect(() => {
    if (delegado) {
      fetchImage();
      fetchCountry();
      fetchFlag()
      fetchComite();
     setComiteImgUrl(comiteImg[delegado?.comite || ""]);
    }
  }, [delegado]);

  
 

  return(
    <div className="user_container">
     
    {fileExists ?
      <HeaderWithPhoto
      comiteImg={comiteImgUrl}
      nombrePai={nombreOficial}
      nombreOficial={cargo}
      imageUrl={imageUrl}
      countryUrl={countryUrl}
      nombre_comite={comite}
    />
    :
   

    <HeaderWithoutPhoto
    comiteImg={comiteImgUrl}
    nombrePai={nombreOficial}
    nombreOficial={cargo}
    imageUrl={countryUrl}
    nombre_comite={comite}
  />
    }

     
      
      <div className='user_info_container'>
        <UserTextContainer
            title={"Nombre"}
            content={delegado?.nombre}
          />
          <UserTextContainer
            title={"Delegación"}
            content={delegado?.delegacion}
          />
          <UserTextContainer
            title={"Numero"}
            content={delegado?.telefono}
          />
          <UserTextContainer
            title={"Correo"}
            content={delegado?.correo}
          />
          <UserTextContainer
            title={"Alergias"}
            content={delegado?.alergias}
          />

          {delegado?.numero_rep ? 
            <UserTextContainer 
              title={"Numero de emergencia"} 
              content={delegado?.numero_rep}/>
            : null
            }



          <UserSnackContainer
            snacks={delegado?.refrigerios}
            />

          


          <img src={ucatmun} style={{width: "84px", marginTop: "36px", minHeight: "84px"}}/>
      
      </div>
     

    </div>
  )
}

type HeaderWithoutPhotoProps = {
  nombre_comite: string;
  comiteImg: string;
  imageUrl: string;
  nombreOficial: string;
  nombrePai: string;
}

const HeaderWithoutPhoto = ({comiteImg,nombre_comite, imageUrl, nombreOficial, nombrePai}: HeaderWithoutPhotoProps) => {

  let nombrePais = nombrePai

  if (nombrePai =="Espana") {
    nombrePais = "España"
  } else if (nombrePai == "Japon"){
    nombrePais = "Japón"
  }

  return(
    <div className="user_header">
        <div className="user_header_band">
          <img className='user_header_comitte' src={comiteImg}  />
          <h1>{nombre_comite}</h1>
        </div>
        <div className='user_header_countryInfo'>
          <img src={imageUrl}/>
          <p>{nombreOficial}</p>
          <h2>{nombrePais}</h2>
        </div>
      </div>
  )
}

type HeaderWithPhotoProps ={
  nombre_comite: string;
  comiteImg: string;
  imageUrl: string ;
  countryUrl: string ;
  nombreOficial: string;
  nombrePai: string;
}

const HeaderWithPhoto = ({comiteImg, nombre_comite, imageUrl, countryUrl, nombreOficial, nombrePai}: HeaderWithPhotoProps) => {
  
  let nombrePais = nombrePai

  if (nombrePai =="Espana") {
    nombrePais = "España"
  } else if (nombrePai == "Japon"){
    nombrePais = "Japón"
  }



  return(
    <div className="user_header">
        <div className="user_header_band_ph">
          <img className='user_header_Img' src={comiteImg}/>
          <h1>{nombre_comite}</h1>
          <img className='user_header_flag' src={countryUrl}/>
        </div>
        <div className='user_header_countryInfo'>
          <img src={imageUrl} className='user_photo'/>
          <p>{nombreOficial}</p>
          <h2>{nombrePais}</h2>
        </div>
      </div>
  )
}