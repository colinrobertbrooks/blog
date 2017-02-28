import React, { PropTypes } from "react"

import { Link } from "phenomic"

import Page from "../Page"

import styles from "./index.css"

const PageError = ({ error, errorText }) => (
  <Page
    head={{
      hero: "./assets/images/404/hero.jpg",
    }}
  >
    <div className={ styles.container }>
      <div className={ styles.text }>
        <p className={ styles.title }>
          <strong>{ error }</strong>
          { " " }
          { errorText }
        </p>
        {
          error === 404 &&
          <div>
            { "It looks like you're lost in space. " }
            { "Try heading back " }
            <Link
              to={ "/" }
            >
              { "home" }
            </Link>
            { "." }
          </div>
        }
      </div>
    </div>
  </Page>
)

PageError.propTypes = {
  error: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  errorText: PropTypes.string,
}

PageError.defaultProps = {
  error: 404,
  errorText: "Page Not Found",
}

export default PageError
