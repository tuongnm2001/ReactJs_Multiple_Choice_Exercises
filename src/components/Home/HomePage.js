import videoHomePage from "../../assest/video-homepage.mp4"

const HomePage = () => {
    return (
        <div className="homepage-container">
            <video autoPlay loop muted>
                <source src={videoHomePage} type="video/mp4" />
            </video>

            <div className="homepage-content">
                <div className="title1">There's a better way to ask</div>
                <div className="title2">Effortlessly co-create your forms with AI. Then keep improving them with AI insights.</div>
                <button className="btn btn-homepage">Get's Started. It's free</button>
            </div>
        </div>
    );
}

export default HomePage;