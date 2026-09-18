import { SectionData } from "./CreateChartClient";
import styles from "./CreateChart.module.css"

interface SectionProps {
    params: SectionData;
}

export default function SectionDetails({
    params
}: SectionProps) {

    return (
        <div className="p-3">

            <div className={styles.heavenStem}>
                <img src="/img/icon/chief.png" style={{width:"30px"}} alt="" />
                <br />
                {params.heavenlyStem}
            </div>

            <div className={styles.earthlyStem}>
                <img src="/img/icon/chief.png" style={{width:"30px"}} alt="" />
                <br />
                {params.earthlyStem}
            </div>

            <div className={styles.starStyle}>
                <img src="/img/icon/chief.png" style={{width:"30px"}} alt="" />
                <br />
                {params.star}
            </div>

            <div className={styles.deityStyle}>
                <img src="/img/icon/chief.png" style={{width:"30px"}} alt="" />
                <br />
                {params.deity}
            </div>

            <div className={styles.doorStyle}>
                <img src="/img/icon/chief.png" style={{width:"30px"}} alt="" />
                <br />
                {params.door}
            </div>

            <div className={styles.numberStyle}>
                {params.number}
            </div>

        </div>
    );
}