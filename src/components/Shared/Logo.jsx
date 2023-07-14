import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
        <img
          className="h-14 sm:h-18"
          src="https://images.ctfassets.net/4cd45et68cgf/7LrExJ6PAj6MSIPkDyCO86/542b1dfabbf3959908f69be546879952/Netflix-Brand-Logo.png?w=700&h=456"
          alt=""
        />
    </Link>
  );
};

export default Logo;
