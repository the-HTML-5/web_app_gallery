const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const categories = [
  'books',
  'business',
  'donations',
  'education',
  'entertainment',
  'finance',
  'fitness',
  'food',
  'fundraising',
  'games',
  'government',
  'health',
  'kids',
  'lifestyle',
  'magazines',
  'medical',
  'music',
  'navigation',
  'news',
  'personalization',
  'photo',
  'politics',
  'productivity',
  'security',
  'shopping',
  'social',
  'sports',
  'travel',
  'utilities',
  'weather',
];

const webAppSchema = new mongoose.Schema(
  {
    manifestURL: { type: String, required: true },
    startURL: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    appleMobileWebAppCapable: { type: 'boolean', default: false },
    themeColor: { type: String },
    backgroundColor: { type: String },
    category: { type: String, required: true, enum: categories },
    icons: [
      {
        src: { type: String },
        purpose: { type: String },
      },
    ],
  },
  { timestamps: true },
);

webAppSchema.plugin(mongoosePaginate);

const WebApp = mongoose.model('WebApp', webAppSchema);

module.exports = WebApp;