const WebApp = require('./webapp.model');

// find a web app by id and return
const findWebApp = async (id) => {
  if (!id || id === '') throw new Error('must provide a application id');

  const res = await WebApp.findById(id);
  if (!res) throw new Error('web app not found');
  return res;
};

// make mongoose call to find all web apps and return paginated results
const findWebApps = async (opts = { limit: 10 }) => {
  const res = await WebApp.paginate(
    {},
    {
      ...opts,
      customLabels: {
        docs: 'data',
      },
    },
  );
  return res;
};

// substring search results
const searchWebApps = async (opts = { limit: 10 }, searchQuery) => {
  return await WebApp.paginate(
    { name: { $regex: searchQuery } },
    {
      ...opts,
      customLabels: {
        docs: 'data',
      },
    },
  );
};

// return results for specified category
const findByCategory = async (opts = { limit: 10 }, category) => {
  return await WebApp.paginate(
    { category },
    {
      ...opts,
      customLabels: {
        docs: 'data',
      },
    },
  );
};

// create a new web app and return it
const createWebApp = async (data) => {
  return await WebApp.create(data);
};

module.exports = {
  findWebApp,
  findWebApps,
  searchWebApps,
  findByCategory,
  createWebApp,
};
