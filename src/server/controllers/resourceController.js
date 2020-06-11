const db = require('./../models/resourceModels');
const Resource = require('../../models/resource');
const Tech = require('../../models/tech');
const Comment = require('../../models/comment');
const User = require('../../models/user');
// Initialize controller object
const resourceController = {};

// Get all resources from the db needs to be filtered by TECH_ID:
resourceController.getResources = (req, res, next) => {
  console.log('Inside getResources');
  // declare variable representing the tech id
  let tech_id = req.params.id;
  // perform find method on resource with techId >> techId.name
  // perform find on our React_ID
  Resource.find({ techId: tech_id })
    .exec()
    .then((resource) => {
      res.locals.resources = resource;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

// ============================
// LIST ALL TECHS USED AND IDS
// ============================
resourceController.getTech = (req, res, next) => {
  // get the techs
  Tech.find({})
    .exec()
    .then((techList) => {
      res.locals.techList = techList;
      console.log('IN getTech techList:', techList);
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

// we need a name, desc, url, likes, comments
resourceController.createResources = (req, res, next) => {
  const tech_id = req.body.techId;

  Tech.findById(tech_id)
    .exec()
    .then(
      (tech) =>
        // const { name, description, url, likes, comments } = req.body;
        // whatever the create resource is, we push to tech
        Resource.create({
          name: req.body.name,
          description: req.body.description,
          url: req.body.url,
          likes: 0,
          comments: [],
          techId: tech_id,
        })
          .then((resource) => {
            // console.log(resource);
            // tech needs to be associated with a given resource
            tech.resources.push(resource);
            console.log(tech);
          })
          .then(() => {
            tech.save();
          })
          .then(() => {
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
    });
};

// push a resource onto the tech.resources property --> tech.resources.

resourceController.createTech = (req, res, next) => {
  Tech.create({ id: 7, name: 'Enzyme', resources: [] })
    .then((tech) => {
      res.locals.tech = tech;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

// =======================
// GET COMMENTS by resource._id
// =======================
resourceController.getComment = (req, res, next) => {
  // find our resources by ID and get the comments associated with that Id
  const resource_id = req.body.resourceId;

  Resource.findById(resource_id)
    .then((resource) => {
      const comments = resource.comments;
      res.locals.comments = comments;
      console.log('Comments for a given resource: ', comments);
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

// const reqBody = {
//   resourceId: currentResource,
//   comment: {
//     text: formValue,
//     userName: 'Greg P- ScrumMaster, AtlasMaster'
//   }
// }

// =======================
// CREATE COMMENT
// =======================
resourceController.createComment = (req, res, next) => {
  const resource_id = req.body.resourceId;

  const currTime = Date.now();
  Resource.findById(resource_id)
    .exec()
    .then((resource) =>
      Comment.create({
        text: req.body.comment.text,
        date: currTime,
        userName: req.body.comment.userName,
      })
        .then((comment) => {
          resource.comments.push(comment);
          console.log(resource);
        })
        .then(() => {
          resource.save();
        })
        .then(() => {
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
    });
};

// Creates a new resource by combining a tech id and the request body info

// Increase the like count of a resource by one:
resourceController.addLike = (req, res, next) => {};
// // access likes property on resource and increment by one
// console.log('Inside addLike');
// // declare variable representing the tech id
// let resourceId = req.body.resource_id;
// // perform find method on resource with techId >> techId.name
// // perform find on our Resource_Id
// Resource.find({ _id: '5ee12f3ce11d110f1c35dfb0' }, (err, resource) => {
//   if (err) console.log(err);
//   // resources is the array of objects containing resources
//   const likedResource = resource.likes + 1;
//   res.locals.resources = likedResource;
//   console.log('resource of react tech addLike:', likedResource);
// }).then(() => {
//   return next();
// });

// Decrease the like count of a resource by one
resourceController.subtractLike = (req, res, next) => {};

module.exports = resourceController;
