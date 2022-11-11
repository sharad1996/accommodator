import UserController from '../controllers/UserController';
import isAuth from '../middleware/isAuth';

module.exports = router => {
  router.post('/register', UserController.register);
  router.put('/:uuid',isAuth, UserController.updateUser);
  router.put('/',isAuth, UserController.updateUser);
  router.post('/get',isAuth, UserController.getUser);
  router.post('/add', UserController.addUserFromPanel);
  router.post('/get/all',isAuth, UserController.getUsers);
  // router.post('/role', AuthorizationController.saveNewRole);
  // router.post('/role/get', AuthorizationController.getAllRoles);
  // router.post('/role/get/:roleId', AuthorizationController.getRole);
  // router.put('/role/:roleId', AuthorizationController.updateRole);
  // router.delete('/role/:roleId', AuthorizationController.deleteRole);
  router.delete('/:uuid',isAuth, UserController.deleteUserFromPanel);
};
