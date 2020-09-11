let express = require ('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const Media = require('../db').import('../models/media');

router.get('/', (req, res) => {
	res.send('Hello World Media!')
})

router.post('/create', validateSession, (req,res) =>{
    const mediaEntry = {
        type: req.body.media.type,
        title: req.body.media.title,
        genre: req.body.media.genre,
        description: req.body.media.description,
        rating: req.body.media.rating,
        consumed: req.body.media.consumed,
        platform: req.body.media.platform,
        userId: req.user.id
    }
    Media.create(mediaEntry)
    .then(media => res.status(200).json(media))
    .catch(err => res.status(500).json({ error: err}))
});


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


module.exports = router;

