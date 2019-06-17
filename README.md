

## Regex

```javascript
  // Because React uses JSX instead of HTML, we need to use html-react-parser to turn it into JSX.
  // We could optionally have React simply render it with dangerouslySetInnerHTML, but that is not advised as it opens us up to XSS attacks.
  const formatHashtag = (text) => {
    return text.replace(/\B[#](\S+)\b/g, '<span class="hashtag"><a href="https://www.alomoves.com/hashtags/$1" target="_blank">#$1</a></span>');
  };
  const formattedText = formatHashtag(props.text);

  // Then use the parse library to inject it into the JSX like so.
  import parse from 'html-react-parser';

  <p className='comment__text'>{parse(formattedText)}</p>
```