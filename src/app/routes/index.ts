import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/users/user.route';

const router = Router();

const modulesRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

// router.use('/users', UserRoutes);
// router.use('/student', StudentRoutes);

export default router;
