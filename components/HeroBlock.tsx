export const HeroBlock = () =>  {
    return (
        <div className="hero">
            <p className="hero-kicker">WELCOME</p>

            <h1 className="hero-title">
                GTI <span className="hero-gradient">PORTFOLIO</span>
                <span className="hero-underline" aria-hidden />
            </h1>

            <p className="hero-sub">
                Tap a brand to view all images instantly.
            </p>

            <div className="g-dots" aria-hidden>
                <span />
                <span />
                <span />
                <span />
            </div>
        </div>
    );
}
