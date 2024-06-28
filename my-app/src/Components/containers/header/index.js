import {Link} from "react-router-dom";

const MainHeader = () => {
    return (
        <>
            <header data-bs-theme="dark">
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <div className="container">
                        <Link className={'navbar-brand'} to={"/"}>Carousel</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to={"/"}>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Link</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                                </li>
                            </ul>

                            <ul className="navbar-nav ">
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to={"/login"}>Log In</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/register"}>Sign Up</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}
export default MainHeader;