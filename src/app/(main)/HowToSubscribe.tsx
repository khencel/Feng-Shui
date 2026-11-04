
import styles from "./HowToSubscribe.module.css";

export default function HowToSubscribe() {
    return (
        <section className={styles.subscribeSection}>
            <div className={styles.container}>

                <div className={styles.heading}>
                    <span>SUBSCRIPTION GUIDE</span>
                    {/* <h2>How to Subscribe</h2>
                    <p>
                        Follow these simple steps to activate
                        your Feng Shui subscription.
                    </p> */}
                </div>

                <div className={styles.content}>
                    <ol>
                        <li>
                            Enter your subscription code in the field above.
                        </li>
                        <li>
                            Contact the Administration to request the
                            official bank account details for payment.
                        </li>
                        <li>
                            Transfer the subscription fee through online
                            banking using the payment details provided
                            by the Administration.
                        </li>
                        <li>
                            Send your proof of payment to the
                            Administration for verification.
                        </li>
                        <li>
                            Once your payment has been verified,
                            your subscription will be activated.
                        </li>
                    </ol>

                    <div className={styles.notice}>
                        <strong>IMPORTANT</strong>
                        <p>
                            Please contact the Administration before making
                            any payment. Do not transfer money to any
                            unverified bank account.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
