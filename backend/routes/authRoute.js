const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
//const userController = require("../controllers/project.controller");
const passport = require("passport");
const { isRole, ROLES } = require("../security/RoleMiddelwaire");
const profilecontroller = require("../controllers/profile.controller");
const projectcontroller  = require("../controllers/projectController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);

// router.get(
//   "/Test",
//   passport.authenticate("jwt", { session: false }),
//   isRole(ROLES.USER),
//   userController.Test
// );
// router.get(
//   "/Admin",
//   passport.authenticate("jwt", { session: false }),
//   isRole(ROLES.ADMIN),
//   userController.Admin
// );

router.post(
  "/profiles",
  passport.authenticate("jwt", { session: false }),
  isRole(ROLES.SUPERADMIN),
  profilecontroller.AddProfile
);
router.get(
  "/profiles",
  passport.authenticate("jwt", { session: false }),
  isRole(ROLES.SUPERADMIN),
  profilecontroller.FindAllProfiles
);
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  isRole(ROLES.SUPERADMIN),
  profilecontroller.FindSingleProfile
);
router.delete(
  "/profiles/:id",
  passport.authenticate("jwt", { session: false }),
  isRole(ROLES.SUPERADMIN),
  profilecontroller.DeleteProfile
);
router.put(
  "/profiles/:id",
  passport.authenticate("jwt", { session: false }),
  isRole(ROLES.SUPERADMIN),
  profilecontroller.UpdateProfile
);



router.post('/projects', passport.authenticate('jwt', { session: false }), isRole(ROLES.SUPERADMIN, ROLES.ADMIN), projectcontroller.createProject);
router.get('/projects', passport.authenticate('jwt', { session: false }), isRole(ROLES.SUPERADMIN, ROLES.ADMIN), projectcontroller.getAllProjects);
router.put('/projects/:id', passport.authenticate('jwt', { session: false }), isRole(ROLES.SUPERADMIN, ROLES.ADMIN), projectcontroller.updateProject);
router.delete('/projects/:id', passport.authenticate('jwt', { session: false }), isRole(ROLES.SUPERADMIN ), projectcontroller.deleteProject);


module.exports = router;
