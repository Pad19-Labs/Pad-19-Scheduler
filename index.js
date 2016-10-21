module.exports = {
  test: function(foo) {
    return foo;
  },

  surveyTools: {
    totalResults: function(surveyResults) {
      return surveyResults.length;
    },
    tabulateResults: function(resultsArray, humanReadable) {
      let counts = {};

      for (let i = 0; i < resultsArray.length; i++) {
        let resultArray = resultsArray[i];

        for (let i = 0; i < resultArray.length; i++) {
          result = resultArray[i];

          if (counts.hasOwnProperty(result)) {
            counts[result]++;
          } else {
            if (humanReadable) {
              counts[result] = 1;
            } else {
              counts[result] = 0;
            }
          }
        }
      }
      return counts;
    }
  }
}
