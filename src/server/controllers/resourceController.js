const db = require('./../models/resourceModels');
const Resource = require('../../models/resource');
const Tech = require('../../models/tech');
const Comment = require('../../models/comment');
const User = require('../../models/user');
// Initialize controller object
const resourceController = {};

// Get all resources from the db based on tech name 
resourceController.getResources = (req, res, next) => {
  console.log("Inside resource controller")
  Resource.find({}, function (err, resource) {
    if (err) console.log(err);
    res.locals.resources = resource;
    console.log(resource);
  }).then(() => {
    return next();
  })

};

// we need a name, desc, url, likes, comments

resourceController.createResources = (req, res, next) => {
  Tech.findById("5ee12f3ce11d110f1c35dfb0").exec().then((tech) =>
    // const { name, description, url, likes, comments } = req.body;
    // whatever the create resource is, we push to tech
    Resource.create({ name: 'nameTest2', description: 'descriptionTest2', url: 'urlTest2', likes: 5, comments: [], techId: "5ee12f3ce11d110f1c35dfb0" })
      .then((resource) => {
        // console.log(resource);
        // tech needs to be associated with a given resource
        tech.resources.push(resource);
        console.log(tech);
      }).then(() => {
        tech.save();
      }).then(() => {
        return next();
      })
      .catch((err) => {
        console.log(err);
        return next(err);
      })
    // push tech onto resources array
  )
    .catch((err) => {
      console.log(err);
      return next(err);
    })
};

// push a resource onto the tech.resources property --> tech.resources.

resourceController.createTech = (req, res, next) => {
  Tech.create({ id: 7, name: 'Enzyme', resources: [] })
    .then((tech) => {
      res.locals.tech = tech;
      return next();
    }).catch((err) => {
      return next(err);
    })
}

resourceController.createComment = (req, res, next) => {
  const currTime = Date.now();
  Resource.findById("5ee15416955bd9125fbdcabd").exec().then((resource) =>

    Comment.create({ text: 'Missing Value', date: currTime, userName: 'CORS Tom' })
      .then((comment) => {
        resource.comments.push(comment);
        console.log(resource);
      }).then(() => {
        resource.save();
      }).then(() => {
        return next();
      })
      .catch((err) => {
        console.log(err);
        return next(err);
      })
  )
    .catch((err) => {
      console.log(err);
      return next(err);
    })
}

// Creates a new resource by combining a tech id and the request body info


// Increase the like count of a resource by one
resourceController.addLike = (req, res, next) => {
  // access likes property on resource and increment by one

};

// Decrease the like count of a resource by one
resourceController.subtractLike = (req, res, next) => {

};

module.exports = resourceController;
