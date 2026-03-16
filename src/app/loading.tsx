import styles from "./loading.module.css";

/**
 * Loading state shown during page transitions.
 * Uses skeleton animation to indicate content loading.
 */
export default function Loading() {
  return (
    <div className={styles.container} role="status" aria-label="Loading page">
      <div className={styles.header}>
        <div className={styles.skeletonLogo} />
        <div className={styles.skeletonNav}>
          <div className={styles.skeletonPill} />
          <div className={styles.skeletonPill} />
          <div className={styles.skeletonPill} />
        </div>
      </div>
      
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.skeletonEyebrow} />
          <div className={styles.skeletonTitle} />
          <div className={styles.skeletonText} />
          <div className={styles.skeletonText} style={{ width: "70%" }} />
        </div>
        <div className={styles.skeletonImage} />
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}
