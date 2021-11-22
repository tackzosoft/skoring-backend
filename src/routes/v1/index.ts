import { Router } from "express";
import onboard from "../v1/user/onboard.rou";
import student from "../v1/user/student_register.rou";
import teacher from "../v1/teacher/register_teacher.rou";
import syllabus from "../v1/teacher/sylaabus.rou";
import clases from "../v1/teacher/class.rou"
import teacher_profile from "../v1/teacher/teacher_profile.rou"
import student_profile from "../v1/user/student_profile.rou"
import admin from "../v1/admin/admin.rou"
export default function (router: Router) {

  router.use("/user", onboard(Router()));
  router.use("/user", student(Router()));
  router.use("/teacher", teacher(Router()));
  router.use("/teacher", syllabus(Router()));
  router.use("/teacher", clases(Router()));
  router.use("/teacher", teacher_profile(Router()));
  router.use("/user", student_profile(Router()));
  router.use("/admin", admin(Router()));

  return router;
}
