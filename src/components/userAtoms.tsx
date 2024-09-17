import food_dim from '../assets/lunch_dim.svg'
import food_lit from '../assets/lunch_lit.svg'


type UserTextContainerProps = {
  title: string;
  content: string;

};

type UserSnackContainerProps ={
  snacks: boolean[]
}


export const UserTextContainer: React.FC<UserTextContainerProps> = ({ title, content }) => {

  return(
    <div className="user_text_container">
      <h3>{title}</h3>
      <div className="user_text_bubble">
        <p>{content}</p>  
      </div>
    </div>
  )
}


export const UserSnackContainer:  React.FC<UserSnackContainerProps> = ({snacks }) =>{
  return(
    <div className="user_snack_container">
      <h3>Refrigerios</h3>
      <div className="user_snack_img">
        {snacks.map((snack, index) => (
            snack ? <img key={index} src={food_lit}/> : <img key={index} src={food_dim}/>
          ))}
      </div>
    </div>
  )
}



