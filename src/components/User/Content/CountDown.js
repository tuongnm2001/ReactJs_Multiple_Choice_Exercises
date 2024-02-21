import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const CountDown = (props) => {

    let { onTimeUp } = props;

    const toHHMMSS = (secs) => {
        const sec_num = parseInt(secs, 10)
        const hours = Math.floor(sec_num / 3600)
        const minutes = Math.floor(sec_num / 60) % 60
        const seconds = sec_num % 60

        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
    }

    return (
        <div className="countdown-container time">
            <CountdownCircleTimer
                isPlaying
                duration={600}
                colors={['#1fa81e', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[7, 5, 2, 0]}
                onComplete={() => {
                    onTimeUp();
                }}
            >
                {({ remainingTime }) => toHHMMSS(remainingTime)}
            </CountdownCircleTimer>
        </div>
    );
}

export default CountDown;