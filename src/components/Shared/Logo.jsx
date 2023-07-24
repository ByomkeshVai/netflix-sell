import { Link } from "react-router-dom";
import logos from "../../assets/main.png";

const Logo = () => {
  return (
    <Link to="/">
      <img className="h-28 sm:h-18" src={logos} alt="" />
    </Link>
  );
};

export default Logo;
