exports.createRef = (arr, key, value) => {
  return arr.reduce((ref, element) => {
    ref[element[key]] = element[value];
    return ref;
  }, {});
};

exports.formatReviews = (reviews, idLookupVenue, idLookupUser) => {
  return reviews.map(({ place_name, author, ...restOfReview }) => {
    const venue_id = idLookupVenue[place_name];
    const user_id = idLookupUser[author];
    return {
      venue_id,
      user_id,
      author,
      place_name,
      ...restOfReview,
    };
  });
};
