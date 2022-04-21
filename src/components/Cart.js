import {Link} from "react-router-dom";

export default function Cart({cart}) {
    return(
        <Link to="/order" className="nav-link">
        <i className="bi bi-cart-fill fs-3"></i>
          <span>{cart.length}</span>
        </Link>
    )
}