module.exports = {
  test: function(foo) {
    return foo;
  },

  surveyTools: {
    totalResults: function(surveyResults) {
      let totalCount = 0;
      for (var i = 0; i < surveyResults.length; i++) {
        totalCount++;
      }
      return totalCount;
    }
  }
}
