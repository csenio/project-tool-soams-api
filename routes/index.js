const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const Project = require('../models/note');

const ctrlNotes = require('../controllers/notes');

router.get('/notes', ctrlNotes.notesReadMany); // get all
router.post('/notes', ctrlNotes.notesCreateOne); // create note
router.put('/notes/:id', ctrlNotes.notesUpdateOne); // change column
router.delete('/notes/:id', ctrlNotes.notesDeleteOne); // delete note

// router.get('/notes/:id', ctrlNotes.notesReadOne); // get one

module.exports = router;
