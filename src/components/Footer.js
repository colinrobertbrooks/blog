import * as React from 'react';
import { Link } from '@phenomic/preset-react-app/lib/client';

import pkg from '../../package.json';

const Footer = () => (
  <React.Fragment>
    <style
      dangerouslySetInnerHTML={{
        __html: `
        .Footer {
          padding: 40px;
          color: #fff;
          background: #2c2c2c;
          font-size: 12px;
        }
        .Footer-content {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          max-width: 1000px;
          margin: auto;
        }

        .Footer-link {
          color: #fff;
          padding: 10px;
        }

        .Footer-link:hover,
        .Footer-link:focus {
          color: inherit;
        }
        `
      }}
    />
    <footer className="Footer">
      <div className="Footer-content">
        <div className="Footer-part">
          Built with{' '}
          <a
            href="https://phenomic.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {'<Phenomic />'}
          </a>
        </div>
        <div className="Footer-part">
          © {new Date().getFullYear()} {pkg.title}
        </div>
      </div>
    </footer>
  </React.Fragment>
);

export default Footer;
