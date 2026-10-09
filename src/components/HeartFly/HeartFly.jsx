import './heartFly.css'

const COLORS = ["#e23b57", "#d1264a", "#ff5d7a", "#c81e4a", "#ff7a8a"]

const HEARTS = Array.from({ length: 48 }, (_, id) => ({
    id,
    left: 8 + Math.random() * 84,
    size: 2 + Math.random() * 3,
    duration: 3.5 + Math.random() * 4.5,
    delay: -Math.random() * 8,
    drift: Math.round(Math.random() * 24 - 12),
    opacity: (0.75 + Math.random() * 0.25).toFixed(2),
    color: COLORS[id % COLORS.length],
}))

function HeartFly() {
    return (
        <div className="heart-fly" aria-hidden="true">
            {HEARTS.map((heart) => (
                <span
                    key={heart.id}
                    style={{
                        left: `${heart.left}%`,
                        width: `${heart.size}px`,
                        height: `${heart.size}px`,
                        color: heart.color,
                        animationDuration: `${heart.duration}s`,
                        animationDelay: `${heart.delay}s`,
                        "--drift": `${heart.drift}px`,
                        "--heart-opacity": heart.opacity,
                    }}
                >
                    <svg viewBox="0 0 24 24" width="100%" height="100%">
                        <path
                            fill="currentColor"
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        />
                    </svg>
                </span>
            ))}
        </div>
    );
}

export default HeartFly;
