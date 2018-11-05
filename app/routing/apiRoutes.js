var friendsData = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function(req, res) {
    // perform the businesss logic of identifying closest 
    // match to user. return.json(friendsData[i]); back
    var newUser = req.body;
    var compatibleUserIndex = 0;
    var previousDifference = 0;

    for (var i = 0; i < friendsData.length; i++) {
      var currentUserScore = friendsData[i].scores;
      var currentDifference = 0;

      // loop through current user's scores, calcuating difference with 
      // new users scores and totaling difference
      for (var j = 0; j < currentUserScore.length; j++) {
        currentDifference += Math.abs(currentUserScore[j] - newUser.scores[j]);
      }

      // if the difference with current user is less than previous, assign current index as most compatible.
      if (currentDifference < previousDifference) compatibleUserIndex = i;

      // set previous difference to be current difference for next loop.
      previousDifference = currentDifference;
    }

    // we push new user into the data.
    friendsData.push(newUser);
    // we send back the most compatible person.
    res.json(friendsData[compatibleUserIndex]);
  });
};