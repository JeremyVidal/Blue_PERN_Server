let express = require ('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const Media = require('../db').import('../models/media');


// Endpoints
// POST:  http://localhost:3025/media/create
// GET:   http://localhost:3025/media/
// GET:   http://localhost:3025/media/all
// PUT:   http://localhost:3025/media/:entryId
// DEL:   http://localhost:3025/media/:id


// -----  Media Create  -----
router.post('/create', validateSession, (req,res) =>{
    const mediaEntry = {
        type: req.body.media.type,
        title: req.body.media.title,
        genre: req.body.media.genre,
        description: req.body.media.description,
        rated: req.body.media.rated,
        rating: req.body.media.rating,
        consumed: req.body.media.consumed,
        platform: req.body.media.platform,
        userId: req.user.id
    }
    Media.create(mediaEntry)
    .then(media => res.status(200).json(media))
    .catch(err => res.status(500).json({ error: err}))
});
// -----Get My Media  -----
router.get("/", validateSession, (req, res) => {
    let userid = req.user.id;
    Media.findAll({
      where: {id: userid },
    })
      .then((media) => res.status(200).json(media))
      .catch((err) => res.status(500).json({ error: err }));
  });
// -----  Get All Media -----
router.get("/all", (req, res) => {
    Media.findAll()
      .then((media) => res.status(200).json(media))
      .catch((err) => res.status(500).json({ error: err }));
  });

  // -----  Update Media  -----  
  router.put('/update/:entryId', (req, res) => {
      const updateMediaEntry = {
          type: req.body.media.type,
          title: req.body.media.title,
          genre: req.body.media.genre,
          description: req.body.media.description,
          rating: req.body.media.rating,
          consumed: req.body.media.consumed,
          platform: req.body.media.platform,
        };
        
        const query = { where: { id: req.params.entryId, userId: req.user.id } };
        
        Media.update(updateMediaEntry, query)
        .then((media) => res.status(200).json(media))
        .catch((err) => res.status(500).json({ error: err }));
    });
    
    // -----  Delete a Media Entry  -----
    
module.exports = router;

