const options = {
  className: {
    hashtag: 'hashtag'
  },
  formatHref: {
    hashtag: (val) => 'https://alomoves.com/hashtags/' + val.substring(1)
  },
  target: {
    hashtag: '_blank'
  }
};

export default options;