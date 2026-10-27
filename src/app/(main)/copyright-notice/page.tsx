
import styles from "./page.module.css";

export default function Copyright() {
  return (
    <main className={styles.copyrightPage}>
      {/* HERO BANNER */}
      <section className={styles.copyrightHero}>
        <div className={styles.heroOverlay}>
          <p className={styles.eyebrow}>
            PERIOD 9 STRATEGIC MANAGEMENT
          </p>

          <h1>Copyright Notice</h1>

          <div className={styles.goldDivider}>
            <span />
          </div>
        </div>
      </section>

      {/* COPYRIGHT CONTENT */}
      <section className={styles.copyrightContent}>
        <div className={styles.contentInner}>
          <article className={styles.noticeBlock}>
            <p>
              Period 9 Strategic Management Services would like
              to express to the public that the terminologies,
              approach, charts, and but not limited wordings
              belongs to Joey Yap. Joey Yap Research Group Sdn
              Bhd. The references used for these are the Qi Men
              Dun Jia Compendium vol. 2, Plumbblossom Divination,
              Yi Oracle Number, Yi Jing Mastery, Qi Men
              Forecasting Methods.
            </p>
          </article>

          <div className={styles.ornamentalDivider}>
            <span />
          </div>

          <article className={styles.noticeBlock}>
            <p>
              The Founder of Period 9 Strategic Management
              Services is an alumni of Mastery Academy of
              Chinese Metaphysics in Malaysia under the direct
              supervision of training of Dato Joey Yap.
            </p>
          </article>

          <div className={styles.ornamentalDivider}>
            <span />
          </div>

          <article className={styles.noticeBlock}>
            <p>
              As such, the founder would like to give credits
              and acknowledgement to Team Joey Yap.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
