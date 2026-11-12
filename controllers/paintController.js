const { body, validationResult } = require('express-validator');
const Paint = require('../models/paint');

const HEX_REGEX = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/;

// displays all paints
exports.paint_list = async (req, res) => {
  const allPaints = await Paint.find().sort({ name: 1 }).exec();
  res.render('paint_list', {
    title: 'Paint Collection',
    paint_list: allPaints,
  });
};

// display Paint create form on GET.
exports.paint_create_get = (req, res) => {
  res.render('paint_form', { title: 'Create Paint' });
};

// handle Paint create on POST.
exports.paint_create_post = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Name must be specified.')
    .escape(),
  body('hexValue')
    .trim()
    .matches(HEX_REGEX)
    .withMessage('Hex value must look like #RGB or #RRGGBB.'),
  body('description').trim().escape(),

  // Recipe fields are optional. Empty form inputs are treated as "not provided".
  body('paint1Hex')
    .optional({ values: 'falsy' })
    .trim()
    .matches(HEX_REGEX)
    .withMessage('Paint 1 hex must look like #RGB or #RRGGBB.'),
  body('paint1Percent')
    .optional({ values: 'falsy' })
    .isFloat({ min: 0, max: 100 })
    .withMessage('Paint 1 percent must be a number from 0 to 100.')
    .toFloat(),
  body('paint2Hex')
    .optional({ values: 'falsy' })
    .trim()
    .matches(HEX_REGEX)
    .withMessage('Paint 2 hex must look like #RGB or #RRGGBB.'),
  body('paint2Percent')
    .optional({ values: 'falsy' })
    .isFloat({ min: 0, max: 100 })
    .withMessage('Paint 2 percent must be a number from 0 to 100.')
    .toFloat()
    // for the schema rule, if both percentages are given, they must sum to 100.
    .custom((value, { req }) => {
      const p1 = req.body.paint1Percent; // already converted by toFloat() above
      if (typeof p1 === 'number' && !Number.isNaN(p1) && Math.abs(p1 + value - 100) > 0.001) {
        throw new Error('Paint 1 and Paint 2 percentages must add up to 100.');
      }
      return true;
    }),

  // process request after validation and sanitization.
  async (req, res) => {
    // extract the validation errors from a request.
    const errors = validationResult(req);

    const {
      name, hexValue, description,
      paint1Hex, paint1Percent, paint2Hex, paint2Percent,
    } = req.body;

    // only include recipe fields the user actually filled in.
    const recipe = Object.fromEntries(
      Object.entries({
        paint1Hex, paint1Percent, paint2Hex, paint2Percent,
      })
        .filter(([, v]) => v !== '' && v != null),
    );

    // create Paint object with escaped and trimmed data
    const paint = new Paint({
      name, hexValue, description, recipe,
    });

    if (!errors.isEmpty()) {
      // there are errors. Render form again with sanitized values/error messages.
      res.render('paint_form', {
        title: 'Create Paint',
        paint,
        errors: errors.array(),
      });
      return;
    }

    // data from form is valid. Save and redirect to the new paint record.
    try {
      await paint.save();
      res.redirect(paint.url);
    } catch (err) {
      // Safety net: the schema's own validation failed.
      if (err.name === 'ValidationError') {
        res.render('paint_form', {
          title: 'Create Paint',
          paint,
          errors: Object.values(err.errors).map((e) => ({ msg: e.message })),
        });
        return;
      }
      throw err;
    }
  },
];

// Display Paint delete form on GET.
exports.paint_delete_get = async (req, res) => {
  // Get details of paints
  const paint = await Promise.all(Paint.findById(req.params.id).exec(),);

  if (paint === null) {
    // no results, redirect to the main collection page.
    res.redirect('/index');
    return;
  }

  res.render('paint_delete', {
    title: 'Delete Paint Color',
    paint,
  });
};
