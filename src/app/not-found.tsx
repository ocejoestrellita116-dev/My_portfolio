import Link from "next/link";

import { siteContent } from "@/content/site-content";

import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <div className={styles.card}>
        <div className={styles.errorCode} aria-hidden="true">404</div>
        <p className={styles.eyebrow}>Page not found</p>
        <h1 className={styles.title}>This page is outside the portfolio map.</h1>
        <p className={styles.body}>
          The route does not exist, or the case study has been moved. Use the
          links below to find your way back.
        </p>
        
        <div className={styles.actions}>
          <Link className={styles.primaryLink} href="/">
            Return to homepage
          </Link>
          <Link className={styles.secondaryLink} href="/#cases">
            View case studies
          </Link>
        </div>

        <nav className={styles.suggestions} aria-label="Quick links">
          <p className={styles.suggestionsTitle}>Quick links</p>
          <ul className={styles.suggestionsList}>
            {siteContent.caseStudies.slice(0, 3).map((caseStudy) => (
              <li key={caseStudy.slug}>
                <Link className={styles.suggestionLink} href={`/cases/${caseStudy.slug}`}>
                  {caseStudy.title}
                </Link>
              </li>
            ))}
            <li>
              <Link className={styles.suggestionLink} href="/resume">
                Resume
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
}
