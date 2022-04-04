import {Link} from "react-router-dom";

export default function Cart({cart}) {
    return(
        <Link to="/order" className="nav-link">
        <i class="bi bi-cart-fill"></i>
          <span>{cart.length}</span>
        </Link>
    )
}