import './navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function Navbar() {
    return (
        <div classNameName="App">
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand">Navbar</a>
                    <form className="d-flex" role="search">
                            <button className="btn btn-outline-success" type="submit">Login</button>
                    </form>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
