import { useRef, useEffect } from 'react';


const CircleRating = ({ rate, size }) => {
    const ref = useRef(null);
    useEffect(() => {
        let rateStr = (Math.round(rate*10)/10).toString();
        if(rateStr.length === 1){rateStr += '.0'}
        
        let circleColor;
        let bgCircleColor;

        if (rate >= 7) {
            circleColor = '#3dd07a';
            bgCircleColor = "#204529";
        }
        else if (rate >= 4) {
            circleColor = '#d2d531';
            bgCircleColor = '#423d0f';
        }
        else {
            circleColor = '#db2360';
            bgCircleColor = '#551534';
        }

        const canvas = ref.current;
        const ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.arc(36, 36, 36, 0, 2 * Math.PI);
        ctx.fillStyle = "#06090E";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(36, 36, 30, 0, 2 * Math.PI);
        ctx.lineWidth = 6;
        ctx.lineCap = "round";
        ctx.strokeStyle = bgCircleColor;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(36, 36, 30, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * rate / 10);
        ctx.lineWidth = 6;
        ctx.lineCap = "round";
        ctx.strokeStyle = circleColor;
        ctx.stroke();

        ctx.font = "bold 30px Inconsolata";
        ctx.fillStyle = circleColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(rateStr, 36, 36);
    }, [rate]);
    
    return (
        <canvas ref={ref} height={'72px'} width={'72px'} style={{height:size, width:size}} title='Rated score' />
    )
}


export default CircleRating;