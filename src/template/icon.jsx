function Icon({ name, className = "" }) {
    const icons = {
    restart: "./assets/images/icon-restart.svg",
    downArrow: "./assets/images/icon-down-arrow.svg",
    completed: "./assets/images/icon-completed.svg",
    personalBest: "./assets/images/icon-personal-best.svg",
    star1: "./assets/images/pattern-star-1.svg",
    star2: "./assets/images/pattern-star-2.svg",
    confetti: "./assets/images/pattern-confetti.svg"
    };

    return (
    <img src={icons[name]} 
    className={className} 
    alt={name}
    aria-hidden="true" />
    );
}

export default Icon;