# Alo Moves Front End Interview Project

This project is designed to implement a comment box. The box has the following specifications:

* Display existing comments in a list
* Create and delete comments
* Highlight posted hashtags and have them link to their corresponding hashtag page on Alo Moves URL format: https://www.alomoves.com/hashtags/[HASHTAG_NAME], where [HASHTAG_NAME] is the hashtag without the # sign

To accomplish this task, I utilized the following technologies.


# React

React serves as the base for this front end project. I have separated out each aspect of the project into its own component, with accompanying snapshot tests.

I chose to nest the [`CommentList.js`](src/components/CommentList.js) component within the [`HomePage.js`](src/components/HomePage.js) component. I made this decision to demonstrate that the `CommentList` itself is modular and can be placed anywhere.

This level of flexibility is also evident in the [`EditCommentForm.js`](src/components/EditCommentForm.js) module. This module has the capability to be used as an add, edit, or even delete form at any point in the future with only minimal modifications.

# Redux

I chose to use [Redux](https://redux.js.org/) to store and manage the state for this project. While it may seem overkill to use redux for a simple comment list, I made this decision for two reasons.

1) It allowed me to demonstrate how Redux operates as a single source of truth for state by leveraging pure functions. This is especially important when dealing with asynchronous actions. I used the [Thunk](https://github.com/reduxjs/redux-thunk) library to achieve this asynchronicity.
2) It will allow me to future proof the site. By creating a single-source based state with compartmentalized business logic and pure functions, I will now be able to access, modify, and delete comments from anywhere in the site in the future. See [`Redux`](/src/redux) folder for more information.

However, the limited scope of the current project could allow for alternative configurations. Were we to decide not to add the comments to the Redux state (e.g. to reduce global state bloat), then it would be quite simple to refactor the existing code to use local state management.

This state management would reside in [`CommentList.js`](src/components/CommentList.js). The functions used to modify it would propagate to its children using passed down props.

This Comment List component could either be a [stateful class component](https://reactjs.org/docs/react-component.html) or [functional component utilizing newer React hooks features](https://reactjs.org/docs/hooks-intro.html) (i.e. `useState()` and `useEffect()`).

# Hashtags

Part of the specification of the project was to enable hyperlinking and highlighting of hashtags.

I originally wrote my own regex replacement pattern to detect and replace these hashtags, as seen here.

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

However, I soon recognized that this approach limited implementation of future pattern recognition, such as email or url linking. Instead, I opted to use the established and tested [Linkify](https://soapbox.github.io/linkifyjs/) library. This library provides out-of-the-box linking for email and urls. It only requires minimal setup to enable custom domain linking for hashtags and `@`-based mentions.

# Visual Design

I took the majority of my visual design cues from the existing [Alo Moves](https://alomoves.com) website. This decision led me to a minimalist, modern, material-design oriented interface.

Alo Moves' existing design language heavily favors modern, minimalist, material-design oriented interfaces. This includes a black and white color palette and squared buttons. The Alo Moves website forms do not include labels, but rather rely on placeholder text to visually direct users. 

## Form Validation
Rather than using harsh or jarring form validation errors, the Alo Moves website uses a softer, non-invasive method for validation. For example, users who have not fully completed the [sign-up form](https://www.alomoves.com/membership) are unable to click on the 'Start your free trial' button. The form submit button is simply greyed out until all fields are completed.

I copied these design cues in both the [`AddComment.js`](src/components/AddComment.js) and [`EditCommentForm.js`](src/components/EditCommentForm.js) modules.

## Departure From Existing Design

I made several small, but perhaps significant, changes to the visual design language of Alo Moves to accomodate the needs of the project.

1) I colored the confirmation button in the [`DeleteComment.js`](src/components/DeleteComment.js) module red. This was a visual cue to indicate that this was a permanent and irreversible decision that the user would want to think strongly about before completing.
2) I changed the sizing of several buttons. The design language for Alo Moves includes large buttons with extensive padding. This works very well on the main website, where buttons are sources of focus. However, in a comment list it felt incongruous to have large, black buttons competing for visual space with the comments themselves. As such, I reduced the size of the `EDIT` and `DELETE` buttons in the [`CommentItem.js`](src/components/CommentItem.js) component and played around with spacing elsewhere (e.g. [`EditCommentForm.js`](src/components/EditCommentForm.js)).

# Testing

I implementing snapshot testing for all of the React components. These tests can be found in the [`tests/components`](src/tests/components) directory.

There are also tests for the Redux actions, reducers, and selectors as well. These can be found in the [`tests/redux`](src/tests/redux) directory.

# Next Steps

I have created this comment list to be ready to implement and fit well within the existing design language of Alo Moves. However, there are several ways we could move it to the next level of user interaction and accessibility.

1) Increase use and frequency of aria labelling. I unfortunately did not have enough time to properly implement all of the accessibility features that I would have liked to do.
2) Consult with Alo Moves designers to bring the visual language more in line with company branding and schema.
3) Add functionality to commenting, including user names, visible time stamps (differentiate between createdAt and updatedAt), and the ability to add images or reaction gifs.
4) Provide visual cues for asyncronous loading. Currently, the comments take a moment to render, edit, or delete  while the front-end waits for confirmation from Firestore. This could be smoothed out by providing visual indicators to the user that we are awaiting server responses, such as moving dots or spinning wheels (e.g. the [`LoadingPage.js`](src/components/LoadingPage.js))