const router = require("express").Router();
const db = require("../firebase/db");

// login
router.post("/login", (req, res, next) => {
  try {
    db.collection("user")
      .doc(req.body.username)
      .get()
      .then(data => {
        if (data.exists) {
          return res.json(data.id);
        }
        db.collection("user")
          .doc(req.body.username)
          .set({ created_at: new Date() })
          .then(() => {
            return res.json(req.body.username);
          })
          .catch(err => {
            next(err);
          });
      })
      .catch(err => {
        next(err);
      });
  } catch (err) {
    next(err);
  }
});

// all
router.get("/card/:username", (req, res, next) => {
  try {
    db.collection(req.params.username)
      .orderBy("created_at", "asc")
      .get()
      .then(snap => {
        let data = [];
        snap.forEach(doc => {
          data.push({
            id: doc.id,
            ...doc.data()
          });
        });
        return res.json(data);
      })
      .catch(err => {
        next(err);
      });
  } catch (err) {
    next(err);
  }
});

// insert
router.post("/card/:username", (req, res, next) => {
  db.collection(req.params.username)
    .doc()
    .set({
      word: req.body.word,
      hint: req.body.hint,
      trans: req.body.trans,
      created_at: new Date()
    })
    .then(() => {
      return res.json("card created.");
    })
    .catch(err => {
      next(err);
    });
});

// delete
router.delete("/card/:username/:id", (req, res, next) => {
  try {
    db.collection(req.params.username)
      .doc(req.params.id)
      .delete()
      .then(() => {
        return res.json("card deleted.");
      })
      .catch(err => {
        next(err);
      });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
