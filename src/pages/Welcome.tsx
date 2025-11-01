import SemiCircleLogin from "../components/SemiCircleLogin";
import Waves from "../components/Waves";

// login admin : Aurel  pwd:  1111  

export default function Welcome() {
  return (
      <div className="welcome-wrapper">
        <div className="welcome-text"> 
          <h1 style={{color: "rgba(18, 134, 237, 0.6)"}}>You are very welcome to our Fishy Shop</h1> 
          <p style={{color: "rgba(18, 134, 237, 0.6)"}}>..and nothing fishy here</p>
        </div>
          <SemiCircleLogin/>
          <Waves/>
    </div>
  )
}
