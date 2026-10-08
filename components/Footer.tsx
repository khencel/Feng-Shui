import Link from "next/link";
import { FaFacebook, FaInstagramSquare, FaYoutube   } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="feng-footer">
      <div className="container">
        <div className="row gy-4">

          {/* Logo / Brand */}
          <div className="col-lg-4 col-md-12">
            <div className="footer-brand">
              <Link href="/" className="feng-brand">
                <div className="feng-logo">
                    <span>◈</span>
                </div>

                <div className="feng-brand-text">
                    <div className="feng-title">FENG SHUI</div>
                    <div className="feng-tagline">
                    HARMONY · BALANCE · PROSPERITY
                    </div>
                </div>
                </Link>

              <p className="footer-copyright">
                © {new Date().getFullYear()} Feng Shui. All Rights Reserved.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-4 col-6">
            <h6>QUICK LINKS</h6>

            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-2 col-md-4 col-6">
            <h6>SERVICES</h6>

            <ul>
              <li><a href="/services/home-feng-shui">Home Feng Shui</a></li>
              <li><a href="/services/business-feng-shui">Business Feng Shui</a></li>
              <li><a href="/services/bazi">BaZi & Destiny</a></li>
              <li><a href="/services/relationship">Relationship</a></li>
              <li><a href="/services/energy-calculator">Energy Calculator</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-lg-2 col-md-4 col-6">
            <h6>RESOURCES</h6>

            <ul>
              <li><a href="/feng-shui-guide">Feng Shui Guide</a></li>
              <li><a href="/five-elements">Five Elements</a></li>
              <li><a href="/bagua-map">Bagua Map</a></li>
              <li><a href="/articles">Articles</a></li>
              <li><a href="/faqs">FAQs</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-lg-2 col-md-4 col-6">
            <h6>FOLLOW US</h6>

            <div className="footer-socials">
              <a href="#" aria-label="Facebook">
                <FaFacebook />
              </a>

              <a href="#" aria-label="Instagram">
                <FaInstagramSquare />
              </a>

              <a href="#" aria-label="YouTube">
                <FaYoutube />
              </a>

              {/* <a href="#" aria-label="Pinterest">
                <i className="bi bi-pinterest"></i>
              </a> */}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}