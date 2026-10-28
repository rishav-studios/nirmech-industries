"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("sending");

    // Simulate sending — replace with actual API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEmail("");
    setStatus("idle");
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Image
            className={styles.logo}
            src="/logo.jpeg"
            alt="Nirmech Industries"
            width={160}
            height={40}
            priority
          />
          <span className={styles.headerTag}>Est. Jamnagar, India</span>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        <h1 className={styles.heading}>
          Under
          <br />
          Construction
        </h1>

        <div className={styles.contactList}>
          <div className={styles.contactItem}>
            <span className={styles.contactDash} />
            <span className={styles.contactLabel}>
              Call:{" "}
              <a href="tel:+919510626066">+91 95106 26066</a>
            </span>
          </div>

          <div className={styles.contactItem}>
            <span className={styles.contactDash} />
            <span className={styles.contactLabel}>
              Email:{" "}
              <a href="mailto:sales@nirmech.com">sales@nirmech.com</a>
            </span>
          </div>

          <div className={styles.contactItem}>
            <span className={styles.contactDash} />
            <span className={styles.contactLabel}>
              Address. Plot No. 3884, Y-Road,
              <br />
              Phase II, G.I.D.C., Dared,
              <br />
              Jamnagar — 361004, Gujarat, India.
            </span>
          </div>
        </div>

        <div className={styles.ctaSection}>
          <button
            className={styles.ctaButton}
            onClick={() => setShowModal(true)}
          >
            Request Company Presentation
            <span className={styles.ctaArrow}>→</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <Image
            className={styles.footerLogo}
            src="/logo.jpeg"
            alt="Nirmech Industries"
            width={120}
            height={28}
          />
          <span className={styles.footerText}>
            © {new Date().getFullYear()} Nirmech Industries. All rights reserved.
          </span>
        </div>
      </footer>

      {/* Presentation Request Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalClose}
              onClick={handleCloseModal}
              aria-label="Close"
            >
              ×
            </button>

            {status === "sent" ? (
              <div className={styles.successMessage}>
                <span className={styles.successIcon}>✓</span>
                <h3 className={styles.successTitle}>Request Sent</h3>
                <p className={styles.successText}>
                  Our company presentation will be sent to
                  <br />
                  <strong>{email}</strong> shortly.
                </p>
              </div>
            ) : (
              <>
                <h2 className={styles.modalTitle}>Company Presentation</h2>
                <p className={styles.modalSubtitle}>
                  Enter your email address and we&apos;ll send you our detailed
                  company presentation.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.formLabel}>
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={styles.formInput}
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>

                  {status === "error" && (
                    <p className={styles.errorText}>
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={status === "sending" || !email}
                  >
                    {status === "sending" ? "Sending..." : "Send Presentation"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
