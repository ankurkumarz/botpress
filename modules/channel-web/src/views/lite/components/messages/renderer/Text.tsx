import React, { useState } from 'react'
import Linkify from 'react-linkify'

import { Renderer } from '../../../typings'
import { renderUnsafeHTML } from '../../../utils'

/**
 * A simple text element with optional markdown
 * @param {boolean} markdown Enable markdown parsing for the given text
 * @param {string} text The text to display
 * @param {boolean} escapeHTML Prevent unsafe HTML rendering when markdown is enabled
 * @param {number} maxLength Enables show more button when text overflows limit
 */
export const Text = (props: Renderer.Text) => {
  const [showMore, setShowMore] = useState(false)
  const { maxLength, markdown, escapeHTML, intl } = props
  let text = props.text
  let hasShowMore

  if (intl && maxLength && text.length > maxLength) {
    hasShowMore = true
    if (!showMore) {
      const newMessage = text.substring(0, maxLength)

      text = `${newMessage}${newMessage.substring(-1) !== '.' && '...'}`
    }
  }

  let message = <p>{text}</p>
  if (markdown) {
    const html = renderUnsafeHTML(text, escapeHTML)

    message = <div dangerouslySetInnerHTML={{ __html: html }} />
  }

  return (
    <Linkify properties={{ target: '_blank' }}>
      <div>{message}</div>

      {hasShowMore && (
        <button type="button" onClick={e => setShowMore(!showMore)} className="bpw-message-read-more">
          {showMore &&
            intl.formatMessage({
              id: 'messages.showLess',
              defaultMessage: 'Show Less'
            })}
          {!showMore &&
            intl.formatMessage({
              id: 'messages.readMore',
              defaultMessage: 'Read More'
            })}
        </button>
      )}
    </Linkify>
  )
}

export default Text
